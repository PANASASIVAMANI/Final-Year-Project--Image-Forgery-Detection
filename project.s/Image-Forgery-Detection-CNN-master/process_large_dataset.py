import os
import sys
import glob
import cv2
import pandas as pd
import numpy as np
import torch
from torchvision import transforms
from torch.autograd import Variable

# Adjust path to find src
sys.path.append(os.path.join(os.getcwd(), 'src'))

from src.cnn.cnn import CNN
from src.feature_fusion.feature_fusion import get_yi, get_y_hat
from skimage.util import view_as_windows

def get_patches(image_mat, stride):
    window_shape = (128, 128, 3)
    # Check image size
    if image_mat.shape[0] < 128 or image_mat.shape[1] < 128:
        return []
    windows = view_as_windows(image_mat, window_shape, step=stride)
    patches = []
    for m in range(windows.shape[0]):
        for n in range(windows.shape[1]):
            patches += [windows[m][n][0]]
    return patches

def get_patch_yi_efficient(model, image):
    transform = transforms.Compose([transforms.ToTensor()])
    y = []
    patches = get_patches(image, stride=1024) # Stride 1024 as per original
    
    if not patches:
        return None

    for patch in patches:
        img_tensor = transform(patch)
        img_tensor.unsqueeze_(0)
        img_variable = Variable(img_tensor.double())
        if torch.cuda.is_available():
            img_variable = img_variable.cuda()
            
        with torch.no_grad():
            yi = get_yi(model=model, patch=img_variable)
            # Move back to CPU for numpy storage
            if torch.cuda.is_available():
                yi = yi.cpu()
            y.append(yi)

    if not y:
        return None
        
    y = np.vstack(tuple(y))
    y_hat = get_y_hat(y=y, operation="mean")
    return y_hat

def get_df_column_names():
    names = ["image_names", "labels"]
    for i in range(400):
        names.append("f" + str(i + 1))
    return names

def process_dataset(authentic_dir, tampered_dir, output_file, model):
    # Prepare CSV file with headers
    cols = get_df_column_names()
    
    # Write header if file doesn't exist
    if not os.path.exists(output_file):
        pd.DataFrame(columns=cols).to_csv(output_file, index=False)
    
    print(f"Processing Authentic images from {authentic_dir}...")
    auth_files = glob.glob(os.path.join(authentic_dir, '*'))
    print(f"Found {len(auth_files)} authentic images.")
    
    count = 0
    buffer = []
    BATCH_SIZE = 10 
    
    # Process Authentic (Label 0)
    for filepath in auth_files:
        try:
            img = cv2.imread(filepath)
            if img is None:
                continue
            
            features = get_patch_yi_efficient(model, img)
            if features is not None:
                # Prepare row: Name, Label, Features
                row = [os.path.basename(filepath), 0] # Label 0
                row.extend(features.flatten().tolist())
                buffer.append(row)
                count += 1
            
            if len(buffer) >= BATCH_SIZE:
                df_chunk = pd.DataFrame(buffer, columns=cols)
                df_chunk.to_csv(output_file, mode='a', header=False, index=False)
                buffer = []
                print(f"Processed {count} images...", end='\r')
                
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

    # Process Tampered (Label 1)
    print(f"\nProcessing Tampered images from {tampered_dir}...")
    tamp_files = glob.glob(os.path.join(tampered_dir, '*'))
    print(f"Found {len(tamp_files)} tampered images.")
    
    for filepath in tamp_files:
        try:
            img = cv2.imread(filepath)
            if img is None:
                continue
            
            features = get_patch_yi_efficient(model, img)
            if features is not None:
                # Prepare row: Name, Label, Features
                row = [os.path.basename(filepath), 1] # Label 1
                row.extend(features.flatten().tolist())
                buffer.append(row)
                count += 1
            
            if len(buffer) >= BATCH_SIZE:
                df_chunk = pd.DataFrame(buffer, columns=cols)
                df_chunk.to_csv(output_file, mode='a', header=False, index=False)
                buffer = []
                print(f"Processed {count} images...", end='\r')

        except Exception as e:
            print(f"Error processing {filepath}: {e}")

    # Flush remaining
    if buffer:
        df_chunk = pd.DataFrame(buffer, columns=cols)
        df_chunk.to_csv(output_file, mode='a', header=False, index=False)
    
    print(f"\nDone! Features saved to {output_file}")

if __name__ == "__main__":
    # Settings
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")
    
    model = CNN()
    model_path = os.path.join('data', 'output', 'pre_trained_cnn', 'CASIA2_WithRot_LR001_b128_nodrop.pt')
    
    print(f"Loading CNN from {model_path}")
    if os.path.exists(model_path):
        model.load_state_dict(torch.load(model_path, map_location=device))
        model.eval()
        model = model.double().to(device)
    else:
        print("Error: CNN model not found!")
        sys.exit(1)

    # Paths
    AUTH_DIR = os.path.join('data', 'CASIA2', 'Au')
    TAMP_DIR = os.path.join('data', 'CASIA2', 'Tp')
    OUTPUT_CSV = os.path.join('data', 'output', 'features', 'CASIA2_WithRot_LR001_b128_nodrop.csv')
    
    # Backup existing CSV if likely standard/pre-shipped, so we don't destroy it?
    # Actually, user wants to use NEW dataset.
    # It's safer to create a NEW CSV file for the custom dataset logic? 
    # Or overwrite. Overwriting might be dangerous if they mess up.
    # Let's verify existing file size.
    if os.path.exists(OUTPUT_CSV):
        print(f"Warning: {OUTPUT_CSV} already exists.")
        # We will append to it? or Overwrite?
        # The user said "i have dataset... contains forged and original".
        # This implies a replacement.
        # Let's ask user to backup manually or just start fresh.
        # For simplicity in this script, let's backup automatically.
        import time
        backup = OUTPUT_CSV + f".{int(time.time())}.bak"
        os.rename(OUTPUT_CSV, backup)
        print(f"Backed up existing features to {backup}")

    process_dataset(AUTH_DIR, TAMP_DIR, OUTPUT_CSV, model)
