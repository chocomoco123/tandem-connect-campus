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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          try {
            // Get user profile data
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser({
                id: session.user.id,
                email: session.user.email!,
                name: profile.full_name,
                role: profile.role,
                department: profile.department
              });
            }

            // Log session start
            await supabase.rpc('start_session', {
              device_info: navigator.userAgent
            });
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        } else {
          setUser(null);
        }
      }
    );

    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              setUser({
                id: session.user.id,
                email: session.user.email!,
                name: profile.full_name,
                role: profile.role,
                department: profile.department
              });
            }
          });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Log the login activity
      await supabase.rpc('log_activity', {
        action: 'user.login',
        details: { email }
      });

      toast({
        title: "Success",
        description: "You have successfully logged in",
      });

      // Navigate based on user role
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile?.role) {
          navigate('/dashboard');
        }
      }
    } catch (err) {
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

      // Log the signup activity
      await supabase.rpc('log_activity', {
        action: 'user.signup',
        details: { email, role }
      });

      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (err) {
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
      // Log the logout activity before signing out
      await supabase.rpc('log_activity', {
        action: 'user.logout'
      });

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      navigate('/login');
    } catch (err) {
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
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: userData.name,
            department: userData.department,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) throw error;

        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);

        // Log the profile update activity
        await supabase.rpc('log_activity', {
          action: 'user.profile_update',
          details: userData
        });

        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
      } catch (err) {
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
