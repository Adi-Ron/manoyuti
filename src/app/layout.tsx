import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://resilio.in'),
  title: {
    default: 'Resilio by IshIra | Psychotherapy, Research and Training in Bengaluru',
    template: '%s | Resilio by IshIra'
  },
  description: 'Resilio by IshIra brings together evidence-based psychotherapy, psychology research and training for students, led by psychologist Isha Tiwari in Bengaluru and online across India.',
  keywords: ['psychotherapy', 'psychology', 'therapy', 'counselling', 'CBT', 'training', 'research', 'Bengaluru', 'mental health'],
  authors: [{ name: 'Resilio by IshIra' }],
  creator: 'Resilio by IshIra',
  publisher: 'Resilio by IshIra',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://resilio.in',
    siteName: 'Resilio by IshIra',
    title: 'Resilio by IshIra | Psychotherapy, Research and Training in Bengaluru',
    description: 'Resilio by IshIra brings together evidence-based psychotherapy, psychology research and training for students, led by psychologist Isha Tiwari in Bengaluru and online across India.',
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Resilio by IshIra' }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resilio by IshIra',
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
