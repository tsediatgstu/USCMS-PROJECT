import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { User, ShieldCheck, Mail, Building, Fingerprint, Calendar } from 'lucide-react';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-12">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Security Credentials
          </h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage your administrative identity.</p>
        </header>

        <div className="max-w-3xl space-y-6">
          
          {/* Main Identity Card */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Decorative Top Banner */}
            <div className="h-24 bg-gradient-to-r from-blue-700 to-indigo-600"></div>
            
            <div className="px-8 pb-10 -mt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                {/* Profile Avatar Badge */}
                <div className="p-2 bg-white dark:bg-gray-900 rounded-[2rem] inline-block shadow-lg">
                  <div className="h-24 w-24 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-[1.8rem] flex items-center justify-center">
                    <ShieldCheck size={48} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold dark:text-white uppercase tracking-tight">{user?.username}</h2>
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">Verified Admin</span>
                  </div>
                  <p className="text-gray-500 text-sm">Auth Signature: 123@System-Master</p>
                </div>
              </div>

              {/* Data Grid */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400">
                    <Fingerprint size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Account ID</p>
                    <p className="font-mono font-bold text-gray-700 dark:text-gray-200">#AD-9920-USCMS</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400">
                    <Building size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Department</p>
                    <p className="font-bold text-gray-700 dark:text-gray-200">University Management</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Access Level</p>
                    <p className="text-blue-600 font-black italic">ROOT AUTHORITY</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Session Active</p>
                    <p className="font-bold text-gray-700 dark:text-gray-200">Current Login</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-6 rounded-3xl">
            <p className="text-amber-700 dark:text-amber-400 text-sm flex items-center gap-2 font-medium">
               This is a high-authority system account. All administrative actions are logged and audited.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;