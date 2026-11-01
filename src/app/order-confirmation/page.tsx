'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, ArrowLeft } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'TK-849201';
  const { language, t } = useLanguage();
  const { getOrder } = useStore();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const order = getOrder(orderNumber);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EFA6C1', '#D982A5', '#FFF0F5', '#292329']
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#F0E4E9] soft-shadow-lg text-center">
          
          {/* Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-6 border-4 border-emerald-100">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#292329] tracking-tight">
            {t('order.success_title')}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[#817780] max-w-md mx-auto leading-relaxed">
            {language === 'ar'
              ? 'شكراً لاختيارك TK-PRINT! بدأ فريق الإنتاج بمراجعة ملفات التصميم لبدء الطباعة الفورية بأعلى جودة.'
              : 'Thank you for choosing TK-PRINT! We are preparing your order for immediate high-definition printing.'}
          </p>

          {/* Order Reference Box */}
          <div className="mt-8 p-5 bg-[#FFF8FA] rounded-2xl border border-[#F0E4E9] inline-block max-w-sm w-full text-center">
            <span className="text-xs font-bold text-[#817780] block mb-1">
              {t('order.number')}
            </span>
            <span className="text-2xl font-mono font-black text-[#D982A5] tracking-wider">
              {orderNumber}
            </span>
          </div>

          {/* Order Details summary if found */}
          {order && (
            <div className="mt-8 text-start border-t border-[#F0E4E9] pt-6 space-y-4 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D982A5] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-[#292329] block">
                    {language === 'ar' ? 'عنوان التوصيل:' : 'Delivery Address:'}
                  </span>
                  <p className="text-[#817780]">
                    {order.customerName} • {order.phone}
                    <br />
                    {order.address}, {order.city}, {order.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Package className="w-4 h-4 text-[#D982A5] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-[#292329] block">
                    {language === 'ar' ? 'طريقة الدفع والإجمالي:' : 'Payment & Total:'}
                  </span>
                  <p className="text-[#817780]">
                    {order.paymentMethod === 'cod' ? 'الدفع عند الاستلام (COD)' : 'بطاقة بنكية'} • الإجمالي:{' '}
                    <strong className="text-[#292329] font-black">{order.total} ج.م</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/track-order?orderNumber=${encodeURIComponent(orderNumber)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md soft-shadow pill-button transition-all text-sm"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'ar' ? 'تتبع مسار طلبيتك الآن' : 'Track Your Order'}</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-[#F0E4E9] text-[#292329] font-bold rounded-2xl hover:bg-[#FFF0F4] transition-colors text-sm"
            >
              <span>{language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8FA]" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
