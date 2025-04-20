
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'teacher' | 'committee';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user } = useAuth();
  
  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If a specific role is required and user doesn't have it, redirect to their appropriate dashboard
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to the appropriate dashboard based on the user's actual role
    return <Navigate to="/dashboard" replace />;
  }
  
  // If everything is fine, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
