import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://usequicklaunch.com'),
  title: {
    default: 'QuickLaunch - Create Landing Pages in Minutes',
    template: '%s | QuickLaunch'
  },
  description: 'The fastest way to build and launch beautiful landing pages for your projects. No coding required.',
  keywords: ['landing page builder', 'website builder', 'no-code', 'landing page', 'quick launch', 'page builder'],
  
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  
  // Open Graph
  openGraph: {
    title: 'QuickLaunch - Create Landing Pages in Minutes',
    description: 'The fastest way to build and launch beautiful landing pages for your projects. No coding required.',
    url: 'https://usequicklaunch.com',
    siteName: 'QuickLaunch',
    images: [
      {
        url: '/quicklaunch-og-optimized.png',
        width: 1200,
        height: 630,
        alt: 'QuickLaunch - Landing Page Builder'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'QuickLaunch - Create Landing Pages in Minutes',
    description: 'The fastest way to build and launch beautiful landing pages for your projects. No coding required.',
    images: ['/quicklaunch-og-optimized.png'],
    // creator: '@quicklaunch',  // Replace with your Twitter handle
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  
  alternates: {
    canonical: 'https://usequicklaunch.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#171717" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
