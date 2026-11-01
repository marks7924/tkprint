'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { CaseType, MatchingCasePair } from '@/types/tk-print';
import { HeartHandshake, Percent, ShoppingBag, Sparkles, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MatchingCasesPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { models, addToCart, showToast } = useStore();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  // Selected matching pair theme
  const pairThemes = [
    {
      id: 'sun_moon',
      nameEn: 'Celestial Sun & Moon',
      nameAr: 'الشمس والقمر الفلكي',
      icon1: '☀️',
      icon2: '🌙',
      title1En: 'You are my Sun',
      title1Ar: 'أنت شمسي الدافئة',
      title2En: 'You are my Moon',
      title2Ar: 'وأنت قمري المضيء',
      basePrice: 760
    },
    {
      id: 'pink_lilac_bows',
      nameEn: 'Blush & Lilac Coquette Bows',
      nameAr: 'فيونكات الباستيل المتناسقة',
      icon1: '🎀',
      icon2: '🎀',
      title1En: 'Soft Blush Bow',
      title1Ar: 'فيونكة الورد الناعمة',
      title2En: 'Lilac Dream Bow',
      title2Ar: 'فيونكة اللافندر الحالمة',
      basePrice: 760
    },
    {
      id: 'peanut_jelly',
      nameEn: 'Better Together Avocado Duo',
      nameAr: 'أفضل معاً.. نصفي الآخر',
      icon1: '🥑',
      icon2: '🥑',
      title1En: 'You complete me',
      title1Ar: 'تكملني دائماً',
      title2En: 'Better Together',
      title2Ar: 'معاً إلى الأبد',
      basePrice: 740
    }
  ];

  const [selectedThemeId, setSelectedThemeId] = useState<string>('sun_moon');
  const currentTheme = pairThemes.find((t) => t.id === selectedThemeId) || pairThemes[0];

  // Case 1 configuration
  const [model1Id, setModel1Id] = useState<string>('m_iphone_16_pro');
  const [caseType1, setCaseType1] = useState<CaseType>('matte');
  const [customText1, setCustomText1] = useState<string>('');

  // Case 2 configuration
  const [model2Id, setModel2Id] = useState<string>('m_samsung_s24_ultra');
  const [caseType2, setCaseType2] = useState<CaseType>('matte');
  const [customText2, setCustomText2] = useState<string>('');

  const model1 = models.find((m) => m.id === model1Id) || models[0];
  const model2 = models.find((m) => m.id === model2Id) || models[1];

  // Pricing: 15% discount for matching set
  const originalPairPrice = currentTheme.basePrice;
  const discountAmount = Math.round(originalPairPrice * 0.15);
  const finalPairPrice = originalPairPrice - discountAmount;

  const handleAddToCart = () => {
    const matchingData: MatchingCasePair = {
      pairName: currentTheme.nameEn,
      case1: {
        phoneModelId: model1.id,
        phoneModelName: model1.name,
        caseType: caseType1,
        designName: currentTheme.title1En,
        customNameOrDate: customText1 || undefined
      },
      case2: {
        phoneModelId: model2.id,
        phoneModelName: model2.name,
        caseType: caseType2,
        designName: currentTheme.title2En,
        customNameOrDate: customText2 || undefined
      },
      bundleDiscountPercent: 15,
      totalPrice: finalPairPrice
    };

    addToCart({
      itemType: 'matching',
      matchingPair: matchingData,
      quantity: 1,
      price: finalPairPrice,
      originalPrice: originalPairPrice
    });

    showToast('✨ تم إضافة الطقم الثنائي للسلة بخصم 15%!');
    router.push('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2 shadow-2xs">
            <Percent className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'خصم 15% تلقائي على أي ثنائي' : '15% Off Matching Pair'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'كفرات ثنائية.. كفران، قصة واحدة' : 'Matching Cases — Linked Duo'}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'اختر هاتفين مختلفين تماماً ونسّق التصميمين مع إضافة أسمائكم وتاريخكم المميز.'
              : 'Choose any two phone models, customize initials or anniversary dates, and save 15% automatically.'}
          </p>
        </div>

        {/* 1. Theme Selector */}
        <div className="mb-10">
          <label className="text-xs font-black text-[#292329] block mb-3 text-center">
            {language === 'ar' ? 'اختر النمط المتطابق' : 'Select Matching Aesthetic'}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {pairThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`p-4 rounded-3xl border transition-all text-center flex flex-col items-center justify-between ${
                  selectedThemeId === theme.id
                    ? 'border-[#D982A5] bg-[#FFF0F4] ring-2 ring-[#EFA6C1]/40 shadow-sm'
                    : 'border-[#F0E4E9] bg-white hover:bg-[#FFF8FA]'
                }`}
              >
                <div className="text-3xl mb-2 flex items-center gap-2">
                  <span>{theme.icon1}</span>
                  <span className="text-xs text-[#D982A5]">✦</span>
                  <span>{theme.icon2}</span>
                </div>
                <h3 className="font-extrabold text-sm text-[#292329]">
                  {language === 'ar' ? theme.nameAr : theme.nameEn}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Dual Side-by-Side Live Case Preview */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-[#F0E4E9] soft-shadow-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            
            {/* Center Linking Badge */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#D982A5] text-white items-center justify-center shadow-lg border-4 border-white animate-pulse">
              <HeartHandshake className="w-6 h-6" />
            </div>

            {/* Case 1: Person 1 */}
            <div className="flex flex-col items-center bg-[#FFF8FA] p-6 rounded-3xl border border-[#F0E4E9]">
              <span className="text-xs font-black text-[#D982A5] uppercase tracking-wider mb-4">
                {language === 'ar' ? 'الكفر الأول' : 'Case 1'}
              </span>

              {/* Case Mockup */}
              <div className="w-40 sm:w-48 aspect-[1/2] rounded-[2rem] bg-gradient-to-b from-[#FFF5EA] to-[#FCECD8] p-3 shadow-xl border-2 border-white flex flex-col justify-between items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#292329] self-start p-1 flex flex-wrap gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                </div>
                <div className="text-center my-auto">
                  <span className="text-4xl">{currentTheme.icon1}</span>
                  <p className="font-serif font-bold text-sm text-[#292329] mt-2">
                    {language === 'ar' ? currentTheme.title1Ar : currentTheme.title1En}
                  </p>
                  {customText1 && (
                    <span className="text-xs font-bold text-[#D982A5] block mt-1">
                      &quot;{customText1}&quot;
                    </span>
                  )}
                  <span className="text-[10px] text-[#817780] block mt-1 font-semibold">{model1.name}</span>
                </div>
                <span className="text-[9px] font-bold text-[#817780]">TK-PRINT</span>
              </div>

              {/* Controls for Case 1 */}
              <div className="w-full space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1">
                    {language === 'ar' ? 'موديل الهاتف الأول' : 'Device 1 Model'}
                  </label>
                  <select
                    value={model1Id}
                    onChange={(e) => setModel1Id(e.target.value)}
                    className="w-full bg-white border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1">
                    {language === 'ar' ? 'الاسم أو التاريخ المطبوع' : 'Custom Name / Date'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: كريم أو 24.10.2024' : 'e.g. Karim or 24.10.2024'}
                    value={customText1}
                    onChange={(e) => setCustomText1(e.target.value)}
                    className="w-full bg-white border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Case 2: Person 2 */}
            <div className="flex flex-col items-center bg-[#FFF8FA] p-6 rounded-3xl border border-[#F0E4E9]">
              <span className="text-xs font-black text-[#D982A5] uppercase tracking-wider mb-4">
                {language === 'ar' ? 'الكفر الثاني' : 'Case 2'}
              </span>

              {/* Case Mockup */}
              <div className="w-40 sm:w-48 aspect-[1/2] rounded-[2rem] bg-gradient-to-b from-[#F2EEFA] to-[#E5DBF5] p-3 shadow-xl border-2 border-white flex flex-col justify-between items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#292329] self-end p-1 flex flex-wrap gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                </div>
                <div className="text-center my-auto">
                  <span className="text-4xl">{currentTheme.icon2}</span>
                  <p className="font-serif font-bold text-sm text-[#292329] mt-2">
                    {language === 'ar' ? currentTheme.title2Ar : currentTheme.title2En}
                  </p>
                  {customText2 && (
                    <span className="text-xs font-bold text-[#D982A5] block mt-1">
                      &quot;{customText2}&quot;
                    </span>
                  )}
                  <span className="text-[10px] text-[#817780] block mt-1 font-semibold">{model2.name}</span>
                </div>
                <span className="text-[9px] font-bold text-[#817780]">TK-PRINT</span>
              </div>

              {/* Controls for Case 2 */}
              <div className="w-full space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1">
                    {language === 'ar' ? 'موديل الهاتف الثاني' : 'Device 2 Model'}
                  </label>
                  <select
                    value={model2Id}
                    onChange={(e) => setModel2Id(e.target.value)}
                    className="w-full bg-white border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1">
                    {language === 'ar' ? 'الاسم أو التاريخ المطبوع' : 'Custom Name / Date'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: سارة أو 24.10.2024' : 'e.g. Sara or 24.10.2024'}
                    value={customText2}
                    onChange={(e) => setCustomText2(e.target.value)}
                    className="w-full bg-white border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Pricing & Checkout Summary */}
          <div className="mt-8 pt-6 border-t border-[#F0E4E9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {language === 'ar' ? 'وفرت 15% (114 ج.م)' : 'Saved 15% (114 EGP)'}
                </span>
                <span className="text-xs text-[#817780] line-through">{originalPairPrice} ج.م</span>
              </div>
              <div className="text-2xl font-black text-[#292329] mt-1">
                {finalPairPrice} ج.م <span className="text-xs font-bold text-[#817780]">({language === 'ar' ? 'للكفرين معاً' : 'for both cases'})</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-8 py-4 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-lg soft-shadow pill-button transition-all text-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'ar' ? 'إضافة الثنائي إلى السلة مع الخصم' : 'Add Matching Duo to Cart'}</span>
            </button>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
