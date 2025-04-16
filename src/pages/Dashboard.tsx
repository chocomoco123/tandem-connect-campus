
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  ChevronRight, 
  Clock, 
  FileText, 
  Users, 
  CreditCard,
  ArrowUpRight,
  CalendarCheck,
  Book,
  BarChart3,
  Download,
  Search,
  Filter,
  Plus,
  Trash2,
  HelpCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  const renderStudentDashboard = () => (
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
              <CalendarCheck className="h-6 w-6 mb-2" />
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
                      <Button size="sm">Register</Button>
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
                
                <Button variant="outline" size="sm" className="w-full">Pay Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Teacher'}!</h2>
        <p className="text-muted-foreground">Here's an overview of student registrations and activities.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="h-3 w-3" /> 12%
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold mb-1">235</CardTitle>
            <CardDescription className="text-base">Total Registrations</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="h-3 w-3" /> 6.2%
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold mb-1">₹42,530</CardTitle>
            <CardDescription className="text-base">Payments Completed</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <CalendarCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-blue-600">87.4%</div>
            </div>
            <CardTitle className="text-3xl font-bold mb-1">182</CardTitle>
            <CardDescription className="text-base">Event Attendance</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Action Required</Badge>
            </div>
            <CardTitle className="text-3xl font-bold mb-1">24</CardTitle>
            <CardDescription className="text-base">Pending Approvals</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for quick access */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
          <TabsTrigger value="registrations" className="flex-1">Registrations</TabsTrigger>
          <TabsTrigger value="attendance" className="flex-1">Attendance</TabsTrigger>
          <TabsTrigger value="payments" className="flex-1">Payments</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Recent Registrations */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Recent Registrations</CardTitle>
              <CardDescription>Total registrations: 235</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="search" 
                  placeholder="Search students..." 
                  className="pl-8 h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>All</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">Student</th>
                    <th className="h-10 px-4 text-left font-medium">Event</th>
                    <th className="h-10 px-4 text-center font-medium">Registration</th>
                    <th className="h-10 px-4 text-center font-medium">Payment</th>
                    <th className="h-10 px-4 text-center font-medium">Attendance</th>
                    <th className="h-10 px-4 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-xs text-muted-foreground">CSI2303201</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">Web Development Workshop</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Upcoming</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Mary Parker</div>
                          <div className="text-xs text-muted-foreground">CSI2303145</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">AI & Machine Learning Hackathon</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Upcoming</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Download className="h-4 w-4" />
              Export to CSV
            </Button>
            <Button size="sm" asChild>
              <Link to="/dashboard/registrations">View All</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCommitteeDashboard = () => (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold">Committee Dashboard</h2>
        <p className="text-muted-foreground">Manage events, registrations, and committee operations</p>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-6 mt-6">
          {/* Events Management Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Manage Events</h3>
            <Button className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Add New Event
            </Button>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Card 1 */}
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">Tech Workshop</h4>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 font-normal">
                    45 Registrations
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">June 15, 2025</p>
                <p className="text-sm mb-4">A hands-on workshop on the latest technologies</p>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Event Card 2 */}
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">AI & ML Hackathon</h4>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 font-normal">
                    32 Registrations
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">June 25, 2025</p>
                <p className="text-sm mb-4">48-hour hackathon focused on AI solutions</p>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Event Card 3 */}
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">Cloud Computing Seminar</h4>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 font-normal">
                    28 Registrations
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">July 5, 2025</p>
                <p className="text-sm mb-4">Learn about cloud infrastructure and serverless</p>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="registrations">
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4">Registration Management</h3>
            <p>The registrations content will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="members">
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4">Committee Members</h3>
            <p>The committee members content will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance">
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4">Attendance Records</h3>
            <p>The attendance content will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <DashboardLayout>
      {user?.role === 'student' && renderStudentDashboard()}
      {user?.role === 'teacher' && renderTeacherDashboard()}
      {user?.role === 'committee' && renderCommitteeDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;

// Fix missing references
import { Check, X } from 'lucide-react';
