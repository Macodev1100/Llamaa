export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  tags: string[];
  stock: number;
  rating: number;
  /** true = producto seminuevo / refurbished */
  seminuevo?: boolean;
  featured?: boolean;
  specs?: Record<string, string>;
}

export type ProductCategory =
  | 'gpus'
  | 'cpus'
  | 'peripherals'
  | 'monitors'
  | 'accessories';

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
  paymentMethod: 'card' | 'transfer';
}

export interface OrderSummary {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
}
