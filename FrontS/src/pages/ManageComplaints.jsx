import React, { useState, useEffect } from 'react';
import API from '../api';
import Sidebar from '../components/Sidebar';
import { CheckCircle, Clock, Filter, Search, MoreVertical } from 'lucide-react';

const ManageComplaints = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get('/complaints/all');
      setList(res.data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    } finally {
      setLoading(false);
    }
  };

  const resolve = async (id) => {
    try {
      await API.patch(`/complaints/status/${id}`, { status: 'resolved' });
      // Professional way: Update state locally instead of reloading the page
      setList(list.map(item => item._id === id ? { ...item, status: 'resolved' } : item));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Complaint Records</h2>
            <p className="text-gray-500 dark:text-gray-400">Review and resolve active student tickets.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search ticket ID..." 
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button className="p-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-gray-500">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Complaints Table/List */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5 font-bold">Complaint Info</th>
                <th className="px-6 py-5 font-bold">Student ID</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {list.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-20 text-gray-400">No complaints found in the registry.</td>
                </tr>
              ) : (
                list.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-gray-900 dark:text-white">{c.subject}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{c.description || "No additional details provided."}</p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                        {c.studentId}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      {c.status === 'pending' ? (
                        <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full text-xs font-bold w-fit">
                          <Clock size={14} /> Pending
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-xs font-bold w-fit">
                          <CheckCircle size={14} /> Resolved
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-6 text-right">
                      {c.status === 'pending' ? (
                        <button 
                          onClick={() => resolve(c._id)} 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <button className="text-gray-400 pointer-events-none">
                          <MoreVertical size={20} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageComplaints;