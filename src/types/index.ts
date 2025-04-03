
export type ProductCategory = 'groceries' | 'handmade' | 'farm';

export type DeliveryOption = 'delivery' | 'pickup' | 'both';

export type KenyanCounty = 
  | 'Nairobi' 
  | 'Mombasa' 
  | 'Kisumu' 
  | 'Nakuru' 
  | 'Eldoret' 
  | 'Other';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in KES
  image: string;
  category: ProductCategory;
  sellerId: string;
  stock: number;
  deliveryOption: DeliveryOption;
  createdAt?: string;
  updatedAt?: string;
}

export type SubscriptionTier = 'basic' | 'standard' | 'premium';

export interface Seller {
  id: string;
  name: string;
  description: string;
  logo?: string;
  subscriptionTier: SubscriptionTier;
  productCount: number;
  location: string;
  rating: number;
  email?: string;
  phone?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  county: KenyanCounty;
  city: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentMethod = 'mpesa' | 'card';

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    address: string;
    city: string;
    county: KenyanCounty;
    postalCode: string;
  };
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number; // In KES
  }[];
  totalAmount: number; // In KES
  status: OrderStatus;
  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
  };
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  availableIn: SubscriptionTier[];
  comingSoon?: boolean;
}
