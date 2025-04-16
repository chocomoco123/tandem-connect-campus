
import React, { useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  
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
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
          dark:bg-sidebar-background dark:border-sidebar-border
          rounded-r-xl lg:rounded-none
        `}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gradient">CSI CONNECT</div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="px-4 py-2">
          <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3 dark:bg-sidebar-accent">
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
            <Badge className="capitalize">{user?.role}</Badge>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <nav className="px-3 py-2 space-y-1">
          {navLinks.map((link) => (
            <Button 
              key={link.name}
              variant={isActive(link.href) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-gray-600 dark:text-sidebar-foreground font-medium",
                isActive(link.href) 
                  ? "bg-primary/10 text-primary dark:bg-sidebar-accent dark:text-primary" 
                  : "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-sidebar-accent dark:hover:text-white"
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
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-sidebar-border" />
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log out
          </Button>
        </nav>
      </aside>
      
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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0 dark:text-white">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/dashboard/notifications')}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/settings')}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
          <div className="py-6">
            <div className="px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
