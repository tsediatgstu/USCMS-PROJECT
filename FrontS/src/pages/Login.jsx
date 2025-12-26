import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import { Lock, Mail, ChevronDown, ShieldCheck, Loader2, KeyRound, LogIn } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    // --- 1. ADMIN LOGIN LOGIC ---
    if (role === 'admin') {
      if (formData.email === 'tsediatgstu@gmail.com' && formData.password === '123@') {
        setStatus({ type: 'success', message: '✅ Admin Access Granted!' });
        const adminUser = { email: 'tsediatgstu@gmail.com', role: 'admin' };
        login(adminUser, 'admin-token-secure'); 
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        setStatus({ type: 'error', message: '❌ Invalid Admin Credentials.' });
        setLoading(false);
      }
      return;
    }

    // --- 2. STUDENT LOGIN LOGIC (Direct Redirect) ---
    try {
      const res = await API.post('/auth/login', { ...formData, role });
      const { user, token } = res.data;

      login(user, token);
      setStatus({ type: 'success', message: '✅ Success! Entering Student Dashboard...' });
      
      // Direct Navigation to Student Dashboard
      setTimeout(() => navigate('/student-dashboard'), 800);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "";
      setStatus({ 
        type: 'error', 
        message: errorMsg.toLowerCase().includes("not found") 
          ? '❌ User not found. Please register.' 
          : '❌ Invalid credentials.' 
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950 px-4 transition-all">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 text-center">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex p-4 bg-blue-600 text-white rounded-3xl mb-4 shadow-lg shadow-blue-500/30">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Sign In</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Access your academic portal</p>
        </div>

        {/* Status Messages */}
        {status.message && (
          <div className={`p-3 mb-6 rounded-2xl text-[11px] font-bold border transition-all ${
            status.type === 'success' 
            ? 'bg-green-50 text-green-700 border-green-100' 
            : 'bg-red-50 text-red-700 border-red-100'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Portal Toggle */}
          <div className="text-left">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 tracking-widest">Select Portal</label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-bold text-sm cursor-pointer transition-all"
              >
                <option value="student">Student Portal</option>
                <option value="admin">Admin Portal</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 tracking-widest">Email Address</label>
            <input
              type="email" name="email" required onChange={handleChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-blue-500 transition-all text-sm"
              placeholder="name@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 tracking-widest">Password</label>
            <input
              type="password" name="password" required onChange={handleChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-blue-500 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* SIDE-BY-SIDE BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all text-xs flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><LogIn size={18} /> LOGIN</>}
            </button>

            {role === 'student' && (
              <Link 
                to="/forgot-password"
                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-2xl transition-all text-[10px] flex items-center justify-center gap-1.5"
              >
                <KeyRound size={16} /> RESET?
              </Link>
            )}
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
          {role === 'student' ? (
            <p className="text-sm text-slate-500">
              New here? <Link to="/register" className="text-blue-600 font-black hover:underline underline-offset-4 decoration-2">Register Now</Link>
            </p>
          ) : (
            <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">⚠️ Unauthorized Access Restricted</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;