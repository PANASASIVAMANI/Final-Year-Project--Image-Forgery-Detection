import os
import sys
import numpy as np
import torch
from joblib import load
from cv2 import imread

# Adjust path to include src
sys.path.append(os.path.join(os.getcwd(), 'src'))

print("Python executable:", sys.executable)
try:
    import sklearn
    print("Scikit-learn version:", sklearn.__version__)
except ImportError:
    print("Scikit-learn not installed")

MODEL_SVM_PATH = os.path.join('data', 'output', 'pre_trained_svm', 'CASIA2_WithRot_LR001_b128_nodrop.pt')

print(f"Loading SVM from {MODEL_SVM_PATH}...")
try:
    if os.path.exists(MODEL_SVM_PATH):
        svm_model = load(MODEL_SVM_PATH)
        print("SVM Loaded successfully.")
        
        # Create a dummy feature vector to test prediction
        dummy_feature = np.random.rand(1, 400)
        print("Testing with random noise (shape 1x400)...")
        
        pred = svm_model.predict(dummy_feature)
        print(f"Prediction for random noise: {pred}")
        
        # Try another one
        dummy_feature2 = np.random.rand(1, 400)
        pred2 = svm_model.predict(dummy_feature2)
        print(f"Prediction for random noise 2: {pred2}")

        if hasattr(svm_model, 'classes_'):
             print(f"Model classes: {svm_model.classes_}")
             
    else:
        print("Model file not found!")
except Exception as e:
    print(f"ERROR loading/using model: {e}")
