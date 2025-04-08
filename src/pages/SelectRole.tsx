
import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen, Award, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SelectRole = () => {
  const roles = [
    {
      title: "Student",
      icon: <User className="h-12 w-12 mb-4 text-primary" />,
      description: "Register for events, track your participation, and access resources.",
      path: "/signup?role=student"
    },
    {
      title: "Teacher",
      icon: <BookOpen className="h-12 w-12 mb-4 text-primary" />,
      description: "Manage student registrations, events, and track attendance.",
      path: "/signup?role=teacher"
    },
    {
      title: "Committee Member",
      icon: <Award className="h-12 w-12 mb-4 text-primary" />,
      description: "Create and manage events, track participation, and handle approvals.",
      path: "/signup?role=committee"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Select Your Role</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and features tailored for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <Link
              to={role.path}
              key={index}
              className="hover-scale"
            >
              <Card className="h-full flex flex-col bg-white border-2 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto">{role.icon}</div>
                  <CardTitle className="text-xl font-bold">{role.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-center text-base">{role.description}</CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full">Select</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">About CSI</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>About The Computer Society of India</DialogTitle>
              </DialogHeader>
              <DialogDescription className="space-y-4 text-base">
                <p>
                  The Computer Society of India (CSI) is the first and largest body of computer professionals in India. 
                  Formed in 1965, CSI has been instrumental in guiding the Indian IT industry down the right path since its formative years.
                </p>
                <p>
                  Our college's CSI Student Branch provides a platform for students to enhance their technical knowledge, 
                  develop professional skills, and network with industry experts through various activities like workshops, 
                  seminars, technical competitions, and industry visits.
                </p>
                <p>
                  Being a member of CSI gives you access to exclusive technical resources, certification programs, 
                  and opportunities to participate in national-level competitions and conferences. 
                  It also enhances your resume by showcasing your involvement in professional computing societies.
                </p>
                <p>
                  Join TANDEM CSI to stay updated with the latest in technology, develop leadership skills, 
                  and become part of a nationwide network of IT professionals and enthusiasts!
                </p>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* CSI Logo and Description */}
            <div>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-primary mr-2">CSI</span>
                <span className="text-sm text-gray-600">Computer Society of India</span>
              </div>
              <p className="text-sm text-gray-500">
                The premier organization for IT professionals in India, promoting professional competence and knowledge sharing.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-primary">About</Link></li>
                <li><Link to="/events" className="text-gray-600 hover:text-primary">Events</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              </ul>
            </div>

            {/* Member Access */}
            <div>
              <h3 className="font-semibold mb-3">Member Access</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="text-gray-600 hover:text-primary">Sign In</Link></li>
                <li><Link to="/signup" className="text-gray-600 hover:text-primary">Register</Link></li>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-3">Contact Info</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: info@csichapter.edu</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: CSI Student Branch, Engineering College</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} TANDEM - CSI Student Chapter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SelectRole;
