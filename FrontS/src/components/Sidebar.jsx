import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, UserCircle, Settings, ShieldCheck } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  // Navigation Items
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Complaints', path: '/admin/manage', icon: <MessageSquare size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <UserCircle size={20} /> },
    { name: 'Authority Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center space-x-3 px-2 mb-10 text-uscms-blue">
          <ShieldCheck size={28} strokeWidth={2.5} />
          <span className="font-bold text-lg tracking-tight">Admin 123@</span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-uscms-blue text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">System Status</p>
          <div className="flex items-center mt-2 text-green-500 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
            Server Online (5000)
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation (Visible only on Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center h-16 px-2 z-50">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 flex-1 h-full ${
                isActive ? 'text-uscms-blue' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;