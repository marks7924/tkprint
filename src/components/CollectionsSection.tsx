'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ArrowLeft, Heart } from 'lucide-react';

export const CollectionsSection: React.FC = () => {
  const { collections } = useStore();
  const { t, language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-12 bg-white border-y border-[#F0E4E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#292329] tracking-tight">
              {t('collections.title')}
            </h2>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D982A5] hover:text-[#c46b90] transition-colors"
          >
            <span>{t('collections.view_all')}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Collections Grid / Scroll */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-[#FFF8FA] border border-[#F0E4E9] hover:border-[#EFA6C1] transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              {/* Image banner */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={col.image}
                  alt={language === 'ar' ? col.nameAr : col.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Floating Heart Icon */}
                <div className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#D982A5] shadow-xs">
                  <Heart className="w-4 h-4 fill-[#D982A5]/20 stroke-[#D982A5]" />
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 start-3 end-3 text-white">
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight drop-shadow-sm">
                    {language === 'ar' ? col.nameAr : col.nameEn}
                  </h3>
                  <span className="text-[11px] font-medium text-white/90">
                    {col.productCount} {language === 'ar' ? 'تصميم' : 'Designs'}
                  </span>
                </div>
              </div>

              {/* Bottom text description */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#817780] line-clamp-2 leading-relaxed">
                  {language === 'ar' ? col.descriptionAr : col.descriptionEn}
                </p>
                <span className="mt-3 text-xs font-bold text-[#D982A5] inline-flex items-center gap-1 group-hover:underline">
                  {language === 'ar' ? 'استعراض التشكيلة' : 'Explore collection'}
                  <ArrowIcon className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

