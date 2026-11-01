'use client';

import React, { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { CaseType, CaseFinish } from '@/types/tk-print';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Star,
  Check,
  MessageCircle,
  Plus,
  Minus
} from 'lucide-react';

export default function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { language, t } = useLanguage();
  const {
    products,
    models,
    selectedModel,
    setSelectedModel,
    addToCart,
    wishlist,
    toggleWishlist,
    showToast
  } = useStore();

  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return notFound();
  }

  // Device selection
  const [activeModelId, setActiveModelId] = useState<string>(
    selectedModel?.id || product.compatibleModelIds[0] || models[0].id
  );
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType>(product.caseTypes[0] || 'matte');
  const [selectedFinish, setSelectedFinish] = useState<CaseFinish>(product.finishes[0] || 'matte');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const currentModel = models.find((m) => m.id === activeModelId) || models[0];
  const isWishlisted = wishlist.includes(product.id);

  // Frequently bought together companion
  const companionProduct = products.find((p) => p.id !== product.id) || products[0];
  const [addCompanion, setAddCompanion] = useState<boolean>(false);

  const unitPrice = product.salePrice || product.price;

  const handleAddToCart = (buyNow: boolean = false) => {
    addToCart({
      itemType: 'standard',
      product,
      selectedModelId: activeModelId,
      selectedModelName: currentModel.name,
      selectedCaseType: selectedCaseType,
      selectedFinish: selectedFinish,
      quantity,
      price: unitPrice,
      originalPrice: product.price
    });

    if (addCompanion && companionProduct) {
      addToCart({
        itemType: 'standard',
        product: companionProduct,
        selectedModelId: activeModelId,
        selectedModelName: currentModel.name,
        selectedCaseType: 'matte',
        selectedFinish: 'matte',
        quantity: 1,
        price: companionProduct.salePrice || companionProduct.price,
        originalPrice: companionProduct.price
      });
    }

    if (buyNow) {
      router.push('/checkout');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#817780] mb-6 flex items-center gap-2">
          <span>{t('nav.home')}</span>
          <span>/</span>
          <span>{t('nav.shop')}</span>
          <span>/</span>
          <span className="text-[#292329] font-bold">
            {language === 'ar' ? product.nameAr : product.nameEn}
          </span>
        </div>

        {/* 2 Columns: Image Gallery & Product Buy Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white border border-[#F0E4E9] soft-shadow-lg relative p-4 flex items-center justify-center">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.nameEn}
                className="w-full h-full object-cover rounded-2xl"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-6 end-6 p-3 rounded-full backdrop-blur-md transition-colors ${
                  isWishlisted
                    ? 'bg-[#D982A5] text-white'
                    : 'bg-white/80 text-[#817780] hover:text-[#D982A5]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#D982A5] ring-2 ring-[#EFA6C1]/30'
                        : 'border-[#F0E4E9] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Buy Box */}
          <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-8 border border-[#F0E4E9] soft-shadow space-y-6">
            
            {/* Title & Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D982A5] bg-[#FFF0F4] px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-[#292329]">{product.rating}</span>
                  <span className="text-[#817780]">({product.reviewCount} {t('product.reviews')})</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#292329]">
                {language === 'ar' ? product.nameAr : product.nameEn}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-black text-[#292329]">
                  {unitPrice} {t('product.egp')}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-[#817780] line-through">
                    {product.price} {t('product.egp')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {t('product.in_stock')} ({product.stock} {language === 'ar' ? 'قطعة' : 'pcs'})
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#817780] leading-relaxed pt-2 border-t border-[#F0E4E9]">
              {language === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>

            {/* 1. Device Compatibility Selector */}
            <div>
              <label className="text-xs font-black text-[#292329] block mb-2">
                📱 {language === 'ar' ? 'اختر موديل هاتفك' : 'Choose Your Phone Model'}
              </label>
              <select
                value={activeModelId}
                onChange={(e) => {
                  const mId = e.target.value;
                  setActiveModelId(mId);
                  const m = models.find((mod) => mod.id === mId) || null;
                  if (m) setSelectedModel(m);
                }}
                className="w-full bg-[#FFF8FA] border border-[#F0E4E9] hover:border-[#D982A5] rounded-2xl px-4 py-3 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} {product.compatibleModelIds.includes(m.id) ? '✓ (متوافق)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Case Type Selection */}
            <div>
              <label className="text-xs font-black text-[#292329] block mb-2">
                🛡️ {t('product.case_type')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.caseTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedCaseType(type)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold capitalize transition-colors ${
                      selectedCaseType === type
                        ? 'border-[#D982A5] bg-[#FFF0F4] text-[#D982A5]'
                        : 'border-[#F0E4E9] bg-white text-[#292329] hover:bg-[#FFF8FA]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Quantity & Action Buttons */}
            <div className="pt-4 border-t border-[#F0E4E9] space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#F0E4E9] rounded-2xl p-1 bg-[#FFF8FA]">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="p-2 rounded-xl hover:bg-white text-[#292329]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-black text-[#292329]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="p-2 rounded-xl hover:bg-white text-[#292329]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(false)}
                  className="flex-1 py-3.5 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md soft-shadow pill-button transition-all text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('product.add_to_cart')}</span>
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(true)}
                className="w-full py-3.5 bg-[#292329] hover:bg-[#1a171a] text-white font-bold rounded-2xl shadow-md pill-button transition-all text-sm"
              >
                {t('product.buy_now')}
              </button>
            </div>

            {/* Frequently Bought Together Complement */}
            {companionProduct && (
              <div className="pt-4 border-t border-[#F0E4E9]">
                <h4 className="font-black text-xs text-[#292329] mb-2">
                  ✨ {t('product.frequently_bought')}
                </h4>
                <div className="bg-[#FFF8FA] p-3 rounded-2xl border border-[#F0E4E9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={companionProduct.images[0]}
                      alt="companion"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-[#292329] line-clamp-1">
                        {language === 'ar' ? companionProduct.nameAr : companionProduct.nameEn}
                      </h5>
                      <span className="text-xs font-black text-[#D982A5]">
                        +{companionProduct.salePrice || companionProduct.price} ج.م
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAddCompanion(!addCompanion)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      addCompanion
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-[#F0E4E9] text-[#292329]'
                    }`}
                  >
                    {addCompanion ? '✓ مضاف' : '+ أضف'}
                  </button>
                </div>
              </div>
            )}

            {/* Delivery & Guarantees */}
            <div className="pt-4 border-t border-[#F0E4E9] space-y-2 text-xs text-[#817780]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D982A5]" />
                <span>{t('product.delivery_estimate')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D982A5]" />
                <span>{language === 'ar' ? 'ضمان استبدال فوري عند وجود أي عيب طباعة' : '100% Replacement Warranty'}</span>
              </div>
            </div>

            {/* WhatsApp Contextual Inquiry */}
            <a
              href={`https://wa.me/201000000000?text=Hi%20TK-PRINT%2C%20I%20have%20a%20question%20about%20${encodeURIComponent(
                product.nameEn
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ar' ? 'استفسر عن هذا الكفر عبر واتساب' : 'Ask about this case on WhatsApp'}</span>
            </a>

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#F0E4E9]">
            <h3 className="font-black text-2xl text-[#292329] mb-6">
              {language === 'ar' ? 'تصاميم مشابهة قد تنال إعجابك' : 'You May Also Like'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
