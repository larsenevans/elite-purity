/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string | number;
  name: string;
  price: number;
  category: string;
  image: string;
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export interface NavItem {
  name: string;
  href: string;
}
