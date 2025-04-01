
import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8 mt-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-market-dark">LocalBounty</h3>
            <p className="text-gray-600 mb-4">
              Connecting local sellers with customers who appreciate quality products from their community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-market-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-market-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-market-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-market-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-market-dark">For Customers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-market-primary">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/sellers" className="text-gray-600 hover:text-market-primary">
                  Find Sellers
                </Link>
              </li>
              <li>
                <Link to="/delivery-info" className="text-gray-600 hover:text-market-primary">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-market-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-market-dark">For Sellers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/subscription" className="text-gray-600 hover:text-market-primary">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link to="/seller-guide" className="text-gray-600 hover:text-market-primary">
                  How to Sell
                </Link>
              </li>
              <li>
                <Link to="/seller-login" className="text-gray-600 hover:text-market-primary">
                  Seller Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-market-dark">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-market-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-market-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-market-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-market-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} LocalBounty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
