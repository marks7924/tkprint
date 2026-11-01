'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Smartphone, Paintbrush, Gift, HeartHandshake } from 'lucide-react';

export const QuickShortcuts: React.FC = () => {
  const { t } = useLanguage();

  const shortcuts = [
    {
      href: '/find-your-phone',
      icon: Smartphone,
      title: t('shortcut.find_phone.title'),
      desc: t('shortcut.find_phone.desc'),
      bgHover: 'hover:border-[#EFA6C1] hover:bg-[#FFF5F8]'
    },
    {
      href: '/custom-studio',
      icon: Paintbrush,
      title: t('shortcut.custom.title'),
      desc: t('shortcut.custom.desc'),
      bgHover: 'hover:border-[#EFA6C1] hover:bg-[#FFF5F8]'
    },
    {
      href: '/gift-mode',
      icon: Gift,
      title: t('shortcut.gift.title'),
      desc: t('shortcut.gift.desc'),
      bgHover: 'hover:border-[#EFA6C1] hover:bg-[#FFF5F8]'
    },
    {
      href: '/matching-cases',
      icon: HeartHandshake,
      title: t('shortcut.matching.title'),
      desc: t('shortcut.matching.desc'),
      bgHover: 'hover:border-[#EFA6C1] hover:bg-[#FFF5F8]'
    }
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {shortcuts.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={`group flex flex-col items-center text-center p-6 bg-white border border-[#F0E4E9] rounded-3xl soft-shadow transition-all duration-300 hover:-translate-y-1 ${item.bgHover}`}
            >
              <div className="w-13 h-13 rounded-2xl bg-[#FFF0F4] group-hover:bg-[#EFA6C1] flex items-center justify-center text-[#D982A5] group-hover:text-white transition-colors duration-300 mb-4 shadow-xs">
                <Icon className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-[#292329] text-sm sm:text-base group-hover:text-[#D982A5] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#817780] mt-1 font-medium">
                {item.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
