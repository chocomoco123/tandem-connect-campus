
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { EyeIcon, EyeOffIcon, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const role = userType as "student" | "teacher" | "committee";
      await signup(email, password, name, role);
      
      // Navigation is handled in AuthContext after successful signup
    } catch (error) {
      console.error("Signup error:", error);
      // Error toast is shown in AuthContext
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="border shadow-lg rounded-2xl overflow-hidden">
          <motion.div variants={itemVariants}>
            <CardHeader className="space-y-1 text-center bg-primary/10 dark:bg-primary/5 p-6">
              <CardTitle className="text-2xl font-bold text-primary">Create an Account</CardTitle>
              <CardDescription className="text-muted-foreground">Join CSI Connect today</CardDescription>
            </CardHeader>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="student" className="w-full" onValueChange={setUserType}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="committee">Committee</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="bg-white dark:bg-slate-800"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="bg-white dark:bg-slate-800"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="pr-10 bg-white dark:bg-slate-800"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="pr-10 bg-white dark:bg-slate-800"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Password must be at least 8 characters and include uppercase, lowercase, number and special character.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : "Create Account"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          
          <motion.div variants={itemVariants}>
            <CardFooter className="flex flex-col space-y-4 border-t p-6 bg-muted/30">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in instead
                </Link>
              </div>
              
              <div className="text-center text-xs text-muted-foreground">
                By creating an account, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
              </div>
            </CardFooter>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
