import React from 'react';

const StatCard = ({ title, count, color, icon, trend, borderColor }) => {
  return (
    <div className={`relative overflow-hidden bg-white dark:bg-gray-900 p-6 rounded-[2rem] border ${borderColor} shadow-sm transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color}`}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {trend}
        </span>
      </div>
      
      <div>
        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">
          {title}
        </h3>
        <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">
          {count.toLocaleString()}
        </p>
      </div>

      {/* Subtle decorative background circle */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 dark:bg-gray-800/50 rounded-full -z-0"></div>
    </div>
  );
};

export default StatCard;