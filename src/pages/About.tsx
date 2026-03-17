/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Clock, Star, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&q=80&w=1920&h=600"
            alt="About Us Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-charcoal/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-white mb-4"
          >
            Our Story
          </motion.h1>
          <p className="text-white/80 max-w-2xl mx-auto font-light">
            Serving the Kamptee community with fresh, hygienic, and premium quality chicken since 1988.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-brand-red font-black text-sm uppercase tracking-[0.2em]">Since 1988</h2>
            <h3 className="text-4xl font-serif text-brand-charcoal">The First & Finest in Kamptee</h3>
            <p className="text-gray-600 leading-relaxed">
              Taj Chicken's journey began in 1988, when we opened the very first specialized chicken shop in Kamptee. What started as a small local venture has grown into a cornerstone of the community, built on a foundation of trust and uncompromising quality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For over three decades, we have remained committed to our roots. We were the pioneers who brought organized, hygienic poultry to the neighborhood, and today, we continue that legacy by sourcing directly from local farms and maintaining the highest standards of freshness.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800&h=800" 
              className="rounded-[40px] shadow-2xl"
              alt="Fresh Chicken"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand-red text-white p-8 rounded-3xl shadow-xl">
              <p className="text-4xl font-black">35+</p>
              <p className="text-sm font-bold uppercase tracking-wider">Years of Legacy</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-cream py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-red font-black text-sm uppercase tracking-[0.2em] mb-2">Our Values</h2>
            <h3 className="text-4xl font-serif text-brand-charcoal">What We Stand For</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Uncompromising Hygiene', desc: 'Our facility follows strict sanitation protocols to ensure every cut is safe and clean.' },
              { icon: Heart, title: 'Community First', desc: 'We take pride in being a local business that supports and feeds our Kamptee neighbors.' },
              { icon: Users, title: 'Customer Satisfaction', desc: 'Your trust is our greatest asset. We strive to exceed your expectations with every order.' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-brand-red/5 text-center">
                <div className="bg-brand-red/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-brand-red" />
                </div>
                <h4 className="text-xl font-bold text-brand-charcoal mb-4">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
