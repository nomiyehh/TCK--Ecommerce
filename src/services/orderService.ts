import { supabase } from '../supabase';
import { CartItem } from '../types';

export const orderService = {
  async placeOrder(orderData: {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    items: CartItem[];
    total: number;
    paymentMethod: string;
  }) {
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          id: orderData.id,
          customer_name: orderData.customerName,
          phone: orderData.phone,
          address: orderData.address,
          items: orderData.items,
          total_amount: orderData.total,
          status: 'received'
        }
      ]);

    if (error) throw error;
    return orderData.id;
  },

  async getOrderById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  }
};
