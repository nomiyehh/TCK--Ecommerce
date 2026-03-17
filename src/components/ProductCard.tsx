/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Plus, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden premium-shadow group border border-brand-red/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isFresh && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3" />
            <span>FRESH CUT TODAY</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
          <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
          <span className="text-xs font-bold text-brand-charcoal">{product.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-1">
          <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider">{product.category}</span>
        </div>
        <h3 className="text-lg font-bold text-brand-charcoal mb-2 line-clamp-1">{product.name}</h3>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-black text-brand-red">₹{product.pricePerKg}</span>
              <span className="text-xs text-gray-500 ml-1">/ kg</span>
            </div>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-brand-red text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-brand-red/90 transition-all premium-shadow active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
