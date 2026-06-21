@echo off
echo Starting Backend Server...
cd Image-Forgery-Detection-CNN-master
echo Installing dependencies if needed...
pip install -r requirements.txt
python app.py
pause
