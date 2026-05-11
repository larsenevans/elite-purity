/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { 
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
  ShieldCheck,
  Truck,
  X,
  Instagram,
  Facebook,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SortOption, Product } from '@/types';
import ProductCard from '@/komponenty/ProductCard';

interface HomeClientProps {
  initialProducts: Product[];
  hideHero?: boolean;
  hideStats?: boolean;
}

export default function HomeClient({ initialProducts, hideHero = false, hideStats = false }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    return initialProducts
      .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [initialProducts, selectedCategory, sortOption]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && filteredAndSortedProducts.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredAndSortedProducts.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && filteredAndSortedProducts.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredAndSortedProducts.length) % filteredAndSortedProducts.length);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredAndSortedProducts]);

  const availableCategories = useMemo(() => 
    ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))],
  [initialProducts]);

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <>
      <main className="flex-grow">
        {/* 3. HERO SECTION - EDITORIAL STYLE */}
        {!hideHero && (
          <section className="relative min-h-[70vh] md:h-[80vh] flex items-center overflow-hidden py-20 md:py-0">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000" 
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
              alt="Hero Background"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to gradient if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
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
        )}

        {/* 4. KEY METRICS */}
        {!hideStats && (
          <div className="bg-brand-gray py-12 md:py-16 border-y border-white/5">
            <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: "Purity", value: "99.8%", sub: "Average lab test verification" },
                { label: "Delivery", value: "2-4d", sub: "Fast domestic USA shipping" },
                { label: "Products", value: `${initialProducts.length}+`, sub: "Curated performance catalog" },
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
        )}

        {/* 5. FEATURED COLLECTION */}
        <section id="catalog" className="py-24 bg-brand-dark">
          <div className="max-w-screen-2xl mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 mb-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
              <a href="#" className="hover:text-brand-red transition-colors">Home</a>
              <ChevronRight size={10} className="text-slate-800" />
              <a href="#" className="hover:text-brand-red transition-colors">Catalog</a>
              <ChevronRight size={10} className="text-slate-800" />
              <span className="text-slate-400">Products</span>
            </nav>

            <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-16">
              <div>
                <span className="micro-label text-brand-red block mb-2">Elite Inventory</span>
                <h2 className="italic">
                  Our <span className="font-black not-italic text-slate-800">Compounds</span>
                </h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto">
                <div className="flex flex-col space-y-1 w-full sm:w-auto">
                  <span className="text-[8px] font-black uppercase text-slate-600 tracking-widest px-4">Filter</span>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-brand-gray border border-white/10 rounded-full px-6 py-2.5 text-[10px] font-bold text-white uppercase tracking-wider focus:outline-none focus:border-brand-red transition-all cursor-pointer appearance-none w-full sm:min-w-[180px]"
                  >
                    {availableCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-1 w-full sm:w-auto">
                  <span className="text-[8px] font-black uppercase text-slate-600 tracking-widest px-4">Sort</span>
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="bg-brand-gray border border-white/10 rounded-full px-6 py-2.5 text-[10px] font-bold text-white uppercase tracking-wider focus:outline-none focus:border-brand-red transition-all cursor-pointer appearance-none w-full sm:min-w-[180px]"
                  >
                    <option value="default">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product, idx) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    index={idx}
                    onLightboxOpen={setLightboxIndex}
                    priority={idx < 4}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                  <span className="micro-label text-slate-600 block mb-4">No Matches Found</span>
                  <p className="text-white/40 font-display italic text-2xl">Try adjusting your filters or search criteria</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSortOption('default'); }}
                    className="mt-8 text-brand-red font-bold text-[10px] uppercase tracking-widest border-b border-brand-red pb-1 hover:text-white hover:border-white transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
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
              <Image 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200" 
                height={384}
                width={800}
                className="w-full h-96 object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                alt="Lab"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
              <motion.div 
                className="absolute bottom-12 left-12"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h4 className="italic tracking-tighter shadow-black/50 drop-shadow-xl text-white">QUALITY OVER<br/>EQUITY.</h4>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 7. FULL SCREEN LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredAndSortedProducts[lightboxIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-2xl p-4 md:p-12"
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-12 md:right-12 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-red hover:border-brand-red transition-all group z-50"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>

            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-red hover:border-brand-red transition-all group z-50"
              onClick={prevImage}
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-red hover:border-brand-red transition-all group z-50"
              onClick={nextImage}
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.div 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl w-full h-[45vh] md:h-[65vh] flex items-center justify-center p-6 md:p-8 bg-white/5 rounded-3xl border border-white/5 overflow-hidden shadow-2xl shadow-brand-red/10"
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={filteredAndSortedProducts[lightboxIndex].image} 
                    alt={filteredAndSortedProducts[lightboxIndex].name} 
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-contain drop-shadow-[0_20px_50px_rgba(200,16,46,0.3)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <motion.div 
                key={`info-${lightboxIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 text-center"
              >
                <span className="micro-label text-brand-red mb-2 block">{filteredAndSortedProducts[lightboxIndex].category}</span>
                <h3 className="text-2xl md:text-4xl font-display font-black text-white italic tracking-tighter mb-4">
                  {filteredAndSortedProducts[lightboxIndex].name}
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:space-x-12">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pricing</span>
                    <span className="text-2xl font-display font-light text-white italic">${filteredAndSortedProducts[lightboxIndex].price.toFixed(2)}</span>
                  </div>
                  <motion.button 
                    className="bg-brand-red text-white py-3 md:py-4 px-8 md:px-12 rounded-sm font-bold text-xs uppercase tracking-widest flex items-center space-x-3 w-full md:w-auto justify-center"
                    whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#c8102e' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart size={14} />
                    <span>Secure Checkout</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Progress dots */}
              <div className="absolute bottom-4 flex space-x-2">
                {filteredAndSortedProducts.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-500 ${i === lightboxIndex ? 'w-8 bg-brand-red' : 'w-2 bg-white/10'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
