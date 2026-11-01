'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { User, Smartphone, Package, Heart, RefreshCw, LogOut, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AccountPage() {
  const { language, t } = useLanguage();
  const { orders, wishlist, products, selectedModel, addToCart, showToast } = useStore();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<'orders' | 'phone' | 'wishlist'>('orders');

  const handleReorder = (order: (typeof orders)[0]) => {
    order.items.forEach((item) => {
      addToCart({
        itemType: item.itemType,
        product: item.product,
        customDesign: item.customDesign,
        matchingPair: item.matchingPair,
        bundle: item.bundle,
        selectedModelId: item.selectedModelId,
        selectedModelName: item.selectedModelName,
        selectedCaseType: item.selectedCaseType,
        selectedFinish: item.selectedFinish,
        quantity: item.quantity,
        price: item.price,
        originalPrice: item.originalPrice
      });
    });
    showToast(language === 'ar' ? 'تمت إضافة عناصر الطلب السابق للسلة بنجاح!' : 'Reorder added to bag!');
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF0F4] text-[#D982A5] flex items-center justify-center border-2 border-white shadow-xs">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#292329]">
                {language === 'ar' ? 'حسابي وملف أجهزتي' : 'My Account & Device Profile'}
              </h1>
              <p className="text-xs text-[#817780] mt-0.5">
                {language === 'ar' ? 'أهلاً بك في TK-PRINT' : 'Welcome to TK-PRINT'}
              </p>
            </div>
          </div>

          <Link
            href="/admin"
            className="px-5 py-2.5 bg-white border border-[#EFA6C1] text-[#D982A5] font-bold text-xs rounded-2xl hover:bg-[#FFF0F4] shadow-xs"
          >
            ⚙️ {language === 'ar' ? 'لوحة إدارة المتجر' : 'Admin Portal'}
          </Link>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-[#F0E4E9] pb-4 mb-8">
          {[
            { id: 'orders', labelEn: 'Order History', labelAr: 'سجل الطلبيات', icon: Package, badge: orders.length },
            { id: 'phone', labelEn: 'My Phone Profile', labelAr: 'هاتفي المفضل', icon: Smartphone },
            { id: 'wishlist', labelEn: 'Wishlist', labelAr: 'قائمة المفضلة', icon: Heart, badge: wishlist.length }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#D982A5] text-white shadow-xs'
                    : 'bg-white text-[#292329] border border-[#F0E4E9] hover:bg-[#FFF0F4]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
                {Boolean(tab.badge) && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-white text-[#D982A5]' : 'bg-[#FFF0F4] text-[#D982A5]'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow space-y-4">
            <h3 className="font-black text-lg text-[#292329] mb-4">
              {language === 'ar' ? 'طلبياتك السابقة' : 'Past Orders'}
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-[#817780]">
                <Package className="w-12 h-12 mx-auto text-[#D982A5] mb-2 opacity-50" />
                <p className="text-xs">
                  {language === 'ar' ? 'لم تقم بطلب أي كفرات بعد.' : 'No orders placed yet.'}
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block px-6 py-2.5 bg-[#D982A5] text-white rounded-xl text-xs font-bold"
                >
                  {language === 'ar' ? 'تسوق الكفرات الآن' : 'Shop Now'}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-5 rounded-2xl border border-[#F0E4E9] bg-[#FFF8FA] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#D982A5]">{o.orderNumber}</span>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                          {o.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#817780] mt-1">
                        {new Date(o.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')} • الإجمالي: {o.total} ج.م
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/track-order?orderNumber=${o.orderNumber}`}
                        className="px-4 py-2 bg-white border border-[#F0E4E9] text-xs font-bold text-[#292329] rounded-xl hover:bg-[#FFF0F4]"
                      >
                        {language === 'ar' ? 'تتبع الطلب' : 'Track Order'}
                      </Link>

                      <button
                        onClick={() => handleReorder(o)}
                        className="px-4 py-2 bg-[#D982A5] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'إعادة الطلب بنقرة' : '1-Tap Reorder'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Phone Profile */}
        {activeTab === 'phone' && (
          <div className="bg-white rounded-3xl p-8 border border-[#F0E4E9] soft-shadow max-w-lg">
            <h3 className="font-black text-lg text-[#292329] mb-4">
              📱 {language === 'ar' ? 'جهازك المحفوظ حالياً' : 'Saved Device Profile'}
            </h3>

            {selectedModel ? (
              <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#F0E4E9] space-y-2">
                <span className="text-xs text-[#817780] block font-medium">الموديل المسجل:</span>
                <strong className="text-lg font-black text-[#292329] block">
                  {selectedModel.brandName} • {selectedModel.name}
                </strong>
                <p className="text-xs text-[#817780]">
                  تخطيط الكاميرا: {selectedModel.cameraLayout}
                </p>

                <div className="pt-3 border-t border-[#F0E4E9] flex gap-2">
                  <Link
                    href={`/shop?model=${selectedModel.slug}`}
                    className="px-4 py-2 bg-[#D982A5] text-white text-xs font-bold rounded-xl"
                  >
                    تصفح الكفرات المتوافقة
                  </Link>
                  <Link
                    href="/find-your-phone"
                    className="px-4 py-2 bg-white border border-[#F0E4E9] text-xs font-bold text-[#292329] rounded-xl"
                  >
                    تغيير الجهاز
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-[#817780] mb-4">
                  لم تقم بتعيين هاتف افتراضي بعد. اختيار هاتفك يجعل التصفح مقصوراً على المنتجات المتوافقة تماماً.
                </p>
                <Link
                  href="/find-your-phone"
                  className="px-6 py-2.5 bg-[#D982A5] text-white text-xs font-bold rounded-xl inline-block"
                >
                  اختر هاتفك الآن
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h3 className="font-black text-lg text-[#292329]">
              {language === 'ar' ? 'المنتجات المحفوظة في المفضلة' : 'Wishlist Items'} ({wishlistedProducts.length})
            </h3>

            {wishlistedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#F0E4E9]">
                <Heart className="w-12 h-12 mx-auto text-[#D982A5] mb-2 opacity-50" />
                <p className="text-xs text-[#817780]">
                  قائمة المفضلة فارغة حالياً.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-3xl p-4 border border-[#F0E4E9] soft-shadow flex flex-col justify-between">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFF8FA] mb-3">
                      <img src={p.images[0]} alt={p.nameEn} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#292329] line-clamp-1">{p.nameAr}</h4>
                      <span className="text-xs font-black text-[#D982A5] block mt-1">{p.salePrice || p.price} ج.م</span>
                    </div>
                    <Link
                      href={`/product/${p.slug}`}
                      className="mt-3 w-full py-2 bg-[#FFF0F4] hover:bg-[#D982A5] text-[#D982A5] hover:text-white rounded-xl text-xs font-bold text-center transition-colors"
                    >
                      عرض التفاصيل
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
