
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Users,
  CreditCard,
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">
        {/* Hero banner with action buttons */}
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-blue-500 text-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Hello, {user?.name || 'Student'}!</h2>
          <p className="mb-8 max-w-xl">Explore upcoming events, track your registrations, and manage your CSI journey.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button variant="secondary" asChild className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Link to="/dashboard/events" className="flex flex-col items-center py-3 h-auto">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Events</span>
              </Link>
            </Button>
            <Button variant="secondary" asChild className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Link to="/dashboard/my-registrations" className="flex flex-col items-center py-3 h-auto">
                <FileText className="h-6 w-6 mb-2" />
                <span>Registrations</span>
              </Link>
            </Button>
            <Button variant="secondary" asChild className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Link to="/dashboard/calendar" className="flex flex-col items-center py-3 h-auto">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Calendar</span>
              </Link>
            </Button>
            <Button variant="secondary" asChild className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Link to="/dashboard/profile" className="flex flex-col items-center py-3 h-auto">
                <Users className="h-6 w-6 mb-2" />
                <span>Profile</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Upcoming Events section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl font-bold">Upcoming Events</CardTitle>
                  <CardDescription>Events you might be interested in</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/events">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Event 1 - Registered */}
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-blue-500 h-2"></div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Registered</Badge>
                        <span className="text-sm text-muted-foreground">June 15, 2025</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">Web Development Workshop</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="text-sm mb-3">Learn modern frontend technologies and frameworks with hands-on exercises.</div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">FR CRIT Auditorium</div>
                        <div className="text-sm font-medium">₹299</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Event 2 - Not registered */}
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-indigo-500 h-2"></div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-blue-200 text-blue-700">Open</Badge>
                        <span className="text-sm text-muted-foreground">June 25, 2025</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">AI & Machine Learning Hackathon</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="text-sm mb-3">48-hour hackathon to build AI solutions for real-world problems.</div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">FR CRIT Innovation Lab</div>
                        <Button size="sm" onClick={() => navigate('/dashboard/events/register/2')}>Register</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Registration Status section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl font-bold">Registration Status</CardTitle>
                  <CardDescription>Track your event applications</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/my-registrations">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Web Development Workshop</p>
                        <p className="text-sm text-muted-foreground">June 15, 2025</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-100 p-2 rounded">
                        <FileText className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">AI & Machine Learning Hackathon</p>
                        <p className="text-sm text-muted-foreground">June 25, 2025</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Your Profile section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20 ring-2 ring-primary/20">
                    <AvatarImage src={user?.profileUrl} />
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {user?.name ? user.name.charAt(0).toUpperCase() + (user.name.split(' ')[1]?.[0]?.toUpperCase() || '') : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{user?.name || 'Student Name'}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email || 'student@example.com'}</p>
                  </div>
                  
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Roll Number</span>
                      <span className="font-medium">CSI2303256</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Branch</span>
                      <span className="font-medium">Computer Science</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year</span>
                      <span className="font-medium">Third Year</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/dashboard/profile">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Due section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Payment Due</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded mr-3">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">AI & Machine Learning Hackathon</p>
                      <p className="text-xs text-muted-foreground">Due by June 20, 2025</p>
                    </div>
                    <span className="font-medium">₹499</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" onClick={() => {
                    toast({
                      title: "Payment Feature",
                      description: "Payment integration will be available soon",
                    });
                  }}>Pay Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
