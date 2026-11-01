'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#FFF0F4] via-[#FDF2F6] to-[#FFF0F4] border-b border-[#F0E4E9] text-[#292329] text-[11px] sm:text-xs py-2 px-8 transition-all overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center font-medium">
        <span className="flex items-center gap-1.5 truncate sm:whitespace-normal">
          <Sparkles className="w-3.5 h-3.5 text-[#D982A5] inline flex-shrink-0 animate-pulse" />
          <span className="truncate sm:whitespace-normal">
            {language === 'ar'
              ? '✨ شحن مجاني للطلبات فوق 999 ج.م | تصميم خاص بك متاح الآن'
              : '✨ Free Shipping on orders over 999 EGP | Custom Cases Available Now'}
          </span>
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label={t('topbar.close')}
        className="absolute top-1/2 -translate-y-1/2 end-2 text-[#817780] hover:text-[#292329] p-1 rounded-full hover:bg-black/5 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
