'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { Smartphone, Search, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export default function FindYourPhonePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const {
    brands,
    models,
    selectedBrand,
    selectedModel,
    setSelectedBrand,
    setSelectedModel,
    clearSelectedDevice,
    showToast
  } = useStore();

  const [activeBrandId, setActiveBrandId] = useState<string>(
    selectedBrand?.id || brands[0]?.id || 'b_apple'
  );
  const [modelSearch, setModelSearch] = useState<string>('');

  const currentBrand = brands.find((b) => b.id === activeBrandId) || brands[0];

  const brandModels = models.filter((m) => {
    const matchesBrand = m.brandId === activeBrandId;
    if (!matchesBrand) return false;
    if (modelSearch.trim()) {
      return m.name.toLowerCase().includes(modelSearch.toLowerCase());
    }
    return true;
  });

  const handleSelectModel = (m: (typeof models)[0]) => {
    setSelectedBrand(currentBrand);
    setSelectedModel(m);
    showToast(`✓ تم حفظ جهازك: ${m.name}`);
    router.push(`/shop?model=${m.slug}`);
  };

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2 shadow-2xs">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'البحث الذكي بالموديل' : 'Device Selector'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#292329] tracking-tight">
            {t('find_phone.title')}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {t('find_phone.subtitle')}
          </p>
        </div>

        {/* Current Active Phone Banner */}
        {selectedModel && (
          <div className="bg-[#FFF0F4] border border-[#EFA6C1]/50 rounded-3xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D982A5] text-white flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs text-[#817780] block font-medium">
                  {t('find_phone.active_device')}
                </span>
                <strong className="text-base font-black text-[#292329]">
                  {selectedModel.brandName} • {selectedModel.name}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/shop?model=${selectedModel.slug}`}
                className="px-5 py-2.5 bg-[#D982A5] text-white text-xs font-bold rounded-xl shadow-xs pill-button"
              >
                {language === 'ar' ? 'عرض الكفرات المتوافقة' : 'Browse Compatible'}
              </Link>
              <button
                onClick={clearSelectedDevice}
                className="text-xs font-bold text-[#817780] hover:text-[#292329] underline"
              >
                {t('find_phone.change_device')}
              </button>
            </div>
          </div>
        )}

        {/* Brand Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setActiveBrandId(b.id);
                setModelSearch('');
              }}
              className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeBrandId === b.id
                  ? 'bg-[#292329] text-white shadow-md'
                  : 'bg-white text-[#292329] border border-[#F0E4E9] hover:bg-[#FFF0F4]'
                }`}
            >
              <Smartphone className="w-4 h-4 text-[#D982A5]" />
              <span>{b.name}</span>
              <span className="text-[10px] opacity-70">({b.modelsCount})</span>
            </button>
          ))}
        </div>

        {/* Model Search Input */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-[#817780] absolute top-1/2 -translate-y-1/2 start-3.5" />
          <input
            type="text"
            placeholder={t('find_phone.search_models')}
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
            className="w-full bg-white border border-[#F0E4E9] rounded-2xl py-3 ps-10 pe-4 text-xs font-bold text-[#292329] shadow-xs focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
          />
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {brandModels.map((m) => {
            const isThisSelected = selectedModel?.id === m.id;

            return (
              <button
                key={m.id}
                onClick={() => handleSelectModel(m)}
                className={`group p-5 rounded-3xl border text-center transition-all duration-200 flex flex-col items-center justify-between hover:shadow-lg ${isThisSelected
                    ? 'border-[#D982A5] bg-[#FFF0F4] ring-2 ring-[#EFA6C1]/40'
                    : 'border-[#F0E4E9] bg-white hover:border-[#EFA6C1] hover:-translate-y-0.5'
                  }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8FA] group-hover:bg-[#FFF0F4] text-[#D982A5] flex items-center justify-center mb-3">
                  <Smartphone className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-black text-sm text-[#292329] group-hover:text-[#D982A5] transition-colors">
                    {m.name}
                  </h3>
                  <span className="text-[10px] text-[#817780] block mt-0.5 capitalize">
                    {m.cameraLayout.replace('-', ' ')}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0E4E9] w-full flex items-center justify-center text-xs font-bold text-[#D982A5]">
                  <span>{isThisSelected ? '✓ مفعّل حالياً' : 'اختر هذا الهاتف'}</span>
                  {!isThisSelected && <ArrowIcon className="w-3.5 h-3.5 ms-1" />}
                </div>
              </button>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}

