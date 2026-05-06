/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingCart, ZoomIn } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  onLightboxOpen: (index: number) => void;
  priority?: boolean;
}

/**
 * Base64 zakódovaný šedý placeholder pre blur-up efekt
 */
const BLUR_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKp9ghS6wAAAABJRU5ErkJggg==';

export default function ProductCard({ product, index, onLightboxOpen, priority = false }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(200, 16, 46, 0.1)' }}
      onClick={() => onLightboxOpen(index)}
      className="group bg-brand-gray/50 rounded-2xl border border-white/5 p-6 hover:border-brand-red/50 transition-all duration-500 overflow-hidden relative cursor-pointer"
    >
      <div className="absolute top-4 left-4 z-10">
        <div className="w-8 h-[1px] bg-brand-red group-hover:w-12 transition-all duration-500" />
      </div>
      
      <div className="aspect-[4/5] mb-8 overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-transparent p-8 flex items-center justify-center relative group/image">
        <motion.div 
          className="absolute inset-0 bg-brand-red/10 opacity-0 group-hover/image:opacity-100 transition-opacity z-20 flex items-center justify-center"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <ZoomIn className="text-white opacity-50" size={32} />
        </motion.div>
        
        <div className="relative w-full h-full">
            <Image 
                src={product.image} 
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={priority}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-contain transition-transform duration-700 group-hover/image:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
            />
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-12 flex flex-col justify-center">
          <h5 className="text-white font-medium text-lg leading-tight group-hover:text-brand-red transition-colors lowercase first-letter:uppercase">
            {product.name}
          </h5>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="micro-label opacity-30 group-hover:opacity-60 transition-opacity">Price</span>
            <motion.span 
              className="text-2xl font-display font-black text-white tracking-tight italic"
              whileHover={{ scale: 1.1, color: '#c8102e', x: 5 }}
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
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart size={16} className="group-hover/btn:scale-125 transition-transform z-10" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
