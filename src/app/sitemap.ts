/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataRoute } from 'next';
import { getAllProductSlugs, getAllCategorySlugs } from '@/lib/wp-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Odporúča sa nastaviť NEXT_PUBLIC_SITE_URL v .env
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://puritypharma.com';

  // Paralelné získavanie všetkých slugov
  const [products, categories] = await Promise.all([
    getAllProductSlugs(),
    getAllCategorySlugs(),
  ]);

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/produkty/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/kategoria/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
    ...categoryUrls,
  ];
}
