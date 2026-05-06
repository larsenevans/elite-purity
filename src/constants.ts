/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const PRODUCT_CATEGORIES = [
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

export const BESTSELLERS: Product[] = [
  {
    id: 1,
    name: "Test E 200mg / EQ 200mg",
    price: 77.70,
    category: "Injectable Supplements",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Ipamorelin / Tesamorelin 10 mg",
    price: 78.75,
    category: "Peptides",
    image: "https://images.unsplash.com/photo-1583947239127-183e87836881?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Pro-Dynabol 20mg",
    price: 181.65,
    category: "Oral Supplements",
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Eurotropin 100iu Kit",
    price: 399.00,
    category: "Human Growth Hormone",
    image: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=400"
  }
];

export const NAV_ITEMS = [
  { name: 'Catalog', href: '#' },
  { name: 'Bestsellers', href: '#' },
  { name: 'USA Domestic', href: '#' },
  { name: 'FAQ', href: '#' },
  { name: 'Contact', href: '#' }
];
