
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, X, Calendar as CalendarIcon, Clock, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  description?: string;
  category: 'task' | 'event' | 'reminder';
  completed?: boolean;
}

const StudentCalendar = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Web Development Workshop',
      date: new Date(2025, 4, 15), // May 15, 2025
      startTime: '10:00',
      endTime: '16:00',
      description: 'Learn the fundamentals of modern web development with React and Node.js.',
      category: 'event',
    },
    {
      id: '2',
      title: 'Submit Project Proposal',
      date: new Date(2025, 3, 20), // April 20, 2025
      description: 'Final deadline for the semester project proposal',
      category: 'task',
      completed: false,
    },
    {
      id: '3',
      title: 'Study for Midterm',
      date: new Date(2025, 4, 5), // May 5, 2025
      description: 'Review all lecture notes and practice problems',
      category: 'task',
      completed: false,
    },
  ]);
  
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    date: new Date(),
    category: 'task',
  });
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  
  const selectedDateEvents = events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );
  
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been removed from your calendar.",
    });
  };
  
  const handleToggleComplete = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };
  
  const handleAddEvent = () => {
    if (!newEvent.title) {
      toast({
        title: "Error",
        description: "Please provide a title for the event.",
        variant: "destructive",
      });
      return;
    }
    
    const eventToAdd: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title || '',
      date: newEvent.date || new Date(),
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      description: newEvent.description,
      category: newEvent.category as 'task' | 'event' | 'reminder',
      completed: false,
    };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({
      date: new Date(),
      category: 'task',
    });
    setIsAddEventOpen(false);
    
    toast({
      title: "Event Added",
      description: "The event has been added to your calendar.",
    });
  };
  
  const handleEditEvent = () => {
    if (!editingEvent || !editingEvent.title) {
      toast({
        title: "Error",
        description: "Please provide a title for the event.",
        variant: "destructive",
      });
      return;
    }
    
    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    
    setIsEditEventOpen(false);
    setEditingEvent(null);
    
    toast({
      title: "Event Updated",
      description: "The event has been updated in your calendar.",
    });
  };
  
  const openEditDialog = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsEditEventOpen(true);
  };
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'task':
        return <Badge className="bg-blue-100 text-blue-800">Task</Badge>;
      case 'event':
        return <Badge className="bg-purple-100 text-purple-800">Event</Badge>;
      case 'reminder':
        return <Badge className="bg-amber-100 text-amber-800">Reminder</Badge>;
      default:
        return <Badge>Other</Badge>;
    }
  };

  // Function to highlight dates with events
  const hasEventOnDate = (date: Date) => {
    return events.some((event) => event.date.toDateString() === date.toDateString());
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Calendar</CardTitle>
          <CardDescription>Manage your events, tasks, and reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                className="rounded-md border"
                modifiers={{
                  hasEvent: (date) => hasEventOnDate(date),
                }}
                modifiersStyles={{
                  hasEvent: { fontWeight: 'bold', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                }}
              />
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                      <DialogDescription>
                        Add a new event, task, or reminder to your calendar.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input 
                          id="title" 
                          value={newEvent.title || ''} 
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          placeholder="Event title"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            value={newEvent.category} 
                            onValueChange={(value) => setNewEvent({...newEvent, category: value as 'task' | 'event' | 'reminder'})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="task">Task</SelectItem>
                              <SelectItem value="event">Event</SelectItem>
                              <SelectItem value="reminder">Reminder</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input 
                            id="date" 
                            type="date" 
                            value={newEvent.date ? format(newEvent.date, 'yyyy-MM-dd') : ''} 
                            onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                          />
                        </div>
                      </div>
                      
                      {newEvent.category === 'event' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input 
                              id="startTime" 
                              type="time" 
                              value={newEvent.startTime || ''} 
                              onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="endTime">End Time</Label>
                            <Input 
                              id="endTime" 
                              type="time" 
                              value={newEvent.endTime || ''} 
                              onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea 
                          id="description" 
                          value={newEvent.description || ''} 
                          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                          placeholder="Add additional details"
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button onClick={handleAddEvent}>Add to Calendar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-base mb-4">
                {format(date, 'MMMM d, yyyy')}
                {hasEventOnDate(date) && <span className="ml-2 text-sm text-blue-600">({selectedDateEvents.length} items)</span>}
              </h3>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className={`h-1 ${event.category === 'task' ? 'bg-blue-500' : event.category === 'event' ? 'bg-purple-500' : 'bg-amber-500'}`}></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-2">
                            {event.category === 'task' && (
                              <div className="pt-1">
                                <input 
                                  type="checkbox"
                                  checked={event.completed}
                                  onChange={() => handleToggleComplete(event.id)}
                                  className="rounded text-blue-600"
                                />
                              </div>
                            )}
                            <div>
                              <h4 className={`font-medium ${event.completed ? 'line-through text-gray-400' : ''}`}>
                                {event.title}
                              </h4>
                              {(event.startTime || event.description) && (
                                <div className="mt-1 space-y-1">
                                  {event.startTime && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>
                                        {event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}
                                      </span>
                                    </div>
                                  )}
                                  {event.description && (
                                    <p className="text-xs text-gray-500">{event.description}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getCategoryBadge(event.category)}
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 rounded-full hover:bg-gray-100"
                                onClick={() => openEditDialog(event)}
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 rounded-full hover:bg-gray-100"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto text-gray-300" />
                  <p className="mt-2">No events scheduled for this day</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setNewEvent({...newEvent, date});
                      setIsAddEventOpen(true);
                    }}
                    className="mt-2"
                  >
                    Add an event
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Event Dialog */}
      <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to your calendar item.
            </DialogDescription>
          </DialogHeader>
          
          {editingEvent && (
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingEvent.title} 
                  onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  placeholder="Event title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editingEvent.category} 
                    onValueChange={(value) => setEditingEvent({...editingEvent, category: value as 'task' | 'event' | 'reminder'})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-date">Date</Label>
                  <Input 
                    id="edit-date" 
                    type="date" 
                    value={format(editingEvent.date, 'yyyy-MM-dd')} 
                    onChange={(e) => setEditingEvent({...editingEvent, date: new Date(e.target.value)})}
                  />
                </div>
              </div>
              
              {editingEvent.category === 'event' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-startTime">Start Time</Label>
                    <Input 
                      id="edit-startTime" 
                      type="time" 
                      value={editingEvent.startTime || ''} 
                      onChange={(e) => setEditingEvent({...editingEvent, startTime: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-endTime">End Time</Label>
                    <Input 
                      id="edit-endTime" 
                      type="time" 
                      value={editingEvent.endTime || ''} 
                      onChange={(e) => setEditingEvent({...editingEvent, endTime: e.target.value})}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea 
                  id="edit-description" 
                  value={editingEvent.description || ''} 
                  onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                  placeholder="Add additional details"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={handleEditEvent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentCalendar;
