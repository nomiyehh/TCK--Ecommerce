/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center mx-auto premium-shadow">
          <ShoppingBag className="w-16 h-16 text-brand-red/20" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-brand-charcoal">Your cart is empty</h1>
          <p className="text-gray-500">Looks like you haven't added any fresh chicken yet.</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-brand-red text-white px-8 py-4 rounded-2xl font-bold premium-shadow hover:scale-105 transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-brand-red">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-brand-charcoal font-bold">Shopping Cart</span>
      </div>

      <h1 className="text-4xl font-black text-brand-charcoal mb-10">Shopping Cart ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.cartId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-3xl premium-shadow border border-brand-red/5 flex flex-col sm:flex-row items-center gap-6"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-brand-charcoal">{item.name}</h3>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{item.size}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{item.skin}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{item.cutStyle}</span>
                    <span className="bg-brand-red/10 text-brand-red px-2 py-1 rounded-md">{item.weight} kg</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-50 p-1 rounded-xl border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors text-brand-charcoal"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors text-brand-charcoal"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[80px]">
                    <p className="text-lg font-black text-brand-red">₹{Math.round(item.pricePerKg * item.weight * item.quantity)}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-2 text-gray-300 hover:text-brand-red transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[32px] premium-shadow border border-brand-red/5 sticky top-32 space-y-8">
            <h2 className="text-2xl font-black text-brand-charcoal">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-brand-charcoal">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                <span className="text-lg font-bold text-brand-charcoal">Total</span>
                <div className="text-right">
                  <p className="text-3xl font-black text-brand-red">₹{totalPrice}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Inclusive of all taxes</p>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 premium-shadow hover:scale-[1.02] transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-red/5">
              <p className="text-xs text-brand-red font-bold text-center">
                🚚 Free delivery on all orders in Kamptee!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
