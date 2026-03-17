/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, Navigation, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal">Get in Touch</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Have questions about our products or delivery? We're here to help you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-12">
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-brand-charcoal">Shop Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, title: 'Address', detail: 'Friday Market, Shop No. 14, Near Goyal Talkies, Kamptee, MH', link: 'https://maps.app.goo.gl/aV5v7ytxSqWS7xmu7' },
                { icon: Phone, title: 'Phone', detail: '+91 98765 43210', link: 'tel:9876543210' },
                { icon: Mail, title: 'Email', detail: 'info@tajchicken.com', link: 'mailto:info@tajchicken.com' },
                { icon: Clock, title: 'Hours', detail: '8:00 AM - 8:30 PM (Daily)' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl premium-shadow border border-brand-red/5 space-y-3">
                  <div className="bg-brand-red/10 w-10 h-10 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-brand-red" />
                  </div>
                  <h3 className="font-bold text-brand-charcoal">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-gray-500 leading-relaxed hover:text-brand-red transition-colors">
                      {item.detail}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-brand-charcoal">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:9876543210"
                className="bg-brand-red text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 premium-shadow hover:scale-105 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 premium-shadow hover:scale-105 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://maps.app.goo.gl/aV5v7ytxSqWS7xmu7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-charcoal text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 premium-shadow hover:scale-105 transition-all"
              >
                <Navigation className="w-5 h-5" />
                <span>Get Directions</span>
              </a>
            </div>
          </section>
        </div>

        {/* Contact Form */}
        <section className="bg-white p-10 rounded-[40px] premium-shadow border border-brand-red/5 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-brand-charcoal">Send a Message</h2>
            <p className="text-sm text-gray-400">We usually respond within 2 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Your Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  placeholder="9876543210"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                placeholder="Bulk Order Inquiry"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red/20 resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 premium-shadow hover:scale-[1.02] transition-all"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </section>
      </div>

      {/* Map Placeholder */}
      <section className="w-full h-[400px] rounded-[40px] overflow-hidden premium-shadow border-8 border-white relative">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center space-y-4">
            <MapPin className="w-12 h-12 text-brand-red mx-auto animate-bounce" />
            <p className="font-bold text-brand-charcoal">Google Maps Integration</p>
            <p className="text-sm text-gray-400">Kamptee, Maharashtra, India</p>
          </div>
        </div>
        {/* In a real app, you'd use an iframe or a map library here */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14878.868761405!2d79.19!3d21.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0!2sKamptee%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </section>
    </div>
  );
};

export default Contact;
