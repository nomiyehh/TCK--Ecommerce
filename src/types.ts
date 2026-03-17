/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  pricePerKg: number;
  rating: number;
  image: string;
  description: string;
  isFresh?: boolean;
}

export interface CartItem extends Product {
  cartId: string;
  size: 'Small' | 'Medium' | 'Large';
  skin: 'With Skin' | 'Without Skin';
  cutStyle: 'Whole' | 'Curry Cut' | 'Small Pieces' | 'Medium Pieces' | 'Large Pieces' | 'Boneless';
  weight: number; // in kg
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  paymentMethod: 'UPI' | 'Cash on Delivery';
  createdAt: string;
}
