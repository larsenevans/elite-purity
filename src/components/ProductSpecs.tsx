/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface TechSpec {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  specs: TechSpec[];
}

/**
 * Komponent na zobrazenie technických špecifikácií produktu.
 * Využíva dáta z ACF polí vo WordPress.
 */
export default function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <section className="mt-12 py-12 border-t border-white/10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-[2px] bg-brand-red" />
        <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-wider">
          Technical Specifications
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specs.map((spec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-brand-gray/30 p-6 rounded-2xl border border-white/5 hover:border-brand-red/30 transition-colors group"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red/60 mb-1 group-hover:text-brand-red transition-colors">
                {spec.label}
              </span>
              <span className="text-lg font-medium text-white">
                {spec.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
