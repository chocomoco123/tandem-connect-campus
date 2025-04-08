
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Book, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tandem-blue/5 via-tandem-indigo/5 to-tandem-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Welcome to <span className="text-gradient">TANDEM</span>
              </h1>
              <p className="text-xl text-gray-600">
                The Computer Society of India's official registration platform for students, teachers, and committee members.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/signup">
                    Get Started 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/events">Explore Events</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-tandem-blue/20 via-tandem-indigo/20 to-tandem-purple/20 rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-tandem-purple/20 via-tandem-indigo/20 to-tandem-blue/20 rounded-lg transform -rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="College students collaborating" 
                className="relative z-10 w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join CSI Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Join CSI?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits of becoming a part of India's largest association of IT professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Students */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover-scale">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Book className="h-6 w-6 text-tandem-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Students</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-blue">•</span>
                  <span>Access to workshops & technical events</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-blue">•</span>
                  <span>Networking with industry professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-blue">•</span>
                  <span>Certifications & skill development</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-blue">•</span>
                  <span>Leadership opportunities</span>
                </li>
              </ul>
            </div>
            
            {/* For Teachers */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover-scale">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-tandem-indigo" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Teachers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-indigo">•</span>
                  <span>Research opportunities & collaborations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-indigo">•</span>
                  <span>Professional development programs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-indigo">•</span>
                  <span>Industry-academia connections</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-indigo">•</span>
                  <span>Access to CSI journals & publications</span>
                </li>
              </ul>
            </div>
            
            {/* For Committee Members */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover-scale">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-tandem-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Committee Members</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-purple">•</span>
                  <span>Leadership & management experience</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-purple">•</span>
                  <span>Event organization opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-purple">•</span>
                  <span>Network with other CSI chapters</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-tandem-purple">•</span>
                  <span>Access to CSI resources & support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
              <p className="mt-4 text-xl text-gray-600">
                Don't miss out on our exciting events and workshops
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link to="/events">
                View All Events
                <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover-scale">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-tandem-blue mb-2">May 15, 2025</div>
                <h3 className="text-xl font-bold mb-2">Web Development Workshop</h3>
                <p className="text-gray-600 mb-4">Learn the fundamentals of modern web development with React and Node.js.</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/events/web-dev-workshop">Learn More</Link>
                </Button>
              </div>
            </div>
            
            {/* Event Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover-scale">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80" 
                  alt="Hackathon" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-tandem-indigo mb-2">June 5-7, 2025</div>
                <h3 className="text-xl font-bold mb-2">48-Hour Hackathon</h3>
                <p className="text-gray-600 mb-4">Join us for a weekend of coding, innovation, and prizes at our annual hackathon.</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/events/hackathon">Learn More</Link>
                </Button>
              </div>
            </div>
            
            {/* Event Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover-scale">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Tech Talk" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-tandem-purple mb-2">July 12, 2025</div>
                <h3 className="text-xl font-bold mb-2">AI in Education Seminar</h3>
                <p className="text-gray-600 mb-4">Explore how artificial intelligence is transforming education and learning.</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/events/ai-education">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-tandem-blue to-tandem-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join TANDEM today and become part of a thriving community of tech enthusiasts and professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">TANDEM</h3>
              <p className="text-sm">
                The official platform for CSI events and registrations at our college.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-sm hover:text-white">About</Link></li>
                <li><Link to="/events" className="text-sm hover:text-white">Events</Link></li>
                <li><Link to="/login" className="text-sm hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: csi@college.edu</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: College Campus, City</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Location</h3>
              <div className="h-40 bg-gray-800 rounded-lg">
                {/* Embed map placeholder */}
                <div className="w-full h-full flex items-center justify-center text-sm">
                  Interactive Map Coming Soon
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-4 border-t border-gray-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} TANDEM - CSI Registration Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
