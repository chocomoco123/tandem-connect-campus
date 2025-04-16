
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
  socialLinks?: SocialLinks;
  rollNumber?: string;
  branch?: string;
  year?: string;
  institute?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'student' | 'teacher' | 'committee') => Promise<void>;
  isLoading: boolean;
  error: string | null;
  updateUser: (userData: User) => void;
  updateProfile: (userData: Partial<User>) => void;
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
      
      // Simulate user found
      if (email === 'demo@example.com' && password === 'password') {
        const loggedInUser: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'student',
          profileUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
          rollNumber: 'CSI2023001',
          branch: 'Computer Science',
          year: '3rd Year',
          institute: 'Fr. C. Rodrigues Institute of Technology, Vashi',
        };
        
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'student' | 'teacher' | 'committee') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock signup - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user with role-specific fields
      let newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        profileUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        institute: 'Fr. C. Rodrigues Institute of Technology, Vashi',
      };
      
      // Add role-specific fields
      if (role === 'student') {
        newUser = {
          ...newUser,
          rollNumber: `CSI${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`,
          branch: 'Computer Science',
          year: '2nd Year',
        };
      } else if (role === 'teacher') {
        newUser = {
          ...newUser,
          department: 'Computer Science Department',
          position: 'Assistant Professor',
        };
      } else if (role === 'committee') {
        newUser = {
          ...newUser,
          position: 'Committee Member',
        };
      }
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
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
  
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    isLoading,
    error,
    updateUser,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
