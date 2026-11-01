'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Palette, RotateCcw, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function StyleQuizPage() {
  const { language } = useLanguage();
  const { products } = useStore();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const questions = [
    {
      id: 1,
      titleEn: 'What is your everyday aesthetic vibe?',
      titleAr: 'ما هو أسلوبك وإطلالتك اليومية الأقرب لقلبك؟',
      options: [
        { id: 'cute', labelEn: 'Cute, Pastel & Coquette 🎀', labelAr: 'كيوت، باستيل وفيونكات 🎀', tag: 'cute' },
        { id: 'minimal', labelEn: 'Clean, Editorial & Minimalist ☕', labelAr: 'مينيمال، هادئ وأنيق ☕', tag: 'minimal' },
        { id: 'dark', labelEn: 'Dark, Noir & Graphic 🖤', labelAr: 'دارك، أسود وجرافيك 🖤', tag: 'dark' },
        { id: 'romantic', labelEn: 'Vintage, Floral & Poetic 🌸', labelAr: 'فينتاج، زهور وأشعار دافئة 🌸', tag: 'romantic' }
      ]
    },
    {
      id: 2,
      titleEn: 'What color palette speaks to your soul?',
      titleAr: 'ما هي لوحة الألوان التي تعبر عن ذوقك؟',
      options: [
        { id: 'blush', labelEn: 'Powder Pink & Soft Creams 🌸', labelAr: 'وردي ناعم وكريمي دافئ 🌸', tag: 'pink' },
        { id: 'lilac', labelEn: 'Pastel Lilac & Lavender 💜', labelAr: 'لافندر باستيل بنفسجي 💜', tag: 'lilac' },
        { id: 'monochrome', labelEn: 'Graphite Black & White 🤍', labelAr: 'أبيض وأسود فخم 🤍', tag: 'black' },
        { id: 'retro', labelEn: 'Matcha Green & Strawberry 🍓', labelAr: 'أخضر ماتشا وفراولة ريترو 🍓', tag: 'colorful' }
      ]
    },
    {
      id: 3,
      titleEn: 'Do you prefer art prints or typography?',
      titleAr: 'ما الذي تفضله على ظهر هاتفك؟',
      options: [
        { id: 'quotes', labelEn: 'Meaningful Quotes & Names ✍️', labelAr: 'عبارات ملهمة أو اسمي بخط أنيق ✍️', tag: 'quotes' },
        { id: 'patterns', labelEn: 'Repeated Patterns (Hearts/Bows) ✨', labelAr: 'نقشات متكررة (قلوب أو فيونكات) ✨', tag: 'bestseller' },
        { id: 'art', labelEn: 'Full Canvas Art & Illustration 🎨', labelAr: 'رسومات فنية ولوحات إبداعية 🎨', tag: 'art' },
        { id: 'custom', labelEn: 'My own photos & custom designs 📸', labelAr: 'صوري وذكرياتي الخاصة 📸', tag: 'custom' }
      ]
    }
  ];

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const handleSelectOption = (tag: string) => {
    const updated = [...selectedTags, tag];
    setSelectedTags(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedTags([]);
    setQuizCompleted(false);
  };

  // Recommended products based on quiz tags
  const recommendations = products
    .filter((p) => p.tags.some((tag) => selectedTags.includes(tag)))
    .slice(0, 4);

  const finalRecommendations = recommendations.length > 0 ? recommendations : products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">

        {!quizCompleted ? (
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#F0E4E9] soft-shadow-lg text-center">
            {/* Progress indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F4] border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-6">
              <Palette className="w-3.5 h-3.5" />
              <span>
                {language === 'ar'
                  ? `السؤال ${currentStep + 1} من ${questions.length}`
                  : `Question ${currentStep + 1} of ${questions.length}`}
              </span>
            </div>

            <div className="w-full bg-neutral-100 h-2 rounded-full mb-8 overflow-hidden max-w-xs mx-auto">
              <div
                className="bg-[#D982A5] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#292329] mb-8">
              {language === 'ar' ? questions[currentStep].titleAr : questions[currentStep].titleEn}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {questions[currentStep].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.tag)}
                  className="p-5 rounded-2xl border border-[#F0E4E9] bg-[#FFF8FA] hover:bg-[#FFF0F4] hover:border-[#D982A5] text-start font-bold text-sm text-[#292329] transition-all hover:scale-102 shadow-2xs"
                >
                  {language === 'ar' ? opt.labelAr : opt.labelEn}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Results celebration header */}
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#F0E4E9] soft-shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F4] text-[#D982A5] mx-auto flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#292329]">
                {language === 'ar' ? 'اكتشفنا أسلوبك وذوقك الفريد! 🎉' : 'Your Signature Aesthetic Discovered! 🎉'}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-[#817780] max-w-md mx-auto">
                {language === 'ar'
                  ? 'بناءً على اختياراتك، قمنا باختيار الكفرات التي تطابق شخصيتك وألوانك المفضلة تماماً.'
                  : 'Based on your answers, here are the phone cases curated specially for your vibe.'}
              </p>

              <button
                onClick={handleRestart}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#D982A5] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إعادة الاختبار' : 'Retake Quiz'}</span>
              </button>
            </div>

            {/* Recommendations Grid */}
            <div>
              <h3 className="font-black text-xl text-[#292329] mb-4">
                {language === 'ar' ? 'الكفرات المقترحة لك' : 'Recommended For You'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {finalRecommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

