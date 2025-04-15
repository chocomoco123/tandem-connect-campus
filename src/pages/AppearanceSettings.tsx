
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Moon, Sun, Laptop, Check } from 'lucide-react';

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme === 'system' ? 'system default' : newTheme} mode.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Appearance Settings</h1>
      
      <Card className="card-shadow border-0 rounded-2xl">
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize how CSI looks on your device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Light Mode Option */}
            <div 
              className={`relative rounded-xl border-2 p-4 hover:border-primary/70 cursor-pointer transition-all ${
                theme === 'light' ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => handleThemeChange('light')}
            >
              <div className="mb-4 flex justify-center">
                <div className="bg-yellow-100 rounded-full p-3">
                  <Sun className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
              <h3 className="font-medium text-center">Light Mode</h3>
              {theme === 'light' && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Dark Mode Option */}
            <div 
              className={`relative rounded-xl border-2 p-4 hover:border-primary/70 cursor-pointer transition-all ${
                theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => handleThemeChange('dark')}
            >
              <div className="mb-4 flex justify-center">
                <div className="bg-indigo-900 rounded-full p-3">
                  <Moon className="h-8 w-8 text-indigo-300" />
                </div>
              </div>
              <h3 className="font-medium text-center">Dark Mode</h3>
              {theme === 'dark' && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            {/* System Mode Option */}
            <div 
              className={`relative rounded-xl border-2 p-4 hover:border-primary/70 cursor-pointer transition-all ${
                theme === 'system' ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => handleThemeChange('system')}
            >
              <div className="mb-4 flex justify-center">
                <div className="bg-gray-100 rounded-full p-3">
                  <Laptop className="h-8 w-8 text-gray-500" />
                </div>
              </div>
              <h3 className="font-medium text-center">System Default</h3>
              {theme === 'system' && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">About Themes</h3>
            <p className="text-sm text-muted-foreground">
              Light mode uses a bright color scheme ideal for daytime viewing. Dark mode uses a darker palette that's easier on the eyes 
              in low light environments. System default automatically switches between light and dark mode based on your device settings.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-shadow border-0 rounded-2xl mt-8">
        <CardHeader>
          <CardTitle>Font Settings</CardTitle>
          <CardDescription>Change how text appears throughout the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border p-4 hover:border-primary/70 cursor-pointer transition-all">
                <h3 className="text-center font-medium">Default (Poppins)</h3>
                <p className="text-center text-muted-foreground text-sm mt-2">
                  Clean, modern sans-serif font
                </p>
              </div>
              
              <div className="rounded-xl border border-border/30 p-4 cursor-not-allowed opacity-60">
                <h3 className="text-center font-medium">Serif</h3>
                <p className="text-center text-muted-foreground text-sm mt-2">
                  Classic, professional style
                </p>
              </div>
              
              <div className="rounded-xl border border-border/30 p-4 cursor-not-allowed opacity-60">
                <h3 className="text-center font-medium">Monospace</h3>
                <p className="text-center text-muted-foreground text-sm mt-2">
                  Fixed-width technical font
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">
              Font customization will be available in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-shadow border-0 rounded-2xl mt-8">
        <CardHeader>
          <CardTitle>Accent Color</CardTitle>
          <CardDescription>Personalize your interface with a custom accent color</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] ring-2 ring-[#2563EB] ring-offset-2 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-purple-500 opacity-50 cursor-not-allowed"></div>
            <div className="w-8 h-8 rounded-full bg-green-500 opacity-50 cursor-not-allowed"></div>
            <div className="w-8 h-8 rounded-full bg-red-500 opacity-50 cursor-not-allowed"></div>
            <div className="w-8 h-8 rounded-full bg-amber-500 opacity-50 cursor-not-allowed"></div>
            <div className="w-8 h-8 rounded-full bg-pink-500 opacity-50 cursor-not-allowed"></div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Custom accent colors will be available in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
