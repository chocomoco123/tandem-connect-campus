
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Sparkles, Star, Users, Heart } from 'lucide-react';

const AboutDialog = () => {
  return (
    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
      <DialogHeader className="text-center mb-4">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">About CSI-IT FCRIT</DialogTitle>
        <DialogDescription className="text-gray-500 dark:text-gray-400">
          Learn more about our organization and mission
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-8">
        {/* Mission Section */}
        <section className="animate-fade-in">
          <h3 className="text-xl font-bold text-primary mb-2">Our Mission</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            CSI-IT FCRIT (Computer Society of India - Information Technology, FR. C. Rodrigues Institute of Technology) 
            is dedicated to fostering a community of tech enthusiasts, developers, and innovators. We aim to bridge 
            the gap between academic learning and industry requirements by providing platforms for knowledge exchange, 
            skill development, and networking opportunities.
          </p>
        </section>
        
        <Separator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* What We Do Section */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-xl font-bold text-primary mb-2">What We Do</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            CSI-IT FCRIT organizes a wide range of activities to promote technical excellence and professional 
            development among students:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 leading-relaxed">
            <li>Technical workshops and hands-on sessions on cutting-edge technologies</li>
            <li>Guest lectures by industry experts and academic professionals</li>
            <li>Coding competitions, hackathons, and technical quizzes</li>
            <li>Industry visits and exposure to real-world tech environments</li>
            <li>Publication of technical journals and research papers</li>
            <li>Networking events connecting students with industry professionals</li>
          </ul>
        </section>
        
        <Separator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* Vision Section */}
        <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-xl font-bold text-primary mb-2">Our Vision</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our vision is to create a vibrant community of technology professionals who contribute to the advancement 
            of information technology and its applications across various domains. We envision a platform where students 
            can explore, learn, innovate, and excel in their technical pursuits, preparing them for successful careers 
            in the ever-evolving tech industry.
          </p>
        </section>
        
        <Separator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* Core Values Section */}
        <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <h3 className="text-xl font-bold text-primary mb-4">Core Values</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover-scale bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700/80 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Innovation</CardTitle>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We encourage creative thinking and innovative approaches to problem-solving, fostering a culture 
                  of continuous improvement and exploration.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700/80 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Excellence</CardTitle>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We strive for excellence in all our endeavors, maintaining high standards in both technical content 
                  and organizational efficiency.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700/80 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Collaboration</CardTitle>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We believe in the power of teamwork and collaboration, creating environments where ideas are shared 
                  and collective wisdom is harnessed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700/80 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Inclusivity</CardTitle>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We are committed to creating an inclusive community that welcomes diversity in thought, background, 
                  and expertise.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Separator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* History Section */}
        <section className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <h3 className="text-xl font-bold text-primary mb-2">History</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            CSI-IT FCRIT was established with the aim of enhancing the technical knowledge and skills of students in 
            the field of information technology. Over the years, we have grown into a dynamic organization with a 
            strong presence in technical education and industry connections. Our journey has been marked by successful 
            events, growing participation, and meaningful contributions to the tech community.
          </p>
        </section>
      </div>
    </DialogContent>
  );
};

export default AboutDialog;
