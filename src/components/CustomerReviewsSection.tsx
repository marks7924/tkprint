'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star, ShieldCheck, Heart } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const { language } = useLanguage();

  const reviews = [
    {
      id: 'rev_1',
      nameEn: 'Farah Mostafa',
      nameAr: 'فرح مصطفى',
      rating: 5,
      dateEn: '3 days ago',
      dateAr: 'منذ 3 أيام',
      productEn: 'Blush Hearts Pattern Case (iPhone 15 Pro)',
      productAr: 'كفر القلوب الوردية (iPhone 15 Pro)',
      commentEn:
        'The print quality is stunning! The colors are soft and exactly as shown on the screen. The raised edge protects my screen and cameras perfectly.',
      commentAr:
        'جودة الطباعة خيالية! الألوان ناعمة ومطابقة تماماً لشاشة الموقع. حواف الكفر مرتفعة وبتحمي الكاميرات والشاشة بشكل ممتاز.'
    },
    {
      id: 'rev_2',
      nameEn: 'Ziad Hany',
      nameAr: 'زياد هاني',
      rating: 5,
      dateEn: '1 week ago',
      dateAr: 'منذ أسبوع',
      productEn: 'Custom Studio Case (Galaxy S24 Ultra)',
      productAr: 'كفر مخصص من الاستوديو (Galaxy S24 Ultra)',
      commentEn:
        'Designed my own artwork in the Custom Studio. The canvas tool was super intuitive, and the final printed case arrived in 2 days. 10/10 recommendation!',
      commentAr:
        'صممت كفري بنفسي في الاستوديو على الموقع. أداة التصميم كانت سهلة جداً والنتيجة وصلتني في خلال يومين بجودة ممتازة. أنصح بيهم جداً.'
    },
    {
      id: 'rev_3',
      nameEn: 'Laila Karim',
      nameAr: 'ليلى كريم',
      rating: 5,
      dateEn: '2 weeks ago',
      dateAr: 'منذ أسبوعين',
      productEn: 'Matching Couple Set (iPhone 16 + S24)',
      productAr: 'طقم كفرات ثنائية (iPhone 16 + S24)',
      commentEn:
        'Got the matching set for me and my fiancé. Even though we have different phone models, the designs complement each other beautifully and the discount was automatic!',
      commentAr:
        'طلبت الطقم الثنائي لي ولخطيبي، ورغم إن موبايلاتنا مختلفة، التصميمين متناسقين جداً وخصم الـ 15% طبق تلقائياً في السلة.'
    }
  ];

  return (
    <section className="py-16 bg-[#FFF8FA] border-t border-[#F0E4E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-black text-[#292329] ms-1">4.9 / 5.0</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'آراء وتجارب عملائنا الموثقة' : 'Loved by Thousands of Creators'}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'أكثر من 15,000 كفر مطبوع تم توصيله بكل حب في جميع محافظات مصر.'
              : 'Over 15,000 custom cases crafted and delivered with care across Egypt.'}
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#817780] font-medium">
                    {language === 'ar' ? r.dateAr : r.dateEn}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#292329] leading-relaxed italic mb-4">
                  &quot;{language === 'ar' ? r.commentAr : r.commentEn}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0E4E9] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#292329]">
                    {language === 'ar' ? r.nameAr : r.nameEn}
                  </h4>
                  <span className="text-[10px] text-[#817780] block mt-0.5 line-clamp-1">
                    {language === 'ar' ? r.productAr : r.productEn}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{language === 'ar' ? 'مشتري موثق' : 'Verified'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
