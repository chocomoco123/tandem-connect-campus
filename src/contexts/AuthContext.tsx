
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'student' | 'teacher' | 'committee' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  profileUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // This is a mock implementation. When integrated with Supabase,
  // we'll replace this with actual Supabase auth calls.
  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('tandem_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Mock login - replace with Supabase auth
      const mockUser: User = {
        id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
        email,
        role,
        name: email.split('@')[0],
      };
      localStorage.setItem('tandem_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: UserRole, name: string) => {
    setLoading(true);
    try {
      // Mock signup - replace with Supabase auth
      const mockUser: User = {
        id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
        email,
        role,
        name,
      };
      localStorage.setItem('tandem_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Mock logout - replace with Supabase auth
      localStorage.removeItem('tandem_user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
