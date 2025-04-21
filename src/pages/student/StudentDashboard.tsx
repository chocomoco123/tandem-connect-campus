
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import { BarChart, Calendar, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface EventType {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .gte('event_date', new Date().toISOString())
          .order('event_date', { ascending: true })
          .limit(3);

        if (error) throw error;
        setUpcomingEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <DashboardLayout title={`Welcome, ${user?.name || 'Student'}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={statsVariants} whileHover={{ y: -5 }} className="card-hover">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-md">
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                  <h3 className="text-2xl font-bold mt-1">{upcomingEvents.length}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={statsVariants} whileHover={{ y: -5 }} className="card-hover">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-md">
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registrations</p>
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={statsVariants} whileHover={{ y: -5 }} className="card-hover">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-md">
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                  <h3 className="text-2xl font-bold mt-1">2</h3>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                  <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={statsVariants} whileHover={{ y: -5 }} className="card-hover">
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-0 shadow-md">
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                  <h3 className="text-2xl font-bold mt-1">95%</h3>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex justify-between items-center">
                Upcoming Events
                <Button 
                  variant="outline" 
                  className="h-9"
                  onClick={() => navigate('/dashboard/events')}
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="relative w-12 h-12">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                </div>
              ) : upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{event.description || 'No description available'}</p>
                          <div className="flex items-center mt-2">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.event_date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                            {event.location && (
                              <span className="text-xs text-muted-foreground ml-3">
                                📍 {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/dashboard/events/${event.id}`)}
                          className="bg-primary hover:bg-primary/90 transition-colors"
                        >
                          Register
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming events at the moment.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/dashboard/events')}
                  >
                    Explore Events
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Latest Activities */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="registrations">Registrations</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <ul className="space-y-4">
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">You registered for <span className="font-semibold">Web Development Workshop</span></p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                      <Badge>Registration</Badge>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                        <BarChart className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">Certificate issued for <span className="font-semibold">Coding Competition</span></p>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                      <Badge variant="secondary">Certificate</Badge>
                    </motion.li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="registrations" className="mt-0">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">You registered for <span className="font-semibold">Web Development Workshop</span></p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                      <Badge>Registration</Badge>
                    </li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="certificates" className="mt-0">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                        <BarChart className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">Certificate issued for <span className="font-semibold">Coding Competition</span></p>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                      <Badge variant="secondary">Certificate</Badge>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
