'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ArrowRight, ArrowLeft, Upload, Type, Eye, ShieldCheck } from 'lucide-react';

export const CustomStudioTeaser: React.FC = () => {
  const { language } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 bg-gradient-to-b from-white via-[#FFF5F8] to-white relative overflow-hidden">
      {/* Decorative blurred backdrop */}
      <div className="absolute top-1/2 -start-20 w-80 h-80 bg-[#EFA6C1]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-[#FFF0F5] to-white border border-[#F0E4E9] rounded-[2.5rem] p-8 sm:p-12 soft-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 text-center lg:text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'استوديو التصميم الحي 2026' : 'Interactive Custom Studio'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#292329] tracking-tight leading-tight">
              {language === 'ar' ? (
                <>
                  اصنع كفراً يحكي <span className="text-[#D982A5]">قصتك أنت</span>.
                </>
              ) : (
                <>
                  Design a case that tells <span className="text-[#D982A5]">your story</span>.
                </>
              )}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#817780] max-w-lg leading-relaxed">
              {language === 'ar'
                ? 'ارفع صورتك المفضلة، أضف اسمك أو عبارتك المفضلة بالخط واللون الذي تحبه، وشاهد معاينة ثلاثية الأبعاد فورية قبل الطلب مع طباعة مقاومة للخدوش.'
                : 'Upload your favorite photo, add custom typography and names in your chosen font & colors, and preview in real-time before ordering.'}
            </p>

            {/* 3 Step highlights */}
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              <div className="p-3 bg-white/80 rounded-2xl border border-[#F0E4E9] text-center">
                <Upload className="w-5 h-5 mx-auto text-[#D982A5] mb-1" />
                <span className="text-[11px] font-bold text-[#292329] block">
                  {language === 'ar' ? 'ارفع تصميمك' : 'Upload'}
                </span>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-[#F0E4E9] text-center">
                <Type className="w-5 h-5 mx-auto text-[#D982A5] mb-1" />
                <span className="text-[11px] font-bold text-[#292329] block">
                  {language === 'ar' ? 'أضف اسمك' : 'Custom Text'}
                </span>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-[#F0E4E9] text-center">
                <Eye className="w-5 h-5 mx-auto text-[#D982A5] mb-1" />
                <span className="text-[11px] font-bold text-[#292329] block">
                  {language === 'ar' ? 'معاينة حية' : 'Live Preview'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href="/custom-studio"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md soft-shadow pill-button transition-all text-sm sm:text-base"
              >
                <span>{language === 'ar' ? 'ابدأ تصميم كفرك الآن' : 'Open Custom Studio'}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual: Interactive Case Mockup */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-56 sm:w-64 aspect-[1/2] rounded-[2.5rem] bg-white p-3 shadow-2xl border-4 border-[#FFF0F4]">
              {/* Phone Case Canvas */}
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-b from-[#FDF0F5] to-[#FCE7F0] p-4 flex flex-col justify-between items-center relative overflow-hidden border border-[#F0E4E9]">
                {/* Camera cutout */}
                <div className="w-12 h-12 rounded-2xl bg-[#292329] self-start p-1.5 flex flex-wrap gap-1 shadow-md">
                  <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-neutral-700" />
                  <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700" />
                </div>

                {/* Simulated Custom Center Design */}
                <div className="text-center my-auto p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-white/60 shadow-xs max-w-[85%]">
                  <span className="text-xs uppercase tracking-widest text-[#D982A5] font-black block">YOUR NAME</span>
                  <p className="font-serif italic text-sm text-[#292329] mt-1 font-semibold">
                    &quot;Dream without fear&quot;
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold text-[#817780]">
                  <ShieldCheck className="w-3 h-3 text-[#D982A5]" />
                  <span>TK-PRINT BESPOKE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
