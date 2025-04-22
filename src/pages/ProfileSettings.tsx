
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Save, Camera, Trash2, Link2, Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [institute, setInstitute] = useState(user?.institute || '');
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileUrl || null);
  const [loading, setLoading] = useState(false);
  
  // Social links
  const [twitterLink, setTwitterLink] = useState(user?.socialLinks?.twitter || '');
  const [githubLink, setGithubLink] = useState(user?.socialLinks?.github || '');
  const [linkedinLink, setLinkedinLink] = useState(user?.socialLinks?.linkedin || '');
  const [instagramLink, setInstagramLink] = useState(user?.socialLinks?.instagram || '');
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedProfile = {
        name,
        bio,
        phone,
        institute,
        profileUrl: profileImage,
        socialLinks: {
          twitter: twitterLink,
          github: githubLink,
          linkedin: linkedinLink,
          instagram: instagramLink
        }
      };
      
      await updateProfile(updatedProfile);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      // Navigate back to profile
      navigate('/dashboard/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Image Section */}
        <Card className="border-0 shadow-sm col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Profile Picture</CardTitle>
            <CardDescription>Your public profile image</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profileImage || undefined} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={triggerFileInput}>
                <Camera className="mr-2 h-4 w-4" />
                Upload
              </Button>
              <Button variant="outline" size="sm" onClick={() => setProfileImage(null)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Recommended: Square JPG, PNG.<br />Max size: 1MB.
            </p>
          </CardContent>
        </Card>
        
        {/* Profile Details */}
        <Card className="border-0 shadow-sm col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your full name" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="Your phone number" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institute">Institute/Organization</Label>
                <Input 
                  id="institute"
                  value={institute} 
                  onChange={(e) => setInstitute(e.target.value)} 
                  placeholder="Your institution or organization" 
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Social Links</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Link2 className="mr-2 h-4 w-4" />
                        Manage Links
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Manage Social Links</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                            <Label htmlFor="twitter">Twitter</Label>
                          </div>
                          <Input 
                            id="twitter"
                            value={twitterLink} 
                            onChange={(e) => setTwitterLink(e.target.value)} 
                            placeholder="https://twitter.com/username" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Github className="h-4 w-4 mr-2" />
                            <Label htmlFor="github">GitHub</Label>
                          </div>
                          <Input 
                            id="github"
                            value={githubLink} 
                            onChange={(e) => setGithubLink(e.target.value)} 
                            placeholder="https://github.com/username" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Linkedin className="h-4 w-4 mr-2 text-[#0077B5]" />
                            <Label htmlFor="linkedin">LinkedIn</Label>
                          </div>
                          <Input 
                            id="linkedin"
                            value={linkedinLink} 
                            onChange={(e) => setLinkedinLink(e.target.value)} 
                            placeholder="https://linkedin.com/in/username" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Instagram className="h-4 w-4 mr-2 text-[#E4405F]" />
                            <Label htmlFor="instagram">Instagram</Label>
                          </div>
                          <Input 
                            id="instagram"
                            value={instagramLink} 
                            onChange={(e) => setInstagramLink(e.target.value)} 
                            placeholder="https://instagram.com/username" 
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={twitterLink ? "text-[#1DA1F2]" : "text-muted-foreground"}
                    type="button"
                    onClick={() => window.open(twitterLink, '_blank')}
                    disabled={!twitterLink}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={githubLink ? "" : "text-muted-foreground"}
                    type="button"
                    onClick={() => window.open(githubLink, '_blank')}
                    disabled={!githubLink}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={linkedinLink ? "text-[#0077B5]" : "text-muted-foreground"}
                    type="button"
                    onClick={() => window.open(linkedinLink, '_blank')}
                    disabled={!linkedinLink}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={instagramLink ? "text-[#E4405F]" : "text-muted-foreground"}
                    type="button"
                    onClick={() => window.open(instagramLink, '_blank')}
                    disabled={!instagramLink}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardFooter className="px-0 pt-6">
                <Button type="submit" disabled={loading} className="ml-auto">
                  {loading ? "Saving..." : "Save Changes"}
                  <Save className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
