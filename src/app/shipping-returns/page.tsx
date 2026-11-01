'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Truck, RefreshCw, ShieldCheck, Clock } from 'lucide-react';

export default function ShippingReturnsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-[#292329] mb-4 text-center">
          {language === 'ar' ? 'سياسة الشحن والاستبدال والاسترجاع' : 'Shipping & Returns Policy'}
        </h1>

        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#F0E4E9] soft-shadow space-y-8 text-xs sm:text-sm text-[#817780] leading-relaxed">
          
          <div>
            <h2 className="text-base font-black text-[#292329] mb-2 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#D982A5]" />
              <span>{language === 'ar' ? 'مدة ومصاريف الشحن في مصر' : 'Delivery Times & Fees in Egypt'}</span>
            </h2>
            <p>
              {language === 'ar'
                ? 'يتم تجهيز وطباعة الكفرات بعناية فائقة خلال 24 - 48 ساعة من تأكيد الطلب. يستغرق التوصيل في القاهرة والجيزة من 2 إلى 3 أيام عمل، وفي الإسكندرية ومدن الدلتا والقناة من 3 إلى 5 أيام عمل، ومحافظات الصعيد والبحر الأحمر من 4 إلى 6 أيام عمل.'
                : 'Custom cases are printed within 24-48 hours. Delivery takes 2-3 business days for Cairo & Giza, 3-5 days for Delta & Alexandria, and 4-6 days for Upper Egypt.'}
            </p>
            <p className="mt-2 font-bold text-[#D982A5]">
              ✨ {language === 'ar' ? 'شحن مجاني بالكامل لجميع الطلبات بقيمة 999 ج.م أو أكثر.' : 'Free shipping on orders over 999 EGP.'}
            </p>
          </div>

          <div className="pt-6 border-t border-[#F0E4E9]">
            <h2 className="text-base font-black text-[#292329] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D982A5]" />
              <span>{language === 'ar' ? 'ضمان مطابقة المقاس والموديل' : '100% Fitment Guarantee'}</span>
            </h2>
            <p>
              {language === 'ar'
                ? 'نحن نضمن تطابق الكفر بنسبة 100% مع موديل هاتفك المحدد في الطلب ومنافذ الشحن وأزرار الصوت وفتحات الكاميرا. في حال استلامك كفر غير متوافق مع الموديل المطلوب، نلتزم باستبداله فوراً مجاناً.'
                : 'We guarantee a 100% exact fit for your designated phone model. In the rare event of a misfit, we will immediately replace it at zero charge.'}
            </p>
          </div>

          <div className="pt-6 border-t border-[#F0E4E9]">
            <h2 className="text-base font-black text-[#292329] mb-2 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#D982A5]" />
              <span>{language === 'ar' ? 'سياسة الاستبدال والاسترجاع' : 'Exchange & Returns'}</span>
            </h2>
            <p>
              {language === 'ar'
                ? 'نظراً لأن بعض المنتجات يتم طباعتها وتخصيصها خصيصاً لكل عميل في استوديو التصميم (مثل الأسماء والصور الشخصية)، فإن الاسترجاع النقدي للتصاميم المخصصة يقتصر على حالات عيوب الطباعة أو تلف الشحن. أما الكفرات القياسية غير المخصصة فيحق لك استبدالها خلال 14 يوماً من تاريخ الاستلام بشرط أن تكون بحالتها وتغليفها الأصلي.'
                : 'Custom bespoke prints are crafted uniquely for you. Returns for bespoke pieces are covered under print flaw warranty. Standard designs can be exchanged within 14 days in original condition.'}
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
