import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileUrl, setProfileUrl] = useState(user?.profileUrl || '');
  const [website, setWebsite] = useState(user?.website || '');
  
  // Create an empty socialLinks object if it doesn't exist
  const socialLinks = user?.socialLinks || {};

  const [githubLink, setGithubLink] = useState(socialLinks.github || '');
  const [linkedinLink, setLinkedinLink] = useState(socialLinks.linkedin || '');
  const [twitterLink, setTwitterLink] = useState(socialLinks.twitter || '');
  
  const handleSave = () => {
    updateProfile({
      name,
      email,
      phone,
      location,
      bio,
      profileUrl,
      website,
      socialLinks: {
        github: githubLink,
        linkedin: linkedinLink,
        twitter: twitterLink
      }
    });
    
    toast({
      title: "Success",
      description: "Your profile has been updated.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Profile Settings</h1>
        
        <div className="space-y-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your basic information.</p>
              
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1">
                    <Input 
                      type="text" 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="mt-1">
                    <Input 
                      type="email" 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1">
                    <Input 
                      type="tel" 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1">
                    <Input 
                      type="text" 
                      id="location" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                  <div className="mt-1">
                    <textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      rows={3} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Picture</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Update your profile picture.</p>
              
              <div className="mt-6 flex items-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profileUrl} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {name ? name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="ml-4">
                  <label htmlFor="profile-photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Input
                      type="url"
                      name="profile-photo"
                      id="profile-photo"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Website & Social Links</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Add links to your website and social media profiles.</p>
              
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                  <div className="mt-1">
                    <Input 
                      type="url" 
                      id="website" 
                      value={website} 
                      onChange={(e) => setWebsite(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub</label>
                  <div className="mt-1">
                    <Input 
                      type="url" 
                      id="github" 
                      value={githubLink} 
                      onChange={(e) => setGithubLink(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
                  <div className="mt-1">
                    <Input 
                      type="url" 
                      id="linkedin" 
                      value={linkedinLink} 
                      onChange={(e) => setLinkedinLink(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                      placeholder="https://www.linkedin.com/in/username"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
                  <div className="mt-1">
                    <Input 
                      type="url" 
                      id="twitter" 
                      value={twitterLink} 
                      onChange={(e) => setTwitterLink(e.target.value)} 
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-5">
            <div className="flex justify-end">
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
