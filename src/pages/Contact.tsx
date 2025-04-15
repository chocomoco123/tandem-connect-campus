
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Linkedin, GitHub, Instagram } from 'lucide-react';

const ContactPage = () => {
  const committeeMembers = [
    {
      name: "Dr. John Smith",
      role: "Faculty Coordinator",
      email: "john.smith@fcrit.ac.in",
      phone: "+91 98765 43210",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Chairperson",
      email: "priya.sharma@fcrit.ac.in",
      phone: "+91 97654 32109",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Rajesh Kumar",
      role: "Secretary",
      email: "rajesh.kumar@fcrit.ac.in",
      phone: "+91 96543 21098",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Ananya Patel",
      role: "Technical Head",
      email: "ananya.patel@fcrit.ac.in",
      phone: "+91 95432 10987",
      image: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      name: "Vikram Singh",
      role: "Event Coordinator",
      email: "vikram.singh@fcrit.ac.in",
      phone: "+91 94321 09876",
      image: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      name: "Neha Gupta",
      role: "Treasurer",
      email: "neha.gupta@fcrit.ac.in",
      phone: "+91 93210 98765",
      image: "https://randomuser.me/api/portraits/women/6.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Reach out to our committee members or visit us at the campus. We'd love to hear from you!
        </p>
      </div>

      {/* Institute Information */}
      <Card className="mb-12 shadow-md border-0 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-2xl font-bold">Fr. C. Rodrigues Institute of Technology</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <p className="text-gray-600">
                  Agnel Technical Education Complex, Sector 9A, Vashi, Navi Mumbai, Maharashtra 400703
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <p className="text-gray-600">+91 22 2777 1000</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-gray-600">principal@fcrit.ac.in</p>
              </div>
              <div className="pt-4 flex space-x-4">
                <a href="https://www.linkedin.com/school/fr.-c.-rodrigues-institute-of-technology/" className="text-gray-500 hover:text-primary smooth-transition">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/fcrit.official/" className="text-gray-500 hover:text-primary smooth-transition">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://github.com/fcrit-csit" className="text-gray-500 hover:text-primary smooth-transition">
                  <GitHub className="h-6 w-6" />
                </a>
              </div>
            </CardContent>
          </div>
          <div className="h-full min-h-[300px] bg-gray-300">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.609480503032!2d72.99272867467618!3d19.077180882108847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6cdd6d5dac1%3A0x20de0f30455e807c!2sFr.%20C.%20Rodrigues%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1681556320135!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="FCRIT Location"
            ></iframe>
          </div>
        </div>
      </Card>

      <h2 className="text-2xl font-bold mb-8 text-center">Committee Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {committeeMembers.map((member, index) => (
          <Card key={index} className="card-shadow card-hover border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-16 w-16 rounded-full border-2 border-primary"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">{member.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">{member.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
