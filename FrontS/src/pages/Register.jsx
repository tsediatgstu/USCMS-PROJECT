import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserPlus, Hash, User, GraduationCap, Lock, 
  ArrowRight, Loader2, Eye, EyeOff, Mail 
} from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({ 
    studentId: '', 
    username: '', // Full Name
    email: '',    // Gmail
    department: '', 
    password: '' 
  });
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const departments = [
    "Software Engineering", "Computer Science", "Information Technology",
    "Civil Engineering", "Mechanical Engineering", "Electrical Engineering",
    "Medicine & Surgery", "Nursing", "Pharmacy", "Public Health",
    "Business Administration", "Accounting & Finance", "Economics", 
    "Law", "Architecture"
  ];

  const handleIdChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setForm({ ...form, studentId: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.department) return alert("Please select a department");
    
    setLoading(true);
    try {
      const response = await API.post('/auth/register', form);
      alert(response.data.message); 
      navigate('/login');
    } catch (err) { 
      const msg = err.response?.data?.message || "Registration failed";
      alert(msg); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-4 transition-all">
      {/* 1. Integrated the Glass Effect & Animation Wrapper */}
      <div className="glass-effect animate-float w-full max-w-xl bg-white/80 dark:bg-gray-900/80 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-10 pb-6 text-center">
          <div className="inline-flex p-4 bg-blue-600 text-white rounded-3xl mb-6 shadow-lg shadow-blue-500/30" role="img" aria-label="Registration Icon">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Student Registration</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Create your account to access the university portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="px-10 pb-6 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student ID */}
            <div className="space-y-1">
              <label htmlFor="studentId" className="text-[10px] font-black uppercase text-gray-400 ml-1">Student ID (Numbers)</label>
              <div className="relative group">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600" size={16} />
                <input 
                  id="studentId"
                  name="studentId"
                  type="text" 
                  required 
                  placeholder="Enter Student ID"
                  title="Student ID"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-600 transition-all text-sm"
                  value={form.studentId} 
                  onChange={handleIdChange} 
                />
              </div>
            </div>

            {/* Email (Gmail) */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-[10px] font-black uppercase text-gray-400 ml-1">Email (Gmail)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600" size={16} />
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  required 
                  placeholder="name@gmail.com"
                  title="Gmail Address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-600 transition-all text-sm"
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})} 
                />
              </div>
            </div>
          </div>

          {/* Full Name (username) */}
          <div className="space-y-1">
            <label htmlFor="username" className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600" size={16} />
              <input 
                id="username"
                name="username"
                type="text" 
                required 
                placeholder="Enter Full Name"
                title="Full Name"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-600 transition-all text-sm"
                value={form.username} 
                onChange={e => setForm({...form, username: e.target.value})} 
              />
            </div>
          </div>

          {/* Department */}
          <div className="space-y-1">
            <label htmlFor="department" className="text-[10px] font-black uppercase text-gray-400 ml-1">Academic Department</label>
            <div className="relative group">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select 
                id="department"
                name="department"
                required
                title="Select Department"
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none appearance-none cursor-pointer text-sm"
                value={form.department} 
                onChange={e => setForm({...form, department: e.target.value})}
              >
                <option value="" disabled>Select Department</option>
                {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-[10px] font-black uppercase text-gray-400 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600" size={16} />
              <input 
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••" 
                title="Password"
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-600 transition-all text-sm" 
                value={form.password} 
                onChange={e => setForm({...form, password: e.target.value})} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Complete Registration <ArrowRight size={20} /></>}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800/30 p-8 text-center border-t border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 text-sm">
            Already have an account? {' '}
            <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4 decoration-2">
              Sign In Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;