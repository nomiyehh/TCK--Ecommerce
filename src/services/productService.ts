import { supabase } from '../supabase';
import { Product } from '../types';

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map DB fields to Product interface
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      pricePerKg: Number(p.price),
      rating: 4.8, // Default rating as it's not in DB yet
      image: p.image_url || 'https://picsum.photos/seed/chicken/400/300',
      description: p.description || '',
      isFresh: p.isfreshtoday
    })) as Product[];
  }
};
