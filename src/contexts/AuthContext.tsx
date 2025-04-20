
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock login - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random role for demo purposes - in a real app, this would come from the backend
      const roles: ('student' | 'teacher' | 'committee')[] = ['student', 'teacher', 'committee'];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      
      // Create a mock user
      const loggedInUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
        role: randomRole,
        profileUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'student' | 'teacher' | 'committee') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock signup - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        profileUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Mock logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
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
