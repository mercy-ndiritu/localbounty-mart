
import { Product, Seller, ProductCategory } from '../types';

export const SUBSCRIPTION_TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    productLimit: 10,
    features: [
      'List up to 10 products',
      'Basic product pages',
      'Standard search visibility'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 29.99,
    productLimit: 50,
    features: [
      'List up to 50 products',
      'Enhanced product pages',
      'Priority search visibility',
      'Basic analytics',
      'Promotional features'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99.99,
    productLimit: -1, // Unlimited
    features: [
      'Unlimited product listings',
      'Premium product pages',
      'Top search visibility',
      'Advanced analytics',
      'Marketing support',
      'Featured seller status',
      'Early access to new features'
    ]
  }
];

export const SELLERS: Seller[] = [
  {
    id: 's1',
    name: 'Green Valley Farm',
    description: 'Organic farm fresh produce directly from our fields to your table.',
    logo: '/placeholder.svg',
    subscriptionTier: 'premium',
    productCount: 24,
    location: 'Riverside County',
    rating: 4.8
  },
  {
    id: 's2',
    name: 'Artisan Bakery',
    description: 'Freshly baked goods using traditional recipes and organic ingredients.',
    logo: '/placeholder.svg',
    subscriptionTier: 'standard',
    productCount: 16,
    location: 'Downtown',
    rating: 4.9
  },
  {
    id: 's3',
    name: 'Homemade Craft Co.',
    description: 'Unique handmade crafts and home goods made with love.',
    logo: '/placeholder.svg',
    subscriptionTier: 'basic',
    productCount: 8,
    location: 'Eastside',
    rating: 4.7
  },
  {
    id: 's4',
    name: 'Fresh Dairy Farm',
    description: 'Premium dairy products from grass-fed cows, no additives.',
    logo: '/placeholder.svg',
    subscriptionTier: 'standard',
    productCount: 12,
    location: 'Northern Valley',
    rating: 4.6
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Organic Carrots Bundle',
    description: 'Fresh organic carrots harvested this morning. Perfect for salads or cooking.',
    price: 3.99,
    image: '/placeholder.svg',
    category: 'farm',
    sellerId: 's1',
    stock: 50,
    deliveryOption: 'both'
  },
  {
    id: 'p2',
    name: 'Sourdough Bread',
    description: 'Traditional sourdough bread made with our 100-year-old starter.',
    price: 6.49,
    image: '/placeholder.svg',
    category: 'groceries',
    sellerId: 's2',
    stock: 15,
    deliveryOption: 'both'
  },
  {
    id: 'p3',
    name: 'Handcrafted Ceramic Mug',
    description: 'Unique handmade ceramic mug, perfect for your morning coffee.',
    price: 24.99,
    image: '/placeholder.svg',
    category: 'handmade',
    sellerId: 's3',
    stock: 8,
    deliveryOption: 'pickup'
  },
  {
    id: 'p4',
    name: 'Organic Kale Bunch',
    description: 'Fresh organic kale, full of vitamins and nutrients.',
    price: 4.99,
    image: '/placeholder.svg',
    category: 'farm',
    sellerId: 's1',
    stock: 30,
    deliveryOption: 'delivery'
  },
  {
    id: 'p5',
    name: 'Raw Honey Jar',
    description: 'Unfiltered, pure raw honey from our local bee farm.',
    price: 8.99,
    image: '/placeholder.svg',
    category: 'groceries',
    sellerId: 's4',
    stock: 25,
    deliveryOption: 'both'
  },
  {
    id: 'p6',
    name: 'Handwoven Basket',
    description: 'Traditional handwoven basket made with sustainable materials.',
    price: 34.99,
    image: '/placeholder.svg',
    category: 'handmade',
    sellerId: 's3',
    stock: 5,
    deliveryOption: 'both'
  },
  {
    id: 'p7',
    name: 'Fresh Strawberries Box',
    description: 'Sweet, juicy strawberries picked at peak ripeness.',
    price: 5.99,
    image: '/placeholder.svg',
    category: 'farm',
    sellerId: 's1',
    stock: 20,
    deliveryOption: 'delivery'
  },
  {
    id: 'p8',
    name: 'Organic Milk Bottle',
    description: 'Fresh organic whole milk from grass-fed cows.',
    price: 4.49,
    image: '/placeholder.svg',
    category: 'groceries',
    sellerId: 's4',
    stock: 18,
    deliveryOption: 'both'
  },
  {
    id: 'p9',
    name: 'Homemade Jam',
    description: 'Small-batch jam made with seasonal fruits and berries.',
    price: 7.99,
    image: '/placeholder.svg',
    category: 'groceries',
    sellerId: 's2',
    stock: 12,
    deliveryOption: 'both'
  },
  {
    id: 'p10',
    name: 'Macramé Plant Hanger',
    description: 'Handcrafted macramé plant hanger, perfect for your indoor plants.',
    price: 29.99,
    image: '/placeholder.svg',
    category: 'handmade',
    sellerId: 's3',
    stock: 7,
    deliveryOption: 'pickup'
  },
  {
    id: 'p11',
    name: 'Fresh Cherry Tomatoes',
    description: 'Sweet and juicy cherry tomatoes, great for salads.',
    price: 4.49,
    image: '/placeholder.svg',
    category: 'farm',
    sellerId: 's1',
    stock: 40,
    deliveryOption: 'delivery'
  },
  {
    id: 'p12',
    name: 'Artisan Cheese Wheel',
    description: 'Aged artisan cheese made with traditional methods.',
    price: 12.99,
    image: '/placeholder.svg',
    category: 'groceries',
    sellerId: 's4',
    stock: 10,
    deliveryOption: 'both'
  }
];

export const getCategoryLabel = (category: ProductCategory): string => {
  switch (category) {
    case 'farm':
      return 'Farm Produce';
    case 'groceries':
      return 'Groceries';
    case 'handmade':
      return 'Handmade';
    default:
      return 'Unknown';
  }
};

export const getCategoryIcon = (category: ProductCategory): string => {
  switch (category) {
    case 'farm':
      return '🌱';
    case 'groceries':
      return '🛒';
    case 'handmade':
      return '🧶';
    default:
      return '📦';
  }
};

export const getDeliveryLabel = (option: string): string => {
  switch (option) {
    case 'delivery':
      return 'Delivery Only';
    case 'pickup':
      return 'Pickup Only';
    case 'both':
      return 'Delivery & Pickup';
    default:
      return 'Unknown';
  }
};
