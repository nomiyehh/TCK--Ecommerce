/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CustomizationModalProps {
  product: Product | null;
  onClose: () => void;
  onConfirm: (item: CartItem) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({ product, onClose, onConfirm }) => {
  const [size, setSize] = useState<CartItem['size']>('Medium');
  const [skin, setSkin] = useState<CartItem['skin']>('Without Skin');
  const [cutStyle, setCutStyle] = useState<CartItem['cutStyle']>('Curry Cut');
  const [weight, setWeight] = useState(1);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleConfirm = () => {
    const cartItem: CartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      size,
      skin,
      cutStyle,
      weight,
      quantity,
    };
    onConfirm(cartItem);
    onClose();
  };

  const weights = [0.25, 0.5, 0.75, 1, 1.5, 2];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-brand-charcoal">Customize Order</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-8">
            <div className="flex items-center space-x-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-brand-red font-bold">₹{product.pricePerKg} / kg</p>
              </div>
            </div>

            {/* Size */}
            <section>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Chicken Size</h4>
              <div className="grid grid-cols-3 gap-3">
                {['Small', 'Medium', 'Large'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s as any)}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      size === s ? 'border-brand-red bg-brand-red/5 text-brand-red' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Skin */}
            <section>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Skin Option</h4>
              <div className="grid grid-cols-2 gap-3">
                {['With Skin', 'Without Skin'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSkin(s as any)}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      skin === s ? 'border-brand-red bg-brand-red/5 text-brand-red' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Cut Style */}
            <section>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Cut Style</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Whole', 'Curry Cut', 'Small Pieces', 'Medium Pieces', 'Large Pieces', 'Boneless'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setCutStyle(s as any)}
                    className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                      cutStyle === s ? 'border-brand-red bg-brand-red/5 text-brand-red' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Weight */}
            <section>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Weight</h4>
              <div className="flex flex-wrap gap-2">
                {weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                      weight === w ? 'border-brand-red bg-brand-red/5 text-brand-red' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    {w >= 1 ? `${w} kg` : `${w * 1000}g`}
                  </button>
                ))}
              </div>
            </section>

            {/* Quantity */}
            <section className="flex items-center justify-between pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Quantity</h4>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border-2 border-gray-100 text-brand-charcoal"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border-2 border-gray-100 text-brand-charcoal"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 pb-8 sm:pb-6 bg-gray-50 flex items-center justify-between border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase">Total Price</span>
              <span className="text-2xl font-black text-brand-red">₹{Math.round(product.pricePerKg * weight * quantity)}</span>
            </div>
            <button
              onClick={handleConfirm}
              className="bg-brand-red text-white px-6 sm:px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 premium-shadow hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomizationModal;
