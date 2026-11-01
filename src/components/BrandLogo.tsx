'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16'
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2 group transition-transform ${className}`}>
      <div className="relative overflow-hidden rounded-xl shadow-sm border border-[#EFA6C1]/30 bg-[#EFA6C1] flex items-center justify-center p-0.5 transition-transform group-hover:scale-105">
        <img
          src="/assets/logo.jpg"
          alt="TK-PRINT Official Logo"
          className={`${sizeClasses[size]} w-auto object-contain rounded-lg`}
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
    </Link>
  );
};
