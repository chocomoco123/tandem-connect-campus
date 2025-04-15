import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  Link as LinkIcon,
  Github, 
  Linkedin, 
  Twitter,
  Instagram,
  Edit
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.profileUrl || '');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    occupation: user?.occupation || '',
    education: user?.education || '',
    website: user?.website || '',
    github: user?.socialLinks?.github || '',
    linkedin: user?.socialLinks?.linkedin || '',
    twitter: user?.socialLinks?.twitter || '',
    instagram: user?.socialLinks?.instagram || '',
  });

  const avatarOptions = [
    '/avatar-1.png',
    '/avatar-2.png',
    '/avatar-3.png',
    '/avatar-4.png',
    '/avatar-5.png',
    '/avatar-6.png',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Pat',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        occupation: formData.occupation,
        education: formData.education,
        website: formData.website,
        profileUrl: avatarUrl,
        socialLinks: {
          github: formData.github,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          instagram: formData.instagram
        }
      };
      
      updateUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 card-shadow border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Profile Preview</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6 relative inline-block">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-3xl bg-primary/20">
                  {formData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="absolute bottom-0 right-0 rounded-full bg-white shadow-md"
                  onClick={() => document.getElementById('avatar-selector').showModal()}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
            <h2 className="text-2xl font-bold">{formData.name || 'Your Name'}</h2>
            <p className="text-primary">{formData.occupation || 'Your Occupation'}</p>
            
            <Separator className="my-4" />
            
            <div className="space-y-3 text-left">
              {formData.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-gray-700">{formData.email}</span>
                </div>
              )}
              
              {formData.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-gray-700">{formData.phone}</span>
                </div>
              )}
              
              {formData.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-gray-700">{formData.location}</span>
                </div>
              )}
              
              {formData.education && (
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-gray-700">{formData.education}</span>
                </div>
              )}
              
              {formData.website && (
                <div className="flex items-center text-sm">
                  <LinkIcon className="h-4 w-4 mr-3 text-gray-500" />
                  <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Personal Website
                  </a>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-center space-x-4 pt-2">
              {formData.github && (
                <a href={formData.github} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-500 hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {formData.linkedin && (
                <a href={formData.linkedin} target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {formData.twitter && (
                <a href={formData.twitter} target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {formData.instagram && (
                <a href={formData.instagram} target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 card-shadow border-0 rounded-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                {isEditing ? 'Edit Profile' : 'Profile Information'}
              </CardTitle>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <Mail className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <Phone className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="Your occupation"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="Your education"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Links & Social Media</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <LinkIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <Github className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <Linkedin className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <Twitter className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                    <div className="flex">
                      <div className="bg-muted p-2 rounded-l-md flex items-center">
                        <Instagram className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        location: user?.location || '',
                        bio: user?.bio || '',
                        occupation: user?.occupation || '',
                        education: user?.education || '',
                        website: user?.website || '',
                        github: user?.socialLinks?.github || '',
                        linkedin: user?.socialLinks?.linkedin || '',
                        twitter: user?.socialLinks?.twitter || '',
                        instagram: user?.socialLinks?.instagram || '',
                      });
                      setAvatarUrl(user?.profileUrl || '');
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      
      <dialog id="avatar-selector" className="modal rounded-xl backdrop:bg-black/50 p-0">
        <div className="modal-box bg-white p-6 rounded-xl max-w-2xl w-full">
          <h3 className="font-bold text-lg mb-4">Choose an Avatar</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {avatarOptions.map((avatar, index) => (
              <div
                key={index}
                className={`p-2 rounded-xl cursor-pointer hover:bg-gray-100 transition ${
                  avatarUrl === avatar ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setAvatarUrl(avatar)}
              >
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-primary/20">
                    {formData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button 
              onClick={() => {
                const dialog = document.getElementById('avatar-selector');
                if (dialog instanceof HTMLDialogElement) {
                  dialog.close();
                }
              }}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileSettings;
