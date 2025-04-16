
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Tag, Users, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  
  // Mock event data - in a real app, you'd fetch this from an API
  const events = [
    {
      id: 'web-dev-workshop',
      title: 'Web Development Workshop',
      date: 'May 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      category: 'Workshop',
      description: 'Learn the fundamentals of modern web development with React and Node.js. This hands-on workshop will cover everything from setup to deployment.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      registration: true,
      fee: '₹299',
      capacity: 50,
      remaining: 12,
      agenda: [
        { time: '10:00 AM - 10:30 AM', title: 'Introduction to Web Development' },
        { time: '10:30 AM - 12:00 PM', title: 'HTML & CSS Fundamentals' },
        { time: '12:00 PM - 1:00 PM', title: 'Lunch Break' },
        { time: '1:00 PM - 2:30 PM', title: 'JavaScript Essentials' },
        { time: '2:30 PM - 3:30 PM', title: 'Building with React' },
        { time: '3:30 PM - 4:00 PM', title: 'Q&A and Wrap-up' },
      ],
      speakers: [
        { name: 'Dr. Jane Smith', role: 'Senior Developer at Tech Inc.', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
        { name: 'Prof. Mike Johnson', role: 'Web Development Instructor', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
      ]
    },
    {
      id: 'hackathon',
      title: '48-Hour Hackathon',
      date: 'June 5-7, 2025',
      time: 'Starts 9:00 AM Friday',
      location: 'Computer Science Building',
      category: 'Competition',
      description: 'Join us for a weekend of coding, innovation, and prizes at our annual hackathon. Form teams and build amazing projects.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80',
      registration: true,
      fee: '₹499',
      capacity: 100,
      remaining: 36,
      agenda: [
        { time: 'Day 1, 9:00 AM', title: 'Opening Ceremony and Team Formation' },
        { time: 'Day 1, 10:00 AM', title: 'Hackathon Begins' },
        { time: 'Day 2, All Day', title: 'Continued Development' },
        { time: 'Day 3, 9:00 AM', title: 'Submission Deadline' },
        { time: 'Day 3, 10:00 AM - 12:00 PM', title: 'Judging' },
        { time: 'Day 3, 2:00 PM', title: 'Awards Ceremony' },
      ],
      speakers: [
        { name: 'Alex Turner', role: 'CTO, Innovate Labs', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { name: 'Sarah Williams', role: 'Tech Lead, CodeCraft', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
      ]
    },
    {
      id: 'ai-education',
      title: 'AI in Education Seminar',
      date: 'July 12, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Conference Hall',
      category: 'Seminar',
      description: 'Explore how artificial intelligence is transforming education and learning. Industry experts share insights and case studies.',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      registration: true,
      fee: 'Free',
      capacity: 150,
      remaining: 83,
      agenda: [
        { time: '2:00 PM - 2:30 PM', title: 'Introduction to AI in Education' },
        { time: '2:30 PM - 3:15 PM', title: 'Case Studies: AI in Classrooms' },
        { time: '3:15 PM - 3:30 PM', title: 'Coffee Break' },
        { time: '3:30 PM - 4:15 PM', title: 'Future Trends and Opportunities' },
        { time: '4:15 PM - 5:00 PM', title: 'Panel Discussion and Q&A' },
      ],
      speakers: [
        { name: 'Dr. Robert Chen', role: 'AI Research Scientist', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
        { name: 'Prof. Emily Davis', role: 'Education Technology Specialist', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
      ]
    },
    {
      id: 'tech-talk',
      title: 'Tech Talk: Future of Cloud Computing',
      date: 'August 8, 2025',
      time: '5:00 PM - 7:00 PM',
      location: 'Virtual (Zoom)',
      category: 'Webinar',
      description: 'Join industry experts as they discuss the future trends and challenges in cloud computing technologies.',
      image: 'https://images.unsplash.com/photo-1569017388730-020b5f80a004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      registration: true,
      fee: 'Free',
      capacity: 200,
      remaining: 145,
      agenda: [
        { time: '5:00 PM - 5:15 PM', title: 'Welcome and Introduction' },
        { time: '5:15 PM - 6:00 PM', title: 'Main Talk: Cloud Computing Trends' },
        { time: '6:00 PM - 6:45 PM', title: 'Panel Discussion' },
        { time: '6:45 PM - 7:00 PM', title: 'Q&A and Closing Remarks' },
      ],
      speakers: [
        { name: 'Lisa Wang', role: 'Cloud Solutions Architect', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
        { name: 'David Kumar', role: 'DevOps Engineer', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
      ]
    },
  ];
  
  const event = events.find(event => event.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <p className="text-gray-600 mt-2">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-4">
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleRegistration = () => {
    // In a real app, this would send data to an API
    // For now, we'll just show a success toast
    toast({
      title: "Registration Successful",
      description: "Thank you for registering for this event! See you there.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 to-blue-800">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <Badge className="mb-4">{event.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
                <div className="flex items-center text-blue-100 space-x-4 mt-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="shadow-lg hover:shadow-blue-500/20">Register Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Register for {event.title}</DialogTitle>
                      <DialogDescription>
                        Please fill out this form to register for the event. Required fields are marked with an asterisk.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" defaultValue={user?.name || ''} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rollNumber">Roll Number *</Label>
                          <Input id="rollNumber" defaultValue={user?.rollNumber || ''} required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" defaultValue={user?.email || ''} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input id="phone" defaultValue={user?.phone || ''} required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department *</Label>
                          <Input id="department" defaultValue={user?.branch || ''} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year *</Label>
                          <Select defaultValue={user?.year || undefined}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1st Year">1st Year (FE)</SelectItem>
                              <SelectItem value="2nd Year">2nd Year (SE)</SelectItem>
                              <SelectItem value="3rd Year">3rd Year (TE)</SelectItem>
                              <SelectItem value="4th Year">4th Year (BE)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventName">Event Name</Label>
                        <Input id="eventName" value={event.title} disabled />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Any special requirements or questions?" 
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleRegistration}>Submit Registration</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About the Event</h2>
                <p className="text-gray-700">{event.description}</p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Event Agenda</h3>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="w-1/3 text-gray-600 font-medium">{item.time}</div>
                      <div className="w-2/3">{item.title}</div>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Speakers</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-md">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img src={speaker.image} alt={speaker.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium">{speaker.name}</div>
                        <div className="text-sm text-gray-600">{speaker.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Tag className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Category</p>
                      <p className="text-gray-600">{event.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-gray-600">{event.capacity} seats ({event.remaining} left)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Ticket className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Registration Fee</p>
                      <p className="text-gray-600">{event.fee}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Share Event</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">If you have any questions about this event, please contact us.</p>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
