/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Metadata } from 'next';
import { getProductsByCategory, getAllCategories, WPProduct } from '@/lib/wp-api';
import { Product } from '@/types';
import HomeClient from '@/components/HomeClient';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamické generovanie metadát pre kategóriu
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  return {
    title: `${categoryName} | Purity Pharma`,
    description: `Prehliadajte naše produkty v kategórii ${categoryName}.`,
  };
}

/**
 * Statické generovanie ciest pre kategórie (ISR)
 */
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const wpProducts: WPProduct[] = await getProductsByCategory(slug);

  // Mapovanie WP dát na náš lokálny Product interface
  const initialProducts: Product[] = wpProducts.map(wp => ({
    id: wp.id,
    name: wp.title,
    price: wp.acfFields?.price || 0,
    category: wp.acfFields?.category || 'General',
    image: wp.acfFields?.image?.sourceUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'
  }));

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6 mb-12">
        <h1 className="italic mb-2">
          KATEGÓRIA: <span className="font-black not-italic text-brand-red">{categoryName.toUpperCase()}</span>
        </h1>
        <p className="text-slate-400">Zobrazené produkty pre vybranú kategóriu.</p>
      </div>
      
      {/* Opätovné použitie HomeClient na zobrazenie zoznamu s filtrami, ale s predfiltrovanými dátami */}
      <HomeClient initialProducts={initialProducts} hideHero={true} hideStats={true} />
    </div>
  );
}
