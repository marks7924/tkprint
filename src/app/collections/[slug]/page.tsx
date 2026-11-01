'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CollectionDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { collections, products } = useStore();
  const { language } = useLanguage();

  const collection = collections.find((c) => c.slug === resolvedParams.slug);

  if (!collection) {
    return notFound();
  }

  // Filter products belonging to this collection
  const collectionProducts = products.filter((p) =>
    p.collectionIds.includes(collection.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Banner */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 text-white p-8 sm:p-14 mb-10 shadow-xl">
          <div className="absolute inset-0 opacity-40">
            <img
              src={collection.image}
              alt={collection.nameEn}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#EFA6C1] block mb-2">
              TK-PRINT COLLECTION
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {language === 'ar' ? collection.nameAr : collection.nameEn}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {language === 'ar' ? collection.descriptionAr : collection.descriptionEn}
            </p>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-black text-xl text-[#292329]">
              {language === 'ar' ? 'الكفرات في هذه التشكيلة' : 'Designs in Collection'} (
              {collectionProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {collectionProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

