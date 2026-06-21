import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

# Setup paths
DATA_DIR = os.path.join(os.getcwd(), 'data', 'output')
FEATURES_FILE = os.path.join(DATA_DIR, 'features', 'CASIA2_WithRot_LR001_b128_nodrop.csv')
MODEL_FILE = os.path.join(DATA_DIR, 'pre_trained_svm', 'CASIA2_WithRot_LR001_b128_nodrop.pt')

print(f"Loading features from {FEATURES_FILE}...")
df = pd.read_csv(FEATURES_FILE)
X = df.drop(columns=['labels', 'image_names'], errors='ignore')
y = df['labels']

# Split data (same seed as retraining to simulate validation)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Loading model from {MODEL_FILE}...")
clf = joblib.load(MODEL_FILE)

print("Evaluating on Test Set...")
y_pred = clf.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Check probability distribution for False Negatives
# (Forged images predicted as Authentic)
print("\nAnalyzing False Negatives (Forged but predicted Authentic)...")
try:
    if hasattr(clf, 'predict_proba'):
        y_probs = clf.predict_proba(X_test)
        # Assuming class 1 is Forged
        forged_indices = (y_test == 1)
        pred_authentic = (y_pred == 0)
        false_negatives = forged_indices & pred_authentic
        
        if false_negatives.any():
            fn_probs = y_probs[false_negatives]
            print(f"Found {fn_probs.shape[0]} false negatives.")
            print(f"Mean predicted probability for 'Forged' class among these: {fn_probs[:, 1].mean():.4f}")
            print(f"Max predicted probability for 'Forged' class among these: {fn_probs[:, 1].max():.4f}")
        else:
            print("No false negatives in test set.")
except Exception as e:
    print(f"Could not analyze probabilities: {e}")
