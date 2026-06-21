import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleAnalysisComplete = (data: any, url: string) => {
    setAnalysisData(data);
    setPreviewUrl(url);
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {currentPage === 'upload' && (
        <UploadPage onAnalysisComplete={handleAnalysisComplete} />
      )}

      {currentPage === 'results' && analysisData && (
        <ResultsPage analysisData={analysisData} previewUrl={previewUrl} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
