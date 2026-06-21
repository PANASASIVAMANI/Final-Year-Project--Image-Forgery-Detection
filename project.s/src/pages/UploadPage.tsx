import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface UploadPageProps {
  onAnalysisComplete: (data: any, previewUrl: string) => void;
}

export default function UploadPage({ onAnalysisComplete }: UploadPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setUploadError('Please select a valid image file (JPG, JPEG, or PNG)');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      setUploadError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadData = await uploadResponse.json();
      const filename = uploadData.filename;

      setIsUploading(false);
      setIsAnalyzing(true);

      const analyzeResponse = await fetch(`${API_BASE_URL}/analyze/${filename}`);

      if (!analyzeResponse.ok) {
        throw new Error('Analysis failed');
      }

      const analysisData = await analyzeResponse.json();

      setIsAnalyzing(false);
      onAnalysisComplete(analysisData, previewUrl as string);

    } catch (error) {
      setIsUploading(false);
      setIsAnalyzing(false);
      setUploadError(error instanceof Error ? error.message : 'An error occurred during analysis');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Upload Image for Analysis
          </h1>
          <p className="text-slate-300">
            Upload an image to detect potential forgery and manipulation
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-8">
          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center cursor-pointer hover:border-cyan-500 transition-all duration-300 bg-slate-900 bg-opacity-50"
            >
              <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-xl text-slate-300 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-slate-400">
                JPG, JPEG, or PNG (max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <ImageIcon className="h-6 w-6 mr-2 text-cyan-400" />
                    Image Preview
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setUploadError(null);
                    }}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Change Image
                  </button>
                </div>

                {previewUrl && (
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-96 mx-auto rounded"
                    />
                  </div>
                )}

                <div className="mt-4 text-sm text-slate-300">
                  <p><span className="font-semibold">Filename:</span> {selectedFile.name}</p>
                  <p><span className="font-semibold">Size:</span> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                  <p><span className="font-semibold">Type:</span> {selectedFile.type}</p>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isUploading || isAnalyzing}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Uploading Image...
                  </>
                ) : isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Analyzing Image... This may take a moment
                  </>
                ) : (
                  'Analyze Image'
                )}
              </button>
            </div>
          )}

          {uploadError && (
            <div className="mt-4 p-4 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg">
              <p className="text-red-200">{uploadError}</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="mt-6 bg-slate-900 bg-opacity-50 rounded-lg p-6 border border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                Analysis in Progress
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>✓ Generating cryptographic hashes...</p>
                <p>✓ Performing Copy-Move detection...</p>
                <p>✓ Running Error Level Analysis...</p>
                <p>✓ Detecting splicing...</p>
                <p>✓ Analyzing texture patterns...</p>
                <p>✓ Extracting metadata...</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">
            What happens during analysis?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              <span className="text-cyan-400 font-semibold">Cryptographic Hashing:</span>
              <p>Generates MD5 and SHA-256 hashes for integrity verification</p>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Copy-Move Detection:</span>
              <p>Uses ORB features to identify duplicated regions</p>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Error Level Analysis:</span>
              <p>Detects compression artifacts and editing traces</p>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Splicing Detection:</span>
              <p>Identifies color and illumination inconsistencies</p>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Texture Analysis:</span>
              <p>Detects unnatural smoothness and retouching</p>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Metadata Forensics:</span>
              <p>Examines EXIF data for tampering evidence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
