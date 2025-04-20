
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpRight, 
  Users, 
  CreditCard, 
  CalendarCheck, 
  AlertTriangle, 
  Check, 
  X, 
  Download, 
  Search, 
  Filter, 
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <DashboardLayout title="Teacher Dashboard">
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
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-green-600"
                            onClick={() => {
                              toast({
                                title: "Registration Approved",
                                description: "The registration has been approved successfully",
                              });
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-600"
                            onClick={() => {
                              toast({
                                title: "Registration Declined",
                                description: "The registration has been declined",
                                variant: "destructive"
                              });
                            }}
                          >
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
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={() => {
                  toast({
                    title: "Export Feature",
                    description: "Export functionality will be available soon",
                  });
                }}
              >
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
    </DashboardLayout>
  );
};

export default TeacherDashboard;
