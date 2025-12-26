import React, { useState, useEffect } from 'react';
import API from '../api';
import StatCard from '../components/StatCard';
import Sidebar from '../components/Sidebar';
import { useNotify } from '../context/NotificationContext'; // 1. Import Notification Hook
import { LayoutDashboard, FileText, Clock, CheckCircle, Bell } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  const { addNotification } = useNotify(); // 2. Initialize Notification

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/complaints/all');
        const data = res.data;
        
        const newStats = {
          total: data.length,
          pending: data.filter(c => c.status === 'pending').length,
          resolved: data.filter(c => c.status === 'resolved').length
        };

        setStats(newStats);

        // 3. Optional: Notify admin of high pending volume
        if (newStats.pending > 5) {
          addNotification(`Attention: There are ${newStats.pending} pending tickets requiring review.`);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, [addNotification]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Admin <span className="text-blue-600">Command Center</span>
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Overview of university operations and student satisfaction.
            </p>
          </div>

          {/* Quick Action Button */}
          <button 
            onClick={() => addNotification("System sync completed successfully.")}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
          >
            <Bell size={18} className="text-blue-600" />
            Check System Logs
          </button>
        </header>

        {/* Professional Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard 
            title="Total Complaints" 
            count={stats.total} 
            icon={<FileText size={24} />}
            trend="Live Database"
            color="text-blue-600 bg-blue-50 dark:bg-blue-900/20" 
            borderColor="border-blue-200 dark:border-blue-800"
          />
          <StatCard 
            title="Pending Review" 
            count={stats.pending} 
            icon={<Clock size={24} />}
            trend="Action Required"
            color="text-amber-600 bg-amber-50 dark:bg-amber-900/20" 
            borderColor="border-amber-200 dark:border-amber-800"
          />
          <StatCard 
            title="Resolved Issues" 
            count={stats.resolved} 
            icon={<CheckCircle size={24} />}
            trend="Closed Tickets"
            color="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
            borderColor="border-emerald-200 dark:border-emerald-800"
          />
        </div>

        {/* System Activity Section */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold dark:text-white">Recent Activity</h2>
            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Updates</span>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Bell size={32} />
              </div>
              <h3 className="text-lg font-bold dark:text-white mb-2">No critical alerts</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                All systems are operational. When students submit new complaints, they will appear in the "Manage Complaints" section.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;