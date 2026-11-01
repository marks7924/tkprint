'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { OrderStatus } from '@/types/tk-print';
import { Truck, Search, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNum = searchParams.get('orderNumber') || '';

  const { language, t } = useLanguage();
  const { getOrder } = useStore();

  const [orderNumber, setOrderNumber] = useState(initialOrderNum);
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(Boolean(initialOrderNum));
  const [foundOrder, setFoundOrder] = useState(
    initialOrderNum ? getOrder(initialOrderNum) : undefined
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    const res = getOrder(orderNumber, phone);
    setFoundOrder(res);
    setSearched(true);
  };

  const statusPipeline: { status: OrderStatus; labelEn: string; labelAr: string }[] = [
    { status: 'Order Received', labelEn: 'Order Received', labelAr: 'تم استلام الطلب' },
    { status: 'Confirmed', labelEn: 'Confirmed', labelAr: 'تم التأكيد' },
    { status: 'Preparing', labelEn: 'Preparing', labelAr: 'جاري التجهيز' },
    { status: 'Printing / Customization', labelEn: 'Printing', labelAr: 'مرحلة الطباعة' },
    { status: 'Quality Check', labelEn: 'Quality Check', labelAr: 'فحص الجودة' },
    { status: 'Ready for Shipping', labelEn: 'Ready for Shipping', labelAr: 'جاهز للشحن' },
    { status: 'Shipped', labelEn: 'Shipped with Courier', labelAr: 'خرج مع المندوب' },
    { status: 'Delivered', labelEn: 'Delivered', labelAr: 'تم التوصيل بنجاح' }
  ];

  const getCurrentStatusIndex = (currentStatus: OrderStatus) => {
    const idx = statusPipeline.findIndex((s) => s.status === currentStatus);
    return idx >= 0 ? idx : 0;
  };

  const currentIndex = foundOrder ? getCurrentStatusIndex(foundOrder.status) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2 shadow-2xs">
            <Truck className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تتبع فوري ومباشر' : 'Live Order Tracking'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#292329] tracking-tight">
            {t('track.title')}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'أدخل رقم طلبك ورقم هاتفك للاطلاع على مراحل الطباعة والتجهيز والشحن لحظة بلحظة.'
              : 'Enter your order number and phone to view live printing & shipment progress.'}
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow mb-10 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-5">
              <label className="text-xs font-bold text-[#292329] block mb-1">
                {t('track.enter_order_num')} *
              </label>
              <input
                type="text"
                required
                placeholder="TK-849201"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="text-xs font-bold text-[#292329] block mb-1">
                {t('track.enter_phone')} (اختياري)
              </label>
              <input
                type="tel"
                placeholder="01xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3.5 py-2.5 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t('track.button')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Timeline */}
        {searched && (
          <div>
            {foundOrder ? (
              <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-[#F0E4E9] soft-shadow-lg space-y-8">
                
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F0E4E9] gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#817780] block">
                      {t('order.number')}
                    </span>
                    <h2 className="text-2xl font-mono font-black text-[#D982A5]">
                      {foundOrder.orderNumber}
                    </h2>
                  </div>

                  <div className="text-start sm:text-end">
                    <span className="text-xs font-bold text-[#817780] block">
                      {t('track.current_status')}
                    </span>
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-200 mt-1">
                      {foundOrder.status}
                    </span>
                  </div>
                </div>

                {/* Visual Pipeline Progress */}
                <div className="py-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {statusPipeline.map((step, idx) => {
                      const isCompleted = idx <= currentIndex;
                      const isCurrent = idx === currentIndex;

                      return (
                        <div
                          key={step.status}
                          className={`p-3.5 rounded-2xl border text-center transition-all ${
                            isCurrent
                              ? 'border-[#D982A5] bg-[#FFF0F4] ring-2 ring-[#EFA6C1]/40'
                              : isCompleted
                              ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800'
                              : 'border-[#F0E4E9] bg-neutral-50/50 opacity-50'
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-center">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-neutral-400" />
                            )}
                          </div>
                          <span className="text-xs font-bold block">
                            {language === 'ar' ? step.labelAr : step.labelEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status Log & Timestamps */}
                <div>
                  <h4 className="font-black text-sm text-[#292329] mb-3">
                    {language === 'ar' ? 'سجل مراحل الطلبية' : 'Status History'}
                  </h4>

                  <div className="space-y-3">
                    {foundOrder.statusHistory.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-[#FFF8FA] rounded-2xl border border-[#F0E4E9] text-xs"
                      >
                        <PackageCheck className="w-4 h-4 text-[#D982A5] mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <strong className="text-[#292329] font-bold">{h.status}</strong>
                            <span className="text-[10px] text-[#817780]">
                              {new Date(h.timestamp).toLocaleDateString(
                                language === 'ar' ? 'ar-EG' : 'en-US'
                              )}
                            </span>
                          </div>
                          {h.note && (
                            <p className="text-[11px] text-[#817780] mt-0.5">{h.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="pt-6 border-t border-[#F0E4E9]">
                  <h4 className="font-black text-sm text-[#292329] mb-3">
                    {language === 'ar' ? 'المنتجات في هذه الطلبية' : 'Items in Order'}
                  </h4>
                  <div className="space-y-2">
                    {foundOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-2 border-b border-neutral-100 last:border-none"
                      >
                        <span className="font-bold text-[#292329]">
                          {item.itemType === 'custom'
                            ? `كفر مخصص (${item.selectedModelName})`
                            : item.product?.nameAr || 'كفر TK-PRINT'}{' '}
                          × {item.quantity}
                        </span>
                        <span className="font-black text-[#D982A5]">
                          {item.price * item.quantity} ج.م
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-[#F0E4E9] soft-shadow max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h3 className="font-black text-base text-[#292329]">
                  {language === 'ar' ? 'لم يتم العثور على طلب بهذا الرقم' : 'No Order Found'}
                </h3>
                <p className="text-xs text-[#817780] mt-1">
                  {language === 'ar'
                    ? 'يرجى التأكد من كتابة رقم الطلب بصيغة صحيحة (مثال: TK-849201).'
                    : 'Please verify the order number format (e.g. TK-849201).'}
                </p>
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8FA]" />}>
      <TrackOrderContent />
    </Suspense>
  );
}

