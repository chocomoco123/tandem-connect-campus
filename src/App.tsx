
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectRole from "./pages/SelectRole";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import ProfileSettings from "./pages/ProfileSettings";
import AppearanceSettings from "./pages/AppearanceSettings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Import role-specific dashboard pages
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CommitteeDashboard from "./pages/committee/CommitteeDashboard";
import EventsPage from "./pages/student/EventsPage";
import { useAuth } from "./contexts/AuthContext";

// Create a client for React Query
const queryClient = new QueryClient();

// Role-based Route Component
const RoleBasedDashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'committee':
      return <CommitteeDashboard />;
    default:
      return <Navigate to="/select-role" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Routes>
                {/* Dashboard routes don't include the main navbar */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <RoleBasedDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Student Dashboard Routes */}
                <Route path="/dashboard/events" element={
                  <ProtectedRoute requiredRole="student">
                    <EventsPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/notifications" element={
                  <ProtectedRoute>
                    <div>Notifications Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/my-registrations" element={
                  <ProtectedRoute requiredRole="student">
                    <div>My Registrations Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/calendar" element={
                  <ProtectedRoute>
                    <div>Calendar Page</div>
                  </ProtectedRoute>
                } />
                
                {/* Teacher Dashboard Routes */}
                <Route path="/dashboard/registrations" element={
                  <ProtectedRoute requiredRole="teacher">
                    <div>Manage Registrations Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/attendance" element={
                  <ProtectedRoute requiredRole="teacher">
                    <div>Attendance Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/payments" element={
                  <ProtectedRoute requiredRole="teacher">
                    <div>Payments Page</div>
                  </ProtectedRoute>
                } />
                
                {/* Committee Dashboard Routes */}
                <Route path="/dashboard/create-event" element={
                  <ProtectedRoute requiredRole="committee">
                    <div>Create Event Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/committee" element={
                  <ProtectedRoute requiredRole="committee">
                    <div>Committee Members Page</div>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/attendance-history" element={
                  <ProtectedRoute requiredRole="committee">
                    <div>Attendance History Page</div>
                  </ProtectedRoute>
                } />
                
                {/* Common Dashboard Routes */}
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <div>Settings Page</div>
                  </ProtectedRoute>
                } />
                
                {/* Routes with the main navbar */}
                <Route 
                  path="*"
                  element={
                    <>
                      <Navbar />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="/select-role" element={<SelectRole />} />
                          <Route path="/events" element={<Events />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/settings/profile" element={<ProfileSettings />} />
                          <Route path="/settings/appearance" element={<AppearanceSettings />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
