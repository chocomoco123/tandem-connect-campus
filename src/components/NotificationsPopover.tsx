
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell, Check, Clock, Calendar, FileText, Newspaper, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'event' | 'update' | 'announcement' | 'reminder'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Workshop Announced',
    description: 'Web Development Workshop this Friday at 3PM in Lab 4.',
    time: '2 hours ago',
    read: false,
    type: 'event'
  },
  {
    id: '2',
    title: 'Membership Renewal',
    description: 'Your CSI membership is due for renewal next week.',
    time: '1 day ago',
    read: false,
    type: 'reminder'
  },
  {
    id: '3',
    title: 'Event Registration Success',
    description: 'You have successfully registered for the Hackathon 2023.',
    time: '3 days ago',
    read: true,
    type: 'event'
  },
  {
    id: '4',
    title: 'CSI Newsletter',
    description: 'April edition of CSI newsletter is now available.',
    time: '1 week ago',
    read: true,
    type: 'announcement'
  },
  {
    id: '5',
    title: 'System Update',
    description: 'The CSI portal has been updated with new features.',
    time: '2 weeks ago',
    read: true,
    type: 'update'
  },
  {
    id: '6',
    title: 'Guest Lecture',
    description: 'Guest lecture on AI by Dr. Smith scheduled for next Monday.',
    time: '2 weeks ago',
    read: true,
    type: 'announcement'
  }
];

const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };
  
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-4 w-4 text-primary" />;
      case 'update':
        return <Newspaper className="h-4 w-4 text-green-500" />;
      case 'announcement':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'reminder':
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 border rounded-xl shadow-lg">
        <div className="flex items-center justify-between p-4 bg-muted/50">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="text-xs"
              disabled={unreadCount === 0}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <div 
                    className={`p-3 hover:bg-muted cursor-pointer transition-colors ${
                      !notification.read ? 'bg-muted/50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5 bg-background rounded-full p-1.5 border">
                        {getIconForType(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                            {notification.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </React.Fragment>
              ))
            )}
          </div>
        </ScrollArea>
        
        <div className="p-2 border-t">
          <Button variant="ghost" size="sm" className="w-full text-xs justify-center" asChild>
            <a href="#">See all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
