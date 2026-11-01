import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'TK-PRINT | Your Phone. Your Story. كفرات هواتف مطبوعة وتصاميم مخصصة',
  description:
    'براند كفرات الهواتف الإبداعي الرائد في مصر. كفرات مطبوعة، استوديو تصميم مخصص، كفرات ثنائية متناسقة، وحماية فائقة لجميع أجهزة iPhone و Samsung و Xiaomi و Oppo.',
  keywords: [
    'phone cases',
    'custom phone case',
    'كفرات موبايل',
    'طباعة كفرات',
    'كفرات ايفون',
    'كفرات سامسونج',
    'TK-PRINT',
    'matching phone cases',
    'كفرات ثنائية'
  ],
  openGraph: {
    title: 'TK-PRINT | Your Phone. Your Story.',
    description: 'كفرات مصممة لتعكس شخصيتك الفريدة. اكتشف تصميمك المفضل أو اصنع كفراً خاصاً بك.',
    url: 'https://tk-print.com',
    siteName: 'TK-PRINT',
    images: [
      {
        url: '/assets/web.jpg',
        width: 1200,
        height: 630,
        alt: 'TK-PRINT Creative Phone Cases'
      }
    ],
    locale: 'ar_EG',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full w-full overflow-x-hidden">
      <head>
        <link rel="icon" href="/assets/logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="min-h-full w-full max-w-full overflow-x-hidden flex flex-col bg-[#FFF8FA] text-[#292329] antialiased pb-16 lg:pb-0">
        <LanguageProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
