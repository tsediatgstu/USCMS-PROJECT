import React from 'react';
import { Bell } from 'lucide-react';
import { useNotify } from '../context/NotificationContext';

const NotificationIcon = () => {
  // If useNotify is not ready yet, we'll use empty defaults to prevent crashing
  const notifyData = useNotify() || { notifications: [], markAllRead: () => {} };
  const { notifications, markAllRead } = notifyData;
  
  const hasUnread = notifications.some(n => !n.read);

  return (
    <div 
      className="relative group cursor-pointer p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" 
      onClick={markAllRead}
    >
      <Bell 
        size={20} 
        className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 transition-colors" 
      />
      
      {hasUnread && (
        <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-gray-950 animate-pulse" />
      )}
    </div>
  );
};

export default NotificationIcon;