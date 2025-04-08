
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Book, Award, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-3 py-1 text-sm font-medium text-primary bg-blue-50 rounded-full">
                Computer Society of India
              </div>
              <h1 className="text-5xl font-bold tracking-tight">
                Empowering Students Through Technology
              </h1>
              <p className="text-lg text-gray-600">
                Join CSI to enhance your skills, participate in events, and connect with like-minded peers in the tech community.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="bg-[#2563EB] hover:bg-blue-700">
                  <Link to="/select-role" className="flex items-center">
                    Get Started
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Join CSI Today</h2>
                
                <p className="text-gray-600">
                  The Computer Society of India (CSI) is a professional organization dedicated to the advancement of computing and information technology.
                </p>
                
                <p className="text-gray-600">
                  Our mission is to facilitate research, knowledge sharing, and career growth among students and professionals in the computing field.
                </p>
                
                <Button variant="link" className="pl-0 font-medium">
                  <Link to="/about" className="flex items-center">
                    About Our Chapter
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join CSI Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Join CSI?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              CSI offers a range of opportunities to enhance your academic and professional journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Events & Workshops</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>Participate in technical workshops, hackathons, and industry-led sessions.</p>
              </CardContent>
            </Card>
            
            {/* Feature Card 2 */}
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Networking</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>Connect with peers, faculty, and industry professionals in the tech community.</p>
              </CardContent>
            </Card>
            
            {/* Feature Card 3 */}
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Recognition</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>Gain certificates and recognition for participation and achievements.</p>
              </CardContent>
            </Card>
            
            {/* Feature Card 4 */}
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Resources</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>Access study materials, technical resources, and industry insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-[#2563EB] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join TANDEM today and become part of a thriving community of tech enthusiasts and professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="bg-white text-[#2563EB] hover:bg-gray-100">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* CSI Logo and Description */}
            <div>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-[#2563EB] mr-2">CSI</span>
                <span className="text-sm text-gray-600">Computer Society of India</span>
              </div>
              <p className="text-sm text-gray-500">
                Computer Society of India - Student Branch. Connecting students through technology and innovation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-[#2563EB]">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-[#2563EB]">About</Link></li>
                <li><Link to="/events" className="text-gray-600 hover:text-[#2563EB]">Events</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-[#2563EB]">Contact</Link></li>
              </ul>
            </div>

            {/* Member Access */}
            <div>
              <h3 className="font-semibold mb-4">Member Access</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="text-gray-600 hover:text-[#2563EB]">Sign In</Link></li>
                <li><Link to="/signup" className="text-gray-600 hover:text-[#2563EB]">Register</Link></li>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-[#2563EB]">Dashboard</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>College Campus, College Road</li>
                <li>City, State - Pincode</li>
                <li>Email: contact@csiconnect.edu</li>
                <li>Phone: +91 123 456 7890</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Computer Society of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
