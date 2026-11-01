'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, Send, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-[#F0E4E9] pt-16 pb-24 lg:pb-12 text-[#292329]">
      {/* Service Highlights / Guarantees Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#F0E4E9]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] text-[#D982A5] flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#292329]">
                {language === 'ar' ? 'شحن سريع لجميع المحافظات' : 'Fast Delivery Across Egypt'}
              </h4>
              <p className="text-xs text-[#817780] mt-0.5">
                {language === 'ar' ? 'توصيل مجاني للطلبات فوق 999 ج.م' : 'Free shipping on orders over 999 EGP'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] text-[#D982A5] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#292329]">
                {language === 'ar' ? 'أحبار أصلية مقاومة للخدش' : 'Anti-Scratch Original Inks'}
              </h4>
              <p className="text-xs text-[#817780] mt-0.5">
                {language === 'ar' ? 'ألوان زاهية تدوم مدى الحياة' : 'Vibrant colors that never peel or fade'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] text-[#D982A5] flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#292329]">
                {language === 'ar' ? 'ضمان استبدال فوري' : '100% Fitment Guarantee'}
              </h4>
              <p className="text-xs text-[#817780] mt-0.5">
                {language === 'ar' ? 'مطابقة تامة لموديل ومقاس هاتفك' : 'Guaranteed exact fit for your phone'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <BrandLogo size="md" />
            <p className="mt-4 text-xs sm:text-sm text-[#817780] leading-relaxed max-w-sm">
              {t('footer.about_brand')}
            </p>

            {/* WhatsApp Direct Chat Button */}
            <a
              href="https://wa.me/201000000000?text=Hello%20TK-PRINT%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t('footer.whatsapp')}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-sm text-[#292329] mb-4">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#817780]">
              <li>
                <Link href="/shop" className="hover:text-[#D982A5] transition-colors">
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#D982A5] transition-colors">
                  {t('nav.collections')}
                </Link>
              </li>
              <li>
                <Link href="/custom-studio" className="hover:text-[#D982A5] transition-colors">
                  {t('nav.custom_studio')}
                </Link>
              </li>
              <li>
                <Link href="/matching-cases" className="hover:text-[#D982A5] transition-colors">
                  {t('nav.matching')}
                </Link>
              </li>
              <li>
                <Link href="/bundle-builder" className="hover:text-[#D982A5] transition-colors">
                  {t('nav.bundles')}
                </Link>
              </li>
              <li>
                <Link href="/style-quiz" className="hover:text-[#D982A5] transition-colors">
                  {t('nav.quiz')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div>
            <h4 className="font-extrabold text-sm text-[#292329] mb-4">
              {t('footer.help')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#817780]">
              <li>
                <Link href="/track-order" className="hover:text-[#D982A5] transition-colors">
                  {t('footer.track_order')}
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#D982A5] transition-colors">
                  {t('footer.shipping_policy')}
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-[#D982A5] transition-colors">
                  {t('nav.community')}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#D982A5] transition-colors">
                  {t('footer.privacy_policy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D982A5] transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#D982A5] font-bold hover:underline">
                  {t('nav.admin')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="font-extrabold text-sm text-[#292329] mb-2">
              {language === 'ar' ? 'انضم إلى مجتمع TK' : 'Stay in the Loop'}
            </h4>
            <p className="text-xs text-[#817780] mb-4 leading-relaxed">
              {language === 'ar'
                ? 'احصل على خصم 10% على أول طلب وإشعارات فورية بالإصدارات الحصرية.'
                : 'Get 10% off your first order & VIP access to limited drops.'}
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-2xl border border-emerald-200">
                {language === 'ar' ? '🎉 تم اشتراكك بنجاح! كودك: TK10' : '🎉 Subscribed! Use code: TK10'}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={language === 'ar' ? 'بريدك الإلكتروني...' : 'Enter your email...'}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-2xl px-3.5 py-2.5 text-xs text-[#292329] focus:outline-none focus:ring-2 focus:ring-[#EFA6C1]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'اشترك الآن' : 'Subscribe'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-[#F0E4E9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#817780]">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-[#D982A5] text-[#D982A5]" />
            <span>for creative minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

