import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Step 1: Request OTP from Server
    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post('/auth/forgot-password', { email });
            alert(res.data.message);
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.message || "User not found");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP and update Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post('/auth/reset-password', { email, otp, newPassword });
            alert("Password updated! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-4 transition-all">
            <div className="glass-effect w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden p-10">
                
                {/* Back Button */}
                <button onClick={() => step === 2 ? setStep(1) : navigate('/login')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors text-sm font-bold uppercase tracking-wider">
                    <ArrowLeft size={16} /> {step === 2 ? "Back" : "Back to Login"}
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-blue-600 text-white rounded-3xl mb-4 shadow-lg shadow-blue-500/30">
                        {step === 1 ? <Mail size={32} /> : <KeyRound size={32} />}
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                        {step === 1 ? "Forgot Password?" : "Reset Password"}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        {step === 1 
                          ? "Enter your student Gmail to receive an OTP code." 
                          : "Enter the code sent to your email and a new password."}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleRequestOTP} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Student Gmail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-600 transition-all"
                                    placeholder="name@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                            {loading ? <Loader2 className="animate-spin" /> : <>Send OTP Code <ArrowRight size={20} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">6-Digit OTP</label>
                            <input 
                                type="text" 
                                required 
                                maxLength="6"
                                className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-600 text-center tracking-[1em] font-bold"
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="password" 
                                    required 
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white outline-none focus:border-blue-600 transition-all"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all">
                            {loading ? <Loader2 className="animate-spin" /> : <>Reset Password <CheckCircle2 size={20} /></>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;