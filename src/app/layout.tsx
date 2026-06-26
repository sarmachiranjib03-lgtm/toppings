import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Space_Mono, Cormorant_Garamond, Italiana, Tenor_Sans } from "next/font/google";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

const tenorSans = Tenor_Sans({
  variable: "--font-tenor-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Toppings — Cafe & Restaurant",
  description: "Flavors piled high. Memories made over coffee. Discover artisanal wood-fired pizzas, slow-brewed coffees, and long, warm evenings at Toppings.",
  openGraph: {
    title: "Toppings — Cafe & Restaurant",
    description: "Flavors piled high. Memories made over coffee. Discover artisanal wood-fired pizzas, slow-brewed coffees, and long, warm evenings at Toppings.",
    url: "https://toppings.co",
    siteName: "Toppings",
    images: [
      {
        url: "/images/unnamed-hero.webp",
        width: 1200,
        height: 630,
        alt: "Toppings Cafe & Restaurant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toppings — Cafe & Restaurant",
    description: "Flavors piled high. Memories made over coffee. Discover artisanal wood-fired pizzas, slow-brewed coffees, and long, warm evenings at Toppings.",
    images: ["/images/unnamed-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${spaceMono.variable} ${cormorant.variable} ${italiana.variable} ${tenorSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-charcoal flex flex-col font-sans selection:bg-terracotta selection:text-white">
        {children}
      </body>
    </html>
  );
}
