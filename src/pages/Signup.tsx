
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

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = async (e) => {
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
    
    setLoading(true);
    
    try {
      // Fix: Pass correct parameters in the right order (email, password, name, role)
      // The type is explicitly cast to one of the allowed role types
      const role = userType as "student" | "teacher" | "committee";
      await signup(email, password, name, role);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-primary/10 dark:bg-primary/5 p-6">
          <CardTitle className="text-2xl font-bold text-primary">Create an Account</CardTitle>
          <CardDescription className="text-muted-foreground">Join CSI Connect today</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="student" className="w-full" onValueChange={setUserType}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="committee">Committee</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="bg-white dark:bg-slate-800"
              />
            </div>
            
            <div className="space-y-2">
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
            </div>
            
            <div className="space-y-2">
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
            </div>
            
            <div className="space-y-2">
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
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Password must be at least 8 characters and include uppercase, lowercase, number and special character.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        
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
      </Card>
    </div>
  );
};

export default Signup;
