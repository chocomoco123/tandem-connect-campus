
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Calendar, 
  ChevronRight, 
  Clock, 
  FileText, 
  Users, 
  CreditCard, 
  User, 
  ArrowRight, 
  ArrowUp, 
  Search, 
  Download, 
  Award,
  Settings as SettingsIcon,
  PlusCircle,
  Trash,
  Bell,
  CheckCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Student Dashboard UI
  const renderStudentDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name || 'Student'}!</h1>
        <p className="text-blue-100">Here's what's happening with your CSI activities.</p>
        
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
            onClick={() => navigate('/dashboard/events')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Events
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
            onClick={() => navigate('/dashboard/my-registrations')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Registrations
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
            onClick={() => navigate('/dashboard/calendar')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
            onClick={() => navigate('/dashboard/profile')}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
            <CardDescription>Events happening soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Event 1 */}
            <div className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-md">Web Development Workshop</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>May 15, 2025 • 10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Room 302, Computer Science Building</span>
                  </div>
                  <p className="text-sm mt-2">Learn the fundamentals of web development with HTML, CSS, and JavaScript.</p>
                  <p className="text-sm font-medium text-blue-600 mt-1">Registration Fee: ₹499</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Registered</Badge>
              </div>
              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
            
            {/* Event 2 */}
            <div className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-md">48-Hour Hackathon</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>June 5-7, 2025 • 9:00 AM onwards</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Main Auditorium</span>
                  </div>
                  <p className="text-sm mt-2">Build innovative solutions to real-world problems in this exciting hackathon.</p>
                  <p className="text-sm font-medium text-blue-600 mt-1">Registration Fee: ₹899</p>
                </div>
                <Button size="sm" variant="default">Register</Button>
              </div>
              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View All Events <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Your Profile */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Your Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profileUrl} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Roll Number:</span>
                  <span className="font-medium">{user?.rollNumber || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Branch:</span>
                  <span className="font-medium">{user?.branch || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{user?.year || 'Not set'}</span>
                </div>
              </div>
            </div>
            <Button 
              className="w-full"
              variant="outline"
              onClick={() => navigate('/settings/profile')}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Registration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Registration Status</CardTitle>
          <CardDescription>Track your event registrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className="rounded-md bg-blue-50 p-2 mr-3">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Web Development Workshop</p>
                  <p className="text-sm text-gray-500">May 15, 2025</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Approved</Badge>
            </div>
            
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className="rounded-md bg-blue-50 p-2 mr-3">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Data Science Seminar</p>
                  <p className="text-sm text-gray-500">April 28, 2025</p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/dashboard/my-registrations')}
          >
            View All Registrations <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Calendar - Student Task Planner */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">My Calendar</CardTitle>
          <CardDescription>Your personal task planner</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <Button variant="outline" className="mr-2">
              <Calendar className="mr-2 h-4 w-4" />
              Add Task
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <Calendar className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Submit Project Proposal</p>
                  <p className="text-xs text-gray-500">April 20, 2025 • 11:59 PM</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <CheckCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-2 mr-3">
                  <Calendar className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <p className="font-medium">Web Development Workshop</p>
                  <p className="text-xs text-gray-500">May 15, 2025 • 10:00 AM</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Event</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Calendar <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      {/* Settings Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Settings</CardTitle>
          <CardDescription>Customize your dashboard experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notification Preferences</p>
              <p className="text-sm text-gray-500">Receive notifications for event updates</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-green-50 border-green-200 text-green-700">On</Button>
              <Button size="sm" variant="outline">Off</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Alerts</p>
              <p className="text-sm text-gray-500">Receive important updates via email</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-green-50 border-green-200 text-green-700">On</Button>
              <Button size="sm" variant="outline">Off</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme Settings</p>
              <p className="text-sm text-gray-500">Choose your preferred appearance</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">Light</Button>
              <Button size="sm" variant="outline">Dark</Button>
              <Button size="sm" variant="outline">System</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  // Teacher Dashboard UI
  const renderTeacherDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'Teacher'}!</h1>
        <p className="text-gray-600">Here's an overview of student registrations and activities.</p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Total Registrations</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-bold text-blue-900">235</p>
                    <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12%
                    </Badge>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">From last month</p>
                </div>
                <div className="rounded-full bg-blue-200 p-2">
                  <Users className="h-5 w-5 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Payments Completed</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-bold text-green-900">₹42,530</p>
                    <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      6.2%
                    </Badge>
                  </div>
                  <p className="text-xs text-green-700 mt-1">From last month</p>
                </div>
                <div className="rounded-full bg-green-200 p-2">
                  <CreditCard className="h-5 w-5 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-800">Event Attendance</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-bold text-purple-900">182</p>
                    <p className="text-sm ml-2 text-purple-800">
                      (87.4%)
                    </p>
                  </div>
                  <Progress value={87.4} className="h-1 mt-2 bg-purple-200" />
                </div>
                <div className="rounded-full bg-purple-200 p-2">
                  <Users className="h-5 w-5 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800">Pending Approvals</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-bold text-amber-900">24</p>
                    <Badge className="ml-2 bg-red-100 text-red-800 border-red-200">
                      Action required
                    </Badge>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">Needs attention</p>
                </div>
                <div className="rounded-full bg-amber-200 p-2">
                  <Clock className="h-5 w-5 text-amber-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Action Tabs */}
        <div className="mt-6">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="registrations">Registrations</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Registrations Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>A total of 235 registrations</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search registrations..."
                  className="pl-9 w-[200px]"
                />
              </div>
              <select className="rounded-md border border-input p-2 text-sm">
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Declined</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Student</th>
                  <th className="text-left py-3 px-4 font-medium">Event</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Payment</th>
                  <th className="text-left py-3 px-4 font-medium">Attendance</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-gray-500 text-xs">CSI2023001</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">Web Development Workshop</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">Present</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mary" />
                        <AvatarFallback>MP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Mary Parker</p>
                        <p className="text-gray-500 text-xs">CSI2023015</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">48-Hour Hackathon</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-gray-100 text-gray-800">N/A</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8">Approve</Button>
                      <Button variant="outline" size="sm" className="h-8 text-red-600 hover:bg-red-50">Decline</Button>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" />
                        <AvatarFallback>RD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Robert Davis</p>
                        <p className="text-gray-500 text-xs">CSI2023048</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">AI in Education Seminar</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-red-100 text-red-800">Absent</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing 3 of 235 registrations
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export to CSV
              </Button>
              <Button size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Event Calendar for Teachers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Event Calendar</CardTitle>
          <CardDescription>Important dates, classes, and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <Button variant="outline" className="mr-2">
              <Calendar className="mr-2 h-4 w-4" />
              Add Event
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <Calendar className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Web Development Workshop</p>
                  <p className="text-xs text-gray-500">May 15, 2025 • 10:00 AM - 4:00 PM</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Class</Badge>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-2 mr-3">
                  <Calendar className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <p className="font-medium">Project Submission Deadline</p>
                  <p className="text-xs text-gray-500">June 10, 2025</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-800">Important</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Calendar <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      {/* Teacher Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Settings</CardTitle>
          <CardDescription>Customize dashboard features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications about student registrations</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-green-50 border-green-200 text-green-700">On</Button>
              <Button size="sm" variant="outline">Off</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dashboard Layout</p>
              <p className="text-sm text-gray-500">Choose your preferred layout</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">Grid</Button>
              <Button size="sm" variant="outline">List</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-gray-500">Choose your preferred appearance</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">Light</Button>
              <Button size="sm" variant="outline">Dark</Button>
              <Button size="sm" variant="outline">System</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  // Committee Dashboard UI
  const renderCommitteeDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Committee Dashboard</h1>
          <p className="text-gray-600">Manage events, registrations, and committee activities</p>
        </div>
        <Button>
          <SettingsIcon className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="events">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="mt-6">
          {/* Events Management Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Manage Events</h2>
            <Button variant="gradient">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Event
            </Button>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Card 1 */}
            <Card>
              <div className="aspect-video bg-gray-100 rounded-t-xl flex items-center justify-center">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Tech Workshop</h3>
                  <Badge className="bg-blue-100 text-blue-800">45 Registrations</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">6/15/2025</p>
                <p className="text-sm mt-2">A hands-on workshop on the latest technologies</p>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Event Card 2 */}
            <Card>
              <div className="aspect-video bg-gray-100 rounded-t-xl flex items-center justify-center">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">AI Conference</h3>
                  <Badge className="bg-blue-100 text-blue-800">32 Registrations</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">7/22/2025</p>
                <p className="text-sm mt-2">A conference on artificial intelligence and its applications</p>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Event Card 3 */}
            <Card>
              <div className="aspect-video bg-gray-100 rounded-t-xl flex items-center justify-center">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Coding Contest</h3>
                  <Badge className="bg-blue-100 text-blue-800">56 Registrations</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">8/10/2025</p>
                <p className="text-sm mt-2">Test your coding skills in this competitive event</p>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Registration Management</CardTitle>
              <CardDescription>View and manage student registrations for all events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search registrations..."
                    className="pl-9 w-[300px]"
                  />
                </div>
                <div className="flex space-x-2">
                  <select className="rounded-md border border-input p-2 text-sm">
                    <option>All Events</option>
                    <option>Tech Workshop</option>
                    <option>AI Conference</option>
                    <option>Coding Contest</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">Event</th>
                      <th className="text-left py-3 px-4 font-medium">Registration Date</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Payment</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-gray-500 text-xs">CSI2023001</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">Tech Workshop</td>
                      <td className="py-3 px-4">May 1, 2025</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Committee Members</CardTitle>
                  <CardDescription>Manage CSI committee members</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Member 1 */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                      <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alex Peterson</p>
                      <p className="text-sm text-gray-500">President</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                {/* Member 2 */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Secretary</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                {/* Member 3 */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Raj" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Raj Kumar</p>
                      <p className="text-sm text-gray-500">Treasurer</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription>Track attendance for past events</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload Attendance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Web Development Workshop</h3>
                      <p className="text-sm text-gray-500">May 15, 2025</p>
                      <div className="mt-2 flex items-center">
                        <Badge className="mr-2 bg-green-100 text-green-800">87% Attendance</Badge>
                        <span className="text-sm text-gray-600">45 out of 52 students</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">AI in Education Seminar</h3>
                      <p className="text-sm text-gray-500">April 10, 2025</p>
                      <div className="mt-2 flex items-center">
                        <Badge className="mr-2 bg-amber-100 text-amber-800">73% Attendance</Badge>
                        <span className="text-sm text-gray-600">38 out of 52 students</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Event Creation Form - Additional Committee Feature */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>Add new events to the CSI calendar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                <Input type="text" placeholder="Enter event name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <Input type="date" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <Input type="time" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <Input type="time" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Input type="text" placeholder="Enter event location" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Enter event description"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-2">₹</span>
                <Input type="number" className="pl-7" placeholder="0" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Poster</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <Input type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Event</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notification Management System */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Management</CardTitle>
          <CardDescription>Send announcements to students and teachers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
              <Input type="text" placeholder="Enter notification title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter notification message"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Send To</label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="students" className="mr-2" />
                  <label htmlFor="students">All Students</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="teachers" className="mr-2" />
                  <label htmlFor="teachers">All Teachers</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="committee" className="mr-2" />
                  <label htmlFor="committee">Committee Members</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>
                <Bell className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
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
