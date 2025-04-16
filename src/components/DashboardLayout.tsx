
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Profile', href: '/dashboard/profile', icon: User },
      { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];
    
    if (user?.role === 'student') {
      return [
        ...commonLinks,
        { name: 'My Events', href: '/dashboard/my-events', icon: BookOpen },
      ];
    }
    
    if (user?.role === 'teacher') {
      return [
        ...commonLinks,
        { name: 'Registrations', href: '/dashboard/registrations', icon: ClipboardList },
        { name: 'Attendance', href: '/dashboard/attendance', icon: Users },
      ];
    }
    
    if (user?.role === 'committee') {
      return [
        ...commonLinks,
        { name: 'Manage Events', href: '/dashboard/manage-events', icon: BookOpen },
        { name: 'Registrations', href: '/dashboard/registrations', icon: ClipboardList },
        { name: 'Committee Members', href: '/dashboard/committee', icon: Award },
        { name: 'Attendance', href: '/dashboard/attendance', icon: Users },
      ];
    }
    
    return commonLinks;
  };
  
  const navLinks = getNavLinks();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gradient">TANDEM</div>
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
          <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user?.profileUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <Badge className="capitalize">{user?.role}</Badge>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <nav className="px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <Button 
              key={link.name}
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => {
                navigate(link.href);
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.name}
            </Button>
          ))}
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log out
          </Button>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10">
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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">Dashboard</h1>
            </div>
            
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50">
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
