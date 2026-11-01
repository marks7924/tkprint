'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    selectedShippingRate,
    shippingRates,
    setSelectedShippingRate,
    placeOrder,
    showToast
  } = useStore();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      showToast(
        language === 'ar'
          ? 'يرجى استكمال جميع الحقول الإلزامية (الاسم، الهاتف، العنوان)'
          : 'Please complete all required fields'
      );
      return;
    }

    if (cart.length === 0) {
      router.push('/cart');
      return;
    }

    setSubmitting(true);

    try {
      const order = placeOrder({
        items: cart,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shippingFee: cartShipping,
        total: cartTotal,
        customerName: fullName,
        email: email || 'customer@example.com',
        phone,
        country: 'Egypt',
        city: city || selectedShippingRate.zoneEn,
        area,
        address,
        notes,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'cash_on_delivery' : 'paid'
      });

      // Redirect to confirmation page with unique order number
      router.push(`/order-confirmation?orderNumber=${order.orderNumber}`);
    } catch {
      setSubmitting(false);
      showToast('حدث خطأ أثناء تسجيل الطلب، يرجى المحاولة مرة أخرى');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('checkout.guest_notice')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#292329] tracking-tight">
            {t('checkout.title')}
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Shipping & Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow space-y-6">

            {/* Contact Details */}
            <div>
              <h3 className="font-black text-base text-[#292329] mb-4 flex items-center gap-2">
                <span>1. {language === 'ar' ? 'بيانات التواصل والتسليم' : 'Contact Information'}</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#292329] block mb-1">
                    {t('checkout.fullname')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ar' ? 'الاسم الأول واسم العائلة' : 'First & Last Name'}
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-4 py-3 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#292329] block mb-1">
                      {t('checkout.phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01xxxxxxxxx"
                      className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-4 py-3 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#292329] block mb-1">
                      {t('checkout.email')} (اختياري)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-4 py-3 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="pt-4 border-t border-[#F0E4E9]">
              <h3 className="font-black text-base text-[#292329] mb-4">
                <span>2. {language === 'ar' ? 'عنوان الشحن والتوصيل في مصر' : 'Delivery Address'}</span>
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#292329] block mb-1">
                      {t('checkout.governorate')} *
                    </label>
                    <select
                      value={selectedShippingRate.id}
                      onChange={(e) => {
                        const r = shippingRates.find((rate) => rate.id === e.target.value);
                        if (r) setSelectedShippingRate(r);
                      }}
                      className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-3 text-xs font-bold text-[#292329]"
                    >
                      {shippingRates.map((r) => (
                        <option key={r.id} value={r.id}>
                          {language === 'ar' ? r.zoneAr : r.zoneEn} ({r.cost} ج.م)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#292329] block mb-1">
                      {t('checkout.city')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={language === 'ar' ? 'المدينة أو الحي (مثل: المعادي)' : 'City / District'}
                      className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-4 py-3 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#292329] block mb-1">
                    {t('checkout.address')} *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={language === 'ar' ? 'اسم الشارع، رقم العمارة، الطابق، ورقم الشقة...' : 'Street name, building no, floor, apt...'}
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-4 py-3 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1">
                    {t('checkout.notes')} (اختياري)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: علامة مميزة بجوار مسجد أو مدرسة...' : 'e.g. Near landmark or specific delivery time...'}
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-4 py-2.5 text-xs text-[#292329]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-[#F0E4E9]">
              <h3 className="font-black text-base text-[#292329] mb-4">
                <span>3. {t('checkout.payment_method')}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-start transition-all flex items-start gap-3 ${paymentMethod === 'cod'
                      ? 'border-[#D982A5] bg-[#FFF0F4] ring-2 ring-[#EFA6C1]/40'
                      : 'border-[#F0E4E9] bg-white hover:bg-[#FFF8FA]'
                    }`}
                >
                  <Banknote className="w-5 h-5 text-[#D982A5] mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-[#292329]">{t('checkout.cod')}</h4>
                    <p className="text-[10px] text-[#817780] mt-0.5">
                      {language === 'ar' ? 'ادفع نقداً لمندوب الشحن عند استلام الكفر' : 'Pay in cash upon delivery'}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-start transition-all flex items-start gap-3 ${paymentMethod === 'card'
                      ? 'border-[#D982A5] bg-[#FFF0F4] ring-2 ring-[#EFA6C1]/40'
                      : 'border-[#F0E4E9] bg-white hover:bg-[#FFF8FA]'
                    }`}
                >
                  <CreditCard className="w-5 h-5 text-[#D982A5] mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-[#292329]">{t('checkout.card')}</h4>
                    <p className="text-[10px] text-[#817780] mt-0.5">
                      {language === 'ar' ? 'فيزا، ماستركارد، وميزة (بوابة دفع مؤمنة)' : 'Visa / Mastercard / Meeza'}
                    </p>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary in Checkout */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow space-y-6 sticky top-28">
            <h3 className="font-black text-lg text-[#292329] pb-4 border-b border-[#F0E4E9]">
              {language === 'ar' ? 'تفاصيل الطلبية' : 'Review Your Order'} ({cart.length})
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#FFF8FA] flex-shrink-0 border border-[#F0E4E9]">
                    <img
                      src={
                        item.product?.images[0] ||
                        item.customDesign?.previewUrl ||
                        '/assets/logo.jpg'
                      }
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#292329] line-clamp-1">
                      {item.itemType === 'custom'
                        ? `كفر مخصص (${item.selectedModelName})`
                        : item.itemType === 'matching'
                          ? 'كفرات ثنائية متناسقة'
                          : language === 'ar'
                            ? item.product?.nameAr
                            : item.product?.nameEn}
                    </h4>
                    <span className="text-[10px] text-[#817780] block">
                      {item.selectedModelName} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-black text-[#292329]">
                    {item.price * item.quantity} ج.م
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-[#F0E4E9] space-y-2 text-xs">
              <div className="flex justify-between text-[#817780]">
                <span>{t('cart.subtotal')}</span>
                <span className="font-bold text-[#292329]">{cartSubtotal} ج.م</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>{t('cart.discount')}</span>
                  <span>-{cartDiscount} ج.م</span>
                </div>
              )}

              <div className="flex justify-between text-[#817780]">
                <span>{t('cart.shipping')}</span>
                <span className="font-bold text-[#292329]">
                  {cartShipping === 0 ? (
                    <span className="text-emerald-600 font-bold">
                      {language === 'ar' ? 'مجاني' : 'FREE'}
                    </span>
                  ) : (
                    `${cartShipping} ج.م`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#F0E4E9] flex justify-between items-baseline">
                <span className="text-sm font-black text-[#292329]">{t('cart.total')}</span>
                <span className="text-2xl font-black text-[#D982A5]">{cartTotal} ج.م</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-lg soft-shadow pill-button transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>{submitting ? 'جاري تأكيد الطلب...' : t('checkout.place_order')}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-[#817780] text-center space-y-1">
              <p>📦 {language === 'ar' ? 'يتم تجهيز وطباعة الكفر خلال 24 ساعة من تأكيد الطلب' : 'Crafted & printed within 24h'}</p>
            </div>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
}

