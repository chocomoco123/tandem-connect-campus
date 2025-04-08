
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, ChevronRight, Clock, FileText, Users } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
            <CardDescription>Events you've registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Web Development Workshop</p>
                  <p className="text-xs text-muted-foreground">May 15, 2025</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">48-Hour Hackathon</p>
                  <p className="text-xs text-muted-foreground">June 5-7, 2025</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View all events <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Registration Status</CardTitle>
            <CardDescription>Track your event applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded mr-3">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Web Development Workshop</p>
                    <p className="text-xs text-muted-foreground">Application submitted</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Approved</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded mr-3">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">48-Hour Hackathon</p>
                    <p className="text-xs text-muted-foreground">Application submitted</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">Pending</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Check all statuses <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Payments</CardTitle>
            <CardDescription>Event fees due</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">48-Hour Hackathon</p>
                  <p className="text-xs text-muted-foreground">Due by May 25, 2025</p>
                </div>
                <span className="text-sm font-medium">₹499</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View all payments <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Calendar</CardTitle>
          <CardDescription>Your upcoming events and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-sm text-gray-500">Calendar integration coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Student Registrations</CardTitle>
            <CardDescription>Event participation requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Web Development Workshop</p>
                  <p className="text-xs text-muted-foreground">42 students registered</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">48-Hour Hackathon</p>
                  <p className="text-xs text-muted-foreground">23 students registered</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Manage registrations <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Attendance Tracking</CardTitle>
            <CardDescription>Record student attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded mr-3">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Web Development Workshop</p>
                  <p className="text-xs text-muted-foreground">May 15, 2025</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View attendance <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Payment Tracking</CardTitle>
            <CardDescription>Monitor event payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">48-Hour Hackathon</p>
                  <p className="text-xs text-muted-foreground">16/23 students paid</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View payment details <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Calendar</CardTitle>
          <CardDescription>Upcoming CSI events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-sm text-gray-500">Calendar integration coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCommitteeDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Events</CardTitle>
            <CardDescription>Manage CSI events</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total events</p>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Manage events <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Registrations</CardTitle>
            <CardDescription>Event signup tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Total registrations</p>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View registrations <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Committee</CardTitle>
            <CardDescription>CSI committee members</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Active members</p>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Manage members <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Payments</CardTitle>
            <CardDescription>Event revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">₹24,500</div>
              <p className="text-xs text-muted-foreground">Total collected</p>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Payment details <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>Latest event signups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-muted-foreground">Web Development Workshop</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Approved</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>MP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Mary Parker</p>
                    <p className="text-xs text-muted-foreground">48-Hour Hackathon</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">Pending</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>RD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Robert Davis</p>
                    <p className="text-xs text-muted-foreground">AI in Education Seminar</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Approved</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
            <CardDescription>Upcoming CSI events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-sm text-gray-500">Calendar integration coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'}!</h1>
        <p className="text-gray-600">Here's what's happening with your CSI activities.</p>
      </div>
      
      {user?.role === 'student' && renderStudentDashboard()}
      {user?.role === 'teacher' && renderTeacherDashboard()}
      {user?.role === 'committee' && renderCommitteeDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;

// Import Avatar for committee dashboard
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
