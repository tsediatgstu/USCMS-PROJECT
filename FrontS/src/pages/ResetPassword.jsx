import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await API.post('/auth/reset-password', { 
        token: location.state?.token, 
        newPassword: pass 
      });
      alert("Password updated successfully!"); 
      navigate('/login');
    } catch (err) { 
      alert("Session expired. Please request a new code."); 
      navigate('/forgot-password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      {/* Background radial glow for a high-end look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-80 h-80 bg-emerald-100 dark:bg-emerald-900/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-800">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Set New Password</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Almost there! Choose a strong password to protect your account.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          {/* New Password Field */}
          <div className="relative">
            <label htmlFor="new-password" className="sr-only">New Password</label>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              id="new-password"
              type={showPass ? "text" : "password"} 
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
              placeholder="New Password" 
              title="Enter your new password"
              required 
              value={pass}
              onChange={e => setPass(e.target.value)} 
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              id="confirm-password"
              type={showPass ? "text" : "password"} 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
              placeholder="Confirm New Password" 
              title="Repeat your new password"
              required 
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)} 
            />
          </div>

          {/* Password Match Indicator */}
          {confirmPass && (
            <div className="flex items-center gap-2 px-1">
              {pass === confirmPass ? (
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-bold">
                  <CheckCircle2 size={14} /> Passwords match
                </span>
              ) : (
                <span className="text-xs text-rose-500 flex items-center gap-1 font-bold">
                  <AlertCircle size={14} /> Passwords do not match
                </span>
              )}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading || !pass || pass !== confirmPass}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Update Securely"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;