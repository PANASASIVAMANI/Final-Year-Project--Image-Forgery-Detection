# 🔍 ForensicVision - Image Forgery Detection System

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![React](https://img.shields.io/badge/React-18.0-61DAFB.svg?logo=react)
![Flask](https://img.shields.io/badge/Flask-Backend-black.svg?logo=flask)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

> **A comprehensive, production-ready image forgery detection system built for advanced computer vision analysis, cryptographic hashing, and forensic metadata extraction.**

This project was developed as a Final Year Project to combat digital image manipulation using advanced computer vision and machine learning techniques. It provides an intuitive web interface for users to upload images and receive a detailed forensic analysis report.

---

## ✨ Features

Our detection engine utilizes a multi-layered approach to identify tampering:

*   **🧬 Cryptographic Hashing:** Generates MD5 and SHA-256 hashes to detect bit-level modifications and maintain data integrity.
*   **✂️ Copy-Move Detection:** Uses ORB feature extraction and BFMatcher to identify duplicated regions within an image.
*   **🌈 Error Level Analysis (ELA):** Analyzes JPEG recompression rates to highlight anomalies, generating visual heatmaps of suspicious regions.
*   **🧩 Splicing Detection:** Measures color and illumination consistency, brightness variance, and edge integrity to detect stitched images.
*   **🔍 Texture Analysis:** Identifies unnatural smoothness (retouching) and measures noise levels using Laplacian variance and histogram entropy.
*   **📊 Metadata Forensics:** Extracts complete EXIF data, flags timestamp inconsistencies, and detects signatures of editing software (e.g., Photoshop, GIMP).
*   **🧠 Decision Engine:** Combines all analyses to calculate an overall confidence score and a final verdict (Authentic, Suspicious, or Forged).
*   **📄 PDF Report Generation:** Automatically generates downloadable, professional forensic reports detailing all findings.

## 🏗️ Architecture

The system is built using a modern, decoupled architecture:

*   **Frontend:** React.js with Tailwind CSS (Vite build system) for a fast, responsive user interface.
*   **Backend:** Python Flask providing RESTful APIs for heavy lifting, computer vision processing, and report generation.
*   **Database:** Supabase (PostgreSQL) for storing analysis results, historical data, and metadata tracking.

## 🚀 Setup & Installation

### 1. Prerequisites
*   Node.js (v16+)
*   Python (v3.8+)
*   Supabase Account (Free tier works)

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
npm install
```

### 3. Backend Setup
Navigate to the backend directory and install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## 💻 Usage

Start both the frontend and backend servers to run the application locally.

**Terminal 1 (Frontend):**
```bash
npm run dev
# The UI will be available at http://localhost:5173
```

**Terminal 2 (Backend):**
```bash
cd backend
python app.py
# The API will run on http://localhost:5000/api
```

## ⚠️ Security & Limitations
*   Supported formats: `JPG`, `JPEG`, `PNG`.
*   Maximum file upload size: `10MB`.
*   Note: Error Level Analysis (ELA) is optimized for JPEG compression and may be slower/less effective on lossless PNG files.

## 🤝 Contributors
*   **P. Sivamani** - *Lead Developer / Final Year Student*

---
*Built for educational and forensic purposes.*
