/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import HomeClient from '@/components/HomeClient';
import { getAllProducts, WPProduct } from '@/lib/wp-api';
import { Product } from '@/types';

/**
 * Server side component to fetch products and pass them to Client Component
 * This ensures SEO and performance while maintaining interactivity.
 */
export default async function Home() {
  const wpProducts: WPProduct[] = await getAllProducts({ tags: ['products'] });

  // Map WP data to our local Product interface
  const initialProducts: Product[] = wpProducts.map(wp => ({
    id: wp.id,
    name: wp.title,
    price: wp.acfFields?.price || 0,
    category: wp.acfFields?.category || 'General',
    image: wp.acfFields?.image?.sourceUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'
  }));

  return <HomeClient initialProducts={initialProducts} />;
}
