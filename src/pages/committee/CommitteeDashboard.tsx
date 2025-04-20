
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CommitteeDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  return (
    <DashboardLayout title="Committee Dashboard">
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
              <Button 
                className="flex items-center gap-1.5"
                onClick={() => {
                  toast({
                    title: "Create Event",
                    description: "Event creation form will open here",
                  });
                }}
              >
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        toast({
                          title: "Event Deleted",
                          description: "The event has been deleted successfully",
                          variant: "destructive"
                        });
                      }}
                    >
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        toast({
                          title: "Event Deleted",
                          description: "The event has been deleted successfully",
                          variant: "destructive"
                        });
                      }}
                    >
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        toast({
                          title: "Event Deleted",
                          description: "The event has been deleted successfully",
                          variant: "destructive"
                        });
                      }}
                    >
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
    </DashboardLayout>
  );
};

export default CommitteeDashboard;
