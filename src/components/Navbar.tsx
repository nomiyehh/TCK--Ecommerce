/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Phone, Menu, X, MapPin, MessageSquare, Search } from 'lucide-react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';

const LOGO_CDN = "https://img.icons8.com/fluency/96/chicken.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin/login.html', isExternal: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-red/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src={LOGO_CDN} 
                alt="Taj Chicken" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-black text-brand-charcoal tracking-tight">Taj <span className="text-brand-red italic">Chicken</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-sm font-medium text-brand-charcoal/50 hover:text-brand-red transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-red ${
                    location.pathname === link.path ? 'text-brand-red' : 'text-brand-charcoal'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <button className="p-2 text-brand-charcoal hover:text-brand-red transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/cart"
              className="relative p-2 text-brand-charcoal hover:text-brand-red transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <a
              href="tel:9876543210"
              className="bg-brand-red text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center space-x-2 hover:bg-brand-red/90 transition-all premium-shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-brand-charcoal">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-charcoal"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-brand-red/10 px-4 pt-2 pb-6 space-y-2"
          >
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-brand-charcoal/50 hover:text-brand-red hover:bg-brand-cream rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-brand-charcoal hover:text-brand-red hover:bg-brand-cream rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="tel:9876543210"
                onClick={() => setIsOpen(false)}
                className="w-full bg-brand-red text-white py-3 rounded-xl text-center font-bold flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Shop</span>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919876543210"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full bg-green-600 text-white py-3 rounded-xl text-center font-bold flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Order</span>
              </a>
              <a
                href="https://maps.app.goo.gl/aV5v7ytxSqWS7xmu7"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full bg-brand-charcoal text-white py-3 rounded-xl text-center font-bold flex items-center justify-center space-x-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Get Directions</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
