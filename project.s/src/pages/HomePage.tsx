import { Shield, Eye, Database, FileSearch, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-cyan-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            ForensicVision
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Advanced Image Forgery Detection System powered by Computer Vision and Cryptographic Analysis
          </p>
          <button
            onClick={() => onNavigate('upload')}
            className="inline-flex items-center px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300">
            <Eye className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Multi-Algorithm Detection
            </h3>
            <p className="text-slate-300">
              Combines Copy-Move detection, Error Level Analysis, Splicing detection, and Texture analysis for comprehensive forgery identification.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300">
            <Database className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Cryptographic Integrity
            </h3>
            <p className="text-slate-300">
              Generates MD5 and SHA-256 hashes to verify image integrity and detect any unauthorized modifications.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300">
            <FileSearch className="h-12 w-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Metadata Forensics
            </h3>
            <p className="text-slate-300">
              Analyzes EXIF data to detect editing software traces, timestamp inconsistencies, and camera information tampering.
            </p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Use Cases
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-cyan-500 bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Digital Forensics
              </h4>
              <p className="text-slate-300 text-sm">
                Law enforcement and forensic investigators can verify image authenticity in legal proceedings and criminal investigations.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="bg-cyan-500 bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📰</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Journalism & Media
              </h4>
              <p className="text-slate-300 text-sm">
                News organizations can verify the authenticity of submitted photos and protect against misinformation campaigns.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="bg-cyan-500 bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Social Media Verification
              </h4>
              <p className="text-slate-300 text-sm">
                Detect manipulated images spreading on social platforms and combat fake news and visual misinformation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-cyan-900 to-slate-800 rounded-lg p-8 border border-cyan-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-slate-200">
            <div>
              <h4 className="font-semibold text-cyan-300 mb-2">1. Upload Image</h4>
              <p className="text-sm">Upload any JPG, JPEG, or PNG image for analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-2">2. Cryptographic Hashing</h4>
              <p className="text-sm">Generate MD5 and SHA-256 hashes for integrity verification.</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-2">3. Computer Vision Analysis</h4>
              <p className="text-sm">Apply multiple detection algorithms including ORB features, ELA, and texture analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-2">4. Metadata Extraction</h4>
              <p className="text-sm">Examine EXIF data for editing software traces and inconsistencies.</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-2">5. Decision Engine</h4>
              <p className="text-sm">Combine all analysis results to determine forgery likelihood.</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-300 mb-2">6. Detailed Report</h4>
              <p className="text-sm">Generate comprehensive PDF forensic report with all findings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
