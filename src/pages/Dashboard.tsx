
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to role-specific dashboard based on user role
  if (user.role === 'student') {
    return <Navigate to="/dashboard/student" replace />;
  } else if (user.role === 'teacher') {
    return <Navigate to="/dashboard/teacher" replace />;
  } else if (user.role === 'committee') {
    return <Navigate to="/dashboard/committee" replace />;
  }

  // If no specific role match (unlikely to happen), show a generic dashboard
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-medium mb-2">Profile</h3>
            <p className="text-gray-500 dark:text-gray-400">View and edit your profile information</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-medium mb-2">Events</h3>
            <p className="text-gray-500 dark:text-gray-400">Browse upcoming events and register</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-gray-500 dark:text-gray-400">Check your latest notifications</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-medium mb-2">Settings</h3>
            <p className="text-gray-500 dark:text-gray-400">Manage your account settings</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 p-4">
          <p className="text-gray-500 dark:text-gray-400">No recent activity to display.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
