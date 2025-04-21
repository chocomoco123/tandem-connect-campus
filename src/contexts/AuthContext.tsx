
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'committee';
  profileUrl?: string;
  phone?: string;
  location?: string;
  bio?: string;
  occupation?: string;
  education?: string;
  website?: string;
  rollNumber?: string;
  department?: string;
  year?: string;
  socialLinks?: SocialLinks;
}

interface ProfileRow {
  id: string;
  full_name: string | null;
  role: 'student' | 'teacher' | 'committee';
  avatar_url?: string | null;
  phone?: string | null;
  bio?: string | null;
  location?: string | null;
  education?: string | null;
  occupation?: string | null;
  website?: string | null;
  roll_number?: string | null;
  department?: string | null;
  year?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'student' | 'teacher' | 'committee') => Promise<void>;
  isLoading: boolean;
  error: string | null;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize auth state and listen for changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from<ProfileRow>('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        throw error;
      }
      if (!profile) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();

      setUser({
        id: userId,
        email: userData.user?.email || '',
        name: profile.full_name || '',
        role: profile.role,
        profileUrl: profile.avatar_url || undefined,
        department: profile.department || undefined,
        phone: profile.phone || undefined,
        bio: profile.bio || undefined,
        location: profile.location || undefined,
        education: profile.education || undefined,
        occupation: profile.occupation || undefined,
        website: profile.website || undefined,
        rollNumber: profile.roll_number || undefined,
        year: profile.year || undefined,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      await supabase.rpc('log_activity', {
        action: 'user.login',
        details: { email }
      });

      toast({
        title: "Success",
        description: "You have successfully logged in",
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'An error occurred during login',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'student' | 'teacher' | 'committee') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });

      if (data.user) {
        try {
          await supabase.rpc('log_activity', {
            action: 'user.signup',
            details: { email, role }
          });
        } catch (logError) {
          console.error('Failed to log activity:', logError);
        }
        
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'An error occurred during signup',
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      await supabase.rpc('log_activity', {
        action: 'user.logout'
      });

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      navigate('/login');
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'An error occurred during logout',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      try {
        const updates = {
          ...(userData.name && { full_name: userData.name }),
          ...(userData.department && { department: userData.department }),
          ...(userData.phone && { phone: userData.phone }),
          ...(userData.bio && { bio: userData.bio }),
          ...(userData.location && { location: userData.location }),
          ...(userData.education && { education: userData.education }),
          ...(userData.occupation && { occupation: userData.occupation }),
          ...(userData.website && { website: userData.website }),
          ...(userData.rollNumber && { roll_number: userData.rollNumber }),
          ...(userData.year && { year: userData.year }),
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);

        if (error) throw error;

        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);

        await supabase.rpc('log_activity', {
          action: 'user.profile_update',
          details: updates
        });

        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
      } catch (err: any) {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : 'Failed to update profile',
          variant: "destructive",
        });
      }
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading,
    error,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
