'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { CaseType, CaseFinish, CustomDesignPayload } from '@/types/tk-print';
import {
  Upload,
  Type,
  RotateCw,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check,
  Smartphone
} from 'lucide-react';

export default function CustomStudioPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const {
    brands,
    models,
    selectedModel,
    setSelectedModel,
    addToCart,
    showToast
  } = useStore();

  // Step 1: Device Selection
  const [activeBrandId, setActiveBrandId] = useState<string>(
    selectedModel?.brandId || brands[0]?.id || 'b_apple'
  );
  const [activeModelId, setActiveModelId] = useState<string>(
    selectedModel?.id || models[0]?.id || 'm_iphone_16_pro_max'
  );

  const currentModel = models.find((m) => m.id === activeModelId) || models[0];

  // Step 2: Case Type & Finish
  const [caseType, setCaseType] = useState<CaseType>('matte');
  const [finish, setFinish] = useState<CaseFinish>('matte');

  // Step 3: Uploaded Artwork
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 4: Custom Typography
  const [customText, setCustomText] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>('serif');
  const [textColor, setTextColor] = useState<string>('#292329');
  const [textSize, setTextSize] = useState<number>(24);
  const [textYPos, setTextYPos] = useState<number>(55); // percentage

  // Image Controls
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [customerNote, setCustomerNote] = useState<string>('');

  // Handle Image Upload with validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 15MB
    if (file.size > 15 * 1024 * 1024) {
      showToast(
        language === 'ar'
          ? 'حجم الملف كبير جداً! الحد الأقصى 15 ميجابايت'
          : 'File too large! Maximum allowed is 15MB'
      );
      return;
    }

    // Supported formats
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast(
        language === 'ar'
          ? 'صيغة غير مدعومة! يرجى رفع ملف JPG أو PNG أو WEBP'
          : 'Unsupported format! Please upload JPG, PNG or WEBP'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      showToast(language === 'ar' ? 'تم رفع الصورة بنجاح!' : 'Artwork uploaded!');
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setCustomText('');
    setZoom(100);
    setRotation(0);
    showToast(language === 'ar' ? 'تمت إعادة ضبط التصميم' : 'Design reset');
  };

  // Step 6: Save & Add to Cart
  const handleSaveAndAddToCart = () => {
    const designPayload: CustomDesignPayload = {
      brandId: activeBrandId,
      phoneModelId: activeModelId,
      phoneModelName: currentModel.name,
      caseType,
      finish,
      uploadedImageUrl: uploadedImage || undefined,
      text: customText || undefined,
      fontFamily,
      textColor,
      textSize,
      textYPosition: textYPos,
      zoom,
      rotation,
      previewUrl: uploadedImage || '/assets/logo.jpg',
      customerNote
    };

    addToCart({
      itemType: 'custom',
      customDesign: designPayload,
      selectedModelId: activeModelId,
      selectedModelName: currentModel.name,
      selectedCaseType: caseType,
      selectedFinish: finish,
      quantity: 1,
      price: 399,
      originalPrice: 480
    });

    router.push('/cart');
  };

  const fonts = [
    { id: 'serif', name: 'Editorial Serif', className: 'font-serif' },
    { id: 'sans', name: 'Modern Clean Sans', className: 'font-sans' },
    { id: 'mono', name: 'Minimal Monospace', className: 'font-mono' },
    { id: 'cursive', name: 'Signature Handwritten', className: 'italic font-serif' }
  ];

  const colors = [
    { id: '#292329', name: 'Noir Black', hex: '#292329' },
    { id: '#FFFFFF', name: 'Pure White', hex: '#FFFFFF' },
    { id: '#D982A5', name: 'TK Pink', hex: '#D982A5' },
    { id: '#EFA6C1', name: 'Blush Pink', hex: '#EFA6C1' },
    { id: '#D4AF37', name: 'Metallic Gold', hex: '#D4AF37' },
    { id: '#817780', name: 'Muted Slate', hex: '#817780' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Studio Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'استوديو التصميم الحي 2026' : 'Interactive Studio 2026'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'فكرتك. كفرك.' : 'Your Idea. Your Case.'}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'صمّم كفر هاتفك بدقة وحرية كاملة مع معاينة فورية لأبعاد ومكان كاميرا جهازك بالضبط.'
              : 'Create a bespoke phone case with real device aspect ratios, camera cutouts, and live preview.'}
          </p>
        </div>

        {/* 2-Column Studio: Left Preview Canvas / Right Tooling Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Phone Case Preview Stage */}
          <div className="lg:col-span-5 flex flex-col items-center sticky top-28">
            <div className="relative w-full max-w-sm aspect-[1/2] rounded-[3.2rem] bg-gradient-to-b from-[#FDF2F6] to-[#FCE7F0] p-4 shadow-2xl border-4 border-white flex flex-col justify-between overflow-hidden">
              
              {/* Outer Edge Case Bezel */}
              <div
                className={`relative w-full h-full rounded-[2.6rem] overflow-hidden flex flex-col justify-between transition-colors shadow-inner ${
                  caseType === 'matte'
                    ? 'bg-[#F9EFF3]'
                    : caseType === 'glossy'
                    ? 'bg-gradient-to-tr from-[#FFF5F8] via-white to-[#FCEEF4]'
                    : 'bg-white/40 backdrop-blur-md border border-neutral-300'
                }`}
              >
                {/* 1. Camera Cutout Template based on device camera layout */}
                <div
                  className={`absolute top-4 z-30 bg-[#292329] p-2 rounded-2xl shadow-md flex items-center justify-center ${
                    currentModel.cameraLayout === 'traffic-light'
                      ? 'start-4 w-9 h-28 flex-col gap-2 rounded-xl'
                      : currentModel.cameraLayout === 'center-circle'
                      ? 'start-1/2 -translate-x-1/2 w-20 h-20 rounded-full'
                      : currentModel.cameraLayout === 'pill-vertical'
                      ? 'start-4 w-9 h-18 flex-col gap-2 rounded-2xl'
                      : 'start-4 w-15 h-15 rounded-3xl flex-wrap gap-1.5' // default: square-triple (iPhone Pro)
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 shadow-inner" />
                  <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 shadow-inner" />
                  {currentModel.cameraLayout === 'square-triple' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-neutral-700 shadow-inner" />
                  )}
                </div>

                {/* 2. Uploaded Artwork Layer (Scalable, Rotatable) */}
                {uploadedImage ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                    <img
                      src={uploadedImage}
                      alt="Custom Artwork Preview"
                      style={{
                        transform: `scale(${zoom / 100}) rotate(${rotation}deg)`
                      }}
                      className="w-full h-full object-cover transition-transform duration-100"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 text-[#817780]">
                    <Upload className="w-8 h-8 text-[#D982A5] mb-2 opacity-50" />
                    <span className="text-xs font-bold text-[#292329]">
                      {language === 'ar' ? 'منطقة الطباعة المخصصة' : 'Custom Printable Canvas'}
                    </span>
                    <span className="text-[10px] mt-1 text-[#817780]">
                      {language === 'ar' ? 'ارفع صورة أو أضف نصاً للبدء' : 'Upload artwork or add text'}
                    </span>
                  </div>
                )}

                {/* 3. Custom Text Overlay Layer */}
                {customText && (
                  <div
                    className="absolute inset-x-4 z-20 text-center pointer-events-none transition-all drop-shadow-sm px-2"
                    style={{
                      top: `${textYPos}%`,
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <span
                      style={{
                        color: textColor,
                        fontSize: `${textSize}px`
                      }}
                      className={`font-black break-words leading-tight ${
                        fontFamily === 'serif'
                          ? 'font-serif'
                          : fontFamily === 'mono'
                          ? 'font-mono'
                          : fontFamily === 'cursive'
                          ? 'italic font-serif'
                          : 'font-sans'
                      }`}
                    >
                      {customText}
                    </span>
                  </div>
                )}

                {/* 4. Bottom Official Brand Tag */}
                <div className="absolute bottom-3 inset-x-0 z-30 text-center">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#292329]/40">
                    TK-PRINT • {currentModel.name}
                  </span>
                </div>

              </div>
            </div>

            {/* Canvas Controls: Zoom, Rotate, Reset */}
            <div className="mt-4 flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-[#F0E4E9] soft-shadow text-xs font-bold">
              <button
                onClick={() => setZoom((prev) => Math.max(50, prev - 10))}
                className="p-1.5 rounded-lg hover:bg-[#FFF0F4] text-[#817780] hover:text-[#292329]"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[#292329] font-mono min-w-[3rem] text-center">{zoom}%</span>
              <button
                onClick={() => setZoom((prev) => Math.min(200, prev + 10))}
                className="p-1.5 rounded-lg hover:bg-[#FFF0F4] text-[#817780] hover:text-[#292329]"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-neutral-200 mx-1" />

              <button
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="p-1.5 rounded-lg hover:bg-[#FFF0F4] text-[#817780] hover:text-[#292329]"
                title="Rotate 90deg"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg hover:bg-[#FFF0F4] text-[#817780] hover:text-[#D982A5]"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quality Disclaimer */}
            <p className="text-[11px] text-[#817780] text-center mt-3 max-w-xs leading-relaxed">
              ⚠️ {language === 'ar'
                ? 'ملاحظة: قد تختلف ألوان الطباعة بنسبة طفيفة عن شاشات الهواتف بسبب طبيعة الأحبار وطريقة العرض.'
                : 'Note: Screen display colors may vary slightly from printed inks.'}
            </p>
          </div>

          {/* RIGHT: Step-by-Step Customization Tooling */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow space-y-8">
            
            {/* STEP 1: Choose Device */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#D982A5] text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="font-black text-base text-[#292329]">
                  {language === 'ar' ? 'اختر موديل هاتفك' : 'Choose Your Device'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Brand Selector */}
                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1">
                    {language === 'ar' ? 'الماركة' : 'Brand'}
                  </label>
                  <select
                    value={activeBrandId}
                    onChange={(e) => setActiveBrandId(e.target.value)}
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2.5 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model Selector */}
                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1">
                    {language === 'ar' ? 'الموديل الدقيق' : 'Exact Model'}
                  </label>
                  <select
                    value={activeModelId}
                    onChange={(e) => {
                      const mId = e.target.value;
                      setActiveModelId(mId);
                      const m = models.find((mod) => mod.id === mId) || null;
                      if (m) setSelectedModel(m);
                    }}
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2.5 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                  >
                    {models
                      .filter((m) => m.brandId === activeBrandId)
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 2: Choose Case Type & Finish */}
            <div className="pt-4 border-t border-[#F0E4E9]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#D982A5] text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="font-black text-base text-[#292329]">
                  {language === 'ar' ? 'نوع الكفر والملمس' : 'Case Type & Texture'}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'matte', nameEn: 'Velvet Matte', nameAr: 'مات مخملي', desc: 'Anti-fingerprint' },
                  { id: 'glossy', nameEn: 'Ultra Glossy', nameAr: 'لامع أنيق', desc: 'Vibrant shine' },
                  { id: 'transparent', nameEn: 'Anti-Yellow Clear', nameAr: 'شفاف مقاوم للإصفرار', desc: 'High clarity' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCaseType(item.id as CaseType)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      caseType === item.id
                        ? 'border-[#D982A5] bg-[#FFF0F4] text-[#D982A5] font-black shadow-xs'
                        : 'border-[#F0E4E9] bg-white text-[#292329] hover:bg-[#FFF8FA]'
                    }`}
                  >
                    <span className="text-xs font-bold">{language === 'ar' ? item.nameAr : item.nameEn}</span>
                    <span className="text-[10px] text-[#817780] mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: Upload Artwork */}
            <div className="pt-4 border-t border-[#F0E4E9]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#D982A5] text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="font-black text-base text-[#292329]">
                  {language === 'ar' ? 'ارفع تصميمك أو صورتك' : 'Upload Artwork / Photo'}
                </h3>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-[#F0E4E9] hover:border-[#D982A5] bg-[#FFF8FA] hover:bg-[#FFF0F4] rounded-2xl p-6 text-center transition-colors"
              >
                <Upload className="w-8 h-8 mx-auto text-[#D982A5] mb-2" />
                <span className="text-xs font-bold text-[#292329] block">
                  {language === 'ar' ? 'اضغط لاختيار صورة من جهازك' : 'Click to browse files (JPG, PNG, WEBP)'}
                </span>
                <span className="text-[10px] text-[#817780] mt-1 block">
                  {language === 'ar' ? 'أقصى حجم 15 ميجابايت بدقة عالية' : 'Up to 15MB. High resolution recommended.'}
                </span>
              </div>
            </div>

            {/* STEP 4: Add Custom Text & Typography */}
            <div className="pt-4 border-t border-[#F0E4E9]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#D982A5] text-white text-xs font-black flex items-center justify-center">
                  4
                </span>
                <h3 className="font-black text-base text-[#292329]">
                  {language === 'ar' ? 'أضف اسماً أو عبارة مخصصة' : 'Add Custom Typography'}
                </h3>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'اكتب اسمك أو عبارتك هنا...' : 'Type your custom name or quote...'}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-4 py-3 text-xs font-bold text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                />

                {/* Font Family Selection */}
                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1.5">
                    {language === 'ar' ? 'نوع الخط' : 'Font Style'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontFamily(f.id)}
                        className={`p-2 rounded-xl text-xs border transition-colors ${
                          fontFamily === f.id
                            ? 'border-[#D982A5] bg-[#FFF0F4] text-[#D982A5] font-black'
                            : 'border-[#F0E4E9] bg-white text-[#292329]'
                        }`}
                      >
                        <span className={f.className}>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color Selection */}
                <div>
                  <label className="text-xs font-bold text-[#817780] block mb-1.5">
                    {language === 'ar' ? 'لون الكتابة' : 'Text Color'}
                  </label>
                  <div className="flex items-center gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setTextColor(c.hex)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          textColor === c.hex ? 'scale-125 border-[#D982A5]' : 'border-neutral-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Vertical Position Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#817780] mb-1">
                    <span>{language === 'ar' ? 'موضع الكتابة عمودياً' : 'Vertical Position'}</span>
                    <span>{textYPos}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    value={textYPos}
                    onChange={(e) => setTextYPos(Number(e.target.value))}
                    className="w-full accent-[#D982A5]"
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions for Print Technician */}
            <div className="pt-4 border-t border-[#F0E4E9]">
              <label className="text-xs font-black text-[#292329] block mb-1.5">
                📝 {language === 'ar' ? 'ملاحظات إضافية لفني الطباعة' : 'Special Instructions for Print Master'}
              </label>
              <textarea
                rows={2}
                placeholder={
                  language === 'ar'
                    ? 'مثال: يرجى جعل ألوان الخلفية أفتح بنسبة بسيطة...'
                    : 'Any special placement or print instructions...'
                }
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl p-3 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
              />
            </div>

            {/* Final CTA Bar */}
            <div className="pt-6 border-t border-[#F0E4E9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#817780] block font-medium">
                  {language === 'ar' ? 'السعر النهائي للطباعة والتخصيص:' : 'Total Bespoke Price:'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#292329]">399 ج.م</span>
                  <span className="text-xs text-[#817780] line-through">480 ج.م</span>
                </div>
              </div>

              <button
                onClick={handleSaveAndAddToCart}
                className="w-full sm:w-auto px-8 py-4 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl shadow-lg soft-shadow pill-button transition-all text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'ar' ? 'حفظ التصميم وإضافته للسلة' : 'Save Design & Add to Cart'}</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
