
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Filter, Search } from 'lucide-react';
import EventRegistrationDialog from '../../components/student/EventRegistrationDialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for events
const eventsMockData = [
  {
    id: '1',
    name: 'Web Development Workshop',
    date: 'June 15, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'FR CRIT Auditorium',
    description: 'Learn modern frontend technologies and frameworks with hands-on exercises.',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000',
    isRegistered: true,
    category: 'workshop'
  },
  {
    id: '2',
    name: 'AI & Machine Learning Hackathon',
    date: 'June 25, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'FR CRIT Innovation Lab',
    description: '48-hour hackathon to build AI solutions for real-world problems.',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000',
    isRegistered: false,
    category: 'hackathon'
  },
  {
    id: '3',
    name: 'Cloud Computing Seminar',
    date: 'July 5, 2025',
    time: '11:00 AM - 1:00 PM',
    location: 'FR CRIT Seminar Hall',
    description: 'Learn about cloud infrastructure and serverless architectures.',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000',
    isRegistered: false,
    category: 'seminar'
  },
  {
    id: '4',
    name: 'Cybersecurity Workshop',
    date: 'July 12, 2025',
    time: '10:00 AM - 3:00 PM',
    location: 'FR CRIT Lab 302',
    description: 'Practical approaches to protect against cyber threats and vulnerabilities.',
    price: '₹349',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000',
    isRegistered: false,
    category: 'workshop'
  }
];

const EventsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [registrationDialog, setRegistrationDialog] = useState({
    isOpen: false,
    eventName: '',
    eventId: ''
  });

  // Filter events based on search term and category
  const filteredEvents = eventsMockData.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (eventId: string, eventName: string) => {
    setRegistrationDialog({
      isOpen: true,
      eventName,
      eventId
    });
  };

  const closeRegistrationDialog = () => {
    setRegistrationDialog({
      isOpen: false,
      eventName: '',
      eventId: ''
    });
  };

  return (
    <DashboardLayout title="Events">
      <div className="space-y-6">
        {/* Hero header */}
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h2 className="text-2xl font-bold">Discover Events</h2>
          <p className="mt-2 max-w-2xl">
            Explore upcoming workshops, hackathons, and seminars organized by CSI. Register and enhance your skills!
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
            <select 
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="workshop">Workshops</option>
              <option value="hackathon">Hackathons</option>
              <option value="seminar">Seminars</option>
            </select>
          </div>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                {event.image ? (
                  <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  {event.isRegistered ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Registered</Badge>
                  ) : (
                    <Badge variant="outline" className="border-blue-200 text-blue-700">Open</Badge>
                  )}
                  <span className="text-sm text-muted-foreground">{event.date}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{event.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="text-sm mb-3">{event.description}</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{event.location}</div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{event.price}</div>
                    {!event.isRegistered && (
                      <Button size="sm" onClick={() => handleRegister(event.id, event.name)}>Register</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredEvents.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any events matching your search criteria. Try adjusting your filters or check back later.
              </p>
            </div>
          )}
        </div>

        {/* Registration dialog */}
        <EventRegistrationDialog
          isOpen={registrationDialog.isOpen}
          onClose={closeRegistrationDialog}
          eventName={registrationDialog.eventName}
          eventId={registrationDialog.eventId}
        />
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;
