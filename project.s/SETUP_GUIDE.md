# ForensicVision - Image Forgery Detection Web Application

A complete, production-ready image forgery detection system with advanced computer vision analysis, cryptographic hashing, and forensic metadata extraction.

## Architecture Overview

### Frontend (React + Tailwind CSS)
- **Home Page**: Introduction, use cases, and system overview
- **Upload Page**: Image upload with preview and analysis controls
- **Results Page**: Comprehensive analysis results with PDF report download

### Backend (Python Flask)
- RESTful API endpoints for upload, analysis, and report generation
- Advanced computer vision algorithms for forgery detection
- Cryptographic hashing (MD5, SHA-256)
- EXIF metadata extraction and analysis
- PDF report generation with ReportLab

### Database (Supabase)
- Stores all analysis results
- Metadata tracking and historical data retention

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the project root:
```
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Create a `.env` file in the `backend` directory:
```
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Start the Application

**Terminal 1 - Start React Frontend:**
```bash
npm run dev
```

**Terminal 2 - Start Flask Backend:**
```bash
cd backend
python app.py
```

The application will be available at `http://localhost:5173`
The API will be available at `http://localhost:5000/api`

## Features

### Cryptographic Hashing
- Generates MD5 and SHA-256 hashes for image integrity verification
- Detects any modifications to the image data
- Stores hashes for future reference and comparison

### Copy-Move Detection
- Uses ORB (Oriented FAST and Rotated BRIEF) feature extraction
- BFMatcher algorithm to identify duplicate regions
- Detects when image regions are copied and repositioned
- Provides confidence scores based on match count

### Error Level Analysis (ELA)
- JPEG recompression analysis
- Detects compression anomalies indicating editing
- Generates visual heatmaps showing suspicious regions
- Measures mean, max, and standard deviation of differences

### Splicing Detection
- Color and illumination consistency analysis
- Edge inconsistency detection
- Brightness variance measurement across image regions
- Color variance analysis

### Texture Analysis
- Detects unnatural smoothness (retouching)
- Laplacian variance calculation
- Noise level analysis
- Histogram entropy measurement
- Identifies regions with anomalous texture patterns

### Metadata Forensics
- Extracts complete EXIF data
- Detects editing software traces (Photoshop, GIMP, etc.)
- Identifies timestamp inconsistencies
- Analyzes camera information for tampering
- Flags suspicious metadata patterns

### Decision Engine
- Combines all analysis results
- Generates confidence scores (0-100%)
- Three verdict levels:
  - **Authentic**: No forgery detected (95% confidence)
  - **Suspicious**: 1-2 indicators detected
  - **Forged**: 3+ indicators detected

### PDF Report Generation
- Professional forensic report format
- Image information and file details
- Cryptographic hashes
- Detection results for all algorithms
- EXIF metadata summary
- Confidence scores and final verdict

## API Endpoints

### `POST /api/upload`
Upload an image file for analysis
- **Parameters**: `image` (file: JPG, JPEG, PNG, max 10MB)
- **Response**: `{filename, message, success}`

### `GET /api/analyze/<filename>`
Analyze the uploaded image
- **Response**: Complete analysis results including:
  - Verdict (authentic/forged/suspicious)
  - Confidence score
  - Individual detection results
  - Hashes, metadata, and analysis details

### `GET /api/report/<analysis_id>`
Download PDF forensic report
- **Response**: PDF file download

## Supported Image Formats
- JPG / JPEG
- PNG
- Maximum file size: 10MB

## Detection Capabilities

The system can detect:
- Copy-Move forgery (duplicated regions)
- Splicing (stitched images)
- Compression anomalies (ELA)
- Retouching and smoothing
- Metadata tampering
- Edited software signatures
- Timestamp inconsistencies

## Production Deployment

### Frontend Build
```bash
npm run build
```

### Backend Deployment
- Use Gunicorn for production WSGI server
- Configure proper CORS headers for your domain
- Set environment variables securely
- Use HTTPS/SSL certificates
- Implement rate limiting
- Add authentication for sensitive endpoints

## Performance Notes

- Analysis typically takes 3-5 seconds per image
- Larger images (8MB+) may take longer
- Copy-Move detection is most computationally intensive
- ELA requires JPEG recompression (slower on PNG files)
- All analysis is performed server-side

## Security Considerations

- All uploads are validated for file type and size
- Temporary files are securely stored
- Database stores analysis results with public read access (demo mode)
- For production, implement user authentication and RLS policies
- All file uploads should be scanned with antivirus
- Consider implementing rate limiting to prevent abuse

## Troubleshooting

### Backend won't start
- Check Python version (3.8+)
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Ensure port 5000 is available

### Images not uploading
- Check file format (JPG, JPEG, PNG only)
- Verify file size is under 10MB
- Check CORS headers in Flask app

### Analysis fails
- Check Flask backend is running
- Verify Supabase connection in `.env` file
- Check backend console for error messages

### PDF download fails
- Ensure reportlab is installed: `pip install reportlab`
- Check that analysis_id is valid

## License

This application is provided as-is for educational and forensic purposes.
