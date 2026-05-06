/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Stránka sa nenašla | Purity Pharma',
  description: 'Ľutujeme, ale hľadaná stránka neexistuje. Vráťte sa na domovskú stránku a objavte naše produkty.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-brand-dark px-6">
      <div className="text-center">
        <h1 className="text-9xl font-display font-black text-white/10 mb-[-1.5rem] select-none">404</h1>
        <h2 className="text-4xl font-display font-bold text-white mb-6 uppercase tracking-tighter">
          Stránka neexistuje
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg">
          Možno ste zadali nesprávnu adresu alebo bola stránka presunutá. Skúste radšej naše produkty.
        </p>
        <Link 
          href="/"
          className="inline-block bg-brand-red text-white py-4 px-10 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-red transition-all"
        >
          Späť na domov
        </Link>
      </div>
    </main>
  );
}
