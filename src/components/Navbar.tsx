
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Store, 
  LogIn 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, userType } = useAppContext();

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and title */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-market-primary rounded-full p-2">
              <Store className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-market-dark">LocalBounty</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-gray-700 hover:text-market-primary transition-colors">
              Browse Products
            </Link>
            <Link to="/sellers" className="text-gray-700 hover:text-market-primary transition-colors">
              Sellers
            </Link>
            <Link to="/subscription" className="text-gray-700 hover:text-market-primary transition-colors">
              Become a Seller
            </Link>
          </div>

          {/* Desktop Right-side buttons */}
          <div className="hidden md:flex items-center gap-4">
            {userType === 'guest' ? (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            ) : (
              <Link to={userType === 'seller' ? "/dashboard" : "/account"}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {userType === 'seller' ? 'Dashboard' : 'My Account'}
                </Button>
              </Link>
            )}
            <Link to="/cart">
              <Button variant="outline" size="sm" className="flex items-center gap-2 relative">
                <ShoppingCart className="h-4 w-4" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-market-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-market-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-white border-t">
            <div className="flex flex-col gap-3">
              <Link 
                to="/products" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Products
              </Link>
              <Link 
                to="/sellers" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sellers
              </Link>
              <Link 
                to="/subscription" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Seller
              </Link>
              {userType === 'guest' ? (
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <Link 
                  to={userType === 'seller' ? "/dashboard" : "/account"} 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {userType === 'seller' ? 'Seller Dashboard' : 'My Account'}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
