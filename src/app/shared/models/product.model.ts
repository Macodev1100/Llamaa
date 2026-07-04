export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  images?: string[];
  tags: string[];
  stock: number;
  rating: number;
  /** true = producto seminuevo / refurbished */
  seminuevo?: boolean;
  featured?: boolean;
  platform?: string;
  genre?: string;
  ageRating?: string;
  specs?: Record<string, string>;
}

export type ProductCategory =
  | 'games'
  | 'consoles'
  | 'peripherals'
  | 'accessories'
  | 'gpus'
  | 'cpus'
  | 'monitors';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  paymentMethod: 'transfer' | 'yape' | 'cash' | 'card';
}

export interface OrderSummary {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
}
