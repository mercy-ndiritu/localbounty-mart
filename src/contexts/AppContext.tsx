
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, SubscriptionTier, Order, OrderStatus } from '../types';
import { toast } from "@/hooks/use-toast";

interface AppContextType {
  cart: CartItem[];
  userType: 'customer' | 'seller' | 'guest';
  subscriptionTier: SubscriptionTier;
  isAuthenticated: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  setUserType: (type: 'customer' | 'seller' | 'guest') => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  login: (email: string, password: string, userType: 'customer' | 'seller') => Promise<boolean>;
  logout: () => void;
  products?: Product[];
  orders?: Order[];
  addProduct?: (product: Product) => void;
  updateProduct?: (updatedProduct: Product) => void;
  deleteProduct?: (productId: string) => void;
  addOrder?: (order: Order) => void;
  updateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ 
  children,
  products,
  orders,
  addProduct,
  updateProduct,
  deleteProduct,
  addOrder,
  updateOrderStatus
}: { 
  children: ReactNode;
  products?: Product[];
  orders?: Order[];
  addProduct?: (product: Product) => void;
  updateProduct?: (updatedProduct: Product) => void;
  deleteProduct?: (productId: string) => void;
  addOrder?: (order: Order) => void;
  updateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userType, setUserType] = useState<'customer' | 'seller' | 'guest'>('guest');
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('basic');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Login function
  const login = async (email: string, password: string, type: 'customer' | 'seller'): Promise<boolean> => {
    // In a real application, this would validate credentials against a database
    // For now, we'll just simulate a successful login
    setUserType(type);
    setIsAuthenticated(true);
    
    toast({
      title: "Login successful",
      description: `Welcome back! You are now logged in as a ${type}.`,
    });
    
    return true;
  };

  // Logout function
  const logout = () => {
    setUserType('guest');
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Add product to cart
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Update quantity of product in cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Load from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }

    const savedUserType = localStorage.getItem('userType');
    if (savedUserType) {
      setUserType(savedUserType as 'customer' | 'seller' | 'guest');
      setIsAuthenticated(savedUserType !== 'guest');
    }

    const savedSubscriptionTier = localStorage.getItem('subscriptionTier');
    if (savedSubscriptionTier) {
      setSubscriptionTier(savedSubscriptionTier as SubscriptionTier);
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('userType', userType);
    setIsAuthenticated(userType !== 'guest');
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('subscriptionTier', subscriptionTier);
  }, [subscriptionTier]);

  return (
    <AppContext.Provider value={{
      cart,
      userType,
      subscriptionTier,
      isAuthenticated,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      setUserType,
      setSubscriptionTier,
      login,
      logout,
      products,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
