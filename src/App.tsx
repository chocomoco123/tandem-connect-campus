import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProfileSettings from './pages/ProfileSettings';
import AppearanceSettings from './pages/AppearanceSettings';
import Events from './pages/Events';
import Contact from './pages/Contact';
import { Toaster } from "@/components/ui/toaster"
import ProtectedRoute from './components/ProtectedRoute';
// Import the new components
import LoginRoutes from './pages/auth/LoginRoutes';
import EventDetail from './pages/EventDetail';
import StudentCalendar from './components/student/StudentCalendar';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/auth/*" element={<LoginRoutes />} />
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
        
        {/* Dashboard and protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/calendar" element={
          <ProtectedRoute>
            <DashboardLayout>
              <StudentCalendar />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Settings routes */}
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/appearance" element={<AppearanceSettings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
