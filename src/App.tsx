
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectRole from "./pages/SelectRole";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import ProfileSettings from "./pages/ProfileSettings";
import AppearanceSettings from "./pages/AppearanceSettings";
import NotFound from "./pages/NotFound";

// Create a client for React Query
const queryClient = new QueryClient();

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
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/dashboard/profile" element={<Dashboard />} />
                <Route path="/dashboard/events" element={<Dashboard />} />
                <Route path="/dashboard/notifications" element={<Dashboard />} />
                <Route path="/dashboard/my-registrations" element={<Dashboard />} />
                <Route path="/dashboard/calendar" element={<Dashboard />} />
                <Route path="/dashboard/registrations" element={<Dashboard />} />
                <Route path="/dashboard/attendance" element={<Dashboard />} />
                <Route path="/dashboard/payments" element={<Dashboard />} />
                <Route path="/dashboard/create-event" element={<Dashboard />} />
                <Route path="/dashboard/committee" element={<Dashboard />} />
                <Route path="/dashboard/attendance-history" element={<Dashboard />} />
                <Route path="/dashboard/settings" element={<Dashboard />} />
                
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
