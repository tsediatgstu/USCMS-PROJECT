import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShieldQuestion } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0">
        <div className="w-[400px] h-[400px] bg-blue-100 dark:bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-xl w-full mx-6 text-center">
        {/* Visual Identity Badge */}
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-blue-500/10 border border-gray-100 dark:border-gray-800 transition-transform hover:scale-105">
            <ShieldQuestion size={64} className="text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Main Typography */}
        <div className="space-y-4">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 dark:from-white dark:to-gray-700 leading-none tracking-tighter">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Lost in the Campus?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, deleted, or never existed in the USCMS directory.
          </p>
        </div>

        {/* Action Buttons (Dual Path) */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            title="Return to homepage"
            className="group w-full sm:w-auto px-8 py-4 bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
          >
            <Home size={20} />
            Back to Home
          </Link>
          
          <button 
            onClick={() => navigate(-1)}
            title="Go back to the previous page"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Footer Branding */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
            University Student Complaint Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;