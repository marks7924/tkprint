'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-[#292329] mb-4 text-center">
          {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
        </h1>

        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#F0E4E9] soft-shadow space-y-6 text-xs sm:text-sm text-[#817780] leading-relaxed">
          <p>
            {language === 'ar'
              ? 'مرحباً بكم في متجر TK-PRINT الإلكتروني. يخضع استخدامك للموقع وإتمام أي طلبات للشروط والأحكام التالية المنظمة لعمليات البيع والطباعة في جمهورية مصر العربية.'
              : 'Welcome to TK-PRINT. By accessing our platform or placing an order, you agree to the following terms and operational guidelines.'}
          </p>

          <div>
            <h3 className="font-bold text-sm text-[#292329] mb-1">
              {language === 'ar' ? '1. الأسعار والعروض الترويجية' : '1. Pricing & Promotions'}
            </h3>
            <p>
              {language === 'ar'
                ? 'جميع الأسعار المعروضة على الموقع هي بالجنيه المصري (EGP). نحتفظ بالحق في تعديل الأسعار أو إنهاء العروض الترويجية المحدودة في أي وقت دون إشعار مسبق مع الالتزام بالأسعار الموضحة وقت تأكيد الطلب.'
                : 'All pricing is denominated in Egyptian Pounds (EGP). We reserve the right to update promotions while honoring order confirmations.'}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#292329] mb-1">
              {language === 'ar' ? '2. حقوق الملكية الفكرية للتصاميم' : '2. Intellectual Property'}
            </h3>
            <p>
              {language === 'ar'
                ? 'يقر العميل عند رفع أي صورة أو شعار في استوديو التصميم بامتلاكه الحق القانوني في استخدامها، ويتعهد بعدم رفع أي محتوى مخالف للآداب العامة أو ينتهك حقوق ملكية فكرية لطرف ثالث.'
                : 'Customers confirm legal right or authorization to use any uploaded artwork or logos in the Custom Studio.'}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
