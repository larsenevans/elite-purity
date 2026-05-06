/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const API_URL = process.env.VITE_WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

/**
 * Centrálna funkcia na komunikáciu s WPGraphQL
 */
async function fetchAPI<T>(query: string, { variables, tags }: { variables?: Record<string, any>; tags?: string[] } = {}): Promise<T> {
  if (!API_URL) {
    console.warn('WORDPRESS_API_URL nie je definovaná. Vraciam prázdne dâta pre build.');
    return { data: {} } as any;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { 
      revalidate: 3600, // Záložná revalidácia každú hodinu
      tags: tags,       // Tagy pre on-demand revalidáciu
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Chyba pri získavaní dát z GraphQL API');
  }

  return json.data as T;
}

export interface WPProduct {
  id: string;
  title: string;
  excerpt?: string;
  acfFields: {
    price: number;
    category: string;
    image: {
      sourceUrl: string;
    };
    technicalSpecs?: {
      label: string;
      value: string;
    }[];
  };
}

/**
 * Príklad: Získanie všetkých produktov z WP (v prípade, že máte Product CPT)
 */
export async function getAllProducts(options: { tags?: string[] } = {}) {
  const data = await fetchAPI<{
    products: {
      nodes: WPProduct[];
    };
  }>(`
    query GetAllProducts {
      products {
        nodes {
          id
          title
          excerpt
          acfFields {
            price
            category
            image {
              sourceUrl
            }
            technicalSpecs {
              label
              value
            }
          }
        }
      }
    }
  `, { tags: options.tags || ['products'] });

  return data?.products?.nodes || [];
}

/**
 * Príklad: Získanie konkrétneho produktu podľa slugu
 */
export async function getProductBySlug(slug: string) {
  const data = await fetchAPI<{
    product: {
      id: string;
      title: string;
      excerpt: string;
      acfFields: {
        price: number;
        category: string;
        image: {
          sourceUrl: string;
        };
        technicalSpecs?: {
          label: string;
          value: string;
        }[];
      };
    };
  }>(`
    query GetProductBySlug($id: ID!) {
      product(id: $id, idType: SLUG) {
        id
        title
        excerpt
        acfFields {
          price
          category
          image {
            sourceUrl
          }
          technicalSpecs {
            label
            value
          }
        }
      }
    }
  `, { 
    variables: { id: slug },
    tags: [`product-${slug}`] 
  });

  return data?.product;
}

/**
 * Príklad: Získanie konkrétnej stránky podľa slugu
 */
export async function getPageBySlug(slug: string) {
  const data = await fetchAPI<{
    page: any;
  }>(`
    query GetPageBySlug($id: ID!) {
      page(id: $id, idType: URI) {
        title
        content
      }
    }
  `, { 
    variables: { id: slug },
    tags: [`page-${slug}`] 
  });

  return data?.page;
}

/**
 * Získanie produktov podľa slug-u kategórie
 */
export async function getProductsByCategory(categorySlug: string) {
  const data = await fetchAPI<{
    products: {
      nodes: WPProduct[];
    };
  }>(`
    query GetProductsByCategory($categoryName: String!) {
      products(where: { categoryName: $categoryName }) {
        nodes {
          id
          title
          excerpt
          acfFields {
            price
            category
            image {
              sourceUrl
            }
            technicalSpecs {
              label
              value
            }
          }
        }
      }
    }
  `, { 
    variables: { categoryName: categorySlug },
    tags: [`category-${categorySlug}`]
  });

  return data?.products?.nodes || [];
}

/**
 * Získanie všetkých kategórií
 */
export async function getAllCategories() {
  const data = await fetchAPI<{
    productCategories: {
      nodes: Array<{
        name: string;
        slug: string;
      }>;
    };
  }>(`
    query GetAllCategories {
      productCategories {
        nodes {
          name
          slug
        }
      }
    }
  `);

  return data?.productCategories?.nodes || [];
}

/**
 * Získanie všetkých slugov produktov pre sitemapu
 */
export async function getAllProductSlugs() {
  const data = await fetchAPI<{
    products: {
      nodes: Array<{ slug: string }>;
    };
  }>(`
    query GetAllProductSlugs {
      products(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `);

  return data?.products?.nodes || [];
}

/**
 * Získanie všetkých slugov článkov (blog) pre sitemapu
 */
export async function getAllPostSlugs() {
  const data = await fetchAPI<{
    posts: {
      nodes: Array<{ slug: string }>;
    };
  }>(`
    query GetAllPostSlugs {
      posts(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `);

  return data?.posts?.nodes || [];
}

/**
 * Získanie všetkých slugov kategórií pre sitemapu
 */
export async function getAllCategorySlugs() {
  const data = await fetchAPI<{
    productCategories: {
      nodes: Array<{ slug: string }>;
    };
  }>(`
    query GetAllCategorySlugs {
      productCategories(first: 100) {
        nodes {
          slug
        }
      }
    }
  `);

  return data?.productCategories?.nodes || [];
}
