'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-[#292329] mb-4 text-center">
          {language === 'ar' ? 'سياسة الخصوصية وأمان البيانات' : 'Privacy Policy & Data Security'}
        </h1>

        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#F0E4E9] soft-shadow space-y-6 text-xs sm:text-sm text-[#817780] leading-relaxed">
          <p>
            {language === 'ar'
              ? 'في TK-PRINT، نولي خصوصية عملائنا وسلامة ملفاتهم وصورهم المرفوعة في استوديو التصميم أقصى درجات الأهمية والسرية التامة.'
              : 'At TK-PRINT, customer privacy and the confidential handling of custom uploaded photos and artwork is our paramount priority.'}
          </p>

          <div>
            <h3 className="font-bold text-sm text-[#292329] mb-1">
              {language === 'ar' ? '1. خصوصية الصور والتصاميم المرفوعة' : '1. Uploaded Artwork & Photos'}
            </h3>
            <p>
              {language === 'ar'
                ? 'الصور والملفات الشخصية التي ترفعها لطباعتها على كفر هاتفك مشفرة ومحفوظة في بيئة تخزين آمنة وخاصة (Private Storage) ولا يتم استخدامها إلا لغرض طباعة طلبيتك، ولن يتم نشرها في أي معرض عام أو وسيلة تسويقية دون موافقة صريحة منك.'
                : 'Any personal photos uploaded to our Custom Studio are stored privately on encrypted servers strictly for printing your physical case. We never publish your files without explicit consent.'}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#292329] mb-1">
              {language === 'ar' ? '2. معلومات الشحن والاتصال' : '2. Contact & Shipping Data'}
            </h3>
            <p>
              {language === 'ar'
                ? 'نستخدم بيانات اسمك ورقم هاتفك وعنوانك فقط لأغراض تسليم الطلب عبر شركات الشحن المعتمدة وإرسال تحديثات تتبع الشحنة عبر الرسائل النصية أو واتساب.'
                : 'Your contact and shipping address are solely used to coordinate courier delivery and order tracking updates.'}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

