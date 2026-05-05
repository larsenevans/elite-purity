/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  ChevronRight,
  ArrowRight, 
  PhoneCall, 
  Mail, 
  Instagram, 
  Facebook,
  ShieldCheck,
  Truck,
  RotateCcw,
  Menu,
  X,
  ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRODUCT_CATEGORIES = [
  "US Domestic Supplements",
  "Injectable Supplements",
  "Oral Supplements",
  "Human Growth Hormone",
  "Peptides",
  "Antiestrogens",
  "Post Cycle Therapy",
  "Erectile Dysfunction",
  "Acne & Skin Care",
  "Antibiotics",
  "Hair Care",
  "Pain Management",
  "Stay-awake",
  "Syringes",
  "Thyroid",
  "Weight Loss",
  "Muscle Relax",
  "Diuretics",
  "Quit Smoking"
];

const BESTSELLERS = [
  {
    id: 1,
    name: "Test E 200mg / EQ 200mg",
    price: 77.70,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Ipamorelin / Tesamorelin 10 mg",
    price: 78.75,
    image: "https://images.unsplash.com/photo-1583947239127-183e87836881?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Pro-Dynabol 20mg",
    price: 181.65,
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Eurotropin 100iu Kit",
    price: 399.00,
    image: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=400"
  }
];

export default function App() {
  const [cartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof BESTSELLERS>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = BESTSELLERS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-red selection:text-white">
      {/* 1. ANNOUNCEMENT RAIL */}
      <div className="bg-brand-red py-2 overflow-hidden border-b border-white/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-white px-8">
              USA DOMESTIC SHIPPING • LAB TESTED PURITY • DISCREET PACKAGING • 24/7 SUPPORT
            </span>
          ))}
        </div>
      </div>

      {/* 2. TOP UTILITY & NAVIGATION */}
      <nav className="bg-brand-dark/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-9 h-9 bg-brand-red flex items-center justify-center font-extrabold text-white text-lg">P</div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-light text-white tracking-[0.1em] leading-none uppercase">Purity</span>
                <span className="text-[8px] font-black text-brand-red tracking-[0.4em] leading-none mt-1 uppercase">Pharma</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Catalog', 'Bestsellers', 'USA Domestic', 'FAQ', 'Contact'].map((item) => (
                <motion.a 
                  key={item} 
                  href="#" 
                  className="micro-label hover:text-white transition-colors"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden xl:flex items-center relative w-64">
              <input 
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search compounds..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 px-4 pl-10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all"
              />
              <Search size={14} className="absolute left-4 text-slate-500" />
              
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-brand-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] backdrop-blur-xl"
                  >
                    {suggestions.map((p) => (
                      <div key={p.id} className="p-3 hover:bg-white/5 cursor-pointer flex items-center space-x-3 transition-colors border-b border-white/5 last:border-0">
                        <img src={p.image} className="w-10 h-10 object-cover rounded-lg" alt="" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-white font-bold leading-tight">{p.name}</span>
                          <span className="text-[10px] text-brand-red font-black mt-1">${p.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-4">
              <motion.div 
                className="glass-pill cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                $ USD <ChevronDown size={10} className="inline ml-1 opacity-50" />
              </motion.div>
              <motion.div 
                className="glass-pill cursor-pointer flex items-center space-x-2"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={12} />
                <span>Account</span>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all">
                <ShoppingCart size={20} className="text-white" />
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-brand-dark">
                  {cartCount}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* 3. HERO SECTION - EDITORIAL STYLE */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover opacity-40"
              alt="Background"
            />
          </div>

          <div className="max-w-screen-2xl mx-auto px-6 relative z-20 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-px w-12 bg-brand-red" />
                <span className="micro-label text-brand-red">High Performance Standards</span>
              </div>
              <h1 className="mb-8 italic italic-glow">
                ELITE<br/><span className="font-black not-italic text-brand-red">SCIENCE</span>
              </h1>
              <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
                Premium grade performance compounds. Scientifically formulated, lab-tested, and delivered with surgical precision within the USA.
              </p>
              <div className="flex items-center space-x-6">
                <motion.button 
                  className="bg-brand-red text-white px-10 py-5 rounded-sm font-bold text-sm tracking-widest uppercase shadow-2xl shadow-brand-red/20"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: '#ffffff', 
                    color: '#c8102e',
                    boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.25)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Catalog
                </motion.button>
                <motion.button 
                  className="text-white border-b-2 border-white/20 pb-2 font-bold text-sm tracking-wider uppercase"
                  whileHover={{ borderBottomColor: '#c8102e', x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  Lab Results
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end space-y-4">
            <div className="flex space-x-2">
              <Instagram size={18} className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
              <Facebook size={18} className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
            </div>
            <span className="micro-label rotate-180 [writing-mode:vertical-rl] h-32 mr-[-4px]">Scroll To Explore</span>
          </div>
        </section>

        {/* 4. KEY METRICS */}
        <div className="bg-brand-gray py-16 border-y border-white/5">
          <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Purity", value: "99.8%", sub: "Average lab test verification" },
              { label: "Delivery", value: "2-4d", sub: "Fast domestic USA shipping" },
              { label: "Products", value: "150+", sub: "Curated performance catalog" },
              { label: "Support", value: "24/7", sub: "Live specialist assistance" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col group cursor-default"
                whileHover={{ y: -5 }}
              >
                <span className="micro-label mb-2 group-hover:text-brand-red transition-colors">{stat.label}</span>
                <span className="text-4xl font-display font-black text-white mb-1">{stat.value}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. FEATURED COLLECTION */}
        <section className="py-24 bg-brand-dark">
          <div className="max-w-screen-2xl mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
              <a href="#" className="hover:text-brand-red transition-colors">Home</a>
              <ChevronRight size={10} className="text-slate-800" />
              <a href="#" className="hover:text-brand-red transition-colors">Catalog</a>
              <ChevronRight size={10} className="text-slate-800" />
              <span className="text-slate-400">Bestsellers</span>
            </nav>

            <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16">
              <div>
                <span className="micro-label text-brand-red block mb-2">Curated Selection</span>
                <h2 className="italic">
                  Bestseller <span className="font-black not-italic text-slate-800">Compounds</span>
                </h2>
              </div>
              <a href="#" className="glass-pill flex items-center space-x-2 hover:scale-105">
                <span>View Full Catalog</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {BESTSELLERS.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(200, 16, 46, 0.1)' }}
                  className="group bg-brand-gray/50 rounded-2xl border border-white/5 p-6 hover:border-brand-red/50 transition-all duration-500 overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute top-4 left-4 z-10">
                    <div className="w-8 h-[1px] bg-brand-red group-hover:w-12 transition-all duration-500" />
                  </div>
                  
                  <div className="aspect-[4/5] mb-8 overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-transparent p-8 flex items-center justify-center relative group/image">
                    <motion.div 
                      className="absolute inset-0 bg-brand-red/10 opacity-0 group-hover/image:opacity-100 transition-opacity z-10 flex items-center justify-center"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <ZoomIn className="text-white opacity-50" size={32} />
                    </motion.div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-full w-auto object-contain transition-transform duration-700 group-hover/image:scale-125 grayscale group-hover:grayscale-0"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="h-12 flex flex-col justify-center">
                      <h5 className="text-white font-medium text-lg leading-tight group-hover:text-brand-red transition-colors lowercase first-letter:uppercase">
                        {product.name}
                      </h5>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="micro-label opacity-30 group-hover:opacity-60 transition-opacity">Price / Suma</span>
                        <motion.span 
                          className="text-2xl font-display font-black text-white tracking-tight italic"
                          whileHover={{ scale: 1.1, color: '#c8102e', x: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          ${product.price.toFixed(2)}
                        </motion.span>
                      </div>
                      <motion.button 
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group/btn overflow-hidden relative"
                        whileHover={{ 
                          backgroundColor: '#c8102e', 
                          borderColor: '#c8102e',
                          scale: 1.1 
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingCart size={16} className="group-hover/btn:scale-125 transition-transform z-10" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. TRUST BANNER */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <ShieldCheck size={48} className="text-brand-red" />
              <h3>Pharmaceutical Integrity</h3>
              <p className="text-slate-400 leading-relaxed">
                Every batch is subjected to rigorous third-party analytical testing. We provide full COA transparency for all our products upon request.
              </p>
              <div className="flex space-x-8">
                <div className="flex flex-col">
                  <span className="text-white font-bold">HPLC</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">GMP</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Certified</span>
                </div>
              </div>
            </div>

            <motion.div 
              className="lg:col-span-2 relative rounded-3xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1579165466541-71aa2167de7d?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-96 object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                alt="Lab"
              />
              <div className="absolute inset-0 bg-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
              <motion.div 
                className="absolute bottom-12 left-12"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h4 className="italic tracking-tighter shadow-black/50 drop-shadow-xl">QUALITY OVER<br/>EQUITY.</h4>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

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
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 transition-colors"
                    whileHover={{ backgroundColor: '#c8102e', color: '#ffffff', scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
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
                    <li key={item}>
                      <motion.a 
                        href="#" 
                        className="hover:text-brand-red transition-colors inline-block"
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                  {i === 1 && ['My Profile', 'Order Tracking', 'Lab Reports', 'Affiliate'].map(item => (
                    <li key={item}>
                      <motion.a 
                        href="#" 
                        className="hover:text-brand-red transition-colors inline-block"
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                  {i === 2 && ['Terms of Service', 'Privacy Policy', 'Shipping Info', 'Returns'].map(item => (
                    <li key={item}>
                      <motion.a 
                        href="#" 
                        className="hover:text-brand-red transition-colors inline-block"
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {item}
                      </motion.a>
                    </li>
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
    </div>
  );
}


function BitcoinIcon() {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="mb-2"
    >
      <path d="M11.75 3c-.35 0-.69.06-1.01.18V2" />
      <path d="M14.25 3c.35 0 .69.06 1.01.18V2" />
      <path d="M16 5.5c0 3-2 3.5-3 3.5h-4V4h4c1 0 3 .5 3 3.5z" />
      <path d="M17 14.5c0 3-2 3.5-3 3.5H8V9h6c1 0 3 .5 3 3.5z" />
      <path d="M11.75 22v-1.18c-.32.12-.66.18-1.01.18" />
      <path d="M14.25 22v-1.18c.32.12.66.18 1.01.18" />
    </svg>
  );
}
