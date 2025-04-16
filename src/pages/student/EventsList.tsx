
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';

// Sample event data (in a real app, this would come from an API)
const upcomingEvents = [
  {
    id: '1',
    name: 'Web Development Workshop',
    date: '2025-04-20',
    time: '10:00 AM - 1:00 PM',
    location: 'Seminar Hall 1',
    description: 'Learn the latest web development technologies including React, Node.js and MongoDB.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=event1',
  },
  {
    id: '2',
    name: 'AI & Machine Learning Seminar',
    date: '2025-04-25',
    time: '2:00 PM - 5:00 PM',
    location: 'Main Auditorium',
    description: 'Introduction to artificial intelligence and machine learning concepts with hands-on examples.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=event2',
  },
  {
    id: '3',
    name: 'Cybersecurity Hackathon',
    date: '2025-05-03',
    time: '9:00 AM - 6:00 PM',
    location: 'Computer Lab 3',
    description: 'Compete in teams to solve cybersecurity challenges and win exciting prizes.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=event3',
  },
];

interface FormData {
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  eventName: string;
  additionalNotes?: string;
}

const EventsList = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { user } = useAuth();

  const form = useForm<FormData>({
    defaultValues: {
      fullName: user?.name || '',
      rollNumber: user?.rollNumber || '',
      email: user?.email || '',
      phone: user?.phone || '',
      department: user?.branch || '',
      year: user?.year?.split(' ')[0] || '',
      eventName: '',
      additionalNotes: '',
    }
  });

  const handleRegister = (event: any) => {
    setSelectedEvent(event);
    form.setValue('eventName', event.name);
    setOpen(true);
  };

  const onSubmit = (data: FormData) => {
    console.log('Registration data:', data);
    
    // Here you would typically send this data to your backend
    // For demo purposes, we'll just close the dialog and show a toast
    setOpen(false);
    
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering! See you at the event.",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-xs">{event.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-xs">{event.time}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-xs">{event.location}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleRegister(event)}
                >
                  Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Registration Form Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register for {selectedEvent?.name}</DialogTitle>
              <DialogDescription>
                Fill out the form below to register for this event.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rollNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email ID</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FE">First Year (FE)</SelectItem>
                            <SelectItem value="SE">Second Year (SE)</SelectItem>
                            <SelectItem value="TE">Third Year (TE)</SelectItem>
                            <SelectItem value="BE">Final Year (BE)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Registration
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EventsList;
