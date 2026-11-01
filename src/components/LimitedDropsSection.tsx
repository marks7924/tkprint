'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { INITIAL_LIMITED_DROP } from '@/data/mock-db';
import { Clock, Flame, Bell, ArrowRight, ArrowLeft } from 'lucide-react';

export const LimitedDropsSection: React.FC = () => {
  const { language } = useLanguage();
  const drop = INITIAL_LIMITED_DROP;
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = drop.totalUnits - drop.claimedUnits;
  const percentClaimed = Math.round((drop.claimedUnits / drop.totalUnits) * 100);

  return (
    <section className="py-14 bg-gradient-to-b from-[#FFF8FA] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#292329] text-white p-8 sm:p-12 shadow-2xl">

          {/* Ambient glow */}
          <div className="absolute top-0 end-0 w-96 h-96 bg-[#D982A5]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D982A5] text-white text-xs font-black rounded-full uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إصدار استوديو محدود' : 'Limited Drop'}</span>
                </span>
                <span className="text-xs text-neutral-400 font-semibold">
                  {language === 'ar' ? '100 قطعة مرقمة فقط' : 'Only 100 numbered pieces'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {language === 'ar' ? drop.titleAr : drop.titleEn}
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed">
                {language === 'ar' ? drop.descriptionAr : drop.descriptionEn}
              </p>

              {/* Countdown Clock */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-neutral-400 font-semibold me-2">
                  <Clock className="w-4 h-4 text-[#EFA6C1]" />
                  <span>{language === 'ar' ? 'ينتهي في:' : 'Ends In:'}</span>
                </div>

                <div className="flex gap-2 text-center font-mono">
                  <div className="bg-neutral-800/80 border border-neutral-700 px-2.5 py-1.5 rounded-xl min-w-[44px]">
                    <span className="text-base font-black text-white">{timeLeft.days}</span>
                    <span className="text-[9px] text-neutral-400 block">{language === 'ar' ? 'يوم' : 'D'}</span>
                  </div>
                  <div className="bg-neutral-800/80 border border-neutral-700 px-2.5 py-1.5 rounded-xl min-w-[44px]">
                    <span className="text-base font-black text-white">{timeLeft.hours}</span>
                    <span className="text-[9px] text-neutral-400 block">{language === 'ar' ? 'ساعة' : 'H'}</span>
                  </div>
                  <div className="bg-neutral-800/80 border border-neutral-700 px-2.5 py-1.5 rounded-xl min-w-[44px]">
                    <span className="text-base font-black text-white">{timeLeft.minutes}</span>
                    <span className="text-[9px] text-neutral-400 block">{language === 'ar' ? 'دقيقة' : 'M'}</span>
                  </div>
                  <div className="bg-neutral-800/80 border border-neutral-700 px-2.5 py-1.5 rounded-xl min-w-[44px]">
                    <span className="text-base font-black text-[#EFA6C1]">{timeLeft.seconds}</span>
                    <span className="text-[9px] text-neutral-400 block">{language === 'ar' ? 'ثانية' : 'S'}</span>
                  </div>
                </div>
              </div>

              {/* Inventory Progress */}
              <div className="mt-6 max-w-md">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-amber-300">
                    {language === 'ar' ? `متبقي ${remaining} قطعة فقط!` : `Only ${remaining} pieces left!`}
                  </span>
                  <span className="text-neutral-400">{percentClaimed}% {language === 'ar' ? 'محجوز' : 'claimed'}</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-[#D982A5] rounded-full transition-all duration-500"
                    style={{ width: `${percentClaimed}%` }}
                  />
                </div>
              </div>

              {/* CTA Action / Drop Notification */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop?collection=c_romantic"
                  className="px-8 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-lg soft-shadow pill-button transition-all text-sm inline-flex items-center gap-2"
                >
                  <span>{language === 'ar' ? 'اطلب نسختك المحدودة الآن' : 'Claim Your Limited Piece'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                {subscribed ? (
                  <span className="text-xs text-emerald-400 font-bold">
                    ✓ {language === 'ar' ? 'سيتم إشعارك فور إطلاق الإصدار القادم' : 'Alert set for next drop!'}
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      placeholder={language === 'ar' ? 'تنبيهي بالإصدار القادم...' : 'Alert me on next drop...'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-neutral-800/80 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                    />
                    <button
                      onClick={() => {
                        if (email.trim()) setSubscribed(true);
                      }}
                      className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors"
                      title="Set alert"
                    >
                      <Bell className="w-4 h-4 text-[#EFA6C1]" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative aspect-[4/5] w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-700">
                <img
                  src={drop.bannerImage}
                  alt={drop.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

