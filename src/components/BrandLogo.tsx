'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  asLink?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  asLink = true
}) => {
  const sizeConfig = {
    sm: { imgClass: 'h-8 w-8', px: 32 },
    md: { imgClass: 'h-11 w-11', px: 44 },
    lg: { imgClass: 'h-16 w-16', px: 64 }
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  const content = (
    <>
      <div className="relative overflow-hidden rounded-xl shadow-sm border border-[#EFA6C1]/30 bg-[#EFA6C1] flex items-center justify-center p-0.5 transition-transform group-hover:scale-105 flex-shrink-0">
        <img
          src="/assets/logo.jpg"
          alt="TK-PRINT Official Logo"
          style={{ width: `${currentSize.px}px`, height: `${currentSize.px}px`, objectFit: 'contain' }}
          className={`${currentSize.imgClass} object-contain rounded-lg flex-shrink-0`}
        />
      </div>
      {showSubtitle && (
        <div className="flex flex-col text-start">
          <span className="font-extrabold tracking-tight text-xl text-[#292329] leading-none">
            TK<span className="text-[#D982A5]">-PRINT</span>
          </span>
          <span className="text-[10px] uppercase font-semibold text-[#817780] tracking-widest mt-0.5">
            Your Phone. Your Story.
          </span>
        </div>
      )}
    </>
  );

  if (!asLink) {
    return (
      <div className={`inline-flex items-center gap-2 group ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <Link href="/" className={`inline-flex items-center gap-2 group transition-transform ${className}`}>
      {content}
    </Link>
  );
};
