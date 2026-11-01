'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '@/context/LanguageContext';
import { useStore } from '@/context/StoreContext';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  Globe,
  Smartphone,
  Sparkles,
  Palette,
  Users,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const { cartCount, wishlist, selectedModel } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/shop', label: t('nav.shop') },
    {
      href: '/collections',
      label: t('nav.collections'),
      hasDropdown: true
    },
    { href: '/find-your-phone', label: t('nav.find_phone') },
    { href: '/custom-studio', label: t('nav.custom_studio') },
    { href: '/matching-cases', label: t('nav.matching') }
  ];

  const collectionsList = [
    { slug: 'best-sellers', nameEn: 'Best Sellers', nameAr: 'الأكثر مبيعاً' },
    { slug: 'cute-collection', nameEn: 'Cute Collection', nameAr: 'التشكيلة اللطيفة' },
    { slug: 'minimal-collection', nameEn: 'Minimal Collection', nameAr: 'مينيمال وهادئ' },
    { slug: 'art-illustration', nameEn: 'Art & Illustration', nameAr: 'فن ورسم' },
    { slug: 'romantic', nameEn: 'Romantic & Vintage', nameAr: 'رومانسي وفينتاج' },
    { slug: 'dark-minimal', nameEn: 'Dark & Minimal', nameAr: 'دارك ومينيمال' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F0E4E9] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#292329] hover:bg-[#FFF0F4] rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <BrandLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => setCollectionsDropdown(true)}
                    onMouseLeave={() => setCollectionsDropdown(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${isActive
                        ? 'text-[#D982A5] border-b-2 border-[#D982A5]'
                        : 'text-[#292329] hover:text-[#D982A5]'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 text-[#817780] transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu */}
                    {collectionsDropdown && (
                      <div className="absolute top-full start-0 w-64 bg-white rounded-2xl shadow-xl border border-[#F0E4E9] p-2 z-50 animate-fadeIn">
                        {collectionsList.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/collections/${c.slug}`}
                            className="block px-3 py-2 text-sm text-[#292329] hover:bg-[#FFF0F4] hover:text-[#D982A5] rounded-xl transition-colors font-medium"
                            onClick={() => setCollectionsDropdown(false)}
                          >
                            {language === 'ar' ? c.nameAr : c.nameEn}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors py-2 ${isActive
                    ? 'text-[#D982A5] border-b-2 border-[#D982A5]'
                    : 'text-[#292329] hover:text-[#D982A5]'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Phone Indicator if chosen */}
            {selectedModel && (
              <Link
                href="/find-your-phone"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF0F4] border border-[#EFA6C1]/50 text-xs font-semibold text-[#D982A5] rounded-full hover:bg-[#FFE3ED] transition-colors"
                title={t('find_phone.active_device')}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{selectedModel.name}</span>
              </Link>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#F0E4E9] text-xs font-bold text-[#292329] hover:bg-[#FFF0F4] transition-colors"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#D982A5]" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#292329] hover:text-[#D982A5] hover:bg-[#FFF0F4] rounded-full transition-colors"
              aria-label={t('nav.search')}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#292329] hover:text-[#D982A5] hover:bg-[#FFF0F4] rounded-full transition-colors"
              aria-label={t('nav.wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 end-1 bg-[#D982A5] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scaleIn">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account / Admin shortcut */}
            <Link
              href="/account"
              className="p-2 text-[#292329] hover:text-[#D982A5] hover:bg-[#FFF0F4] rounded-full transition-colors"
              aria-label={t('nav.account')}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 text-[#292329] hover:text-[#D982A5] hover:bg-[#FFF0F4] rounded-full transition-colors flex items-center justify-center"
              aria-label={t('nav.cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 end-1 bg-[#EFA6C1] text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-[#F0E4E9] bg-white py-3 px-4 shadow-sm animate-fadeIn">
            <div className="max-w-2xl mx-auto flex items-center gap-2">
              <Search className="w-5 h-5 text-[#817780]" />
              <input
                type="text"
                placeholder={t('nav.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full bg-transparent border-none focus:outline-none text-sm text-[#292329] placeholder-[#817780]"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#817780] hover:text-[#292329]"
                >
                  {language === 'ar' ? 'مسح' : 'Clear'}
                </button>
              )}
              <Link
                href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                className="px-4 py-1.5 bg-[#EFA6C1] hover:bg-[#D982A5] text-white text-xs font-bold rounded-full transition-colors"
                onClick={() => setSearchOpen(false)}
              >
                {t('nav.search')}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 start-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-50 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E4E9]">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#FFF0F4] text-[#292329]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedModel && (
                <div className="mt-4 p-3 bg-[#FFF0F4] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#D982A5]" />
                    <span className="text-xs font-bold text-[#292329]">{selectedModel.name}</span>
                  </div>
                  <Link
                    href="/find-your-phone"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] text-[#D982A5] font-semibold underline"
                  >
                    {t('find_phone.change_device')}
                  </Link>
                </div>
              )}

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${pathname === link.href
                      ? 'bg-[#FFF0F4] text-[#D982A5] font-bold'
                      : 'text-[#292329] hover:bg-[#FFF8FA]'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <hr className="my-3 border-[#F0E4E9]" />

                <Link
                  href="/bundle-builder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#292329] hover:bg-[#FFF8FA] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D982A5]" />
                  <span>{t('nav.bundles')}</span>
                </Link>

                <Link
                  href="/style-quiz"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#292329] hover:bg-[#FFF8FA] flex items-center gap-2"
                >
                  <Palette className="w-4 h-4 text-[#D982A5]" />
                  <span>{t('nav.quiz')}</span>
                </Link>

                <Link
                  href="/community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#292329] hover:bg-[#FFF8FA] flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#D982A5]" />
                  <span>{t('nav.community')}</span>
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#D982A5] hover:bg-[#FFF0F4]"
                >
                  ⚙️ {t('nav.admin')}
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#F0E4E9] flex flex-col gap-3">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#F0E4E9] text-sm font-bold text-[#292329] hover:bg-[#FFF0F4]"
              >
                <Globe className="w-4 h-4 text-[#D982A5]" />
                <span>{language === 'ar' ? 'English (Switch)' : 'العربية (تحويل)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Navigation Bar (as shown in web.jpg mobile view) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#F0E4E9] z-40 px-3 py-2 flex items-center justify-around shadow-lg">
        <Link
          href="/"
          className={`flex flex-col items-center text-xs font-semibold ${pathname === '/' ? 'text-[#D982A5]' : 'text-[#817780]'
            }`}
        >
          <div className="p-1">
            <BrandLogo size="sm" showSubtitle={false} asLink={false} />
          </div>
          <span className="text-[10px]">{t('nav.home')}</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center text-xs font-semibold ${pathname.startsWith('/shop') ? 'text-[#D982A5]' : 'text-[#817780]'
            }`}
        >
          <div className="p-1">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-[10px]">{t('nav.shop')}</span>
        </Link>

        <Link
          href="/custom-studio"
          className={`flex flex-col items-center text-xs font-semibold ${pathname === '/custom-studio' ? 'text-[#D982A5]' : 'text-[#817780]'
            }`}
        >
          <div className="p-1">
            <Palette className="w-5 h-5" />
          </div>
          <span className="text-[10px]">{language === 'ar' ? 'صمّم' : 'Custom'}</span>
        </Link>

        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center text-xs font-semibold ${pathname === '/wishlist' ? 'text-[#D982A5]' : 'text-[#817780]'
            }`}
        >
          <div className="p-1">
            <Heart className="w-5 h-5" />
          </div>
          {wishlist.length > 0 && (
            <span className="absolute top-0 end-2 w-3.5 h-3.5 bg-[#D982A5] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px]">{t('nav.wishlist')}</span>
        </Link>

        <Link
          href="/cart"
          className={`relative flex flex-col items-center text-xs font-semibold ${pathname === '/cart' ? 'text-[#D982A5]' : 'text-[#817780]'
            }`}
        >
          <div className="p-1">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="absolute top-0 end-2 w-3.5 h-3.5 bg-[#EFA6C1] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
          <span className="text-[10px]">{t('nav.cart')}</span>
        </Link>
      </div>
    </>
  );
};

