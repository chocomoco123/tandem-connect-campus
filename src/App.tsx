
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProfileSettings from './pages/ProfileSettings';
import AppearanceSettings from './pages/AppearanceSettings';
import Events from './pages/Events';
import Contact from './pages/Contact';
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
// Import the new components
import LoginRoutes from './pages/auth/LoginRoutes';
import EventDetail from './pages/EventDetail';
import StudentCalendar from './components/student/StudentCalendar';
import EventsList from './pages/student/EventsList';
import ProfilePage from './pages/student/ProfilePage';
import Registrations from './pages/student/Registrations';

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
        <Route path="/select-role" element={<Navigate to="/auth/signup" replace />} />
        
        {/* Dashboard and protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Student specific routes */}
        <Route path="/dashboard/events" element={
          <ProtectedRoute>
            <EventsList />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/registrations" element={
          <ProtectedRoute>
            <Registrations />
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
