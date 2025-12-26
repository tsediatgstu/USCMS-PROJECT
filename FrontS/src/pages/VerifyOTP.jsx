import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api';
import { ShieldCheck, RefreshCcw, AlertCircle, Loader2 } from 'lucide-react';




// Simplified logic for ForgotPassword UI
const handleVerifyOTP = async () => {
  try {
    await API.post('/auth/reset-password', { 
      email, 
      otp: otpInput, 
      newPassword: newPasswordInput 
    });
    alert("Password Reset Success!");
    navigate('/login');
  } catch (err) {
    alert("Invalid OTP");
  }
};
const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Handle countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input automatically
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpCode = otp.join("");

    try {
      const { data } = await API.post('/auth/verify-otp', { 
        email: location.state?.email, 
        otp: otpCode 
      });
      navigate('/reset-password', { state: { token: data.tempToken } });
    } catch (err) {
      setAttempts(prev => prev + 1);
      if (attempts >= 4) alert("ACCOUNT LOCKED: Maximum attempts reached.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-800 text-center">
        
        <div className="mb-8">
          <div className="inline-flex p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Verify Identity</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
            A 6-digit code has been sent to <br />
            <span className="font-bold text-gray-700 dark:text-gray-200">{location.state?.email || "your email"}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          {/* Attempt Counter Badge */}
          <div className="flex justify-center">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${attempts > 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
              <AlertCircle size={12} /> Attempt {attempts}/5
            </span>
          </div>

          {/* Split OTP Inputs */}
          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-2xl font-black bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none dark:text-white transition-all"
              />
            ))}
          </div>

          <button 
            type="submit"
            disabled={loading || otp.includes("") || attempts >= 5}
            className="w-full bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify & Proceed"}
          </button>
        </form>

        {/* Resend Logic */}
        <div className="mt-10 pt-6 border-t border-gray-50 dark:border-gray-800">
          <p className="text-sm text-gray-500">
            Didn't receive the code?
          </p>
          <button 
            disabled={timer > 0}
            className="mt-2 flex items-center justify-center gap-2 mx-auto text-blue-600 font-bold hover:text-blue-700 disabled:text-gray-400 transition-colors"
          >
            <RefreshCcw size={16} className={timer > 0 ? "" : "animate-spin-slow"} />
            {timer > 0 ? `Resend in ${timer}s` : "Resend New Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;