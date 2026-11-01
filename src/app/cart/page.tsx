'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Trash2,
  Plus,
  Minus,
  Gift,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Tag
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingRates,
    selectedShippingRate,
    setSelectedShippingRate,
    showToast
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Gift options state
  const [isGift, setIsGift] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [hidePrices, setHidePrices] = useState(true);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMsg({ text: res.message, isError: false });
      setCouponCode('');
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  const freeShippingThreshold = 999;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#292329] tracking-tight">
            {t('cart.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#817780] mt-1">
            {language === 'ar'
              ? `لديك ${cart.length} عناصر في سلة التسوق الخاصة بك`
              : `You have ${cart.length} items in your bag`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-[#F0E4E9] soft-shadow max-w-lg mx-auto my-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-[#D982A5] mb-4 opacity-50" />
            <h2 className="text-xl font-black text-[#292329]">
              {language === 'ar' ? 'سلة التسوق فارغة حالياً' : 'Your Bag is Empty'}
            </h2>
            <p className="text-xs text-[#817780] mt-2 mb-6">
              {t('cart.empty')}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md pill-button transition-all text-sm"
            >
              <span>{language === 'ar' ? 'تصفح الكفرات الآن' : 'Explore Phone Cases'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* LEFT: Items List */}
            <div className="lg:col-span-8 space-y-4">

              {/* Free Shipping Progress bar */}
              <div className="bg-white rounded-3xl p-5 border border-[#F0E4E9] soft-shadow">
                {neededForFreeShipping > 0 ? (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-[#292329]">
                        {language === 'ar'
                          ? `أضف بقيمة ${neededForFreeShipping} ج.م إضافية للحصول على شحن مجاني!`
                          : `Add ${neededForFreeShipping} EGP more for FREE shipping!`}
                      </span>
                      <span className="text-[#D982A5]">
                        {Math.round((cartSubtotal / freeShippingThreshold) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#EFA6C1] to-[#D982A5] rounded-full transition-all"
                        style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {language === 'ar'
                        ? '🎉 مبروك! طلبيتك مؤهلة للشحن المجاني في مصر بالكامل.'
                        : '🎉 Congratulations! Your order qualifies for free delivery across Egypt.'}
                    </span>
                  </div>
                )}
              </div>

              {/* Cart Items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-[#F0E4E9] soft-shadow flex flex-col sm:flex-row items-center gap-5"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-28 rounded-2xl overflow-hidden bg-[#FFF8FA] flex-shrink-0 flex items-center justify-center p-2 border border-[#F0E4E9]">
                    <img
                      src={
                        item.product?.images[0] ||
                        item.customDesign?.previewUrl ||
                        item.customDesign?.uploadedImageUrl ||
                        '/assets/logo.jpg'
                      }
                      alt="item"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#D982A5]">
                        {item.itemType === 'custom'
                          ? 'استوديو التصميم الحي'
                          : item.itemType === 'matching'
                            ? 'طقم ثنائي متطابق (-15%)'
                            : item.itemType === 'bundle'
                              ? 'باقة توفير خاصة'
                              : 'كفر أصلي'}
                      </span>
                      <h3 className="font-black text-sm text-[#292329] mt-0.5">
                        {item.itemType === 'custom'
                          ? `كفر مخصص — ${item.selectedModelName}`
                          : item.itemType === 'matching'
                            ? `${item.matchingPair?.pairName} (ثنائي)`
                            : item.itemType === 'bundle'
                              ? item.bundle?.title
                              : language === 'ar'
                                ? item.product?.nameAr
                                : item.product?.nameEn}
                      </h3>
                    </div>

                    <div className="mt-2 text-xs text-[#817780] space-y-0.5 font-medium">
                      <p>
                        📱 {language === 'ar' ? 'الجهاز:' : 'Device:'}{' '}
                        <strong className="text-[#292329]">{item.selectedModelName}</strong>
                      </p>
                      {item.selectedCaseType && (
                        <p>
                          🛡️ {language === 'ar' ? 'نوع الكفر:' : 'Type:'}{' '}
                          <strong className="text-[#292329] capitalize">{item.selectedCaseType}</strong>
                        </p>
                      )}
                      {item.customDesign?.text && (
                        <p>
                          ✍️ {language === 'ar' ? 'الكتابة المطبوعة:' : 'Custom Text:'}{' '}
                          <strong className="text-[#D982A5]">&quot;{item.customDesign.text}&quot;</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-[#292329]">
                        {item.price * item.quantity}
                      </span>
                      <span className="text-xs text-[#817780]">{t('product.egp')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#F0E4E9] rounded-xl bg-[#FFF8FA] p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-lg hover:bg-white text-[#292329]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-[#292329]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-lg hover:bg-white text-[#292329]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-[#817780] hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift Mode Toggle Box */}
              <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#D982A5]" />
                    <div>
                      <h4 className="font-black text-sm text-[#292329]">
                        {t('gift.title')}
                      </h4>
                      <p className="text-xs text-[#817780]">
                        {language === 'ar' ? 'تغليف هدايا راقٍ مع كرت إهداء شخصي وإخفاء الفاتورة' : 'Premium gift packaging with personal card'}
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-5 h-5 accent-[#D982A5] cursor-pointer"
                  />
                </div>

                {isGift && (
                  <div className="pt-4 border-t border-[#F0E4E9] grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                    <div>
                      <label className="text-xs font-bold text-[#817780] block mb-1">
                        {t('gift.recipient_name')}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'ar' ? 'مثال: نورهان' : 'e.g. Nourhan'}
                        value={giftRecipient}
                        onChange={(e) => setGiftRecipient(e.target.value)}
                        className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#817780] block mb-1">
                        {t('gift.message')}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'ar' ? 'أجمل التمنيات بيوم سعيد!' : 'Best wishes!'}
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow space-y-6 sticky top-28">
              <h3 className="font-black text-lg text-[#292329] pb-4 border-b border-[#F0E4E9]">
                {language === 'ar' ? 'ملخص الطلبية' : 'Order Summary'}
              </h3>

              {/* Line items */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#817780]">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-bold text-[#292329]">{cartSubtotal} {t('product.egp')}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>{t('cart.discount')} ({appliedCoupon?.code})</span>
                    <span>-{cartDiscount} {t('product.egp')}</span>
                  </div>
                )}

                {/* Shipping Zone Selector */}
                <div>
                  <div className="flex justify-between text-[#817780] mb-1">
                    <span>{t('cart.shipping')}</span>
                    <span className="font-bold text-[#292329]">
                      {cartShipping === 0 ? (
                        <span className="text-emerald-600 font-black">
                          {language === 'ar' ? 'مجاناً' : 'FREE'}
                        </span>
                      ) : (
                        `${cartShipping} ${t('product.egp')}`
                      )}
                    </span>
                  </div>
                  <select
                    value={selectedShippingRate.id}
                    onChange={(e) => {
                      const rate = shippingRates.find((r) => r.id === e.target.value);
                      if (rate) setSelectedShippingRate(rate);
                    }}
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-[#292329]"
                  >
                    {shippingRates.map((r) => (
                      <option key={r.id} value={r.id}>
                        {language === 'ar' ? r.zoneAr : r.zoneEn} ({r.cost} ج.م)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-[#F0E4E9] flex justify-between items-baseline">
                  <span className="text-sm font-black text-[#292329]">{t('cart.total')}</span>
                  <div className="text-end">
                    <span className="text-2xl font-black text-[#D982A5]">{cartTotal}</span>
                    <span className="text-xs font-bold text-[#817780] ms-1">{t('product.egp')}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-800">
                        ✓ {appliedCoupon.code}
                      </span>
                      <p className="text-[10px] text-emerald-600">
                        {language === 'ar' ? appliedCoupon.descriptionAr : appliedCoupon.descriptionEn}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      {language === 'ar' ? 'إزالة' : 'Remove'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t('cart.coupon_placeholder')}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold uppercase focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#292329] hover:bg-[#1a171a] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      {t('cart.apply_coupon')}
                    </button>
                  </form>
                )}

                {couponMsg && (
                  <p className={`text-[11px] mt-1.5 font-bold ${couponMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  router.push('/checkout');
                }}
                className="w-full py-4 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-lg soft-shadow pill-button transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>{t('cart.checkout_btn')}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#817780] text-center">
                🔒 {language === 'ar' ? 'دفع آمن عند الاستلام أو بالبطاقة البنكية' : 'Secure payment via COD or Card'}
              </p>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

