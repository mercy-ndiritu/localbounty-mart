
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  Tag, 
  BarChart4, 
  Archive, 
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const SubscriptionSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserType } = useAppContext();
  
  // Get the tier from the URL query params or default to 'standard'
  const searchParams = new URLSearchParams(location.search);
  const tier = searchParams.get('tier') || 'standard';
  const fromTier = searchParams.get('from') || 'basic';
  
  // Update the user type in the context
  useEffect(() => {
    setUserType('seller');
    // In a real app, this would also update the subscription tier in the user profile
  }, [setUserType]);

  // Features unlocked with Standard tier
  const newFeatures = [
    {
      name: 'Advanced Analytics',
      description: 'Gain deeper insights with detailed customer data and sales forecasting',
      icon: <BarChart4 className="h-5 w-5 text-market-primary" />,
    },
    {
      name: 'Promotional Tools',
      description: 'Create discounts and special offers for your products',
      icon: <Tag className="h-5 w-5 text-market-primary" />,
    },
    {
      name: 'Featured Products',
      description: 'Highlight up to 2 products in search and browse pages',
      icon: <Archive className="h-5 w-5 text-market-primary" />,
    },
    {
      name: 'Expanded Product Limit',
      description: 'List up to 50 products (up from 10)',
      icon: <Calendar className="h-5 w-5 text-market-primary" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome to {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan!</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {fromTier === 'basic' 
            ? "You've successfully upgraded your seller account. Enjoy these new features:" 
            : "Your subscription has been activated. Here's what you can do:"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {newFeatures.map((feature) => (
          <Card key={feature.name} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-market-light">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8 border-market-primary bg-market-light/20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-medium mb-3">What's Next?</h3>
            <p className="text-gray-600 mb-4">
              Explore your new features and start growing your business with enhanced tools.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6 gap-4">
          <Button 
            className="bg-market-primary hover:bg-market-dark"
            onClick={() => navigate('/seller/dashboard')}
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/seller/products')}
          >
            Manage Products <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionSuccessPage;
