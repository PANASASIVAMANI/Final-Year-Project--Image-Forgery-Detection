# 🔍 ForensicVision - Image Forgery Detection System

![React](https://img.shields.io/badge/React-18.0-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg?logo=vite)
![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-Backend-black.svg?logo=flask)
![PyTorch](https://img.shields.io/badge/PyTorch-CNN-EE4C2C.svg?logo=pytorch)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8.svg?logo=opencv)
![License](https://img.shields.io/badge/License-MIT-green.svg)

> **A comprehensive, production-ready image forgery detection system built for advanced computer vision analysis, cryptographic hashing, and forensic metadata extraction.**

This project was developed to combat digital image manipulation using advanced computer vision and deep learning techniques. It provides an intuitive web interface for users to upload images and receive a detailed forensic analysis report powered by a Convolutional Neural Network (CNN) and Support Vector Machine (SVM).

---

## ✨ Core Features

Our detection engine utilizes a multi-layered approach to identify tampering:

*   **🧠 Deep Learning Detection (CNN + SVM):** Extracts features using a custom PyTorch CNN and classifies them using an SVM.
*   **🧬 Cryptographic Hashing:** Generates MD5 and SHA-256 hashes to detect bit-level modifications and maintain data integrity.
*   **✂️ Copy-Move Detection:** Identifies duplicated regions within an image using feature extraction algorithms.
*   **🌈 Error Level Analysis (ELA):** Analyzes JPEG recompression rates to highlight anomalies, generating visual heatmaps of suspicious regions.
*   **🧩 Splicing Detection:** Measures color and illumination consistency, brightness variance, and edge integrity to detect stitched images.
*   **🔍 Texture Analysis:** Identifies unnatural smoothness (retouching) and measures noise levels using Laplacian variance and histogram entropy.
*   **📊 Metadata Forensics:** Extracts complete EXIF data, flags timestamp inconsistencies, and detects signatures of editing software (e.g., Photoshop).
*   **📄 PDF Report Generation:** Automatically generates downloadable, professional forensic reports detailing all findings using ReportLab.

## 🤖 Machine Learning Architecture

The core of the forgery detection relies on a hybrid deep learning model:
1. **Feature Extraction (CNN):** A custom Convolutional Neural Network built with PyTorch is trained on image patches. It extracts robust 400-dimensional feature representations from the images.
2. **Feature Fusion:** The network extracts multiple patches per image and fuses their features into a single representation.
3. **Classification (SVM):** A Support Vector Machine (from Scikit-Learn) takes the fused feature vectors and performs the final binary classification (Authentic vs. Forged). 

**Datasets Used for Training:** 
*   [CASIA2](https://www.kaggle.com/sophatvathana/casia-dataset) (96.82% Accuracy)
*   [NC2016](https://www.nist.gov/itl/iad/mig/media-forensics-challenge) (84.89% Accuracy)

## 🏗️ System Architecture & Stack

The system is built using a modern, decoupled architecture:

*   **Frontend (`project.s/`):** React.js with TypeScript and Tailwind CSS, bundled with Vite for a blazing-fast, responsive user interface.
*   **Backend (`project.s/Image-Forgery-Detection-CNN-master/`):** Python Flask RESTful API handling heavy lifting, computer vision processing, model inference, and report generation.
*   **Computer Vision (OpenCV):** Used extensively for image preprocessing, loading images (`cv2.imread`), color space conversions (`cv2.cvtColor`), and computing image differences and median blurs to generate ground truth masks for forgery regions during the data preparation phase.
*   **Database:** Supabase (PostgreSQL) integration for storing analysis results, historical data, and metadata tracking.

## 🚀 Setup & Installation

### 1. Prerequisites
*   Node.js (v16+)
*   Python (v3.8+)
*   Supabase Account (Optional, for database features)

### 2. Environment Configuration
Create a `.env` file in the `project.s` directory:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd project.s
npm install
```

### 4. Backend Setup
Navigate to the backend directory and install Python dependencies:
```bash
cd project.s/Image-Forgery-Detection-CNN-master
pip install -r requirements.txt
```

## 💻 Usage

Start both the frontend and backend servers to run the application locally.

**Terminal 1 (Frontend):**
```bash
cd project.s
npm run dev
# The UI will be available at http://localhost:5173
```

**Terminal 2 (Backend):**
```bash
cd project.s/Image-Forgery-Detection-CNN-master
python app.py
# The API will run on http://localhost:5000
```

## 🔌 API Endpoints Reference

*   `POST /api/upload`: Upload an image file (JPG, JPEG, PNG, max 10MB) for analysis. Returns a secure filename.
*   `GET /api/analyze/<filename>`: Triggers the CNN+SVM pipeline to analyze the uploaded image and returns a comprehensive JSON result (verdict, confidence score, and auxiliary checks).
*   `GET /api/report/<analysis_id>`: Generates and downloads a forensic PDF report containing the analysis results.

## ⚠️ Limitations & Notes
*   **Supported Formats:** `JPG`, `JPEG`, `PNG`.
*   **File Size:** Maximum file upload size is `10MB`.
*   **Performance:** Analysis typically takes 3-5 seconds depending on hardware, as Copy-Move detection and CNN inference are computationally intensive.

## 🤝 Contributors
*   **P. Sivamani** - *Lead Developer / Final Year Student*
*   *Deep Learning Architecture inspired by Y. Rao et al., and implemented by Group 10 (TU Delft).*

---
*Built for educational and forensic purposes.*
