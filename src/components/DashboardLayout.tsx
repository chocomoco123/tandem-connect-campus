
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bell, 
  Calendar, 
  ChevronRight, 
  Home, 
  LogOut, 
  Menu, 
  Settings, 
  User, 
  Users,
  BookOpen,
  ClipboardList,
  Award,
  AlertTriangle,
  CreditCard,
  PlusCircle,
  FileText,
  BarChart,
  History,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Redirect to login if no user
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);
  
  // Get navigation links based on user role
  const getNavLinks = (): NavLink[] => {
    const commonLinks: NavLink[] = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Events', href: '/dashboard/events', icon: Calendar },
      { name: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: '3' },
      { name: 'Profile', href: '/dashboard/profile', icon: User },
    ];
    
    if (user?.role === 'student') {
      return [
        ...commonLinks,
        { name: 'My Registrations', href: '/dashboard/my-registrations', icon: ClipboardList },
        { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
      ];
    }
    
    if (user?.role === 'teacher') {
      return [
        ...commonLinks,
        { name: 'Manage Registrations', href: '/dashboard/registrations', icon: ClipboardList, badge: '24' },
        { name: 'Attendance', href: '/dashboard/attendance', icon: Users },
        { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
      ];
    }
    
    if (user?.role === 'committee') {
      return [
        ...commonLinks,
        { name: 'Create Event', href: '/dashboard/create-event', icon: PlusCircle },
        { name: 'Committee Members', href: '/dashboard/committee', icon: Award },
        { name: 'Attendance History', href: '/dashboard/attendance-history', icon: History },
      ];
    }
    
    return commonLinks;
  };
  
  const navLinks = getNavLinks();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute top-1 left-1 w-14 h-14 rounded-full border-4 border-t-transparent border-r-blue-300 border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by the useEffect
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm 
          lg:translate-x-0 lg:static lg:z-auto
          dark:bg-sidebar-background dark:border-sidebar-border
          rounded-r-xl lg:rounded-none
        `}
        initial={false}
        animate={{ 
          x: sidebarOpen || !isMobile ? 0 : -320,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 40
          }
        }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 flex items-center justify-between"
        >
          <div className="text-xl font-bold bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            CSI CONNECT
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 py-2"
        >
          <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3 dark:bg-sidebar-accent hover:shadow-md transition-shadow duration-300">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={user?.profileUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                {user?.name ? user.name.charAt(0).toUpperCase() + (user.name.split(' ')[1]?.[0]?.toUpperCase() || '') : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-sidebar-foreground">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate dark:text-sidebar-foreground/70">{user?.email}</p>
            </div>
            <Badge className="capitalize animate-pulse">{user?.role}</Badge>
          </div>
        </motion.div>
        
        <Separator className="my-2" />
        
        <nav className="px-3 py-2 space-y-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Button 
                variant={isActive(link.href) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-gray-600 dark:text-sidebar-foreground font-medium transition-all duration-200",
                  isActive(link.href) 
                    ? "bg-primary/10 text-primary dark:bg-sidebar-accent dark:text-primary shadow-sm" 
                    : "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-sidebar-accent dark:hover:text-white hover:translate-x-1"
                )}
                onClick={() => {
                  navigate(link.href);
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
              >
                <link.icon className="h-5 w-5 mr-3" />
                <span>{link.name}</span>
                {link.badge && (
                  <Badge variant="secondary" className="ml-auto">{link.badge}</Badge>
                )}
              </Button>
            </motion.div>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-sidebar-border" />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + navLinks.length * 0.1 }}
          >
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-white hover:translate-x-1 transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log out
            </Button>
          </motion.div>
        </nav>
      </motion.aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10 dark:bg-slate-900 dark:border-b dark:border-gray-800">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0 dark:text-white"
              >
                {title}
              </motion.h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
              >
                <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/dashboard/notifications')}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/settings')}>
                  <Settings className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
          <motion.div 
            className="py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
