export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image?: string;
  shortDescription?: string;
  description?: string;
  // internal marker to differentiate base vs custom (optional)
  _base?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderContact {
  fullName: string;
  phone: string;
  address: string;
  refs?: string;
}

export interface OrderRecord {
  id: string;
  items: CartItem[];
  total: number;
  contact: OrderContact;
  createdAt: string; // ISO
}

export interface User {
  id: string;
  email: string;
  password?: string; // demo only
  fullName?: string;
  phone?: string;
  address?: string;
  refs?: string;
  isAdmin?: boolean;
}
