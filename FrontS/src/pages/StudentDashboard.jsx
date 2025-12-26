import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNotify } from '../context/NotificationContext';
import API from '../api';
import ComplaintCard from '../components/ComplaintCard';
import { 
  History, Send, Loader2, PenLine, Paperclip, FileCheck, X 
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const { addNotification } = useNotify(); 
  const fileInputRef = useRef(null);
  
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ subject: '', message: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Load history on mount
  useEffect(() => {
    const fetchMy = async () => {
      try {
        const res = await API.get(`/complaints/student/${user.studentId}`);
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };
    if (user?.studentId) fetchMy();
  }, [user?.studentId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  // CLEANED & CORRECTED POST FUNCTION
  const postTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    const formData = new FormData();
    formData.append('subject', form.subject);
    formData.append('message', form.message);
    formData.append('studentId', user.studentId);
    if (file) formData.append('attachment', file);

    try {
      // POINTING TO /send TO MATCH BACKEND ROUTES
      const res = await API.post('/complaints/send', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Update UI
      setTickets([res.data, ...tickets]);
      setStatus({ type: 'success', msg: 'Complaint sent successfully.' });
      addNotification(`Success: Complaint filed.`);
      
      // Reset
      setForm({ subject: '', message: '' });
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Complaint was not sent successfully.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-light text-slate-900 dark:text-slate-100 tracking-tight">
            Support <span className="text-slate-400 dark:text-zinc-500 font-extralight">Interface</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-normal tracking-wide">
            Logged in as {user?.username || 'Verified User'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: SUBMISSION FORM */}
          <section className="lg:col-span-5">
            <div className="bg-white dark:bg-[#030712] p-8 rounded-3xl border border-slate-100 dark:border-zinc-900 shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-8">
                <PenLine size={18} className="text-slate-400" strokeWidth={1.5} />
                <h2 className="text-md font-medium text-slate-700 dark:text-slate-300">New Complaint</h2>
              </div>

              {status.msg && (
                <div className={`mb-6 p-4 rounded-xl text-xs font-normal border transition-all animate-in fade-in slide-in-from-top-2 ${
                  status.type === 'success' 
                  ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/30' 
                  : 'bg-rose-50/50 text-rose-600 border-rose-100 dark:bg-rose-950/10 dark:border-rose-900/30'
                }`}>
                  {status.msg}
                </div>
              )}

              <form onSubmit={postTicket} className="space-y-6">
                <input 
                  type="text"
                  placeholder="Subject line" 
                  className="w-full px-0 py-3 border-b border-slate-100 dark:border-zinc-800 bg-transparent dark:text-white focus:border-slate-400 dark:focus:border-zinc-600 outline-none transition-all text-sm font-normal" 
                  value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})} 
                  required 
                />

                <textarea 
                  placeholder="Describe your issue..." 
                  className="w-full px-0 py-3 border-b border-slate-100 dark:border-zinc-800 bg-transparent dark:text-white focus:border-slate-400 dark:focus:border-zinc-600 outline-none transition-all h-32 resize-none text-sm font-normal leading-relaxed" 
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})} 
                  required 
                />

                <div className="flex items-center gap-4">
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                  >
                    <Paperclip size={14} strokeWidth={1.5} />
                    {file ? 'Change File' : 'Attach Document'}
                  </button>
                  {file && (
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-slate-100 dark:border-zinc-800">
                      <FileCheck size={12} className="text-emerald-500" />
                      <span className="text-[10px] text-slate-600 dark:text-zinc-400 truncate max-w-[100px]">{file.name}</span>
                      <X size={12} className="cursor-pointer text-slate-400" onClick={() => setFile(null)} />
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all text-xs tracking-widest uppercase disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <><Send size={14} strokeWidth={1.5} /> Submit Complaint</>}
                </button>
              </form>
            </div>
          </section>

          {/* RIGHT: HISTORY LIST */}
          <section className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-8">
              <History size={18} className="text-slate-400" strokeWidth={1.5} />
              <h2 className="text-md font-medium text-slate-700 dark:text-slate-300">History</h2>
            </div>
            <div className="space-y-4">
              {tickets.length === 0 ? (
                <div className="text-center py-20 rounded-3xl border border-dashed border-slate-100 dark:border-zinc-900">
                  <p className="text-slate-400 text-xs font-light tracking-wide">No submissions found.</p>
                </div>
              ) : (
                tickets.map(t => <ComplaintCard key={t._id} complaint={t} />)
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;