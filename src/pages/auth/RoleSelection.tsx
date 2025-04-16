
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Users, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleSelectionProps {
  isLogin: boolean;
}

const RoleSelection = ({ isLogin }: RoleSelectionProps) => {
  const action = isLogin ? 'Login' : 'Signup';
  const actionPath = isLogin ? 'login' : 'signup';
  
  const roles = [
    {
      title: 'Student',
      description: 'Join as a student to register for events and access resources',
      icon: User,
      path: `/auth/${actionPath}/student`,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Teacher',
      description: 'Join as a teacher to manage student activities and oversee events',
      icon: Users,
      path: `/auth/${actionPath}/teacher`,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Committee',
      description: 'Join as a committee member to create and manage CSI events',
      icon: Award,
      path: `/auth/${actionPath}/committee`,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to CSI CONNECT</h1>
          <p className="text-gray-600 mt-2">Please select your role to {isLogin ? 'login' : 'create an account'}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card key={role.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`${role.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={role.path}>{action} as {role.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
            <Link to={isLogin ? '/auth/signup' : '/auth/login'} className="text-blue-600 hover:underline font-medium">
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
