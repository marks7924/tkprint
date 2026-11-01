'use client';

import React from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Heart, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CollectionsPage() {
  const { collections } = useStore();
  const { language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'استكشف عوالم وتشكيلات TK' : 'Explore Collections'}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'مجموعات منسقة بعناية لتعبر عن حالتك المزاجية وستايلك اليومي.'
              : 'Thematically designed aesthetics to match every mood and personality.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#F0E4E9] hover:border-[#EFA6C1] transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={col.image}
                  alt={col.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                <div className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#D982A5]">
                  <Heart className="w-4 h-4 fill-current" />
                </div>

                <div className="absolute bottom-4 start-4 end-4 text-white">
                  <h3 className="font-black text-xl leading-tight">
                    {language === 'ar' ? col.nameAr : col.nameEn}
                  </h3>
                  <span className="text-xs text-white/90">
                    {col.productCount} {language === 'ar' ? 'كفر وتصميم' : 'Designs'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#817780] leading-relaxed">
                  {language === 'ar' ? col.descriptionAr : col.descriptionEn}
                </p>

                <div className="mt-4 pt-3 border-t border-[#F0E4E9] flex items-center justify-between text-xs font-bold text-[#D982A5]">
                  <span>{language === 'ar' ? 'تصفح التشكيلة' : 'Shop this aesthetic'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

