
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Truck, 
  Store, 
  Package, 
  Clock, 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart 
} from 'lucide-react';
import { PRODUCTS, SELLERS, getDeliveryLabel, getCategoryLabel } from '@/data/mockData';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  
  const product = PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>View All Products</Button>
      </div>
    );
  }
  
  const seller = SELLERS.find(s => s.id === product.sellerId);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-market-primary">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/products" className="text-sm text-gray-500 hover:text-market-primary">Products</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-700">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <span className={`category-badge ${product.category === 'farm' 
            ? 'category-farm' 
            : product.category === 'groceries' 
              ? 'category-groceries' 
              : 'category-handmade'
          }`}>
            {getCategoryLabel(product.category)}
          </span>
          
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="text-2xl font-bold text-market-primary mr-3">
              ${product.price.toFixed(2)}
            </div>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              In Stock: {product.stock}
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6 text-gray-600">
            <div className="mr-4 flex items-center">
              {product.deliveryOption === 'delivery' || product.deliveryOption === 'both' ? (
                <Truck className="h-5 w-5 mr-1 text-market-primary" />
              ) : (
                <Store className="h-5 w-5 mr-1 text-market-primary" />
              )}
              <span>{getDeliveryLabel(product.deliveryOption)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1 text-market-primary" />
              <span>Estimated delivery: 1-2 days</span>
            </div>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-3">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-1 border-x">{quantity}</span>
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            className="w-full mb-6 py-6 text-lg" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          
          {/* Seller Information */}
          {seller && (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 mr-3">
                    <img 
                      src={seller.logo || '/placeholder.svg'} 
                      alt={seller.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{seller.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                      <span>{seller.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/sellers/${seller.id}`)}
                >
                  View Seller
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
