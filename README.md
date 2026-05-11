# Purity Pharma Landing Page

A high-conversion supplements landing page with a modern dark aesthetic, featuring product catalogs, comprehensive category organization, and promotional sections. Built with Next.js and Tailwind CSS.

## Features

- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Modern Dark Aesthetic** - Professional and visually appealing interface
- 📦 **Product Catalog** - Browse supplements across multiple categories
- 🏷️ **Category Organization** - Organized product categories including:
  - US Domestic Supplements
  - Injectable Supplements
  - Oral Supplements
  - Human Growth Hormone
  - Peptides
  - Antiestrogens
  - Post Cycle Therapy
  - Erectile Dysfunction
  - Acne & Skin Care
  - Antibiotics
  - Hair Care
  - Pain Management
- 🔍 **SEO Optimized** - Structured data and sitemap included
- ⚡ **Next.js 16** - Latest Next.js with Turbopack for fast development

## Tech Stack

- **Framework:** Next.js 16
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Backend Integration:** WordPress GraphQL API
- **UI Components:** Lucide React, Motion for animations

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd elite-purity
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file in the root directory and configure:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=your_wordpress_graphql_api_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── komponenty/       # Additional UI components
├── lib/              # Utility functions and API integration
├── constants.ts      # Product categories and constants
├── types.ts          # TypeScript type definitions
└── index.css         # Global styles
```

## API Integration

The application uses WordPress GraphQL API for fetching product data and categories. Ensure the `NEXT_PUBLIC_WORDPRESS_API_URL` environment variable is properly configured.

## Deployment

### Local Production Test

Before deploying to Vercel, test the production build locally:

```bash
npm install
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to verify:
- Home page loads correctly
- Product pages (`/produkty/[slug]`) render with data
- Category pages (`/kategoria/[slug]`) work properly
- Sitemap and robots.txt generate without errors

### Vercel Deployment

1. **Connect GitHub Repository**
   - Log in to [Vercel](https://vercel.com)
   - Select "Add New... → Project"
   - Import your GitHub repository
   - Framework preset will auto-detect as Next.js

2. **Set Environment Variables**
   - In Vercel project settings, add under **Environment Variables**:
     - `NEXT_PUBLIC_WORDPRESS_API_URL` - Your WordPress GraphQL endpoint
     - `NEXT_PUBLIC_SITE_URL` - Your production domain (e.g., `https://puritypharma.com`)

3. **Deploy**
   - Select "Deploy"
   - Vercel will automatically run `npm run build`
   - Site will be live at your Vercel URL

4. **Custom Domain (Optional)**
   - Go to project **Settings → Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

### Environment Variables Checklist

See [.env.example](.env.example) for template variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | Yes | WordPress GraphQL endpoint |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production site URL (for SEO/sitemap) |
| `REVALIDATE_TOKEN` | Optional | Secret token for on-demand ISR |

## Troubleshooting

**Build fails with "WordPress API URL not defined"**
- Ensure `NEXT_PUBLIC_WORDPRESS_API_URL` is set in Vercel environment variables
- The app will build successfully but serve empty data until configured

**Images not loading**
- Verify image domains in `next.config.js` match your WordPress media host
- Update `remotePatterns` if using a different image CDN

**Sitemap includes non-existent routes**
- Check `src/app/sitemap.ts` generates only valid routes
- Ensure WordPress GraphQL queries match your WP schema

## License

Apache-2.0
