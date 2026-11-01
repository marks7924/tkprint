'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { Product, CaseType, BundleConfiguration } from '@/types/tk-print';
import { Sparkles, ShoppingBag, Plus, Trash2, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BundleBuilderPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { products, models, addToCart, showToast } = useStore();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const [bundleSize, setBundleSize] = useState<number>(3); // default 3 cases

  // Selected items in bundle
  const [selectedItems, setSelectedItems] = useState<{
    product: Product;
    phoneModelId: string;
    phoneModelName: string;
    caseType: CaseType;
  }[]>([
    {
      product: products[0],
      phoneModelId: models[0]?.id || 'm_iphone_16_pro_max',
      phoneModelName: models[0]?.name || 'iPhone 16 Pro Max',
      caseType: 'matte'
    },
    {
      product: products[1] || products[0],
      phoneModelId: models[1]?.id || 'm_iphone_16_pro',
      phoneModelName: models[1]?.name || 'iPhone 16 Pro',
      caseType: 'glossy'
    }
  ]);

  // Discount tiers
  const discountPercentages: Record<number, number> = {
    2: 15,
    3: 20,
    4: 25
  };

  const discountPercent = discountPercentages[bundleSize] || 15;

  const totalBasePrice = selectedItems.reduce(
    (sum, item) => sum + (item.product.salePrice || item.product.price),
    0
  );

  const discountAmount = Math.round((totalBasePrice * discountPercent) / 100);
  const discountedPrice = totalBasePrice - discountAmount;

  const handleAddItem = (product: Product) => {
    if (selectedItems.length >= bundleSize) {
      showToast(
        language === 'ar'
          ? `لقد اكتمل عدد الكفرات في مجموعتك (${bundleSize} كفرات)`
          : `Bundle full! You have selected ${bundleSize} cases`
      );
      return;
    }

    const defaultModel = models.find((m) => product.compatibleModelIds.includes(m.id)) || models[0];

    setSelectedItems((prev) => [
      ...prev,
      {
        product,
        phoneModelId: defaultModel.id,
        phoneModelName: defaultModel.name,
        caseType: 'matte'
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = () => {
    if (selectedItems.length < bundleSize) {
      showToast(
        language === 'ar'
          ? `يرجى اختيار ${bundleSize - selectedItems.length} كفر إضافي لاكتمال الباقة والاستفادة من خصم ${discountPercent}%`
          : `Please add ${bundleSize - selectedItems.length} more case to complete bundle`
      );
      return;
    }

    const bundleConfig: BundleConfiguration = {
      id: 'bundle_' + Date.now(),
      title: `${bundleSize} Cases Tier Bundle`,
      bundleSize,
      discountPercentage: discountPercent,
      items: selectedItems,
      totalPrice: totalBasePrice,
      discountedPrice,
      savings: discountAmount
    };

    addToCart({
      itemType: 'bundle',
      bundle: bundleConfig,
      quantity: 1,
      price: discountedPrice,
      originalPrice: totalBasePrice
    });

    showToast(
      language === 'ar'
        ? `🎉 تم إضافة المجموعة للسلة مع توفير ${discountAmount} ج.م!`
        : `🎉 Bundle added with ${discountAmount} EGP savings!`
    );
    router.push('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'باقات التوفير الكبرى' : 'Tiered Bundle Builder'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'صمّم مجموعتك ووفر حتى 25%' : 'Build Your Bundle & Save up to 25%'}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'اختر حجم باقتك، ونوّع بين تصاميمك المفضلة وموديلات الهواتف لكل كفر.'
              : 'Choose bundle size, mix & match your favorite designs, and unlock instant savings.'}
          </p>
        </div>

        {/* 1. Bundle Size Tier Selector */}
        <div className="flex justify-center gap-4 mb-10">
          {[
            { size: 2, discount: 15, labelEn: 'Duo Pack (2 Cases)', labelAr: 'باقة ثنائية (2 كفر)' },
            { size: 3, discount: 20, labelEn: 'Trio Pack (3 Cases)', labelAr: 'باقة ثلاثية (3 كفرات)' },
            { size: 4, discount: 25, labelEn: 'Squad Pack (4 Cases)', labelAr: 'باقة العائلة (4 كفرات)' }
          ].map((tier) => (
            <button
              key={tier.size}
              onClick={() => {
                setBundleSize(tier.size);
                if (selectedItems.length > tier.size) {
                  setSelectedItems((prev) => prev.slice(0, tier.size));
                }
              }}
              className={`px-5 py-3.5 rounded-2xl border text-center transition-all ${
                bundleSize === tier.size
                  ? 'border-[#D982A5] bg-[#FFF0F4] ring-2 ring-[#EFA6C1]/40 shadow-xs'
                  : 'border-[#F0E4E9] bg-white hover:bg-[#FFF8FA]'
              }`}
            >
              <span className="block font-black text-sm text-[#292329]">
                {language === 'ar' ? tier.labelAr : tier.labelEn}
              </span>
              <span className="inline-block mt-1 px-2 py-0.5 bg-[#D982A5] text-white text-[10px] font-black rounded-full">
                {language === 'ar' ? `خصم ${tier.discount}%` : `${tier.discount}% OFF`}
              </span>
            </button>
          ))}
        </div>

        {/* 2. Bundle Tray (Selected Items) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow mb-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0E4E9]">
            <div>
              <h3 className="font-black text-lg text-[#292329]">
                {language === 'ar' ? 'الكفرات في مجموعتك' : 'Your Bundle Items'} ({selectedItems.length}/{bundleSize})
              </h3>
              <p className="text-xs text-[#817780]">
                {selectedItems.length < bundleSize
                  ? language === 'ar'
                    ? `متبقي ${bundleSize - selectedItems.length} كفر لإكمال الباقة`
                    : `Add ${bundleSize - selectedItems.length} more to complete bundle`
                  : language === 'ar'
                  ? '🎉 اكتملت باقتك بنجاح وجاهزة للإضافة للسلة!'
                  : '🎉 Bundle is full and ready!'}
              </p>
            </div>

            {/* Savings Badge */}
            <div className="text-end">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {language === 'ar' ? `توفير ${discountPercent}% (${discountAmount} ج.م)` : `Save ${discountPercent}% (${discountAmount} EGP)`}
              </span>
              <div className="text-xl font-black text-[#292329] mt-1">
                {discountedPrice} ج.م{' '}
                <span className="text-xs text-[#817780] line-through">{totalBasePrice} ج.م</span>
              </div>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Populated slots */}
            {selectedItems.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-[#FFF8FA] rounded-2xl p-4 border border-[#F0E4E9] flex flex-col justify-between"
              >
                <button
                  onClick={() => handleRemoveItem(idx)}
                  className="absolute top-2 end-2 p-1 text-[#817780] hover:text-red-500 rounded-full hover:bg-white"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-xs text-[#292329] line-clamp-1">
                    {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                  </h4>

                  {/* Device selector for this specific case */}
                  <div className="mt-2">
                    <label className="text-[10px] text-[#817780] block mb-0.5">
                      {language === 'ar' ? 'موديل الهاتف:' : 'Phone Model:'}
                    </label>
                    <select
                      value={item.phoneModelId}
                      onChange={(e) => {
                        const m = models.find((mod) => mod.id === e.target.value);
                        if (m) {
                          setSelectedItems((prev) =>
                            prev.map((el, i) =>
                              i === idx ? { ...el, phoneModelId: m.id, phoneModelName: m.name } : el
                            )
                          );
                        }
                      }}
                      className="w-full bg-white border border-[#F0E4E9] rounded-lg px-2 py-1 text-[11px] font-bold"
                    >
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {[...Array(Math.max(0, bundleSize - selectedItems.length))].map((_, idx) => (
              <div
                key={'empty_' + idx}
                className="border-2 border-dashed border-[#F0E4E9] rounded-2xl p-6 flex flex-col items-center justify-center text-center text-[#817780]"
              >
                <Plus className="w-8 h-8 text-[#D982A5] mb-2 opacity-60" />
                <span className="text-xs font-bold text-[#292329]">
                  {language === 'ar' ? 'خانة شاغرة' : 'Empty Slot'}
                </span>
                <span className="text-[10px] text-[#817780] mt-0.5">
                  {language === 'ar' ? 'اختر كفراً من الأسفل' : 'Select a case below'}
                </span>
              </div>
            ))}
          </div>

          {/* Add Bundle to Cart CTA */}
          <div className="mt-8 pt-6 border-t border-[#F0E4E9] flex justify-end">
            <button
              onClick={handleAddToCart}
              disabled={selectedItems.length < bundleSize}
              className={`px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                selectedItems.length === bundleSize
                  ? 'bg-[#D982A5] hover:bg-[#c96d93] text-white soft-shadow pill-button'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {language === 'ar'
                  ? `إضافة الباقة للسلة بخصم ${discountPercent}%`
                  : `Add Bundle with ${discountPercent}% Off`}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Catalog to Select From */}
        <div>
          <h3 className="font-black text-xl text-[#292329] mb-4">
            {language === 'ar' ? 'اختر كفراتك لإضافتها للباقة' : 'Choose Cases for Your Bundle'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p) => {
              const isAlreadyIn = selectedItems.some((item) => item.product.id === p.id);

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-[#F0E4E9] overflow-hidden p-3 soft-shadow flex flex-col justify-between"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFF8FA] mb-3">
                    <img
                      src={p.images[0]}
                      alt={p.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#292329] line-clamp-1">
                      {language === 'ar' ? p.nameAr : p.nameEn}
                    </h4>
                    <span className="text-xs font-black text-[#D982A5] block mt-1">
                      {p.salePrice || p.price} ج.م
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddItem(p)}
                    className="mt-3 w-full py-2 bg-[#FFF0F4] hover:bg-[#D982A5] text-[#D982A5] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إضافة للباقة' : 'Add to bundle'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
