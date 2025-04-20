
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    occupation: user?.occupation || '',
    education: user?.education || '',
    website: user?.website || '',
    rollNumber: user?.rollNumber || '',
    department: user?.department || '',
    year: user?.year || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
    });
  };
  
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="Enter your email" 
                    disabled 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="Enter your phone number" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange}
                    placeholder="Enter your location" 
                  />
                </div>
                
                {user?.role === "student" && (
                  <>
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
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department" 
                        name="department" 
                        value={formData.department} 
                        onChange={handleChange}
                        placeholder="Enter your department" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input 
                        id="year" 
                        name="year" 
                        value={formData.year} 
                        onChange={handleChange}
                        placeholder="Enter your academic year" 
                      />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input 
                    id="occupation" 
                    name="occupation" 
                    value={formData.occupation} 
                    onChange={handleChange}
                    placeholder="Enter your occupation" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input 
                    id="education" 
                    name="education" 
                    value={formData.education} 
                    onChange={handleChange}
                    placeholder="Enter your education" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleChange}
                    placeholder="Enter your website" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange}
                  placeholder="Write something about yourself" 
                  className="min-h-[100px]" 
                />
              </div>
              
              <Button type="submit" className="w-full">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
