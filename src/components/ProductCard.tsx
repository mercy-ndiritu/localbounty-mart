
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info } from 'lucide-react';
import { Product } from '@/types';
import { getCategoryLabel } from '@/data/mockData';
import { useAppContext } from '@/contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'farm':
        return 'category-farm';
      case 'groceries':
        return 'category-groceries';
      case 'handmade':
        return 'category-handmade';
      default:
        return '';
    }
  };

  return (
    <Card onClick={handleViewDetails} className="product-card cursor-pointer h-full flex flex-col">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className={`category-badge absolute top-2 right-2 ${getCategoryClass(product.category)}`}>
          {getCategoryLabel(product.category)}
        </span>
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-medium mb-1">{product.name}</h3>
        <p className="text-xl font-bold text-market-primary mb-2">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleViewDetails}
        >
          <Info className="h-4 w-4 mr-1" /> Details
        </Button>
        <Button 
          className="flex-1" 
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-1" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
