'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { Smartphone, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const FindYourPhoneBar: React.FC = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const {
    brands,
    models,
    selectedBrand,
    selectedModel,
    setSelectedBrand,
    setSelectedModel
  } = useStore();

  const [activeBrandId, setActiveBrandId] = useState<string>(selectedBrand?.id || brands[0]?.id || 'b_apple');
  const [activeModelId, setActiveModelId] = useState<string>(selectedModel?.id || '');

  // Filter models based on active brand
  const filteredModels = models.filter((m) => m.brandId === activeBrandId);

  useEffect(() => {
    if (filteredModels.length > 0 && !filteredModels.find((m) => m.id === activeModelId)) {
      setActiveModelId(filteredModels[0].id);
    }
  }, [activeBrandId, filteredModels, activeModelId]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = e.target.value;
    setActiveBrandId(brandId);
    const brand = brands.find((b) => b.id === brandId) || null;
    setSelectedBrand(brand);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = e.target.value;
    setActiveModelId(modelId);
  };

  const handleFindCases = () => {
    const model = models.find((m) => m.id === activeModelId);
    if (model) {
      setSelectedModel(model);
      const brand = brands.find((b) => b.id === activeBrandId) || null;
      setSelectedBrand(brand);
      router.push(`/shop?model=${model.slug}`);
    } else {
      router.push('/shop');
    }
  };

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="relative -mt-6 sm:-mt-8 z-30 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#F0E4E9] soft-shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Header text with playful dashes */}
          <div className="flex-1 text-center lg:text-start">
            <div className="flex items-center justify-center lg:justify-start gap-1 text-[#D982A5] mb-1">
              <span className="w-2 h-0.5 bg-[#D982A5] rounded-full rotate-45" />
              <span className="w-3 h-0.5 bg-[#D982A5] rounded-full" />
              <span className="w-2 h-0.5 bg-[#D982A5] rounded-full -rotate-45" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#292329] tracking-tight">
              {t('find_phone.title')}
            </h2>
            <p className="text-xs sm:text-sm text-[#817780] mt-1 font-medium">
              {t('find_phone.subtitle')}
            </p>
          </div>

          {/* Device Selection Selectors */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
            {/* Brand Dropdown */}
            <div className="relative w-full sm:w-52">
              <select
                value={activeBrandId}
                onChange={handleBrandChange}
                className="w-full appearance-none bg-[#FFF8FA] border border-[#F0E4E9] hover:border-[#EFA6C1] rounded-2xl px-4 py-3.5 text-sm font-bold text-[#292329] focus:outline-none focus:ring-2 focus:ring-[#EFA6C1]/40 transition-colors cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-4 text-[#817780]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Model Dropdown */}
            <div className="relative w-full sm:w-60">
              <select
                value={activeModelId}
                onChange={handleModelChange}
                className="w-full appearance-none bg-[#FFF8FA] border border-[#F0E4E9] hover:border-[#EFA6C1] rounded-2xl px-4 py-3.5 text-sm font-bold text-[#292329] focus:outline-none focus:ring-2 focus:ring-[#EFA6C1]/40 transition-colors cursor-pointer"
              >
                {filteredModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-4 text-[#817780]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={handleFindCases}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md soft-shadow pill-button transition-all text-sm whitespace-nowrap"
            >
              <span>{t('find_phone.action_button')}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Selected Phone Active Badge if user already has one */}
        {selectedModel && (
          <div className="mt-4 pt-3 border-t border-[#F0E4E9] flex items-center justify-between text-xs text-[#817780]">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('find_phone.active_device')}</span>
              <strong className="text-[#292329] font-bold">{selectedModel.name}</strong>
            </span>
            <button
              onClick={() => setSelectedModel(null)}
              className="text-[#D982A5] hover:underline font-semibold"
            >
              {language === 'ar' ? 'إلغاء التحديد' : 'Clear filter'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

