'use client';

import React from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Gift, Heart, Sparkles, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function GiftModePage() {
  const { language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'أهدِ كفراً يحكي قصة مميزة' : 'Gift a Personalized Case'}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[#817780] leading-relaxed">
            {language === 'ar'
              ? 'هل ترغب في مفاجأة صديق، شريكك، أو شخص عزيز؟ نقدم لك تغليف هدايا راقٍ مع كرت مطبوع باسمه وإخفاء الفاتورة تماماً من الشحنة.'
              : 'Surprise someone special with a custom printed case packaged in luxury gift wrap with a printed card and hidden prices.'}
          </p>
        </div>

        {/* 3 Gift Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F4] text-[#D982A5] mx-auto flex items-center justify-center mb-4">
              <Gift className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#292329] mb-1">
              {language === 'ar' ? 'تغليف هدايا فاخر' : 'Luxury Packaging'}
            </h3>
            <p className="text-xs text-[#817780] leading-relaxed">
              {language === 'ar'
                ? 'صندوق وردي فاخر ومبطن مع شريط حريري أنيق يناسب المناسبات السعيدة.'
                : 'Blush pink boutique box tied with satin ribbon.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F4] text-[#D982A5] mx-auto flex items-center justify-center mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#292329] mb-1">
              {language === 'ar' ? 'كرت إهداء بكلماتك' : 'Custom Letterpress Card'}
            </h3>
            <p className="text-xs text-[#817780] leading-relaxed">
              {language === 'ar'
                ? 'اكتب رسالتك وسنقوم بطباعتها بخط يدوي أنيق على كرت إهداء مميز.'
                : 'Your message printed in an editorial font on textured cardstock.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F4] text-[#D982A5] mx-auto flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#292329] mb-1">
              {language === 'ar' ? 'فاتورة بدون أسعار' : 'Hidden Invoice'}
            </h3>
            <p className="text-xs text-[#817780] leading-relaxed">
              {language === 'ar'
                ? 'نشحن الهدية مباشرة لعنوان المستلم مع إخفاء الأسعار نهائياً من الطرد.'
                : 'Direct courier delivery with pricing details completely concealed.'}
            </p>
          </div>
        </div>

        {/* Action Options */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-[#F0E4E9] soft-shadow text-center max-w-xl mx-auto space-y-4">
          <h3 className="font-black text-xl text-[#292329]">
            {language === 'ar' ? 'كيف تبدأ؟' : 'Ready to Gift?'}
          </h3>
          <p className="text-xs text-[#817780]">
            {language === 'ar'
              ? 'اختر كفراً من المتجر أو صمم كفراً خاصاً، وفي صفحة السلة فعّل خيار &quot;وضع الهدية&quot; بنقرة واحدة!'
              : 'Pick any case or design a bespoke one, then toggle Gift Mode on the cart page!'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/custom-studio"
              className="px-6 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl text-xs shadow-md soft-shadow pill-button"
            >
              {language === 'ar' ? 'صمّم كفراً خاصاً كهدية' : 'Design a Custom Gift'}
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3.5 bg-white border border-[#F0E4E9] text-[#292329] font-bold rounded-2xl text-xs hover:bg-[#FFF0F4]"
            >
              {language === 'ar' ? 'تصفح تشكيلة الكفرات' : 'Explore Case Designs'}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

