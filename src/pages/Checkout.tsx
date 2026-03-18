/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, User, CreditCard, Banknote, CheckCircle2 } from 'lucide-react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { orderService } from '../services/orderService';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery',
  });

  if (cart.length === 0 && !isSuccess) {
    navigate('/products');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);

    const newOrderId = `TAJ-${Math.floor(100000 + Math.random() * 900000)}`;
    
    try {
      setError(null);
      await orderService.placeOrder({
        id: newOrderId,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        items: cart,
        total: totalPrice,
        paymentMethod: formData.paymentMethod
      });

      setOrderId(newOrderId);
      setIsOrdering(false);
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
      setIsOrdering(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-green-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-brand-charcoal">Order Placed!</h1>
          <p className="text-gray-500">
            Thank you for choosing Taj Chicken. Your fresh order is being prepared.
          </p>
          <div className="bg-white p-6 rounded-3xl premium-shadow border border-brand-red/5 space-y-2">
            <p className="text-xs text-gray-400 font-bold uppercase">Order ID</p>
            <p className="text-2xl font-black text-brand-red tracking-wider">{orderId}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            to={`/track?id=${orderId}`}
            className="bg-brand-red text-white py-4 rounded-2xl font-bold premium-shadow hover:scale-105 transition-all"
          >
            Track Your Order
          </Link>
          <Link
            to="/"
            className="text-brand-red font-bold hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/cart" className="inline-flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-brand-red mb-8">
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Cart</span>
      </Link>

      <h1 className="text-4xl font-black text-brand-charcoal mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white p-8 rounded-[32px] premium-shadow border border-brand-red/5 space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-brand-red/10 rounded-lg">
                  <User className="w-5 h-5 text-brand-red" />
                </div>
                <h2 className="text-xl font-bold text-brand-charcoal">Personal Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9371811123"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[32px] premium-shadow border border-brand-red/5 space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-brand-red/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-brand-red" />
                </div>
                <h2 className="text-xl font-bold text-brand-charcoal">Delivery Address</h2>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Full Address</label>
                <textarea
                  required
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House No, Street, Landmark, Kamptee"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20 resize-none"
                />
              </div>
            </section>

            <section className="bg-white p-8 rounded-[32px] premium-shadow border border-brand-red/5 space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-brand-red/10 rounded-lg">
                  <CreditCard className="w-5 h-5 text-brand-red" />
                </div>
                <h2 className="text-xl font-bold text-brand-charcoal">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'UPI', icon: CreditCard, desc: 'Pay via PhonePe, GPay, etc.' },
                  { id: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive order' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                    className={`p-6 rounded-2xl border-2 text-left transition-all flex items-start space-x-4 ${
                      formData.paymentMethod === method.id
                        ? 'border-brand-red bg-brand-red/5'
                        : 'border-gray-50 bg-gray-50'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${formData.paymentMethod === method.id ? 'bg-brand-red text-white' : 'bg-white text-gray-400'}`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className={`font-bold ${formData.paymentMethod === method.id ? 'text-brand-red' : 'text-brand-charcoal'}`}>{method.id}</p>
                      <p className="text-xs text-gray-400 mt-1">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </form>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[32px] premium-shadow border border-brand-red/5 sticky top-32 space-y-8">
            <h2 className="text-2xl font-black text-brand-charcoal">Your Order</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
              {cart.map((item) => (
                <div key={item.cartId} className="flex justify-between items-center text-sm">
                  <div className="flex-1">
                    <p className="font-bold text-brand-charcoal">{item.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">
                      {item.quantity} x {item.weight}kg • {item.cutStyle}
                    </p>
                  </div>
                  <span className="font-bold text-brand-red ml-4">₹{Math.round(item.pricePerKg * item.weight * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span className="font-bold text-brand-charcoal">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="pt-4 flex justify-between items-end">
                <span className="text-lg font-bold text-brand-charcoal">Total</span>
                <p className="text-3xl font-black text-brand-red">₹{totalPrice}</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isOrdering}
              className={`w-full bg-brand-red text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 premium-shadow transition-all ${
                isOrdering ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
            >
              {isOrdering ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Place Order</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
