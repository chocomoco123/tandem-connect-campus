
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Building, Phone, MapPin, FileText, Briefcase, GraduationCap, Link2, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profileUrl: user?.profileUrl || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    occupation: user?.occupation || '',
    education: user?.education || '',
    website: user?.website || '',
    institute: user?.institute || '',
    rollNumber: user?.rollNumber || '',
    branch: user?.branch || '',
    year: user?.year || '',
    department: user?.department || '',
    position: user?.position || '',
    socialLinks: {
      github: user?.socialLinks?.github || '',
      linkedin: user?.socialLinks?.linkedin || '',
      twitter: user?.socialLinks?.twitter || '',
      instagram: user?.socialLinks?.instagram || '',
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile(formData);
    
    toast({
      title: 'Profile updated',
      description: 'Your profile settings have been updated successfully.',
    });
  };
  
  const generateAvatarFallback = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.profileUrl} alt={formData.name} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {generateAvatarFallback(formData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="mt-2">
                <Input 
                  type="text" 
                  name="profileUrl" 
                  value={formData.profileUrl}
                  onChange={handleChange}
                  placeholder="Avatar URL"
                  className="text-xs text-center"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-gray-500">{formData.email}</p>
              <p className="text-gray-500 capitalize">{user?.role || 'User'}</p>
              
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  {formData.institute}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-medium mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Full Name
                  </Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Email Address
                  </Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    Phone Number
                  </Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    Location
                  </Label>
                  <Input 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    Bio
                  </Label>
                  <Textarea 
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
            {user?.role === 'student' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-medium mb-4">Student Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="institute" className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      Institute
                    </Label>
                    <Input 
                      id="institute"
                      name="institute"
                      value={formData.institute}
                      onChange={handleChange}
                      placeholder="Your institute name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      Roll Number
                    </Label>
                    <Input 
                      id="rollNumber"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="Your roll number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="branch" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      Branch
                    </Label>
                    <Input 
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      placeholder="Your branch"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      Year
                    </Label>
                    <Input 
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="Your year of study"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {user?.role === 'teacher' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-medium mb-4">Teacher Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="institute" className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      Institute
                    </Label>
                    <Input 
                      id="institute"
                      name="institute"
                      value={formData.institute}
                      onChange={handleChange}
                      placeholder="Your institute name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      Department
                    </Label>
                    <Input 
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Your department"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      Position
                    </Label>
                    <Input 
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Your position"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {user?.role === 'committee' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-medium mb-4">Committee Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="institute" className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      Institute
                    </Label>
                    <Input 
                      id="institute"
                      name="institute"
                      value={formData.institute}
                      onChange={handleChange}
                      placeholder="Your institute name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      Position
                    </Label>
                    <Input 
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Your position in committee"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-medium mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    Occupation
                  </Label>
                  <Input 
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Your occupation"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    Education
                  </Label>
                  <Input 
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Your education"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-gray-500" />
                    Website
                  </Label>
                  <Input 
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Your website URL"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-medium mb-4">Social Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="socialLinks.github" className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-gray-500" />
                    GitHub
                  </Label>
                  <Input 
                    id="socialLinks.github"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleChange}
                    placeholder="Your GitHub profile"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="socialLinks.linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-gray-500" />
                    LinkedIn
                  </Label>
                  <Input 
                    id="socialLinks.linkedin"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleChange}
                    placeholder="Your LinkedIn profile"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="socialLinks.twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-gray-500" />
                    Twitter
                  </Label>
                  <Input 
                    id="socialLinks.twitter"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                    placeholder="Your Twitter profile"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="socialLinks.instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-gray-500" />
                    Instagram
                  </Label>
                  <Input 
                    id="socialLinks.instagram"
                    name="socialLinks.instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleChange}
                    placeholder="Your Instagram profile"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-8">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
