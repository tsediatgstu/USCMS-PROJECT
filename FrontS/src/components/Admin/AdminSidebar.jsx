// src/pages/AdminDashboard.jsx
import AdminSidebar from '../components/Admin/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar /> {/* This stays on the left */}
      
      <main className="flex-1 p-8">
        {/* Your dashboard content goes here */}
        <h1 className="text-2xl font-bold">Overview</h1>
      </main>
    </div>
  );
};