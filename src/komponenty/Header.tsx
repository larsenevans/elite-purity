/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_ITEMS } from '@/constants';

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = 0; // V produkcii by šlo cez Context/Store

  return (
    <div className="sticky top-0 z-50 shadow-2xl">
      {/* ANNOUNCEMENT RAIL */}
      <div className="bg-brand-red py-2 overflow-hidden border-b border-white/10 relative z-60">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-white px-8">
              USA DOMESTIC SHIPPING • LAB TESTED PURITY • DISCREET PACKAGING • 24/7 SUPPORT
            </span>
          ))}
        </div>
      </div>

      {/* TOP UTILITY & NAVIGATION */}
      <nav className="bg-brand-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-4">
          <div className={`flex items-center transition-all duration-500 ${isSearchFocused ? 'flex-1 md:flex-initial' : 'flex-initial'}`}>
            <button 
              className="lg:hidden text-white p-2 -ml-2 mr-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            <a href="/" className={`items-center space-x-3 group cursor-pointer ${isSearchFocused ? 'hidden md:flex' : 'flex'}`}>
              <div className="w-8 h-8 md:w-9 md:h-9 bg-brand-red flex items-center justify-center font-extrabold text-white text-base md:text-lg">P</div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-display font-light text-white tracking-[0.1em] leading-none uppercase">Purity</span>
                <span className="text-[7px] md:text-[8px] font-black text-brand-red tracking-[0.4em] leading-none mt-1 uppercase">Pharma</span>
              </div>
            </a>

            <div className="hidden lg:flex items-center space-x-8 ml-12">
              {NAV_ITEMS.map((item) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  className="micro-label hover:text-white transition-colors"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <motion.div className={`relative transition-all duration-500 group ${isSearchFocused ? 'flex-1 md:max-w-md' : 'w-10 sm:w-64'}`}>
            <div className="relative h-10 flex items-center">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search..."
                className={`w-full bg-white/5 border border-white/10 rounded-full py-2 text-sm text-white focus:outline-none focus:border-brand-red ${isSearchFocused ? 'pl-12' : 'pl-10 opacity-0 sm:opacity-100'}`}
              />
              <Search size={16} className={`absolute ${isSearchFocused ? 'left-5 text-brand-red' : 'left-3 sm:left-4 text-slate-500'}`} />
            </div>
          </motion.div>

          <div className={`flex items-center space-x-3 md:space-x-6 transition-all ${isSearchFocused ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            <div className="glass-pill cursor-pointer flex items-center space-x-2">
              <User size={12} />
              <span className="hidden sm:inline">Account</span>
            </div>
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red transition-all cursor-pointer">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-brand-dark">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-dark/95 backdrop-blur-sm z-[70] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-brand-dark border-r border-white/5 z-[80] p-8 lg:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center font-extrabold text-white">P</div>
                  <span className="text-lg font-display font-light text-white uppercase">Purity</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400"><X size={24} /></button>
              </div>
              <div className="flex flex-col space-y-6">
                {NAV_ITEMS.map((item) => (
                  <a key={item.name} href={item.href} className="text-2xl font-display font-black text-white italic tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
