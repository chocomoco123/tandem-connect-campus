
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Camera, Pencil, Save, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    rollNumber: user?.rollNumber || '',
    branch: user?.branch || '',
    year: user?.year || '',
    bio: user?.bio || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    twitter: user?.twitter || '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would update the user profile in the database
      // For now, we'll simulate a successful update
      // await updateUserProfile(formData);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      // Navigate back to dashboard after successful update
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast({
        title: "Failed to update profile",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profileUrl} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full bg-white hover:bg-gray-100"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle>{user?.name || 'User'}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{user?.role || 'Student'}</span>
                </div>
                {user?.rollNumber && (
                  <div className="text-sm">
                    <span className="font-medium">Roll Number: </span>
                    <span>{user.rollNumber}</span>
                  </div>
                )}
                {user?.branch && (
                  <div className="text-sm">
                    <span className="font-medium">Branch: </span>
                    <span>{user.branch}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">Basic Info</TabsTrigger>
                  <TabsTrigger value="social">Social Links</TabsTrigger>
                  <TabsTrigger value="password">Change Password</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          placeholder="Enter your full name" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="Enter your email"
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rollNumber">Roll Number</Label>
                        <Input 
                          id="rollNumber" 
                          name="rollNumber" 
                          value={formData.rollNumber} 
                          onChange={handleChange} 
                          placeholder="Enter your roll number" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Select
                          value={formData.branch}
                          onValueChange={(value) => handleSelectChange('branch', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Information Technology">Information Technology</SelectItem>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Mechanical">Mechanical</SelectItem>
                            <SelectItem value="Civil">Civil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select
                          value={formData.year}
                          onValueChange={(value) => handleSelectChange('year', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="First Year">First Year</SelectItem>
                            <SelectItem value="Second Year">Second Year</SelectItem>
                            <SelectItem value="Third Year">Third Year</SelectItem>
                            <SelectItem value="Fourth Year">Fourth Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleChange} 
                        placeholder="Tell us a bit about yourself"
                        className="w-full rounded-md border border-input p-2 min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="social">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center" htmlFor="github">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Label>
                      <Input 
                        id="github" 
                        name="github" 
                        value={formData.github} 
                        onChange={handleChange} 
                        placeholder="https://github.com/username" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center" htmlFor="linkedin">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Label>
                      <Input 
                        id="linkedin" 
                        name="linkedin" 
                        value={formData.linkedin} 
                        onChange={handleChange} 
                        placeholder="https://linkedin.com/in/username" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center" htmlFor="twitter">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Label>
                      <Input 
                        id="twitter" 
                        name="twitter" 
                        value={formData.twitter} 
                        onChange={handleChange} 
                        placeholder="https://twitter.com/username" 
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Social Links'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="password">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Change Password</Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
