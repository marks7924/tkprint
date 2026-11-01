'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FindYourPhoneBar } from '@/components/FindYourPhoneBar';
import { QuickShortcuts } from '@/components/QuickShortcuts';
import { CollectionsSection } from '@/components/CollectionsSection';
import { ProductCard } from '@/components/ProductCard';
import { CustomStudioTeaser } from '@/components/CustomStudioTeaser';
import { MatchingCasesTeaser } from '@/components/MatchingCasesTeaser';
import { DesignOfWeekSection } from '@/components/DesignOfWeekSection';
import { LimitedDropsSection } from '@/components/LimitedDropsSection';
import { CommunityGallerySection } from '@/components/CommunityGallerySection';
import { CustomerReviewsSection } from '@/components/CustomerReviewsSection';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const { products, selectedModel } = useStore();
  const { t, language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  // Best Sellers list
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-1">
        {/* 1. Hero Section matching web.jpg */}
        <HeroSection />

        {/* 2. Find Your Phone Interactive Selector */}
        <FindYourPhoneBar />

        {/* 3. Quick 4 Shortcuts (Find My Phone, Design Your Case, Gift a Case, Matching) */}
        <QuickShortcuts />

        {/* 4. Explore Collections Carousel / Grid */}
        <CollectionsSection />

        {/* 5. Best Sellers Product Grid */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-1 text-[#D982A5] mb-1">
                <span className="w-2 h-0.5 bg-[#D982A5] rounded-full rotate-45" />
                <span className="w-3 h-0.5 bg-[#D982A5] rounded-full" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#292329] tracking-tight">
                {language === 'ar' ? 'الأكثر طلباً وإعجاباً' : 'Our Best Sellers'}
              </h2>
              {selectedModel && (
                <p className="text-xs text-[#D982A5] font-semibold mt-1">
                  {language === 'ar'
                    ? `عرض الكفرات المتوافقة مع ${selectedModel.name}`
                    : `Showing cases compatible with ${selectedModel.name}`}
                </p>
              )}
            </div>

            <Link
              href="/shop?sort=bestseller"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D982A5] hover:text-[#c46b90] transition-colors"
            >
              <span>{t('collections.view_all')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 6. Custom Studio Promotion Teaser */}
        <CustomStudioTeaser />

        {/* 7. Matching Cases Experience Teaser */}
        <MatchingCasesTeaser />

        {/* 8. Design of the Week Community Voting */}
        <DesignOfWeekSection />

        {/* 9. Limited Drops System */}
        <LimitedDropsSection />

        {/* 10. Community Photo Submissions */}
        <CommunityGallerySection />

        {/* 11. Customer Reviews */}
        <CustomerReviewsSection />
      </main>

      <Footer />
    </div>
  );
}
