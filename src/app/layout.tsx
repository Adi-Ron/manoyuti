import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Manoyuti | Psychotherapy, Research and Training in Bengaluru',
    template: '%s | Manoyuti'
  },
  description: 'Manoyuti brings together evidence-based psychotherapy, psychology research and training for students, led by psychologist Isha Tiwari in Bengaluru and online across India.',
  keywords: ['psychotherapy', 'psychology', 'therapy', 'counselling', 'CBT', 'training', 'research', 'Bengaluru', 'mental health'],
  authors: [{ name: 'Manoyuti' }],
  creator: 'Manoyuti',
  publisher: 'Manoyuti',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Manoyuti',
    title: 'Manoyuti | Psychotherapy, Research and Training in Bengaluru',
    description: 'Manoyuti brings together evidence-based psychotherapy, psychology research and training for students, led by psychologist Isha Tiwari in Bengaluru and online across India.',
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Manoyuti' }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manoyuti',
    description: 'Evidence-based psychotherapy, psychology research and training in Bengaluru and online across India.',
    images: ['/og-image.jpg']
  },
  verification: {
    google: 'your-google-site-verification-code'
  }
};

export const viewport: Viewport = {
  themeColor: '#CDBFB3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%232A211E'/%3E%3Ccircle cx='16' cy='16' r='6' fill='%23E8C3BE'/%3E%3C/svg%3E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")'
          }}
        />
      </head>
      <body className="font-hanken-grotesk antialiased" data-page="home">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
