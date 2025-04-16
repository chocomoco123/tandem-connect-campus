
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  FileText, 
  User, 
  Settings, 
  Bell, 
  BookOpen, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const StudentNav = ({ isMobile = false }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  // Sample notifications
  const notifications = [
    {
      id: '1',
      title: 'Web Development Workshop',
      message: 'Reminder: The workshop starts tomorrow at 10 AM',
      date: '15 min ago',
    },
    {
      id: '2',
      title: 'Registration Confirmed',
      message: 'Your registration for AI & ML Seminar has been confirmed',
      date: '1 hour ago',
    },
    {
      id: '3',
      title: 'New Event Added',
      message: 'A new event "Cybersecurity Hackathon" has been added',
      date: 'Yesterday',
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: Home,
      title: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: BookOpen,
      title: 'Events',
      path: '/dashboard/events',
    },
    {
      icon: FileText,
      title: 'My Registrations',
      path: '/dashboard/registrations',
    },
    {
      icon: Calendar,
      title: 'Calendar',
      path: '/dashboard/calendar',
    },
    {
      icon: User,
      title: 'Profile',
      path: '/dashboard/profile',
    },
    {
      icon: Settings,
      title: 'Settings',
      path: '/settings/profile',
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const NavLink = ({ item, className = '' }) => (
    <Link
      to={item.path}
      className={`
        flex items-center space-x-3 rounded-lg px-3 py-2 transition-all
        ${isActive(item.path) 
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
        ${className}
      `}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.title}</span>
    </Link>
  );

  // Mobile Navigation
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10 px-2 py-2 flex justify-around items-center">
        {navItems.slice(0, 5).map((item) => (
          <TooltipProvider key={item.path}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={`
                    p-2 rounded-full flex items-center justify-center
                    ${isActive(item.path) 
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'}
                  `}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-2"
                onClick={() => setNotificationsOpen(true)}
              >
                <Bell className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
  
  // Desktop Navigation
  return (
    <>
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
        <Button
          variant="ghost"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground justify-start"
          onClick={() => setNotificationsOpen(true)}
        >
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </nav>
      
      {/* Notifications Dialog */}
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              Stay updated with the latest events and announcements
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-1 -mr-1">
            {notifications.map((notification) => (
              <div key={notification.id} className="mb-4 border-b pb-3">
                <h4 className="text-sm font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentNav;
