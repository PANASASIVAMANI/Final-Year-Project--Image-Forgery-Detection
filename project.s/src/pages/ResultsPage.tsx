import { AlertCircle, CheckCircle, XCircle, Download, ArrowLeft } from 'lucide-react';

interface ResultsPageProps {
  analysisData: any;
  previewUrl: string | null;
  onNavigate: (page: string) => void;
}

export default function ResultsPage({ analysisData, previewUrl, onNavigate }: ResultsPageProps) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'forged':
        return 'text-red-400';
      case 'authentic':
        return 'text-green-400';
      case 'suspicious':
        return 'text-yellow-400';
      default:
        return 'text-slate-400';
    }
  };

  const getVerdictBg = (verdict: string) => {
    switch (verdict) {
      case 'forged':
        return 'bg-red-900 border-red-700';
      case 'authentic':
        return 'bg-green-900 border-green-700';
      case 'suspicious':
        return 'bg-yellow-900 border-yellow-700';
      default:
        return 'bg-slate-900 border-slate-700';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'forged':
        return <XCircle className="h-16 w-16" />;
      case 'authentic':
        return <CheckCircle className="h-16 w-16" />;
      case 'suspicious':
        return <AlertCircle className="h-16 w-16" />;
      default:
        return <AlertCircle className="h-16 w-16" />;
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/${analysisData.analysis_id}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forgery_report_${analysisData.analysis_id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('upload')}
          className="mb-6 flex items-center text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Analyze Another Image
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Analysis Results
          </h1>
          <p className="text-slate-300">
            Comprehensive forgery detection report
          </p>
        </div>

        {previewUrl && (
          <div className="mb-8 bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Analyzed Image
            </h3>
            <img src={previewUrl} alt="Analyzed" className="max-h-96 rounded-lg shadow-lg object-contain" />
          </div>
        )}

        <div className={`mb-8 rounded-lg p-8 border-2 ${getVerdictBg(analysisData.verdict)}`}>
          <div className="flex items-center justify-center mb-4">
            <div className={getVerdictColor(analysisData.verdict)}>
              {getVerdictIcon(analysisData.verdict)}
            </div>
          </div>
          <h2 className={`text-3xl font-bold text-center mb-2 ${getVerdictColor(analysisData.verdict)}`}>
            {analysisData.verdict.toUpperCase()}
          </h2>
          <p className="text-center text-2xl text-white font-semibold">
            Confidence Score: {analysisData.confidence}%
          </p>
          {analysisData.forgery_types && analysisData.forgery_types.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-slate-300 mb-2">Detected Forgery Types:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {analysisData.forgery_types.map((type: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-700 text-white rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Image Information
            </h3>
            <div className="space-y-2 text-slate-300">
              <p><span className="font-semibold text-cyan-400">Filename:</span> {analysisData.file_info.name}</p>
              <p><span className="font-semibold text-cyan-400">Size:</span> {(analysisData.file_info.size / 1024).toFixed(2)} KB</p>
              <p><span className="font-semibold text-cyan-400">Dimensions:</span> {analysisData.file_info.dimensions}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Cryptographic Hashes
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-cyan-400 mb-1">MD5:</p>
                <p className="text-xs text-slate-300 font-mono break-all bg-slate-900 p-2 rounded">
                  {analysisData.hashes.md5}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-cyan-400 mb-1">SHA-256:</p>
                <p className="text-xs text-slate-300 font-mono break-all bg-slate-900 p-2 rounded">
                  {analysisData.hashes.sha256}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Detection Results
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-4 rounded-lg border-2 ${analysisData.copy_move.detected ? 'bg-red-900 bg-opacity-30 border-red-700' : 'bg-green-900 bg-opacity-30 border-green-700'}`}>
              <h4 className="font-semibold text-white mb-2">Copy-Move Detection</h4>
              <p className={`text-sm mb-2 ${analysisData.copy_move.detected ? 'text-red-300' : 'text-green-300'}`}>
                {analysisData.copy_move.detected ? '✗ Detected' : '✓ Not Detected'}
              </p>
              <p className="text-xs text-slate-300">{analysisData.copy_move.description}</p>
              {analysisData.copy_move.detected && (
                <p className="text-xs text-slate-300 mt-2">
                  Confidence: {analysisData.copy_move.confidence}%
                </p>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 ${analysisData.ela.anomalies_detected ? 'bg-red-900 bg-opacity-30 border-red-700' : 'bg-green-900 bg-opacity-30 border-green-700'}`}>
              <h4 className="font-semibold text-white mb-2">Error Level Analysis</h4>
              <p className={`text-sm mb-2 ${analysisData.ela.anomalies_detected ? 'text-red-300' : 'text-green-300'}`}>
                {analysisData.ela.anomalies_detected ? '✗ Anomalies Detected' : '✓ No Anomalies'}
              </p>
              <p className="text-xs text-slate-300">{analysisData.ela.description}</p>
              {analysisData.ela.anomalies_detected && (
                <p className="text-xs text-slate-300 mt-2">
                  Confidence: {analysisData.ela.confidence}%
                </p>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 ${analysisData.splicing.detected ? 'bg-red-900 bg-opacity-30 border-red-700' : 'bg-green-900 bg-opacity-30 border-green-700'}`}>
              <h4 className="font-semibold text-white mb-2">Splicing Detection</h4>
              <p className={`text-sm mb-2 ${analysisData.splicing.detected ? 'text-red-300' : 'text-green-300'}`}>
                {analysisData.splicing.detected ? '✗ Detected' : '✓ Not Detected'}
              </p>
              <p className="text-xs text-slate-300">{analysisData.splicing.description}</p>
              {analysisData.splicing.detected && (
                <p className="text-xs text-slate-300 mt-2">
                  Confidence: {analysisData.splicing.confidence}%
                </p>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 ${analysisData.texture.anomalies_detected ? 'bg-red-900 bg-opacity-30 border-red-700' : 'bg-green-900 bg-opacity-30 border-green-700'}`}>
              <h4 className="font-semibold text-white mb-2">Texture Analysis</h4>
              <p className={`text-sm mb-2 ${analysisData.texture.anomalies_detected ? 'text-red-300' : 'text-green-300'}`}>
                {analysisData.texture.anomalies_detected ? '✗ Anomalies Detected' : '✓ Natural Texture'}
              </p>
              <p className="text-xs text-slate-300">{analysisData.texture.description}</p>
              {analysisData.texture.anomalies_detected && (
                <p className="text-xs text-slate-300 mt-2">
                  Confidence: {analysisData.texture.confidence}%
                </p>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 ${analysisData.metadata.tampering_detected ? 'bg-red-900 bg-opacity-30 border-red-700' : 'bg-green-900 bg-opacity-30 border-green-700'}`}>
              <h4 className="font-semibold text-white mb-2">Metadata Analysis</h4>
              <p className={`text-sm mb-2 ${analysisData.metadata.tampering_detected ? 'text-red-300' : 'text-green-300'}`}>
                {analysisData.metadata.tampering_detected ? '✗ Tampering Detected' : '✓ No Tampering'}
              </p>
              <p className="text-xs text-slate-300">{analysisData.metadata.description}</p>
              {analysisData.metadata.tampering_detected && (
                <p className="text-xs text-slate-300 mt-2">
                  Confidence: {analysisData.metadata.confidence}%
                </p>
              )}
            </div>

            <div className="p-4 rounded-lg border-2 bg-slate-900 bg-opacity-50 border-slate-600">
              <h4 className="font-semibold text-white mb-2">EXIF Data Fields</h4>
              <p className="text-2xl font-bold text-cyan-400">
                {analysisData.metadata.exif_fields_count}
              </p>
              <p className="text-xs text-slate-300 mt-2">
                metadata fields extracted
              </p>
            </div>
          </div>
        </div>

        {analysisData.metadata.exif_data && Object.keys(analysisData.metadata.exif_data).length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              EXIF Metadata
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
              {Object.entries(analysisData.metadata.exif_data).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-semibold text-cyan-400">{key}:</span>
                  <span className="text-slate-300 ml-2">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}
