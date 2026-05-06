/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '@/types';

interface StructuredDataProps {
  product: Product;
  description?: string;
  sku?: string;
  brand?: string;
}

/**
 * Komponent pre vkladanie štruktúrovaných dát (JSON-LD) pre SEO
 * Zobrazuje rich výsledky v Google (cena, dostupnosť, hviezdičky)
 */
export default function StructuredData({ product, description, sku, brand = 'Purity Pharma' }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://puritypharma.com';
  
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': product.name,
    'image': [product.image],
    'description': description || `High-quality ${product.name} pharmaceutical compound by Purity Pharma.`,
    'sku': sku || product.id,
    'brand': {
      '@type': 'Brand',
      'name': brand,
    },
    'offers': {
      '@type': 'Offer',
      'url': `${baseUrl}/produkty/${product.id}`,
      'priceCurrency': 'USD',
      'price': product.price,
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': brand,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
