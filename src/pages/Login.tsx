
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Login and get the user with their role
      await login(email, password);
      
      // Navigation to dashboard is handled in the AuthContext after successful login
    } catch (error) {
      console.error("Login error:", error);
      // Error toast is shown in AuthContext
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">Sign in to your CSI account</CardDescription>
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
            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 bg-white dark:bg-slate-800"
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
                <div className="text-right text-sm">
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
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
                      Signing in...
                    </div>
                  ) : "Sign In"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          
          <motion.div variants={itemVariants}>
            <CardFooter className="flex flex-col space-y-4 border-t p-6 bg-muted/30">
              <div className="text-center text-sm">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
