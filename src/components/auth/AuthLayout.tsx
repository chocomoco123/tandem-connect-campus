
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  role: 'student' | 'teacher' | 'committee';
  isLogin?: boolean;
}

const AuthLayout = ({ children, title, subtitle, role, isLogin = true }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">CSI CONNECT</h1>
          <p className="mt-2 text-blue-100">Computer Society of India - Student Chapter</p>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            {role === 'student' ? 'Student Portal' : 
             role === 'teacher' ? 'Teacher Portal' : 'Committee Portal'}
          </h2>
          <p className="text-lg text-blue-100">
            {role === 'student' ? 'Access event registrations, track your activities, and connect with the CSI community.' : 
             role === 'teacher' ? 'Manage student registrations, track attendance, and oversee CSI events.' : 
             'Create and manage events, handle registrations, and coordinate committee activities.'}
          </p>
        </div>
        
        <div className="text-sm text-blue-200">
          &copy; {new Date().getFullYear()} CSI Connect. All rights reserved.
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="text-center">
            {isLogin ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to={`/signup?role=${role}`} className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to={`/login?role=${role}`} className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            )}
          </div>
          
          <div className="pt-4 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
