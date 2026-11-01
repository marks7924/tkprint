'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/tk-print';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, ShoppingBag, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const {
    selectedModel,
    addToCart,
    wishlist,
    toggleWishlist,
    addToRecentlyViewed
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // Check if compatible with user's selected phone
  const isCompatible = selectedModel
    ? product.compatibleModelIds.includes(selectedModel.id)
    : true;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      itemType: 'standard',
      product,
      selectedModelId: selectedModel?.id || product.compatibleModelIds[0],
      selectedModelName: selectedModel?.name || 'iPhone 15 Pro',
      selectedCaseType: product.caseTypes[0] || 'matte',
      selectedFinish: product.finishes[0] || 'matte',
      quantity: 1,
      price: product.salePrice || product.price,
      originalPrice: product.price
    });
  };

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <>
      <div
        className="group relative bg-white border border-[#F0E4E9] rounded-3xl overflow-hidden soft-shadow transition-all duration-300 hover:-translate-y-1 hover:border-[#EFA6C1] hover:shadow-xl flex flex-col"
        onClick={() => addToRecentlyViewed(product)}
      >
        {/* Product Image Stage */}
        <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#FFF8FA] p-4 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={language === 'ar' ? product.nameAr : product.nameEn}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-106"
          />

          {/* Badges: Discount or Bestseller */}
          <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10">
            {discountPercent > 0 && (
              <span className="px-2.5 py-1 bg-[#D982A5] text-white text-[11px] font-black rounded-full shadow-xs">
                -{discountPercent}%
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2.5 py-1 bg-[#292329] text-white text-[10px] font-bold rounded-full">
                {language === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller'}
              </span>
            )}
          </div>

          {/* Quick Actions (Wishlist & Quick View) */}
          <div className="absolute top-3 end-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                isWishlisted
                  ? 'bg-[#D982A5] text-white shadow-md'
                  : 'bg-white/80 text-[#817780] hover:text-[#D982A5] hover:bg-white shadow-xs'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#817780] hover:text-[#292329] shadow-xs flex items-center justify-center transition-colors"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Device Compatibility Pill Indicator */}
          {selectedModel && (
            <div className="absolute bottom-3 start-3 end-3 z-10">
              {isCompatible ? (
                <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-emerald-500/90 text-white backdrop-blur-xs text-[11px] font-bold rounded-full shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>
                    {language === 'ar'
                      ? `متوافق مع ${selectedModel.name}`
                      : `Fits your ${selectedModel.name}`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-amber-500/90 text-white backdrop-blur-xs text-[10px] font-bold rounded-full shadow-xs">
                  <span>
                    {language === 'ar' ? 'غير متوافق مع هاتفك المختار' : 'Not for your phone'}
                  </span>
                </div>
              )}
            </div>
          )}
        </Link>

        {/* Product Information */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#817780]">
              {product.category}
            </span>
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-bold text-[#292329] text-sm mt-1 hover:text-[#D982A5] transition-colors line-clamp-1">
                {language === 'ar' ? product.nameAr : product.nameEn}
              </h3>
            </Link>
          </div>

          {/* Pricing and Cart Button */}
          <div className="mt-4 pt-3 border-t border-[#F0E4E9] flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-[#292329]">
                  {product.salePrice || product.price}
                </span>
                <span className="text-xs font-semibold text-[#817780]">
                  {t('product.egp')}
                </span>
              </div>
              {product.salePrice && (
                <span className="text-xs text-[#817780] line-through">
                  {product.price} {t('product.egp')}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="p-2.5 bg-[#FFF0F4] hover:bg-[#D982A5] text-[#D982A5] hover:text-white rounded-2xl transition-all duration-200 pill-button flex items-center justify-center shadow-xs"
              title={t('product.add_to_cart')}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-[#F0E4E9]">
            <button
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-4 end-4 p-2 text-[#817780] hover:text-[#292329] rounded-full hover:bg-[#FFF0F4]"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFF8FA]">
                <img
                  src={product.images[0]}
                  alt={language === 'ar' ? product.nameAr : product.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg text-[#292329]">
                    {language === 'ar' ? product.nameAr : product.nameEn}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-black text-[#D982A5]">
                      {product.salePrice || product.price} {t('product.egp')}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-[#817780] line-through">
                        {product.price} {t('product.egp')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#817780] mt-3 leading-relaxed">
                    {language === 'ar' ? product.descriptionAr : product.descriptionEn}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      handleAddToCart(e);
                      setQuickViewOpen(false);
                    }}
                    className="w-full py-3 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-md soft-shadow pill-button transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('product.add_to_cart')}</span>
                  </button>

                  <Link
                    href={`/product/${product.slug}`}
                    className="w-full py-2.5 text-center text-xs font-bold text-[#817780] hover:text-[#292329]"
                    onClick={() => setQuickViewOpen(false)}
                  >
                    {t('product.details')} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

