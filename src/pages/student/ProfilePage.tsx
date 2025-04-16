
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Camera, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  branch: string;
  year: string;
  institute: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      rollNumber: user?.rollNumber || '',
      branch: user?.branch || '',
      year: user?.year || '',
      institute: user?.institute || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      github: user?.socialLinks?.github || '',
      linkedin: user?.socialLinks?.linkedin || '',
      twitter: user?.socialLinks?.twitter || '',
      instagram: user?.socialLinks?.instagram || '',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    const updatedUser = {
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone,
      rollNumber: data.rollNumber,
      branch: data.branch,
      year: data.year,
      institute: data.institute,
      bio: data.bio,
      location: data.location,
      website: data.website,
      socialLinks: {
        github: data.github,
        linkedin: data.linkedin,
        twitter: data.twitter,
        instagram: data.instagram,
      },
    };

    updateProfile(updatedUser);
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.profileUrl} />
                  <AvatarFallback>
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{user?.role}</p>
                
                <div className="flex space-x-2 mt-4">
                  {user?.socialLinks?.github && (
                    <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                  {user?.socialLinks?.linkedin && (
                    <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                  {user?.socialLinks?.twitter && (
                    <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                  {user?.socialLinks?.instagram && (
                    <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5 text-gray-600" />
                    </a>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a></li>
                  <li><a href="/dashboard/calendar" className="text-blue-600 hover:underline">My Calendar</a></li>
                  <li><a href="/dashboard/registrations" className="text-blue-600 hover:underline">My Registrations</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Update your personal information and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <Tabs defaultValue="personal">
                        <TabsList className="mb-4">
                          <TabsTrigger value="personal">Personal</TabsTrigger>
                          <TabsTrigger value="academic">Academic</TabsTrigger>
                          <TabsTrigger value="social">Social</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="personal" className="space-y-4">
                          <div className="flex justify-center mb-6">
                            <div className="relative">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.profileUrl} />
                                <AvatarFallback>
                                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <Button 
                                size="icon" 
                                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                              >
                                <Camera className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input type="tel" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    placeholder="Tell us about yourself"
                                    className="resize-none h-24"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Write a short bio about yourself.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="City, State" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Personal Website</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="url" 
                                    placeholder="https://yourwebsite.com"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                        
                        <TabsContent value="academic" className="space-y-4">
                          <FormField
                            control={form.control}
                            name="rollNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Roll Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="branch"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Branch</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select branch" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                                      <SelectItem value="Electronics">Electronics</SelectItem>
                                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                                      <SelectItem value="Civil">Civil</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="year"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select year" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1st Year">1st Year</SelectItem>
                                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                                      <SelectItem value="4th Year">4th Year</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="institute"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Institute</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                        
                        <TabsContent value="social" className="space-y-4">
                          <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GitHub</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="https://github.com/username"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="https://linkedin.com/in/username"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="twitter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="https://twitter.com/username"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Instagram</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="https://instagram.com/username"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex justify-end space-x-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>
                    Your personal and academic information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal">
                    <TabsList className="mb-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="academic">Academic</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p className="mt-1">{user?.name || 'Not provided'}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Email</h3>
                            <p className="mt-1">{user?.email || 'Not provided'}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                            <p className="mt-1">{user?.phone || 'Not provided'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                          <p className="mt-1">{user?.bio || 'No bio provided'}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Location</h3>
                            <p className="mt-1">{user?.location || 'Not provided'}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Website</h3>
                            <p className="mt-1">
                              {user?.website ? (
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {user.website}
                                </a>
                              ) : 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="academic">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
                          <p className="mt-1">{user?.rollNumber || 'Not provided'}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Branch</h3>
                            <p className="mt-1">{user?.branch || 'Not provided'}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Year</h3>
                            <p className="mt-1">{user?.year || 'Not provided'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Institute</h3>
                          <p className="mt-1">{user?.institute || 'Not provided'}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
