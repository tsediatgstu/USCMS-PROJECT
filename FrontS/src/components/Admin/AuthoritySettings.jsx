import React, { useState } from 'react';
import API from '../../api';
import { ShieldAlert, User, Lock, Search, Save, RefreshCw } from 'lucide-react';

const AuthoritySettings = () => {
  const [searchId, setSearchId] = useState('');
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newDetails, setNewDetails] = useState({ name: '', password: '' });

  // 1. Find user by Student ID
  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/admin/users/${searchId}`);
      setTargetUser(data);
      setNewDetails({ name: data.name, password: '' });
    } catch (err) {
      alert("Student ID not found in database.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Update Name or Password
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/users/update/${targetUser._id}`, newDetails);
      alert("Profile updated successfully by Authority.");
      setTargetUser(null);
      setSearchId('');
    } catch (err) {
      alert("Failed to update user details.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-2xl">
          <ShieldAlert size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Authority Settings</h2>
          <p className="text-sm text-gray-500">Administrative Override for Student Profiles</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 mb-6">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-3 ml-1">Search Student ID</label>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Enter ID (e.g. 2025-4821)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:scale-105 transition-transform"
          >
            Find Profile
          </button>
        </div>
      </div>

      {/* Edit Form (Only shows if user is found) */}
      {targetUser && (
        <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-2xl border-2 border-blue-500/20 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Update Full Name</label>
              <div className="relative mt-2">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  className="w-full pl-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-blue-600"
                  value={newDetails.name}
                  onChange={(e) => setNewDetails({...newDetails, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Force Reset Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password"
                  placeholder="Enter new password"
                  className="w-full pl-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-blue-600"
                  onChange={(e) => setNewDetails({...newDetails, password: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
              <Save size={18} /> Save Authority Changes
            </button>
            <button 
              type="button" 
              onClick={() => setTargetUser(null)}
              className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded-2xl"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthoritySettings;