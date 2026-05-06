/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/index.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#c8102e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Purity Pharma | Špičkové farmaceutické produkty",
    template: "%s | Purity Pharma",
  },
  description: "Purity Pharma ponúka najkvalitnejšie farmaceutiká, doplnky a medicínske produkty s doručením po celom svete.",
  keywords: ["farmaceutiká", "doplnky", "Purity Pharma", "zdravie", "fitness"],
  authors: [{ name: "Purity Pharma Team" }],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://puritypharma.sk",
    siteName: "Purity Pharma",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Purity Pharma",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Header from "@/komponenty/Header";
import Footer from "@/komponenty/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-brand-dark min-h-screen antialiased text-white font-sans flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
