import os
import sys
import pandas as pd
import joblib
from sklearn import svm
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import classification_report, accuracy_score

# Setup paths
DATA_DIR = os.path.join(os.getcwd(), 'data', 'output')
FEATURES_FILE = os.path.join(DATA_DIR, 'features', 'CASIA2_WithRot_LR001_b128_nodrop.csv')
MODEL_OUTPUT_DIR = os.path.join(DATA_DIR, 'pre_trained_svm')
MODEL_OUTPUT_FILE = os.path.join(MODEL_OUTPUT_DIR, 'CASIA2_WithRot_LR001_b128_nodrop.pt')

print(f"Reading features from {FEATURES_FILE}...")
try:
    df = pd.read_csv(FEATURES_FILE)
    print(f"Keep columns: {df.columns}")
    
    # Filter columns to get X (features) and y (labels)
    # The original script does: X = df.loc[:, ~df.columns.isin(['labels', 'image_names'])]
    X = df.drop(columns=['labels', 'image_names'], errors='ignore')
    y = df['labels']
    
    print(f"Features shape: {X.shape}")
    print(f"Labels shape: {y.shape}")
    
    # Split data to evaluate quality
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training SVM (this might take a minute)...")
    # Using a simple SVC first to save time, or we can use GridSearch if needed but might be slow
    # Original params: C=0.001..1000, gamma=1e-3..1e-4, kernel='rbf'
    # Let's try a reasonable default first to ensure it works
    clf = svm.SVC(kernel='rbf', C=10, gamma='scale', probability=True)
    clf.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred))
    
    # Save the model
    print(f"Saving model to {MODEL_OUTPUT_FILE}...")
    os.makedirs(MODEL_OUTPUT_DIR, exist_ok=True)
    
    # Rename old model to backup just in case
    if os.path.exists(MODEL_OUTPUT_FILE):
        backup_path = MODEL_OUTPUT_FILE + ".bak"
        print(f"Backing up old model to {backup_path}")
        try:
             os.replace(MODEL_OUTPUT_FILE, backup_path)
        except OSError:
             print("Could not create backup (file might be in use or permissions issue)")

    joblib.dump(clf, MODEL_OUTPUT_FILE)
    print("Model saved successfully!")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
