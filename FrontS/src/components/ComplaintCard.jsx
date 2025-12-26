import React from 'react';
import { Clock, CheckCircle2, MessageSquare, Calendar, Paperclip, ArrowUpRight } from 'lucide-react';

const ComplaintCard = ({ complaint }) => {
  const isResolved = complaint.status === 'resolved';

  // Function to safely view the attached file
  const handleViewFile = (e) => {
    e.stopPropagation();
    if (complaint.attachment) {
      // Correcting path for URL compatibility
      const path = complaint.attachment.replace(/\\/g, '/');
      const fileUrl = `http://localhost:5000/${path}`;
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className="group bg-white dark:bg-[#030712] p-6 rounded-3xl border border-slate-100 dark:border-zinc-900 transition-all duration-300 hover:border-slate-200 dark:hover:border-zinc-800">
      <div className="flex justify-between items-start mb-5">
        {/* Status Badge - Minimalist & Non-Bold */}
        <div className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.15em] flex items-center gap-2 border ${
          isResolved 
          ? 'bg-emerald-50/50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/10 dark:border-emerald-900/30' 
          : 'bg-amber-50/50 border-amber-100 text-amber-600 dark:bg-amber-950/10 dark:border-amber-900/30'
        }`}>
          {isResolved ? <CheckCircle2 size={12} strokeWidth={1.5} /> : <Clock size={12} strokeWidth={1.5} />}
          {complaint.status}
        </div>

        {/* Date - Light weight */}
        <span className="text-[11px] font-normal text-slate-400 flex items-center gap-1.5">
          <Calendar size={12} strokeWidth={1.5} />
          {new Date(complaint.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
        </span>
      </div>

      {/* Subject - Medium weight instead of Bold */}
      <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
        {complaint.subject}
      </h3>
      
      {/* Message - Light weight */}
      <p className="text-slate-500 dark:text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
        {complaint.message || complaint.description}
      </p>

      {/* Footer Area */}
      <div className="pt-4 border-t border-slate-50 dark:border-zinc-900/50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Reference Number */}
          <div className="flex items-center gap-2 text-slate-300 dark:text-zinc-700">
            <MessageSquare size={14} strokeWidth={1.5} />
            <span className="text-[10px] font-medium uppercase tracking-widest">#{complaint._id.slice(-6)}</span>
          </div>

          {/* Attachment Link - Only shows if file exists */}
          {complaint.attachment && (
            <button 
              onClick={handleViewFile}
              className="flex items-center gap-1.5 text-indigo-500 dark:text-indigo-400/80 hover:text-indigo-600 transition-colors"
            >
              <Paperclip size={13} strokeWidth={1.5} />
              <span className="text-[10px] font-normal uppercase tracking-wide border-b border-indigo-200 dark:border-indigo-900/50">View File</span>
            </button>
          )}
        </div>
        
        <button className="text-[10px] font-medium text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all uppercase tracking-widest flex items-center gap-1 group/btn">
          View Thread
          <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;