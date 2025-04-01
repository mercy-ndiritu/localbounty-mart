
export type ProductCategory = 'groceries' | 'handmade' | 'farm';

export type DeliveryOption = 'delivery' | 'pickup' | 'both';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  sellerId: string;
  stock: number;
  deliveryOption: DeliveryOption;
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
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
