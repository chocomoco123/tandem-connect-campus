
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Download, FileText, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

// Sample registrations data (would come from API in a real app)
const registrations = [
  {
    id: '1',
    eventName: 'Web Development Workshop',
    eventDate: '2025-04-20',
    eventTime: '10:00 AM - 1:00 PM',
    eventLocation: 'Seminar Hall 1',
    registrationDate: '2025-04-10',
    status: 'confirmed',
    certificate: true,
  },
  {
    id: '2',
    eventName: 'AI & Machine Learning Seminar',
    eventDate: '2025-04-25',
    eventTime: '2:00 PM - 5:00 PM',
    eventLocation: 'Main Auditorium',
    registrationDate: '2025-04-12',
    status: 'pending',
    certificate: false,
  },
  {
    id: '3',
    eventName: 'Hackathon 2025',
    eventDate: '2025-06-15',
    eventTime: '9:00 AM - 6:00 PM',
    eventLocation: 'Computer Lab 3',
    registrationDate: '2025-04-14',
    status: 'waitlisted',
    certificate: false,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'waitlisted':
      return 'bg-orange-100 text-orange-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Registrations = () => {
  const [selectedRegistration, setSelectedRegistration] = React.useState(null);
  const [showConfirmCancel, setShowConfirmCancel] = React.useState(false);
  
  const handleCancelRegistration = () => {
    // In a real app, this would be an API call
    toast({
      title: "Registration Cancelled",
      description: `Your registration for ${selectedRegistration.eventName} has been cancelled.`,
    });
    setShowConfirmCancel(false);
  };
  
  const handleDownloadCertificate = (registration) => {
    // In a real app, this would download a PDF
    toast({
      title: "Certificate Downloaded",
      description: `Certificate for ${registration.eventName} has been downloaded.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Registrations</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {registrations.map((registration) => (
            <Card key={registration.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{registration.eventName}</CardTitle>
                  <Badge className={getStatusColor(registration.status)}>
                    {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{registration.eventDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{registration.eventTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{registration.eventLocation}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 md:text-right">
                    <div className="text-sm">
                      <span className="text-gray-500">Registration Date:</span>{' '}
                      {registration.registrationDate}
                    </div>
                    
                    <div className="flex md:justify-end space-x-2 pt-2">
                      {registration.certificate && (
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadCertificate(registration)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Certificate
                        </Button>
                      )}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline"
                            size="sm"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Registration Details</DialogTitle>
                            <DialogDescription>
                              Complete information about your registration
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4 space-y-4">
                            <div>
                              <h3 className="font-medium">Event Information</h3>
                              <Separator className="my-2" />
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-gray-500">Event Name:</span>
                                <span>{registration.eventName}</span>
                                <span className="text-gray-500">Date:</span>
                                <span>{registration.eventDate}</span>
                                <span className="text-gray-500">Time:</span>
                                <span>{registration.eventTime}</span>
                                <span className="text-gray-500">Location:</span>
                                <span>{registration.eventLocation}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-medium">Registration Information</h3>
                              <Separator className="my-2" />
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-gray-500">Registration ID:</span>
                                <span>{registration.id}</span>
                                <span className="text-gray-500">Registration Date:</span>
                                <span>{registration.registrationDate}</span>
                                <span className="text-gray-500">Status:</span>
                                <span>
                                  <Badge className={getStatusColor(registration.status)}>
                                    {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                                  </Badge>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <DialogFooter>
                            {registration.certificate && (
                              <Button 
                                variant="outline"
                                onClick={() => handleDownloadCertificate(registration)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Certificate
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              onClick={() => {
                                setSelectedRegistration(registration);
                                setShowConfirmCancel(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Cancel Registration
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedRegistration(registration);
                          setShowConfirmCancel(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Confirm Cancel Dialog */}
        <Dialog open={showConfirmCancel} onOpenChange={setShowConfirmCancel}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Cancellation</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your registration for{' '}
                {selectedRegistration?.eventName}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="gap-2 sm:justify-end">
              <Button
                type="button" 
                variant="outline" 
                onClick={() => setShowConfirmCancel(false)}
              >
                Keep Registration
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleCancelRegistration}
              >
                Cancel Registration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Registrations;
