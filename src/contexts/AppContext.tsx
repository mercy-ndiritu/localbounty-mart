
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, SubscriptionTier, Order, OrderStatus, ProductCategory, DeliveryOption } from '../types';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

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

// Helper functions to safely cast database values to our specific types
const isValidCategory = (category: string): category is ProductCategory => {
  return ['groceries', 'handmade', 'farm'].includes(category);
};

const isValidDeliveryOption = (option: string): option is DeliveryOption => {
  return ['delivery', 'pickup', 'both'].includes(option);
};

export const AppProvider = ({ 
  children,
  initialProducts,
  orders,
  addProduct: externalAddProduct,
  updateProduct: externalUpdateProduct,
  deleteProduct: externalDeleteProduct,
  addOrder,
  updateOrderStatus
}: { 
  children: ReactNode;
  initialProducts?: Product[];
  orders?: Order[];
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  addOrder?: (order: Order) => void;
  updateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userType, setUserType] = useState<'customer' | 'seller' | 'guest'>('seller');
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('basic');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>(initialProducts || []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      if (data) {
        const formattedProducts = data.map((product: any) => {
          // Safely cast the values from the database
          const category = isValidCategory(product.category) 
            ? product.category as ProductCategory 
            : 'farm';
          
          const deliveryOption = isValidDeliveryOption(product.delivery_option) 
            ? product.delivery_option as DeliveryOption 
            : 'both';
            
          // Ensure price is a number
          const price = typeof product.price === 'string' 
            ? parseFloat(product.price) 
            : typeof product.price === 'number' 
              ? product.price 
              : 0;
            
          return {
            id: product.id || '',
            name: product.name || '',
            description: product.description || '',
            price: price,
            image: product.image || '/placeholder.svg',
            category: category,
            sellerId: product.seller_id || '',
            stock: Number(product.stock) || 0,
            deliveryOption: deliveryOption,
            createdAt: product.created_at || new Date().toISOString(),
            updatedAt: product.updated_at || new Date().toISOString()
          };
        });
        
        setProducts(formattedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error loading products",
        description: "Could not load products from the database.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProducts()
      .catch(err => {
        console.error('Failed to fetch products on initial load:', err);
      });
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
    externalAddProduct(product);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    externalUpdateProduct(updatedProduct);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    externalDeleteProduct(productId);
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

  // Ensure we fetch products on initial load
  useEffect(() => {
    fetchProducts()
      .catch(err => {
        console.error('Failed to fetch products:', err);
      });
  }, []);

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
