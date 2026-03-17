/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, ChefHat, Truck, CheckCircle2, Phone, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { orderService } from '../services/orderService';

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');

  const steps = [
    { id: 'received', icon: Package, desc: 'We have received your order' },
    { id: 'preparing', icon: ChefHat, desc: 'Our expert butchers are preparing your cuts' },
    { id: 'out-for-delivery', icon: Truck, desc: 'Your order is on the way to you' },
    { id: 'delivered', icon: CheckCircle2, desc: 'Order successfully delivered' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setIsSearching(true);
    setError('');
    
    try {
      const data = await orderService.getOrderById(orderId);
      if (data) {
        setOrderData({
          id: data.id,
          status: data.status,
          items: data.items.length,
          total: data.total_amount,
          createdAt: new Date(data.created_at).toLocaleString(),
        });
      } else {
        setError('Order not found. Please check your ID.');
        setOrderData(null);
      }
    } catch (error) {
      console.error('Error searching order:', error);
      setError('Failed to fetch order status.');
      setOrderData(null);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('id')) {
      handleSearch({ preventDefault: () => {} } as any);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-brand-charcoal">Track Your Order</h1>
        <p className="text-gray-500">Enter your order details to see real-time progress.</p>
      </div>

      {/* Search Box */}
      <section className="bg-white p-8 rounded-[32px] premium-shadow border border-brand-red/5">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Order ID</label>
            <input
              type="text"
              placeholder="TAJ-123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>
          <div className="md:col-span-1 space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
            <input
              type="tel"
              placeholder="9527798610"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>
          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-brand-red text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 premium-shadow hover:scale-[1.02] transition-all disabled:opacity-70"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Tracking Result */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center font-bold">
          {error}
        </div>
      )}

      {orderData && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-brand-charcoal text-white p-8 rounded-[32px] premium-shadow flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-1">Current Status</p>
              <h2 className="text-3xl font-black capitalize">{orderData.status.replace(/-/g, ' ')}</h2>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">Estimated Delivery</p>
              <p className="text-xl font-bold flex items-center justify-center md:justify-end space-x-2">
                <Clock className="w-5 h-5 text-brand-gold" />
                <span>30 - 45 Mins</span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative pt-12 pb-20 px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => {
                const isCompleted = steps.findIndex(s => s.id === orderData.status) >= index;
                const isCurrent = step.id === orderData.status;

                return (
                  <div key={step.id} className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isCompleted ? 'bg-brand-red text-white premium-shadow scale-110' : 'bg-white text-gray-300 border-2 border-gray-100'
                    }`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className={`font-bold ${isCompleted ? 'text-brand-charcoal' : 'text-gray-400'}`}>{step.id}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold leading-tight">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white p-8 rounded-[32px] premium-shadow border border-brand-red/5 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-bold uppercase">Order Placed</p>
              <p className="font-bold text-brand-charcoal">{orderData.createdAt}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-bold uppercase">Items</p>
              <p className="font-bold text-brand-charcoal">{orderData.items} Products</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-bold uppercase">Total Amount</p>
              <p className="font-bold text-brand-red text-xl">₹{orderData.total}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="tel:9527798610"
              className="flex items-center space-x-2 text-brand-red font-bold hover:underline"
            >
              <Phone className="w-5 h-5" />
              <span>Need help? Call the shop</span>
            </a>
          </div>
        </motion.section>
      )}

      {!orderData && !isSearching && (
        <div className="bg-brand-cream/50 p-12 rounded-[32px] border-2 border-dashed border-brand-red/10 text-center space-y-4">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto premium-shadow">
            <Package className="w-8 h-8 text-brand-red/20" />
          </div>
          <h3 className="text-xl font-bold text-brand-charcoal">No order selected</h3>
          <p className="text-gray-500">Enter your Order ID above to see the status.</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
