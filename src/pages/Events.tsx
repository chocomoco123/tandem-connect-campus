
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BadgeCheck, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Events = () => {
  // Mock events data
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
    },
  ];
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null);
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = Array.from(new Set(events.map(event => event.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tandem-blue to-tandem-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">CSI Events</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover workshops, seminars, competitions and more organized by the Computer Society of India.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={categoryFilter === null ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(null)}
              >
                All
              </Button>
              {categories.map(category => (
                <Button 
                  key={category} 
                  variant={categoryFilter === category ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Events List Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover-scale">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>{event.category}</Badge>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{event.fee}</p>
                        <p className="text-xs text-gray-500">{event.remaining} spots left</p>
                      </div>
                      <Button asChild>
                        <Link to={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">No events found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                <Button 
                  className="mt-4" 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter(null);
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Registration Info Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-4">How to Register for Events</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded mr-3">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Create an Account</p>
                      <p className="text-sm text-gray-600">Sign up to TANDEM with your college email</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded mr-3">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Browse Events</p>
                      <p className="text-sm text-gray-600">Find events that interest you</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded mr-3">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Register and Pay</p>
                      <p className="text-sm text-gray-600">Complete registration and pay any required fees</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded mr-3">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Attend the Event</p>
                      <p className="text-sm text-gray-600">Get confirmation and attend the event</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/signup">Sign Up Now</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
                <div className="max-w-md text-center">
                  <h3 className="text-2xl font-bold mb-2">Have questions?</h3>
                  <p className="text-gray-600 mb-4">Contact the CSI committee for help with event registration or other queries.</p>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
