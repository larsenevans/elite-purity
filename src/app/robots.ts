/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://puritypharma.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/*?s=', // Blokovanie interného vyhľadávania pre SEO
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
