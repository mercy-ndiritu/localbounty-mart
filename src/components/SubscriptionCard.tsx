
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface SubscriptionCardProps {
  id: string;
  name: string;
  price: number;
  features: string[];
  productLimit: number;
  isPopular?: boolean;
}

const SubscriptionCard = ({ 
  id, 
  name, 
  price, 
  features, 
  productLimit,
  isPopular = false 
}: SubscriptionCardProps) => {
  const navigate = useNavigate();
  const { userType, subscriptionTier } = useAppContext();
  
  const handleSubscribe = () => {
    // In a real app, this would trigger the payment flow
    // For now, just navigate to the success page with the tier info and current tier
    navigate(`/subscription/success?tier=${id.toLowerCase()}&from=${subscriptionTier}`);
  };

  return (
    <Card className={`relative h-full flex flex-col ${isPopular ? 'border-market-primary shadow-lg' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-market-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <CardContent className="pt-6 flex-grow">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <div className="mb-2">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-gray-500">/month</span>
          </div>
          <p className="text-gray-600">
            {productLimit === -1 ? 'Unlimited products' : `Up to ${productLimit} products`}
          </p>
        </div>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-market-primary mr-2 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4 pb-6">
        <Button 
          className={`w-full ${isPopular ? 'bg-market-primary hover:bg-market-dark' : ''}`}
          variant={isPopular ? "default" : "outline"}
          onClick={handleSubscribe}
        >
          {price === 0 ? 'Start for Free' : 'Subscribe Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
