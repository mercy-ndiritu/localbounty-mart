
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Store, 
  LogIn,
  LogOut,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, userType, logout } = useAppContext();
  const navigate = useNavigate();

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            {userType === 'guest' && (
              <Link to="/subscription" className="text-gray-700 hover:text-market-primary transition-colors">
                Become a Seller
              </Link>
            )}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {userType === 'seller' ? 'Seller Account' : 'My Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userType === 'seller' ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/seller/dashboard')}>
                        <Store className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/seller/products')}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Products
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/seller/orders')}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Orders
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/account')}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/account')}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        My Orders
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              {userType === 'guest' && (
                <Link 
                  to="/subscription" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Become a Seller
                </Link>
              )}
              {userType === 'guest' ? (
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <>
                  {userType === 'seller' ? (
                    <Link 
                      to="/seller/dashboard" 
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Seller Dashboard
                    </Link>
                  ) : (
                    <Link 
                      to="/account" 
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                  )}
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-left"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
