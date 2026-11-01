'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { CaseType, CaseFinish } from '@/types/tk-print';
import { Filter, SlidersHorizontal, Search, X, Check, Smartphone } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialCollection = searchParams.get('collection') || 'all';
  const initialModel = searchParams.get('model') || '';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'bestseller';

  const {
    products,
    brands,
    models,
    collections,
    selectedModel,
    setSelectedModel
  } = useStore();
  const { t, language } = useLanguage();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [selectedModelId, setSelectedModelId] = useState<string>(
    initialModel
      ? models.find((m) => m.slug === initialModel)?.id || 'all'
      : selectedModel?.id || 'all'
  );
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType | 'all'>('all');
  const [selectedFinish, setSelectedFinish] = useState<CaseFinish | 'all'>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Sync with Store's selected device if set
  const activeBrandModels = useMemo(() => {
    if (selectedBrandId === 'all') return models;
    return models.filter((m) => m.brandId === selectedBrandId);
  }, [models, selectedBrandId]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesNameEn = product.nameEn.toLowerCase().includes(query);
        const matchesNameAr = product.nameAr.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesNameEn && !matchesNameAr && !matchesTag) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Collection
      if (selectedCollection !== 'all' && !product.collectionIds.includes(selectedCollection)) {
        return false;
      }

      // Phone Model Compatibility
      if (selectedModelId !== 'all') {
        if (!product.compatibleModelIds.includes(selectedModelId)) {
          return false;
        }
      }

      // Case Type
      if (selectedCaseType !== 'all' && !product.caseTypes.includes(selectedCaseType)) {
        return false;
      }

      // Finish
      if (selectedFinish !== 'all' && !product.finishes.includes(selectedFinish)) {
        return false;
      }

      // In Stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // Max Price
      const currentPrice = product.salePrice || product.price;
      if (currentPrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // default: bestseller
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedCollection,
    selectedModelId,
    selectedCaseType,
    selectedFinish,
    inStockOnly,
    maxPrice,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedBrandId('all');
    setSelectedModelId('all');
    setSelectedCaseType('all');
    setSelectedFinish('all');
    setInStockOnly(false);
    setMaxPrice(500);
    setSearchQuery('');
  };

  const categories = [
    { id: 'all', nameEn: 'All Categories', nameAr: 'كل الفئات' },
    { id: 'cute', nameEn: 'Cute & Coquette', nameAr: 'كيوت ولطيف' },
    { id: 'minimal', nameEn: 'Minimal & Clean', nameAr: 'مينيمال وهادئ' },
    { id: 'art', nameEn: 'Art & Prints', nameAr: 'فن ورسم' },
    { id: 'romantic', nameEn: 'Romantic & Vintage', nameAr: 'رومانسي وفينتاج' },
    { id: 'dark', nameEn: 'Dark & Sleek', nameAr: 'دارك وأسود' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#292329] tracking-tight">
                {language === 'ar' ? 'المتجر الشامل' : 'Shop All Phone Cases'}
              </h1>
              <p className="text-xs sm:text-sm text-[#817780] mt-1 font-medium">
                {language === 'ar'
                  ? `عرض ${filteredProducts.length} تصميم كفر متوافق ومطبوع بأعلى جودة`
                  : `Showing ${filteredProducts.length} premium crafted phone cases`}
              </p>
            </div>

            {/* Mobile Filter Trigger & Sort Dropdown */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#F0E4E9] rounded-2xl text-xs font-bold text-[#292329] shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#D982A5]" />
                <span>{language === 'ar' ? 'الفلاتر' : 'Filters'}</span>
              </button>

              {/* Sort selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-[#F0E4E9] rounded-2xl px-4 py-2.5 pe-8 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#EFA6C1] cursor-pointer shadow-xs"
                >
                  <option value="bestseller">{language === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}</option>
                  <option value="newest">{language === 'ar' ? 'الأحدث أولاً' : 'Newest'}</option>
                  <option value="price_asc">{language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                  <option value="price_desc">{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2.5 text-[#817780]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-6 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#D982A5] text-white shadow-xs'
                    : 'bg-white text-[#292329] border border-[#F0E4E9] hover:bg-[#FFF0F4]'
                }`}
              >
                {language === 'ar' ? c.nameAr : c.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-[#F0E4E9] soft-shadow h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4E9]">
              <span className="font-black text-sm text-[#292329] flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#D982A5]" />
                <span>{language === 'ar' ? 'تصفية النتائج' : 'Filters'}</span>
              </span>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-[#D982A5] hover:underline"
              >
                {language === 'ar' ? 'إعادة ضبط' : 'Reset all'}
              </button>
            </div>

            {/* Phone Model Filter (Crucial Core Feature) */}
            <div>
              <label className="text-xs font-black text-[#292329] block mb-2">
                📱 {language === 'ar' ? 'موديل الهاتف' : 'Phone Model'}
              </label>

              {/* Brand Select */}
              <select
                value={selectedBrandId}
                onChange={(e) => {
                  setSelectedBrandId(e.target.value);
                  setSelectedModelId('all');
                }}
                className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold text-[#292329] mb-2"
              >
                <option value="all">{language === 'ar' ? 'كل الماركات' : 'All Brands'}</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              {/* Exact Model Select */}
              <select
                value={selectedModelId}
                onChange={(e) => {
                  const mId = e.target.value;
                  setSelectedModelId(mId);
                  const m = models.find((mod) => mod.id === mId) || null;
                  setSelectedModel(m);
                }}
                className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold text-[#292329]"
              >
                <option value="all">{language === 'ar' ? 'كل الموديلات' : 'All Compatible Models'}</option>
                {activeBrandModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Case Type Filter */}
            <div>
              <label className="text-xs font-black text-[#292329] block mb-2">
                🛡️ {language === 'ar' ? 'نوع الكفر' : 'Case Type'}
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: language === 'ar' ? 'كل الأنواع' : 'All Types' },
                  { id: 'matte', label: language === 'ar' ? 'مات مخملي (Matte)' : 'Matte Slim' },
                  { id: 'glossy', label: language === 'ar' ? 'لامع أنيق (Glossy)' : 'Glossy Snap' },
                  { id: 'transparent', label: language === 'ar' ? 'شفاف شفافية عالية' : 'Clear / Anti-Yellow' }
                ].map((type) => (
                  <label key={type.id} className="flex items-center gap-2 text-xs text-[#292329] cursor-pointer">
                    <input
                      type="radio"
                      name="caseType"
                      checked={selectedCaseType === type.id}
                      onChange={() => setSelectedCaseType(type.id as CaseType | 'all')}
                      className="accent-[#D982A5]"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-black text-[#292329] mb-2">
                <span>💰 {language === 'ar' ? 'أقصى سعر:' : 'Max Price:'}</span>
                <span className="text-[#D982A5]">{maxPrice} {t('product.egp')}</span>
              </div>
              <input
                type="range"
                min="200"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D982A5] cursor-pointer"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-[#F0E4E9]">
              <label className="flex items-center gap-2 text-xs font-bold text-[#292329] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#D982A5] focus:ring-[#D982A5]"
                />
                <span>{language === 'ar' ? 'متوفر بالمخزون فقط' : 'In stock only'}</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#F0E4E9] soft-shadow">
                <Smartphone className="w-12 h-12 mx-auto text-[#D982A5] mb-3 opacity-60" />
                <h3 className="font-black text-lg text-[#292329]">
                  {language === 'ar' ? 'لم يتم العثور على كفرات مطابقة' : 'No matching cases found'}
                </h3>
                <p className="text-xs text-[#817780] mt-1 max-w-sm mx-auto">
                  {language === 'ar'
                    ? 'جرب تقليل الفلاتر أو استخدام استوديو التصميم لطباعة كفر مخصص لهاتفك تماماً.'
                    : 'Try clearing some filters or build a custom case in our studio!'}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-5 px-6 py-2.5 bg-[#D982A5] text-white text-xs font-bold rounded-2xl pill-button"
                >
                  {language === 'ar' ? 'إعادة ضبط كل الفلاتر' : 'Reset all filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Mobile Slide-Over Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 end-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-50 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E4E9]">
                <h3 className="font-black text-base text-[#292329]">
                  {language === 'ar' ? 'تصفية المنتجات' : 'Filter Products'}
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-100"
                >
                  <X className="w-5 h-5 text-[#817780]" />
                </button>
              </div>

              {/* Phone Model select */}
              <div>
                <label className="text-xs font-black text-[#292329] block mb-2">
                  {language === 'ar' ? 'الموديل المختار' : 'Phone Model'}
                </label>
                <select
                  value={selectedModelId}
                  onChange={(e) => {
                    const mId = e.target.value;
                    setSelectedModelId(mId);
                    const m = models.find((mod) => mod.id === mId) || null;
                    setSelectedModel(m);
                  }}
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="all">{language === 'ar' ? 'كل الموديلات' : 'All Models'}</option>
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Case Type select */}
              <div>
                <label className="text-xs font-black text-[#292329] block mb-2">
                  {language === 'ar' ? 'نوع الكفر' : 'Case Type'}
                </label>
                <div className="space-y-1.5">
                  {['all', 'matte', 'glossy', 'transparent'].map((tId) => (
                    <label key={tId} className="flex items-center gap-2 text-xs">
                      <input
                        type="radio"
                        name="mobCaseType"
                        checked={selectedCaseType === tId}
                        onChange={() => setSelectedCaseType(tId as CaseType | 'all')}
                        className="accent-[#D982A5]"
                      />
                      <span>{tId}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>{language === 'ar' ? 'أقصى سعر:' : 'Max Price:'}</span>
                  <span className="text-[#D982A5]">{maxPrice} {t('product.egp')}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D982A5]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#F0E4E9] flex gap-2">
              <button
                onClick={clearAllFilters}
                className="w-1/2 py-2.5 rounded-xl border border-[#F0E4E9] text-xs font-bold"
              >
                {language === 'ar' ? 'إعادة ضبط' : 'Reset'}
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[#D982A5] text-white text-xs font-bold shadow-xs"
              >
                {language === 'ar' ? 'عرض النتائج' : 'Show Results'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8FA]" />}>
      <ShopContent />
    </Suspense>
  );
}
