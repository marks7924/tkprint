'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Play, Pause, Compass, Smartphone, Sparkles, Layers } from 'lucide-react';

interface PhoneCase360ViewerProps {
  artworkUrl?: string | null;
  customNodes?: React.ReactNode;
  caseColor?: string;
  phoneModelName?: string;
  finish?: string;
  className?: string;
}

export const PhoneCase360Viewer: React.FC<PhoneCase360ViewerProps> = ({
  artworkUrl,
  customNodes,
  caseColor = '#FFF5F8',
  phoneModelName = 'iPhone 16 Pro Max',
  finish = 'glossy',
  className = ''
}) => {
  const [rotationY, setRotationY] = useState<number>(180); // Start showing the back cover (180deg)
  const [rotationX, setRotationX] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [currentFinish, setCurrentFinish] = useState<'matte' | 'glossy' | 'holographic'>(
    finish === 'matte' ? 'matte' : finish === 'holographic' ? 'holographic' : 'glossy'
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Auto-spin animation
  useEffect(() => {
    if (!isAutoSpinning) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const animate = () => {
      setRotationY((prev) => (prev + 1) % 360);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoSpinning]);

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    setRotationY((prev) => (prev + deltaX * 0.7 + 360) % 360);
    setRotationX((prev) => Math.max(-25, Math.min(25, prev - deltaY * 0.3)));
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setIsAutoSpinning(false);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    setRotationY((prev) => (prev + deltaX * 0.7 + 360) % 360);
    setRotationX((prev) => Math.max(-25, Math.min(25, prev - deltaY * 0.3)));
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Specular light gloss calculation based on rotation
  const normalizedAngle = ((rotationY % 360) + 360) % 360;
  const glossOpacity = Math.max(0, Math.sin((normalizedAngle * Math.PI) / 180) * 0.45);
  const isBackVisible = normalizedAngle >= 90 && normalizedAngle <= 270;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 360 Degree Indicator Badge */}
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F4] border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5]">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>عرض تفاعلي 360° ثلاثي الأبعاد</span>
          </div>
          <span className="text-[11px] font-bold text-[#817780] bg-white border border-[#F0E4E9] px-2 py-0.5 rounded-md">
            {Math.round(rotationY)}°
          </span>
        </div>

        <button
          onClick={() => setIsAutoSpinning(!isAutoSpinning)}
          className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-[#FFF0F4] border border-[#F0E4E9] rounded-full text-xs font-bold text-[#292329] transition-colors shadow-2xs"
          title="دوران تلقائي"
        >
          {isAutoSpinning ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#D982A5]" />
              <span>إيقاف</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#D982A5]" />
              <span>دوران</span>
            </>
          )}
        </button>
      </div>

      {/* 3D Interactive Stage Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-[4/5] sm:aspect-square max-w-sm rounded-[2.5rem] bg-gradient-to-b from-[#FFF5F8] via-white to-[#FDF0F5] border border-[#F0E4E9] shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden touch-none"
        style={{ perspective: '1200px' }}
      >
        {/* Subtle radial studio floor reflection */}
        <div className="absolute bottom-8 w-48 h-10 rounded-[100%] bg-[#EFA6C1]/20 blur-xl pointer-events-none transform scale-y-50" />

        {/* Floating Rotation Prompt Hint */}
        {!isDragging && !isAutoSpinning && (
          <div className="absolute top-4 inset-x-0 mx-auto w-fit bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full pointer-events-none animate-pulse z-40 flex items-center gap-1.5 shadow-md">
            <RotateCw className="w-3 h-3 text-[#EFA6C1]" />
            <span>اسحب لليمين أو اليسار للتدوير 360°</span>
          </div>
        )}

        {/* 3D ROTATING PHONE CHASSIS */}
        <div
          className="relative w-52 sm:w-60 h-[420px] sm:h-[480px] transition-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
        >
          {/* ============================================================== */}
          {/* BACK FACE: The Custom Printed Phone Case (180deg) */}
          {/* ============================================================== */}
          <div
            className="absolute inset-0 rounded-[2.5rem] p-3 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{
              transform: 'translateZ(10px) rotateY(180deg)',
              backfaceVisibility: 'hidden',
              backgroundColor: caseColor,
              border: '3px solid rgba(255,255,255,0.7)',
              boxShadow: '0 25px 50px -12px rgba(217, 130, 165, 0.35)'
            }}
          >
            {/* Background Artwork Image if uploaded */}
            {artworkUrl && (
              <img
                src={artworkUrl}
                alt="Case Artwork"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}

            {/* Custom Interactive Elements Layer (Images, Text) */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
              {customNodes}
            </div>

            {/* Camera Bevel Island */}
            <div className="relative z-30 w-16 h-16 rounded-[1.3rem] bg-[#1a181b]/95 p-2 self-start flex flex-wrap gap-1.5 shadow-2xl border border-white/20">
              <div className="w-5 h-5 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-800" />
              </div>
              <div className="w-5 h-5 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-800" />
              </div>
              <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                <div className="w-2 h-2 rounded-full bg-black border border-neutral-800" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-200/90 ms-auto shadow-sm" />
            </div>

            {/* Specular Lighting Reflection Overlay */}
            {currentFinish === 'glossy' && (
              <div
                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-150"
                style={{
                  background: `linear-gradient(${normalizedAngle}deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)`,
                  opacity: glossOpacity
                }}
              />
            )}

            {currentFinish === 'holographic' && (
              <div
                className="absolute inset-0 pointer-events-none z-20 mix-blend-color-dodge opacity-60"
                style={{
                  background: `linear-gradient(${normalizedAngle * 2}deg, #EFA6C1, #C8AEE0, #A8E6CF, #FFD3B6, #EFA6C1)`
                }}
              />
            )}

            {/* Case Bottom Brand Tag */}
            <div className="relative z-30 text-center mt-auto pb-1">
              <span className="text-[10px] font-black tracking-widest text-[#292329]/70 bg-white/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs">
                TK-PRINT
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* FRONT FACE: The Phone Screen & Bezel (0deg) */}
          {/* ============================================================== */}
          <div
            className="absolute inset-0 rounded-[2.5rem] bg-black p-2.5 shadow-2xl flex flex-col justify-between overflow-hidden border-2 border-neutral-800"
            style={{
              transform: 'translateZ(-10px)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Dynamic Island / Punch hole camera */}
            <div className="w-20 h-5 rounded-full bg-black border border-neutral-800 mx-auto mt-2 flex items-center justify-end px-2 z-20">
              <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700" />
            </div>

            {/* OLED Screen Wallpaper with TK Logo */}
            <div className="my-auto text-center px-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#EFA6C1]/20 border border-[#EFA6C1]/40 flex items-center justify-center p-1 mb-2">
                <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <p className="text-white text-xs font-black tracking-tight">{phoneModelName}</p>
              <p className="text-[#817780] text-[10px] mt-0.5">TK-PRINT High Shield Case</p>
            </div>

            {/* Home indicator bar */}
            <div className="w-24 h-1 rounded-full bg-neutral-600 mx-auto mb-2" />
          </div>

          {/* ============================================================== */}
          {/* SIDES: 3D Case Bumpers (Left, Right, Top, Bottom) */}
          {/* ============================================================== */}
          {/* Left Bumper (Volume buttons) */}
          <div
            className="absolute top-0 bottom-0 start-0 w-[20px] rounded-l-md"
            style={{
              transformOrigin: 'left',
              transform: 'rotateY(-90deg) translateZ(0px)',
              backgroundColor: caseColor,
              filter: 'brightness(0.85)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            <div className="w-1.5 h-7 bg-neutral-800/80 rounded-r-xs mt-24 mx-auto" />
            <div className="w-1.5 h-7 bg-neutral-800/80 rounded-r-xs mt-3 mx-auto" />
          </div>

          {/* Right Bumper (Power button) */}
          <div
            className="absolute top-0 bottom-0 end-0 w-[20px] rounded-r-md"
            style={{
              transformOrigin: 'right',
              transform: 'rotateY(90deg) translateZ(0px)',
              backgroundColor: caseColor,
              filter: 'brightness(0.9)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            <div className="w-1.5 h-10 bg-neutral-800/80 rounded-l-xs mt-28 mx-auto" />
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="w-full max-w-sm mt-4 space-y-3">
        {/* Angle Slider */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-[#F0E4E9] shadow-2xs">
          <RotateCw className="w-4 h-4 text-[#D982A5] flex-shrink-0" />
          <input
            type="range"
            min="0"
            max="360"
            value={Math.round(rotationY)}
            onChange={(e) => {
              setIsAutoSpinning(false);
              setRotationY(Number(e.target.value));
            }}
            className="w-full h-1.5 bg-[#FFF0F4] rounded-lg appearance-none cursor-pointer accent-[#D982A5]"
          />
          <span className="text-xs font-bold text-[#292329] w-10 text-center flex-shrink-0">
            {Math.round(rotationY)}°
          </span>
        </div>

        {/* Quick Angle Presets */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: 'الواجهة', angle: 0 },
            { label: 'زاوية 45°', angle: 225 },
            { label: 'الكفر الخلفي', angle: 180 },
            { label: 'الجانب', angle: 90 }
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setIsAutoSpinning(false);
                setRotationY(preset.angle);
                setRotationX(0);
              }}
              className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                Math.round(rotationY) === preset.angle
                  ? 'bg-[#D982A5] text-white border-[#D982A5] shadow-xs'
                  : 'bg-white text-[#292329] border-[#F0E4E9] hover:bg-[#FFF0F4]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Finish Selector */}
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-[#F0E4E9] text-xs font-bold">
          <span className="text-[#817780] ms-2">ملمس الكفر:</span>
          <div className="flex items-center gap-1">
            {[
              { id: 'glossy', label: 'لامع (Glossy)' },
              { id: 'matte', label: 'مطفي (Matte)' },
              { id: 'holographic', label: 'هولوجرام' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setCurrentFinish(f.id as any)}
                className={`px-2.5 py-1 rounded-xl transition-colors ${
                  currentFinish === f.id
                    ? 'bg-[#FFF0F4] text-[#D982A5] font-black border border-[#EFA6C1]/50'
                    : 'text-[#817780] hover:text-[#292329]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
