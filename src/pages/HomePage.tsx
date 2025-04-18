
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Truck, Users, ThumbsUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SellerCard from '@/components/SellerCard';
import { PRODUCTS, SELLERS } from '@/data/mockData';

const HomePage = () => {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.slice(0, 4);
  const featuredSellers = SELLERS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-4 md:py-20 bg-gradient-to-br from-market-light to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-market-dark">
                Fresh from your <span className="text-market-primary">local community</span>
              </h1>
              <p className="text-lg mb-6 text-gray-700">
                Discover and shop quality groceries, fresh farm produce and handmade products from local sellers in your neighborhood.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-market-primary hover:bg-market-dark text-white px-8 py-6 text-lg"
                  onClick={() => navigate('/products')}
                >
                  Shop Now
                </Button>
                <Button 
                  className="bg-white text-market-primary border border-market-primary hover:bg-market-light px-8 py-6 text-lg"
                  variant="outline"
                  onClick={() => navigate('/subscription')}
                >
                  Become a Seller
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <img 
                  src="/images/homepage2.png" 
                  alt="Fresh local products" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-5 -left-5 bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex items-center text-market-primary">
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    <span className="font-bold">Support local businesses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-market-dark">
            Why Choose <span className="text-market-primary">LocalBounty</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-market-light p-4 rounded-full inline-flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-market-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Local Products</h3>
              <p className="text-gray-600">
                Fresh groceries, farm produce and handmade items from your local community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-market-light p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-market-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenient Delivery Options</h3>
              <p className="text-gray-600">
                Choose between home delivery or pickup at your convenience.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-market-light p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-market-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Local Sellers</h3>
              <p className="text-gray-600">
                Help your community thrive by supporting local businesses and artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-market-dark">Featured Products</h2>
            <Button 
              variant="outline" 
              className="text-market-primary border-market-primary hover:bg-market-light"
              onClick={() => navigate('/products')}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-market-dark">Popular Sellers</h2>
            <Button 
              variant="outline" 
              className="text-market-primary border-market-primary hover:bg-market-light"
              onClick={() => navigate('/sellers')}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSellers.map(seller => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-market-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Selling Your Products Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community of local sellers and reach more customers in your area.
            Choose a subscription plan that works for your business.
          </p>
          <Button 
            size="lg"
            className="bg-white text-market-primary hover:bg-gray-100"
            onClick={() => navigate('/subscription')}
          >
            Explore Subscription Plans
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
