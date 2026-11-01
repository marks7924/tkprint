'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ArrowLeft, Edit3, Sparkles, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden pt-6 pb-14 md:pt-12 md:pb-20 bg-gradient-to-b from-[#FFF8FA] via-[#FFF3F7] to-[#FFF8FA]">
      {/* Decorative ambient background blurbs */}
      <div className="absolute top-10 start-1/4 w-72 h-72 bg-[#EFA6C1]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 end-10 w-96 h-96 bg-[#D982A5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-start relative z-10">
            {/* Playful Doodles: Three accent dashes */}
            <div className="flex items-center gap-1.5 mb-3 text-[#D982A5]">
              <span className="inline-block w-2.5 h-1 bg-[#D982A5] rounded-full rotate-45" />
              <span className="inline-block w-3.5 h-1 bg-[#D982A5] rounded-full -rotate-12" />
              <span className="inline-block w-2.5 h-1 bg-[#D982A5] rounded-full -rotate-45" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D982A5] ms-1">
                {language === 'ar' ? 'تصاميم أصلية ومبتكرة' : 'Original Aesthetic Cases'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#292329] tracking-tight leading-[1.15]">
              {language === 'ar' ? (
                <>
                  <span>هاتفك.</span>
                  <br />
                  <span className="relative inline-block text-[#D982A5] mt-1">
                    أسلوبك الخاص.
                    {/* Hand-drawn underline squiggle */}
                    <svg
                      className="absolute -bottom-2 start-0 w-full h-3 text-[#EFA6C1]"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 9C50 3 150 2 198 8"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  <span>Your Phone.</span>
                  <br />
                  <span className="relative inline-block text-[#D982A5] mt-1">
                    Your Style.
                    {/* Hand-drawn underline squiggle */}
                    <svg
                      className="absolute -bottom-2 start-0 w-full h-3 text-[#EFA6C1]"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 9C50 3 150 2 198 8"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base sm:text-lg text-[#817780] max-w-lg leading-relaxed font-normal">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md soft-shadow pill-button transition-all text-sm sm:text-base"
              >
                <span>{t('hero.shop_button')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <Link
                href="/custom-studio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-[#FFF0F4] text-[#292329] border border-[#F0E4E9] font-bold rounded-2xl pill-button transition-all text-sm sm:text-base shadow-xs"
              >
                <Edit3 className="w-4 h-4 text-[#D982A5]" />
                <span>{t('hero.design_button')}</span>
              </Link>
            </div>

            {/* Quality Trust Badges */}
            <div className="mt-8 flex items-center gap-6 text-xs text-[#817780] font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#EFA6C1]" />
                {language === 'ar' ? 'طباعة عالية الدقة تدوم' : 'High-Definition UV Print'}
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#EFA6C1]" />
                {language === 'ar' ? 'حماية شاملة ضد الصدمات' : 'Military Shockproof'}
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Visual Phone Stage (Recreating web.jpg) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Pastel Oval Stage Backdrop */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-[3rem] bg-gradient-to-tr from-[#FEEBF2] to-[#FFF5F8] p-6 flex items-center justify-center shadow-inner border border-white">
              
              {/* Playful Doodles around stage */}
              {/* Floating Doodle Heart */}
              <div className="absolute top-4 end-6 text-[#EFA6C1] animate-bounce">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>

              {/* Twinkle Star Doodle */}
              <div className="absolute bottom-6 start-4 text-[#D982A5]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              {/* Swirl Ribbon Doodle */}
              <div className="absolute top-1/3 start-2 text-[#EFA6C1]/60">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2 12C8 4 16 20 22 12C28 4 36 20 40 12" strokeLinecap="round" />
                </svg>
              </div>

              {/* The 3 Phone Cases Display on 3D Pedestals */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Case 1: Left - Blush Hearts Pattern Case */}
                <div className="absolute -start-2 sm:start-2 bottom-10 w-36 sm:w-44 aspect-[1/2] rounded-[2rem] bg-gradient-to-b from-[#F2A4C0] to-[#E982A6] p-2.5 shadow-2xl transform -rotate-12 hover:-rotate-6 hover:scale-105 transition-all duration-300 z-10 border-2 border-white/60">
                  <div className="w-full h-full rounded-[1.6rem] bg-[#EE9AB9] p-3 flex flex-col justify-between overflow-hidden relative">
                    {/* Camera cutout */}
                    <div className="w-10 h-10 rounded-xl bg-[#292329]/80 self-start p-1.5 flex flex-wrap gap-1 shadow-inner">
                      <div className="w-3 h-3 rounded-full bg-black/90 border border-neutral-700" />
                      <div className="w-3 h-3 rounded-full bg-black/90 border border-neutral-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-black/90 border border-neutral-700" />
                    </div>
                    {/* Scattered Hearts Pattern */}
                    <div className="absolute inset-0 flex flex-wrap gap-4 items-center justify-around opacity-70 p-4 pt-12">
                      {['❤️', '💖', '💕', '💗', '💓', '❤️'].map((h, i) => (
                        <span key={i} className="text-lg">{h}</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-white/90 z-10 self-center">TK-PRINT</span>
                  </div>
                </div>

                {/* Case 2: Center - Good Vibes Only Cream Minimal Case */}
                <div className="absolute z-20 w-40 sm:w-48 aspect-[1/2] rounded-[2.2rem] bg-[#F7EFE8] p-2.5 shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white">
                  <div className="w-full h-full rounded-[1.8rem] bg-[#FDF9F5] p-3.5 flex flex-col justify-between items-center relative overflow-hidden">
                    {/* Camera cutout */}
                    <div className="w-12 h-12 rounded-2xl bg-[#292329]/85 self-start p-1.5 flex flex-wrap gap-1 shadow-inner">
                      <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-700" />
                      <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-700" />
                      <div className="w-3 h-3 rounded-full bg-black border border-neutral-700" />
                    </div>
                    {/* Center Script text */}
                    <div className="text-center my-auto">
                      <p className="font-serif italic text-2xl text-[#292329] leading-tight font-medium">
                        good<br />vibes<br />only ♡
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#817780] tracking-widest">MINIMAL</span>
                  </div>
                </div>

                {/* Case 3: Right - Lilac Ribbon Bows Case */}
                <div className="absolute -end-2 sm:end-2 bottom-8 w-36 sm:w-44 aspect-[1/2] rounded-[2rem] bg-gradient-to-b from-[#DAC5E8] to-[#C8AEE0] p-2.5 shadow-xl transform rotate-12 hover:rotate-6 hover:scale-105 transition-all duration-300 z-10 border-2 border-white/60">
                  <div className="w-full h-full rounded-[1.6rem] bg-[#D4BEDF] p-3 flex flex-col justify-between overflow-hidden relative">
                    {/* Camera cutout */}
                    <div className="w-10 h-10 rounded-xl bg-[#292329]/80 self-end p-1.5 flex flex-wrap gap-1 shadow-inner">
                      <div className="w-3 h-3 rounded-full bg-black/90 border border-neutral-700" />
                      <div className="w-3 h-3 rounded-full bg-black/90 border border-neutral-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-black/90 border border-neutral-700" />
                    </div>
                    {/* Scattered Ribbon Bows */}
                    <div className="absolute inset-0 flex flex-wrap gap-3 items-center justify-around opacity-80 p-3 pt-12">
                      {['🎀', '🎀', '🎀', '🎀', '🎀'].map((b, i) => (
                        <span key={i} className="text-lg">{b}</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-white/90 z-10 self-center">COQUETTE</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

