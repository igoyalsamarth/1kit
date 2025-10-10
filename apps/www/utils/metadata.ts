export const metadata = {
  metadataBase: new URL('https://1kit.cc'),
  title: '1kit | Launch Projects in Days',
  description:
    '1kit provides select-and-setup CLI to accelerate your development. Save time, money & hassle with the open-source toolkit.',
  applicationName: '1kit',
  authors: [{ name: 'Samarth Goyal', url: 'https://github.com/igoyalsamarth' }],
  generator: 'Next.js',
  keywords: [
    'SaaS starter kit',
    'Next.js boilerplate',
    'SaaS template',
    'SaaS app builder',
    'production-ready SaaS',
    'SaaS startup toolkit',
    'typescript SaaS',
    'javascript SaaS',
    'authentication',
    'analytics',
    'monitoring',
    'service layer',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
    shortcut: '/favicon-32x32.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: '1kit - Launch Production-Ready Project in Days',
    description:
      '1kit provides select-and-setup CLI to accelerate your development. Save time, money & hassle with the open-source toolkit.',
    siteName: '1kit',
    locale: 'en_US',
    type: 'website',
    url: 'https://1kit.cc',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: '1kit - Launch Production-Ready Project in Days',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1kit - Launch Production-Ready Project in Days',
    description:
      '1kit provides select-and-setup CLI to accelerate your development. Save time, money & hassle with the open-source toolkit.',
    creator: '@igoyalsamarth',
    images: [{ url: '/og.png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://1kit.cc',
  },
};
