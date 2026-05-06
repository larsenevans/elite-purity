/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/wp-api';
import StructuredData from '@/components/StructuredData';
import ProductSpecs from '@/components/ProductSpecs';
import { Product } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Funkcia na generovanie dynamických metadát pre SEO a sociálne siete
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produkt nenájdený | Purity Pharma',
    };
  }

  // Odstránenie HTML tagov z excerptu pre čistý description
  const cleanDescription = product.excerpt?.replace(/<[^>]*>?/gm, '').trim() || 'Špičkové farmaceutické produkty od Purity Pharma.';

  return {
    title: `${product.title} | Purity Pharma`,
    description: cleanDescription,
    openGraph: {
      title: product.title,
      description: cleanDescription,
      images: [
        {
          url: product.acfFields?.image?.sourceUrl || '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: cleanDescription,
      images: [product.acfFields?.image?.sourceUrl || '/og-default.jpg'],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const wpProduct = await getProductBySlug(slug);

  if (!wpProduct) {
    notFound();
  }

  // Prevod na na náš Product interface pre StructuredData
  const product: Product = {
    id: wpProduct.id,
    name: wpProduct.title,
    price: wpProduct.acfFields.price,
    category: wpProduct.acfFields.category,
    image: wpProduct.acfFields.image.sourceUrl,
    technicalSpecs: wpProduct.acfFields.technicalSpecs
  };

  const cleanDescription = wpProduct.excerpt?.replace(/<[^>]*>?/gm, '').trim();

  return (
    <main className="max-w-screen-xl mx-auto px-6 py-24 bg-brand-dark min-h-screen">
      <StructuredData 
        product={product} 
        description={cleanDescription} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative">
          <Image 
            src={wpProduct.acfFields.image.sourceUrl} 
            alt={wpProduct.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-12"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-display font-black text-white italic tracking-tighter mb-6">
            {wpProduct.title}
          </h1>
          <div 
            className="text-slate-400 text-lg leading-relaxed mb-8 markdown-body"
            dangerouslySetInnerHTML={{ __html: wpProduct.excerpt }}
          />
          <div className="text-3xl font-display font-bold text-brand-red mb-8">
            ${wpProduct.acfFields.price.toFixed(2)}
          </div>
          <button className="bg-brand-red text-white py-4 px-12 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-red transition-all w-full md:w-max">
            Pridať do košíka
          </button>
        </div>
      </div>

      <ProductSpecs specs={wpProduct.acfFields.technicalSpecs || []} />
    </main>
  );
}
