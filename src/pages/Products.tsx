/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import CustomizationModal from '../components/CustomizationModal';
import { useCart } from '../CartContext';
import { Product } from '../types';
import { motion } from 'motion/react';
import { productService } from '../services/productService';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal">Our Fresh Collection</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Browse through our range of premium chicken products, from fresh cuts to marinated specialties.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-24 z-40 bg-brand-cream/80 backdrop-blur-md py-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for chicken, eggs, combos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red/20 premium-shadow"
            />
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl border border-brand-red/10 premium-shadow overflow-x-auto no-scrollbar">
            <Filter className="w-5 h-5 text-brand-red shrink-0" />
            <div className="flex space-x-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-brand-red text-white'
                      : 'text-gray-500 hover:bg-brand-red/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 bg-white rounded-3xl animate-pulse premium-shadow" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto premium-shadow">
            <Search className="w-10 h-10 text-brand-red/20" />
          </div>
          <h3 className="text-xl font-bold text-brand-charcoal">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or category filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-brand-red font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Customization Modal */}
      <CustomizationModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirm={(item) => addToCart(item)}
      />
    </div>
  );
};

export default Products;
