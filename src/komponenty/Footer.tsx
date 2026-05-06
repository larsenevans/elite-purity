/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Mail, 
  Truck 
} from 'lucide-react';
import { motion } from 'motion/react';

const BitcoinIcon = () => (
  <div className="flex items-center space-x-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
    <div className="w-5 h-5 rounded-full bg-[#f7931a] flex items-center justify-center">
      <span className="text-[10px] font-black text-white italic">B</span>
    </div>
    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Bitcoin</span>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-brand-dark pt-32 pb-12 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center font-extrabold text-white">P</div>
              <span className="text-xl font-display font-light text-white tracking-[0.1em] uppercase">Purity</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              The leading source for elite performance Compounds. Built for those who demand uncompromising quality and absolute surgical precision.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Mail].map((Icon, idx) => (
                <motion.button 
                  key={idx}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 transition-colors hover:text-white"
                  whileHover={{ backgroundColor: '#c8102e', color: '#ffffff', scale: 1.1, rotate: 5 }}
                >
                  <Icon size={18} />
                </motion.button>
              ))}
            </div>
          </div>

          {['Shop', 'Account', 'Legal'].map((col, i) => (
            <div key={col}>
              <h5 className="micro-label text-white mb-8 border-b border-white/5 pb-4">{col}</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                {i === 0 && ['Injectables', 'Orals', 'HGH & Peptides', 'PCT Range'].map(item => (
                  <li key={item}><a href="#" className="hover:text-brand-red transition-all">{item}</a></li>
                ))}
                {i === 1 && ['My Profile', 'Order Tracking', 'Lab Reports', 'Affiliate'].map(item => (
                  <li key={item}><a href="#" className="hover:text-brand-red transition-all">{item}</a></li>
                ))}
                {i === 2 && ['Terms of Service', 'Privacy Policy', 'Shipping Info', 'Returns'].map(item => (
                  <li key={item}><a href="#" className="hover:text-brand-red transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
          <p className="text-[10px] font-bold text-slate-600 tracking-[0.2em]">© 2026 PURITY PHARMA • BUILT FOR THE ELITE</p>
          <div className="flex items-center space-x-8">
            <BitcoinIcon />
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center"><Truck size={14} className="mr-2 text-brand-red" /> <span className="text-[10px] font-bold text-slate-400">USA DOMESTIC</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
