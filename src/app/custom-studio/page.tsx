'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { PhoneCase360Viewer } from '@/components/PhoneCase360Viewer';
import { CaseType, CaseFinish, CustomDesignPayload } from '@/types/tk-print';
import {
  Upload,
  Type,
  RotateCw,
  Plus,
  Trash2,
  Move,
  Layers,
  ZoomIn,
  ZoomOut,
  ShoppingBag,
  Sparkles,
  Compass,
  Check,
  Smartphone,
  Eye,
  Sliders,
  Maximize2
} from 'lucide-react';

interface CustomImageLayer {
  id: string;
  url: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  scale: number; // 0.2 - 2.5
  rotation: number; // 0 - 360
}

interface CustomTextLayer {
  id: string;
  text: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  size: number; // font size in px
  fontFamily: string;
  color: string;
  rotation: number;
}

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

  // Mode: 2D Customizer vs 360° 3D Interactive View
  const [viewMode, setViewMode] = useState<'2d' | '360'>('2d');

  // Step 1: Device Selection
  const [activeBrandId, setActiveBrandId] = useState<string>(
    selectedModel?.brandId || brands[0]?.id || 'b_apple'
  );
  const [activeModelId, setActiveModelId] = useState<string>(
    selectedModel?.id || models[0]?.id || 'm_iphone_16_pro_max'
  );
  const currentModel = models.find((m) => m.id === activeModelId) || models[0];

  // Step 2: Case Color & Finish
  const [caseColor, setCaseColor] = useState<string>('#FFF5F8');
  const [caseType, setCaseType] = useState<CaseType>('matte');
  const [finish, setFinish] = useState<CaseFinish>('glossy');

  // Step 3: Multi-Image Layers
  const [imageLayers, setImageLayers] = useState<CustomImageLayer[]>([
    {
      id: 'default_img_1',
      url: '/assets/logo.jpg',
      x: 50,
      y: 42,
      scale: 0.8,
      rotation: 0
    }
  ]);
  const [activeImageId, setActiveImageId] = useState<string>('default_img_1');

  // Step 4: Multi-Text Layers
  const [textLayers, setTextLayers] = useState<CustomTextLayer[]>([
    {
      id: 'default_txt_1',
      text: 'good vibes only ♡',
      x: 50,
      y: 65,
      size: 22,
      fontFamily: 'serif',
      color: '#292329',
      rotation: 0
    }
  ]);
  const [activeTextId, setActiveTextId] = useState<string | null>('default_txt_1');

  // Active Tool Tab
  const [activeTab, setActiveTab] = useState<'images' | 'text' | 'case'>('images');
  const [customerNote, setCustomerNote] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Dragging State
  const [draggingTarget, setDraggingTarget] = useState<{
    type: 'image' | 'text';
    id: string;
  } | null>(null);

  // Add New Image
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      showToast(
        language === 'ar'
          ? 'حجم الملف كبير جداً! الحد الأقصى 15 ميجابايت'
          : 'File too large! Maximum allowed is 15MB'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newImg: CustomImageLayer = {
        id: `img_${Date.now()}`,
        url: event.target?.result as string,
        x: 50,
        y: 45,
        scale: 0.9,
        rotation: 0
      };
      setImageLayers((prev) => [...prev, newImg]);
      setActiveImageId(newImg.id);
      setActiveTab('images');
      showToast(language === 'ar' ? 'تمت إضافة الصورة إلى الكفر!' : 'Image added to case!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Add New Text Layer
  const handleAddText = () => {
    const newTxt: CustomTextLayer = {
      id: `txt_${Date.now()}`,
      text: language === 'ar' ? 'نص جديد' : 'New Text',
      x: 50,
      y: 50,
      size: 24,
      fontFamily: 'sans',
      color: '#292329',
      rotation: 0
    };
    setTextLayers((prev) => [...prev, newTxt]);
    setActiveTextId(newTxt.id);
    setActiveTab('text');
  };

  // Canvas Mouse & Touch Dragging for positioning elements
  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingTarget || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));

    if (draggingTarget.type === 'image') {
      setImageLayers((prev) =>
        prev.map((img) => (img.id === draggingTarget.id ? { ...img, x, y } : img))
      );
    } else if (draggingTarget.type === 'text') {
      setTextLayers((prev) =>
        prev.map((txt) => (txt.id === draggingTarget.id ? { ...txt, x, y } : txt))
      );
    }
  };

  const handlePointerUp = () => {
    setDraggingTarget(null);
  };

  // Active Image and Text Layer references
  const currentImageLayer = imageLayers.find((img) => img.id === activeImageId);
  const currentTextLayer = textLayers.find((txt) => txt.id === activeTextId);

  // Render elements overlay node for 2D canvas and 360 3D viewer
  const renderCustomElements = () => (
    <>
      {/* Images Layer */}
      {imageLayers.map((img) => {
        const isSelected = img.id === activeImageId;
        return (
          <div
            key={img.id}
            onPointerDown={(e) => {
              e.stopPropagation();
              setActiveImageId(img.id);
              setActiveTextId(null);
              setDraggingTarget({ type: 'image', id: img.id });
            }}
            style={{
              position: 'absolute',
              left: `${img.x}%`,
              top: `${img.y}%`,
              transform: `translate(-50%, -50%) rotate(${img.rotation}deg) scale(${img.scale})`,
              cursor: 'move',
              zIndex: isSelected ? 20 : 10
            }}
            className={`group select-none touch-none ${
              isSelected ? 'ring-2 ring-[#D982A5] ring-offset-2 rounded-lg' : ''
            }`}
          >
            <img
              src={img.url}
              alt="Custom Layer"
              className="max-w-[180px] max-h-[180px] object-contain pointer-events-none rounded-md"
              draggable={false}
            />
          </div>
        );
      })}

      {/* Text Layers */}
      {textLayers.map((txt) => {
        const isSelected = txt.id === activeTextId;
        return (
          <div
            key={txt.id}
            onPointerDown={(e) => {
              e.stopPropagation();
              setActiveTextId(txt.id);
              setActiveImageId('');
              setDraggingTarget({ type: 'text', id: txt.id });
            }}
            style={{
              position: 'absolute',
              left: `${txt.x}%`,
              top: `${txt.y}%`,
              transform: `translate(-50%, -50%) rotate(${txt.rotation}deg)`,
              color: txt.color,
              fontSize: `${txt.size}px`,
              cursor: 'move',
              zIndex: isSelected ? 25 : 15
            }}
            className={`select-none touch-none whitespace-nowrap px-2 py-1 leading-tight text-center ${
              txt.fontFamily === 'serif'
                ? 'font-serif italic'
                : txt.fontFamily === 'mono'
                ? 'font-mono'
                : txt.fontFamily === 'cursive'
                ? 'italic font-semibold'
                : 'font-sans font-bold'
            } ${isSelected ? 'border border-dashed border-[#D982A5] bg-white/40 backdrop-blur-xs rounded-md shadow-xs' : ''}`}
          >
            {txt.text}
          </div>
        );
      })}
    </>
  );

  // Add Custom Case to Cart
  const handleAddToCart = () => {
    if (imageLayers.length === 0 && textLayers.length === 0) {
      showToast(language === 'ar' ? 'يرجى إضافة صورة أو نص للكفر!' : 'Please add an image or text!');
      return;
    }

    addToCart({
      itemType: 'custom',
      selectedModelId: currentModel.id,
      selectedModelName: currentModel.name,
      selectedCaseType: caseType,
      selectedFinish: finish,
      quantity: 1,
      price: 349,
      originalPrice: 399,
      customDesign: {
        id: `design_${Date.now()}`,
        brandId: activeBrandId,
        phoneModelId: currentModel.id,
        phoneModelName: currentModel.name,
        caseType,
        finish,
        uploadedImageUrl: imageLayers[0]?.url || undefined,
        text: textLayers.map((t) => t.text).join(' | '),
        customerNote: `${customerNote ? customerNote + ' | ' : ''}Layers: ${imageLayers.length} imgs, ${textLayers.length} texts`
      }
    });

    showToast(
      language === 'ar'
        ? `تمت إضافة تصميمك المخصص لهاتف ${currentModel.name} إلى السلة!`
        : `Custom case for ${currentModel.name} added to cart!`
    );

    router.push('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Clean Page Title (No pill badge) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'استوديو التصميم المخصص' : 'Custom Case Studio'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'أضف صورك المفضلة، تحكم في مقاسها ومكانها بدقة، أضف نصوصك الخاصة، وشاهد كفرك في عرض 360° تفاعلي ثلاثي الأبعاد.'
              : 'Add multiple photos, resize and reposition them freely, customize typography, and inspect your case in real-time 360° 3D.'}
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: INTERACTIVE CANVAS OR 360 3D VIEWER */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* View Mode Toggle Switcher */}
            <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#F0E4E9] rounded-2xl shadow-xs mb-4">
              <button
                onClick={() => setViewMode('2d')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === '2d'
                    ? 'bg-[#D982A5] text-white shadow-xs'
                    : 'text-[#817780] hover:text-[#292329]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'استوديو التعديل الحي' : '2D Customizer'}</span>
              </button>

              <button
                onClick={() => setViewMode('360')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === '360'
                    ? 'bg-[#D982A5] text-white shadow-xs'
                    : 'text-[#817780] hover:text-[#292329]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{language === 'ar' ? 'معاينة 360° ثلاثية الأبعاد' : '360° 3D Preview'}</span>
              </button>
            </div>

            {/* View Mode 1: 2D Interactive Drag & Drop Studio Canvas */}
            {viewMode === '2d' ? (
              <div className="w-full flex flex-col items-center">
                <div
                  ref={canvasRef}
                  onPointerMove={handleCanvasPointerMove}
                  onPointerUp={handlePointerUp}
                  className="relative w-64 sm:w-72 h-[460px] sm:h-[500px] rounded-[2.6rem] shadow-2xl p-3 border-4 border-white flex flex-col justify-between overflow-hidden select-none touch-none"
                  style={{
                    backgroundColor: caseColor,
                    boxShadow: '0 25px 50px -12px rgba(217, 130, 165, 0.35)'
                  }}
                >
                  {/* Camera cutout */}
                  <div className="relative z-30 w-16 h-16 rounded-[1.3rem] bg-[#1a181b]/95 p-2 self-start flex flex-wrap gap-1.5 shadow-2xl border border-white/20 pointer-events-none">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-800" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-800" />
                    </div>
                    <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black border border-neutral-800" />
                    </div>
                  </div>

                  {/* Dynamic Elements (Images + Text Layers) */}
                  <div className="absolute inset-0 overflow-hidden">{renderCustomElements()}</div>

                  {/* Case bottom branding */}
                  <div className="relative z-30 text-center mt-auto pb-1 pointer-events-none">
                    <span className="text-[10px] font-black tracking-widest text-[#292329]/60 bg-white/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      TK-PRINT
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-[#817780] font-medium flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-[#D982A5]" />
                  <span>
                    {language === 'ar'
                      ? 'اسحب أي صورة أو نص بإصبعك لتغيير مكانه بحرية على الكفر'
                      : 'Drag any photo or text to reposition it anywhere on the case'}
                  </span>
                </p>
              </div>
            ) : (
              /* View Mode 2: Full 360° Interactive 3D Case Spinner */
              <PhoneCase360Viewer
                customNodes={renderCustomElements()}
                caseColor={caseColor}
                phoneModelName={currentModel.name}
                finish={finish}
                className="w-full"
              />
            )}
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: POWERFUL CUSTOMIZATION TOOLBOX */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4E9] soft-shadow-lg space-y-6">
            
            {/* 1. Phone Model Selector */}
            <div className="pb-5 border-b border-[#F0E4E9]">
              <label className="text-xs font-black text-[#292329] block mb-2">
                {language === 'ar' ? '1. اختر نوع وموديل هاتفك:' : '1. Select Your Device:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={activeBrandId}
                  onChange={(e) => setActiveBrandId(e.target.value)}
                  className="bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold text-[#292329] focus:outline-none"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>

                <select
                  value={activeModelId}
                  onChange={(e) => {
                    setActiveModelId(e.target.value);
                    const m = models.find((mod) => mod.id === e.target.value);
                    if (m) setSelectedModel(m);
                  }}
                  className="bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold text-[#292329] focus:outline-none"
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

            {/* 2. Toolbox Tabs: Images / Text / Case Settings */}
            <div className="flex items-center gap-2 border-b border-[#F0E4E9] pb-3">
              {[
                { id: 'images', label: language === 'ar' ? 'الصور والتصاميم' : 'Photos', icon: Upload },
                { id: 'text', label: language === 'ar' ? 'النصوص والخطوط' : 'Typography', icon: Type },
                { id: 'case', label: language === 'ar' ? 'لون ونوع الكفر' : 'Case Options', icon: Smartphone }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#FFF0F4] text-[#D982A5] border border-[#EFA6C1]/50'
                        : 'text-[#817780] hover:text-[#292329]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: MULTIPLE IMAGES CONTROLS */}
            {activeTab === 'images' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#292329]">
                    {language === 'ar' ? 'الصور المضافة على الكفر:' : 'Case Photos:'} ({imageLayers.length})
                  </span>

                  {/* Add Image Trigger Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D982A5] hover:bg-[#c46b90] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إضافة صورة جديدة' : 'Add New Photo'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Thumbnails of All Image Layers */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {imageLayers.map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => setActiveImageId(img.id)}
                      className={`relative w-14 h-14 rounded-xl border-2 overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                        activeImageId === img.id
                          ? 'border-[#D982A5] scale-105 shadow-xs'
                          : 'border-[#F0E4E9] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="Layer" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Controls for the Selected Active Image */}
                {currentImageLayer ? (
                  <div className="bg-[#FFF8FA] p-4 rounded-2xl border border-[#F0E4E9] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#D982A5]">
                        {language === 'ar' ? 'تعديل الصورة المحددة' : 'Active Image Controls'}
                      </span>
                      <button
                        onClick={() => {
                          setImageLayers((prev) => prev.filter((img) => img.id !== currentImageLayer.id));
                          if (imageLayers.length > 1) {
                            setActiveImageId(imageLayers.find((i) => i.id !== currentImageLayer.id)?.id || '');
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'حذف الصورة' : 'Delete'}</span>
                      </button>
                    </div>

                    {/* Scale / Resize Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#292329] mb-1">
                        <span>{language === 'ar' ? 'تكبير وتصغير الصورة:' : 'Resize Image:'}</span>
                        <span>{Math.round(currentImageLayer.scale * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ZoomOut className="w-4 h-4 text-[#817780]" />
                        <input
                          type="range"
                          min="0.2"
                          max="2.5"
                          step="0.05"
                          value={currentImageLayer.scale}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setImageLayers((prev) =>
                              prev.map((img) =>
                                img.id === currentImageLayer.id ? { ...img, scale: val } : img
                              )
                            );
                          }}
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#D982A5]"
                        />
                        <ZoomIn className="w-4 h-4 text-[#817780]" />
                      </div>
                    </div>

                    {/* Rotation Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#292329] mb-1">
                        <span>{language === 'ar' ? 'تدوير الصورة:' : 'Rotate Image:'}</span>
                        <span>{currentImageLayer.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={currentImageLayer.rotation}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setImageLayers((prev) =>
                            prev.map((img) =>
                              img.id === currentImageLayer.id ? { ...img, rotation: val } : img
                            )
                          );
                        }}
                        className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#D982A5]"
                      />
                    </div>

                    {/* Quick Alignment Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setImageLayers((prev) =>
                            prev.map((img) =>
                              img.id === currentImageLayer.id ? { ...img, x: 50, y: 50 } : img
                            )
                          );
                        }}
                        className="flex-1 py-1.5 bg-white border border-[#F0E4E9] rounded-xl text-xs font-bold text-[#292329] hover:bg-[#FFF0F4]"
                      >
                        {language === 'ar' ? 'توسيط في المنتصف' : 'Center Image'}
                      </button>
                      <button
                        onClick={() => {
                          setImageLayers((prev) =>
                            prev.map((img) =>
                              img.id === currentImageLayer.id
                                ? { ...img, rotation: (img.rotation + 90) % 360 }
                                : img
                            )
                          );
                        }}
                        className="flex-1 py-1.5 bg-white border border-[#F0E4E9] rounded-xl text-xs font-bold text-[#292329] hover:bg-[#FFF0F4]"
                      >
                        {language === 'ar' ? 'تدوير 90°' : 'Rotate 90°'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#817780] text-center py-4">
                    {language === 'ar' ? 'لا توجد صور مضافة حالياً.' : 'No images added yet.'}
                  </p>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: MULTIPLE TEXT CONTROLS */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#292329]">
                    {language === 'ar' ? 'النصوص المضافة:' : 'Typography Layers:'} ({textLayers.length})
                  </span>
                  <button
                    onClick={handleAddText}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D982A5] hover:bg-[#c46b90] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إضافة نص جديد' : 'Add Text'}</span>
                  </button>
                </div>

                {/* Text Layers Selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {textLayers.map((txt, idx) => (
                    <button
                      key={txt.id}
                      onClick={() => setActiveTextId(txt.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex-shrink-0 ${
                        activeTextId === txt.id
                          ? 'bg-[#D982A5] text-white border-[#D982A5]'
                          : 'bg-white text-[#292329] border-[#F0E4E9]'
                      }`}
                    >
                      {txt.text.slice(0, 12) || `#${idx + 1}`}
                    </button>
                  ))}
                </div>

                {/* Controls for Active Text Layer */}
                {currentTextLayer ? (
                  <div className="bg-[#FFF8FA] p-4 rounded-2xl border border-[#F0E4E9] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#D982A5]">
                        {language === 'ar' ? 'تعديل النص المحدد' : 'Edit Text'}
                      </span>
                      <button
                        onClick={() => {
                          setTextLayers((prev) => prev.filter((txt) => txt.id !== currentTextLayer.id));
                          if (textLayers.length > 1) {
                            setActiveTextId(textLayers.find((t) => t.id !== currentTextLayer.id)?.id || null);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'حذف النص' : 'Delete'}</span>
                      </button>
                    </div>

                    {/* Text Input */}
                    <div>
                      <label className="text-xs font-bold text-[#292329] block mb-1">
                        {language === 'ar' ? 'محتوى النص:' : 'Text Content:'}
                      </label>
                      <input
                        type="text"
                        value={currentTextLayer.text}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTextLayers((prev) =>
                            prev.map((txt) =>
                              txt.id === currentTextLayer.id ? { ...txt, text: val } : txt
                            )
                          );
                        }}
                        className="w-full bg-white border border-[#F0E4E9] rounded-xl px-3 py-2 text-sm font-bold text-[#292329] focus:outline-none"
                      />
                    </div>

                    {/* Text Size Slider (Resize Text) */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#292329] mb-1">
                        <span>{language === 'ar' ? 'حجم الخط (تكبير/تصغير):' : 'Resize Text Size:'}</span>
                        <span>{currentTextLayer.size}px</span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max="52"
                        value={currentTextLayer.size}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setTextLayers((prev) =>
                            prev.map((txt) =>
                              txt.id === currentTextLayer.id ? { ...txt, size: val } : txt
                            )
                          );
                        }}
                        className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#D982A5]"
                      />
                    </div>

                    {/* Font Family Selector */}
                    <div>
                      <label className="text-xs font-bold text-[#292329] block mb-1">
                        {language === 'ar' ? 'نوع الخط:' : 'Font Style:'}
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { id: 'sans', label: 'عصري' },
                          { id: 'serif', label: 'كلاسيكي' },
                          { id: 'cursive', label: 'إنسيابي' },
                          { id: 'mono', label: 'رقمي' }
                        ].map((f) => (
                          <button
                            key={f.id}
                            onClick={() => {
                              setTextLayers((prev) =>
                                prev.map((txt) =>
                                  txt.id === currentTextLayer.id ? { ...txt, fontFamily: f.id } : txt
                                )
                              );
                            }}
                            className={`py-1.5 text-xs font-bold rounded-xl border transition-colors ${
                              currentTextLayer.fontFamily === f.id
                                ? 'bg-[#D982A5] text-white border-[#D982A5]'
                                : 'bg-white text-[#292329] border-[#F0E4E9]'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Palette */}
                    <div>
                      <label className="text-xs font-bold text-[#292329] block mb-1">
                        {language === 'ar' ? 'لون الخط:' : 'Text Color:'}
                      </label>
                      <div className="flex items-center gap-2">
                        {['#292329', '#FFFFFF', '#D982A5', '#EFA6C1', '#817780', '#C8AEE0', '#E53E3E'].map(
                          (col) => (
                            <button
                              key={col}
                              onClick={() => {
                                setTextLayers((prev) =>
                                  prev.map((txt) =>
                                    txt.id === currentTextLayer.id ? { ...txt, color: col } : txt
                                  )
                                );
                              }}
                              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                                currentTextLayer.color === col
                                  ? 'scale-110 border-[#D982A5] shadow-xs'
                                  : 'border-white shadow-2xs'
                              }`}
                              style={{ backgroundColor: col }}
                            />
                          )
                        )}
                        <input
                          type="color"
                          value={currentTextLayer.color}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTextLayers((prev) =>
                              prev.map((txt) =>
                                txt.id === currentTextLayer.id ? { ...txt, color: val } : txt
                              )
                            );
                          }}
                          className="w-7 h-7 rounded-full cursor-pointer bg-transparent border-0"
                          title="اختر لوناً مخصصاً"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#817780] text-center py-4">
                    {language === 'ar' ? 'لا توجد نصوص مضافة.' : 'No text layers yet.'}
                  </p>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: CASE COLOR & FINISH */}
            {activeTab === 'case' && (
              <div className="space-y-4">
                {/* Case Base Color */}
                <div>
                  <label className="text-xs font-black text-[#292329] block mb-2">
                    {language === 'ar' ? 'لون قاعدة الكفر:' : 'Case Base Color:'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[
                      { col: '#FFF5F8', label: 'وردي ناعم' },
                      { col: '#FDF9F5', label: 'كريمي' },
                      { col: '#FFFFFF', label: 'أبيض ناصع' },
                      { col: '#1a181b', label: 'أسود فحمي' },
                      { col: '#D4BEDF', label: 'لافندر' }
                    ].map((item) => (
                      <button
                        key={item.col}
                        onClick={() => setCaseColor(item.col)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          caseColor === item.col ? 'scale-110 border-[#D982A5] shadow-md' : 'border-neutral-200'
                        }`}
                        style={{ backgroundColor: item.col }}
                        title={item.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Case Finish */}
                <div>
                  <label className="text-xs font-black text-[#292329] block mb-2">
                    {language === 'ar' ? 'الملمس والإنهاء:' : 'Finish:'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'glossy', label: language === 'ar' ? 'لامع (Glossy)' : 'Glossy' },
                      { id: 'matte', label: language === 'ar' ? 'مطفي (Matte)' : 'Matte' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFinish(f.id as CaseFinish)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors ${
                          finish === f.id
                            ? 'bg-[#FFF0F4] text-[#D982A5] border-[#EFA6C1]'
                            : 'bg-white text-[#292329] border-[#F0E4E9]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions Note */}
                <div>
                  <label className="text-xs font-black text-[#292329] block mb-1">
                    {language === 'ar' ? 'ملاحظات إضافية للطباعة (اختياري):' : 'Special Instructions:'}
                  </label>
                  <textarea
                    rows={2}
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder={
                      language === 'ar'
                        ? 'اكتب أي ملاحظة خاصة بفريق الطباعة والتجهيز...'
                        : 'Any custom notes for the print technicians...'
                    }
                    className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl p-3 text-xs text-[#292329] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Price & Action Button */}
            <div className="pt-4 border-t border-[#F0E4E9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#817780] block font-semibold">
                  {language === 'ar' ? 'السعر الإجمالي شامل الطباعة:' : 'Total Custom Price:'}
                </span>
                <span className="text-2xl font-black text-[#292329]">
                  349 <span className="text-xs text-[#D982A5] font-bold">ج.م</span>
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D982A5] hover:bg-[#c46b90] text-white font-bold rounded-2xl shadow-md soft-shadow transition-all text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'ar' ? 'إضافة للسلة والطلب' : 'Add Custom to Cart'}</span>
              </button>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
