import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, SubscriptionTier, Order, OrderStatus } from '../types';
import { toast } from "@/components/ui/use-toast";

const API_URL = 'http://localhost:5000/api';

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
  products: Product[];
  fetchProducts: () => Promise<void>;
  orders?: Order[];
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  addOrder?: (order: Order) => void;
  updateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ 
  children,
  initialProducts,
  orders,
  addOrder,
  updateOrderStatus
}: { 
  children: ReactNode;
  initialProducts?: Product[];
  orders?: Order[];
  addOrder?: (order: Order) => void;
  updateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userType, setUserType] = useState<'customer' | 'seller' | 'guest'>('guest');
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('basic');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(initialProducts || []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return products;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const login = async (email: string, password: string, type: 'customer' | 'seller'): Promise<boolean> => {
    setUserType(type);
    setIsAuthenticated(true);
    
    toast({
      title: "Login successful",
      description: `Welcome back! You are now logged in as a ${type}.`,
    });
    
    return true;
  };

  const logout = () => {
    setUserType('guest');
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

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

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

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

  const clearCart = () => {
    setCart([]);
  };

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
      fetchProducts,
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
