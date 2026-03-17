/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, MapPin, ArrowRight, ShieldCheck, Truck, Clock, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { REVIEWS } from '../constants';
import ProductCard from '../components/ProductCard';
import CustomizationModal from '../components/CustomizationModal';
import { useCart } from '../CartContext';
import { Product, CartItem } from '../types';
import { productService } from '../services/productService';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);
  const freshStock = products.filter(p => p.isFresh).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt="Fresh Chicken Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-brand-gold rounded-full" />
              <span className="text-brand-gold font-bold text-sm tracking-[0.3em] uppercase">
                Fresh • Hygienic • Farm to Kitchen
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-[1.1]">
              Premium Quality <br />
              <span className="text-brand-red italic">Chicken</span> <br />
              Delivered Fresh
            </h1>
            
            <p className="text-lg text-white/90 max-w-lg leading-relaxed font-light">
              From our farm to your kitchen — experience the taste of freshness with Taj Chicken, Kamptee's most trusted chicken shop.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/products"
                className="bg-brand-red text-white px-10 py-4 rounded-full font-bold flex items-center space-x-3 hover:bg-brand-red/90 transition-all group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-brand-red font-black text-sm uppercase tracking-[0.2em] mb-2">Our Best Sellers</h2>
            <h3 className="text-4xl font-black text-brand-charcoal">Featured Products</h3>
          </div>
          <Link to="/products" className="flex items-center space-x-2 text-brand-red font-bold hover:underline">
            <span>View All</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse premium-shadow" />
            ))
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => setSelectedProduct(p)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">No products available yet.</p>
          )}
        </div>
      </section>

      {/* Today's Fresh Stock */}
      <section className="bg-brand-red py-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 rotate-12 scale-150">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-full aspect-square bg-white rounded-full" />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">Limited Availability</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-6">Today's Fresh Stock</h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              These items were cut fresh this morning and are ready for immediate delivery. 
              Grab them before they run out!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-80 bg-white/10 rounded-3xl animate-pulse" />
              ))
            ) : freshStock.length > 0 ? (
              freshStock.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => setSelectedProduct(p)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-white/60 py-10">No fresh stock available right now.</p>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-red font-black text-sm uppercase tracking-[0.2em] mb-2">Why Choose Us</h2>
          <h3 className="text-4xl font-black text-brand-charcoal">The Taj Chicken Promise</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Fresh Farm Chicken', desc: 'Sourced directly from trusted local farms daily.' },
            { icon: Clock, title: 'Hygienic Cutting', desc: 'Processed in a clean, temperature-controlled environment.' },
            { icon: Truck, title: 'Same Day Delivery', desc: 'Fast delivery within Kamptee to ensure maximum freshness.' },
            { icon: Star, title: 'Trusted Local Shop', desc: 'Serving the community with pride since 1988.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl premium-shadow border border-brand-red/5 text-center group hover:bg-brand-red transition-all duration-500">
              <div className="bg-brand-red/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
                <item.icon className="w-8 h-8 text-brand-red group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-brand-charcoal mb-3 group-hover:text-white transition-colors">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-gold rounded-[40px] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <span className="bg-white/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">Weekend Special</span>
              <h3 className="text-4xl font-black mt-6 mb-4">Family Combo Pack</h3>
              <p className="text-white/90 mb-8 max-w-xs">Get 2kg Curry Cut + 500g Boneless + 1 Dozen Eggs at a special price.</p>
              <Link to="/products" className="bg-white text-brand-gold px-8 py-4 rounded-2xl font-bold inline-block hover:scale-105 transition-all">
                Order Now
              </Link>
            </div>
            <img src="https://picsum.photos/seed/offer1/400/400" className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" alt="Offer" />
          </div>
          
          <div className="bg-brand-charcoal rounded-[40px] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <span className="bg-brand-red text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">New Arrival</span>
              <h3 className="text-4xl font-black mt-6 mb-4">Marinated Ready-to-Cook</h3>
              <p className="text-white/90 mb-8 max-w-xs">Try our new range of tandoori and peri-peri marinated chicken pieces.</p>
              <Link to="/products" className="bg-brand-red text-white px-8 py-4 rounded-2xl font-bold inline-block hover:scale-105 transition-all">
                Explore Range
              </Link>
            </div>
            <img src="https://picsum.photos/seed/offer2/400/400" className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" alt="Offer" />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-red font-black text-sm uppercase tracking-[0.2em] mb-2">Testimonials</h2>
          <h3 className="text-4xl font-black text-brand-charcoal">What Our Customers Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl premium-shadow border border-brand-red/5 relative">
              <Quote className="absolute top-6 right-8 w-10 h-10 text-brand-red/10" />
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red font-bold">
                  {review.name[0]}
                </div>
                <p className="font-bold text-brand-charcoal">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Modal */}
      <CustomizationModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirm={(item) => addToCart(item)}
      />
    </div>
  );
};

export default Home;
