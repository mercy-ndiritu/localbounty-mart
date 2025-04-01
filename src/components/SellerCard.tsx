
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Package } from 'lucide-react';
import { Seller } from '@/types';

interface SellerCardProps {
  seller: Seller;
}

const SellerCard = ({ seller }: SellerCardProps) => {
  const navigate = useNavigate();
  
  const getBadgeClass = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 'bg-amber-100 text-amber-800 border border-amber-300';
      case 'standard':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'basic':
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardContent className="pt-6 pb-2 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3">
              <img 
                src={seller.logo || '/placeholder.svg'} 
                alt={seller.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">{seller.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                <span>{seller.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeClass(seller.subscriptionTier)}`}>
            {seller.subscriptionTier.charAt(0).toUpperCase() + seller.subscriptionTier.slice(1)}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {seller.description}
        </p>
        
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{seller.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Package className="h-3 w-3 mr-1" />
            <span>{seller.productCount} Products</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => navigate(`/sellers/${seller.id}`)}
        >
          View Products
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SellerCard;
