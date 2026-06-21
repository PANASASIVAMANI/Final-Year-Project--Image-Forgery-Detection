import { Shield } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="ml-3 text-xl font-bold text-white">
              ForensicVision
            </span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('upload')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'upload'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Analyze Image
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
