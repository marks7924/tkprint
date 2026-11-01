'use client';

import React from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, products } = useStore();
  const { language, t } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#292329] tracking-tight">
            {t('nav.wishlist')}
          </h1>
          <p className="text-xs sm:text-sm text-[#817780] mt-1">
            {language === 'ar'
              ? `لديك ${wishlistedProducts.length} تصاميم محفوظة في قائمتك المفضلة`
              : `You have ${wishlistedProducts.length} designs saved`}
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-[#F0E4E9] soft-shadow max-w-md mx-auto my-10">
            <Heart className="w-16 h-16 mx-auto text-[#D982A5] mb-4 opacity-50" />
            <h2 className="text-xl font-black text-[#292329]">
              {language === 'ar' ? 'قائمتك المفضلة فارغة حالياً' : 'Your Wishlist is Empty'}
            </h2>
            <p className="text-xs text-[#817780] mt-2 mb-6">
              {language === 'ar'
                ? 'تصفح أحدث التشكيلات واضغط على رمز القلب لحفظ الكفرات التي تنال إعجابك!'
                : 'Browse our collection and tap the heart icon on any case you love!'}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md pill-button transition-all text-sm"
            >
              <span>{language === 'ar' ? 'استعراض الكفرات' : 'Explore Cases'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

