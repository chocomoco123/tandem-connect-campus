
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StudentNav from './student/StudentNav';
import { useMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Choose the appropriate navigation based on user role
  const renderNavigation = () => {
    switch (user.role) {
      case 'student':
        return <StudentNav />;
      case 'teacher':
        // Future enhancement: add TeacherNav component
        return <StudentNav />;
      case 'committee':
        // Future enhancement: add CommitteeNav component
        return <StudentNav />;
      default:
        return <StudentNav />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-background">
        <div className="flex flex-col flex-1 h-full">
          {/* Sidebar Header */}
          <div className="px-4 py-6 border-b">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 font-semibold text-xl text-gray-900 dark:text-gray-100">
                <span className="text-primary font-bold">CSI</span>
                <span>CONNECT</span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center pt-6 pb-4">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={user.profileUrl} />
              <AvatarFallback>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="font-medium">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-3 py-4 flex-1 overflow-y-auto">
            {renderNavigation()}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t text-xs text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} CSI Connect
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-background border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 font-semibold text-xl text-gray-900 dark:text-gray-100">
          <span className="text-primary font-bold">CSI</span>
          <span>CONNECT</span>
        </div>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col h-full">
              <div className="flex flex-col items-center pt-6 pb-4">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={user.profileUrl} />
                  <AvatarFallback>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="font-medium">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {renderNavigation()}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1">
        <div className="pt-2 lg:pt-0">
          {/* Page Content */}
          <main className="pb-20 lg:pb-10">
            {children}
          </main>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && <StudentNav isMobile />}
      </div>
    </div>
  );
};

export default DashboardLayout;
