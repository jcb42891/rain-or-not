import { Metadata } from 'next'
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: 'Rain Or Not',
    template: '%s | Rain Or Not'
  },
  description: 'Get real-time weather updates for your location',
  keywords: ['weather', 'forecast', 'local weather', 'real-time weather'],
  openGraph: {
    title: 'Weather App',
    description: 'Get real-time weather updates for your location',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Weather App',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'A cute cartoon cloud holding a pink umbrella and wearing yellow rain boots'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
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
  alternates: {
    canonical: 'https://rainornot.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DHXPP1ZKGX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DHXPP1ZKGX');
          `}
        </Script>
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
