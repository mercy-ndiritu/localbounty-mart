
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/hooks/use-toast";
import { useAppContext } from '@/contexts/AppContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'seller'>('customer');
  const navigate = useNavigate();
  const { setUserType: setContextUserType } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would validate credentials against the database
    if (email && password) {
      // Set the user type in the context
      setContextUserType(userType);
      
      toast({
        title: "Login successful",
        description: `Welcome back! You are now logged in as a ${userType}.`,
      });
      
      // Redirect based on user type
      if (userType === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/products');
      }
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to LocalBounty</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="customer" className="w-full" onValueChange={(value) => setUserType(value as 'customer' | 'seller')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Shopper</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="customer" className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input 
                    id="customer-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <Input 
                    id="customer-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">Login as Shopper</Button>
              </form>
            </TabsContent>
            <TabsContent value="seller" className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seller-email">Email</Label>
                  <Input 
                    id="seller-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-password">Password</Label>
                  <Input 
                    id="seller-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">Login as Seller</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            Don't have an account? {' '}
            <Button 
              variant="link" 
              className="p-0" 
              onClick={() => navigate('/subscription')}
            >
              Register
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
