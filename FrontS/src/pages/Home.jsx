import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MessageSquare, Award, Clock, CheckCircle, Zap } from 'lucide-react';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden font-sans">
      
      {/* --- Hero Section --- */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        {/* Background Decorative Element - Soft Indigo Glow */}
        <div className="absolute top-0 -z-10 h-[600px] w-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent dark:from-indigo-950/20"></div>

        <img 
          src={logo} 
          alt="USCMS Logo" 
          className="h-24 w-24 mb-10 drop-shadow-xl saturate-[0.8] hover:saturate-100 transition-all duration-500" 
        />
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-50 leading-[1.1] tracking-tight">
          Modernizing <span className="text-indigo-600 dark:text-indigo-400">Campus</span> <br />
          Transparency & <span className="text-slate-500 dark:text-slate-400">Trust.</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          The official encrypted bridge for university students and administration. 
          Resolution-driven progress, backed by institutional accountability.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link 
            to="/login" 
            className="group px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/10"
          >
            Access Portal <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
          >
            New Student Enrollment
          </Link>
        </div>
      </section>

      {/* --- Feature Section --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
            <div className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-6">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Enterprise Security</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">End-to-end encryption for all filed reports, ensuring student anonymity and data integrity.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
            <div className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-6">
              <Zap size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Rapid Resolution</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Automated workflows connect your concerns directly to the relevant department heads instantly.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
            <div className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-6">
              <CheckCircle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Formal Feedback</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Closed-loop communication ensures every student receives a verified administrative response.</p>
          </div>

        </div>
      </section>

      {/* --- Performance Metrics Bar --- */}
      <section className="border-y border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">100%</div>
            <div className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-[0.2em]">Encrypted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">24/7</div>
            <div className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-[0.2em]">Live Portal</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">48hr</div>
            <div className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-[0.2em]">Response SLA</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">Zero</div>
            <div className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-[0.2em]">Identity Leaks</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;