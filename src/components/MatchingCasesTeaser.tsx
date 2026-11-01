'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { HeartHandshake, ArrowRight, ArrowLeft, Percent, Smartphone } from 'lucide-react';

export const MatchingCasesTeaser: React.FC = () => {
  const { language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFF8FA] border border-[#F0E4E9] rounded-3xl p-8 sm:p-12 soft-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Editorial visual mockup of 2 matching phone cases */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="relative flex items-center justify-center w-full max-w-sm">
            {/* Phone 1: Sun / His Case */}
            <div className="w-36 sm:w-44 aspect-[1/2] rounded-[2rem] bg-gradient-to-b from-[#FFF5EA] to-[#FCECD8] p-2.5 shadow-xl transform -rotate-6 z-10 border-2 border-white">
              <div className="w-full h-full rounded-[1.6rem] bg-[#FFF9F2] p-3 flex flex-col justify-between items-center relative overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-[#292329] self-start p-1 flex flex-wrap gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                </div>
                <div className="text-center my-auto">
                  <span className="text-3xl">☀️</span>
                  <p className="text-xs font-bold text-[#292329] mt-1 font-serif">You are my Sun</p>
                  <span className="text-[10px] text-[#817780]">iPhone 15 Pro</span>
                </div>
                <span className="text-[9px] font-bold text-[#D982A5]">SET 01</span>
              </div>
            </div>

            {/* Phone 2: Moon / Her Case */}
            <div className="w-36 sm:w-44 aspect-[1/2] rounded-[2rem] bg-gradient-to-b from-[#F2EEFA] to-[#E5DBF5] p-2.5 shadow-2xl transform rotate-6 z-20 -ms-8 border-2 border-white">
              <div className="w-full h-full rounded-[1.6rem] bg-[#F9F6FD] p-3 flex flex-col justify-between items-center relative overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-[#292329] self-end p-1 flex flex-wrap gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                </div>
                <div className="text-center my-auto">
                  <span className="text-3xl">🌙</span>
                  <p className="text-xs font-bold text-[#292329] mt-1 font-serif">You are my Moon</p>
                  <span className="text-[10px] text-[#817780]">Galaxy S24 Ultra</span>
                </div>
                <span className="text-[9px] font-bold text-[#D982A5]">SET 02</span>
              </div>
            </div>

            {/* Floating Connection Heart badge */}
            <div className="absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#D982A5] text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Right Side: Copy and Action */}
        <div className="lg:col-span-7 text-center lg:text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-3 shadow-2xs">
            <Percent className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'خصم 15% تلقائي عند طلب كفرين' : 'Automatic 15% Duo Discount'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#292329] tracking-tight">
            {language === 'ar'
              ? 'كفرات ثنائية.. كفران، قصة واحدة تجمعكما'
              : 'Matching Cases — Two Cases, One Story'}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#817780] leading-relaxed max-w-lg">
            {language === 'ar'
              ? 'اختر كفرين متطابقين أو متكاملين للأزواج والأصدقاء. يمكنك اختيار موديل هاتف مختلف تماماً لكل طرف (مثل iPhone و Samsung) مع إمكانية طباعة أسمائكم وتاريخكم المميز.'
              : 'Choose paired designs for couples & best friends. Mix & match completely different phone models (e.g. iPhone + Samsung) and add custom initials or anniversary dates.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#292329] bg-white px-3.5 py-2 rounded-xl border border-[#F0E4E9]">
              <Smartphone className="w-4 h-4 text-[#D982A5]" />
              <span>{language === 'ar' ? 'موديلات هواتف مختلفة تماماً' : 'Any 2 Phone Models'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#292329] bg-white px-3.5 py-2 rounded-xl border border-[#F0E4E9]">
              <Percent className="w-4 h-4 text-[#D982A5]" />
              <span>{language === 'ar' ? 'توفير فوري بالسلة' : 'Instant 15% Off'}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              href="/matching-cases"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#292329] hover:bg-[#1a171a] text-white font-bold rounded-2xl shadow-md pill-button transition-all text-sm"
            >
              <span>{language === 'ar' ? 'استكشف الكفرات الثنائية' : 'Explore Matching Cases'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
