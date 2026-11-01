'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types/tk-print';

interface LanguageContextType {
  language: Language;
  direction: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Top Bar
    'topbar.announcement': '✨ شحن مجاني للطلبات فوق 999 ج.م | تصميم خاص بك متاح الآن',
    'topbar.close': 'إغلاق',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.collections': 'التشكيلات',
    'nav.find_phone': 'اختر هاتفك',
    'nav.custom_studio': 'استوديو التصميم',
    'nav.matching': 'كفرات ثنائية',
    'nav.bundles': 'صمّم مجموعتك',
    'nav.drops': 'إصدارات حصرية',
    'nav.community': 'معرض المبدعين',
    'nav.design_of_week': 'تصميم الأسبوع',
    'nav.quiz': 'اختبار الأسلوب',
    'nav.cart': 'عربة التسوق',
    'nav.wishlist': 'المفضلة',
    'nav.account': 'حسابي',
    'nav.admin': 'لوحة التحكم',
    'nav.search': 'بحث...',
    'nav.search_placeholder': 'ابحث عن كفرات، تصاميم، أو موديل هاتفك...',

    // Hero
    'hero.title_p1': 'هاتفك.',
    'hero.title_p2': 'أسلوبك الخاص.',
    'hero.subtitle': 'كفرات مصممة لتعكس شخصيتك الفريدة. اكتشف تصميمك المفضل القادم أو اصنع كفراً خاصاً بك بالكامل.',
    'hero.shop_button': 'تسوق التشكيلة',
    'hero.design_button': 'صمّم كفرك الآن',

    // Find Your Phone
    'find_phone.title': 'أولاً، اختر هاتفك.',
    'find_phone.subtitle': 'دعنا نجد الكفر المثالي لجهازك ومقاسه الدقيق.',
    'find_phone.select_brand': 'اختر الماركة',
    'find_phone.select_model': 'اختر الموديل',
    'find_phone.action_button': 'استعرض الكفرات',
    'find_phone.active_device': 'جهازك المختار حالياً:',
    'find_phone.change_device': 'تغيير الجهاز',
    'find_phone.all_brands': 'كل الماركات',
    'find_phone.search_models': 'ابحث في الموديلات...',
    'find_phone.compatible_only': 'عرض المتوافق فقط',

    // Quick Shortcuts
    'shortcut.find_phone.title': 'ابحث عن هاتفك',
    'shortcut.find_phone.desc': 'كفرات تناسب مقاسك بدقة.',
    'shortcut.custom.title': 'صمّم كفرك',
    'shortcut.custom.desc': 'حوّل فكرتك إلى واقع ملموس.',
    'shortcut.gift.title': 'أهدِ كفراً',
    'shortcut.gift.desc': 'هدية مميزة بتغليف راقٍ.',
    'shortcut.matching.title': 'كفرات ثنائية',
    'shortcut.matching.desc': 'كفران، قصة واحدة تجمعكما.',

    // Collections
    'collections.title': 'استكشف تشكيلاتنا',
    'collections.view_all': 'عرض الكل',
    'collections.bestsellers': 'الأكثر مبيعاً',
    'collections.cute': 'التشكيلة اللطيفة',
    'collections.minimal': 'مينيمال وهادئ',
    'collections.art': 'فن ورسم',
    'collections.romantic': 'رومانسي',
    'collections.dark': 'دارك ومينيمال',
    'collections.funny': 'مرح وضحك',
    'collections.custom': 'تصميم مخصص',

    // Products
    'product.add_to_cart': 'إضافة إلى السلة',
    'product.quick_view': 'نظرة سريعة',
    'product.buy_now': 'شراء الآن',
    'product.compatible_with': 'متوافق مع',
    'product.case_type': 'نوع الكفر',
    'product.finish': 'اللمسة النهائية',
    'product.in_stock': 'متوفر بالمخزون',
    'product.low_stock': 'قطع معدودة متبقية',
    'product.out_of_stock': 'نفد من المخزون',
    'product.reviews': 'تقييم',
    'product.egp': 'ج.م',
    'product.recently_viewed': 'شاهدتها مؤخراً',
    'product.frequently_bought': 'غالباً ما يتم شراؤها معاً',
    'product.details': 'تفاصيل المنتج',
    'product.delivery_estimate': 'التوصيل المتوقع: خلال 2 - 4 أيام عمل في مصر',

    // Custom Studio
    'custom.title': 'فكرتك. كفرك.',
    'custom.step1': '1. اختر الجهاز',
    'custom.step2': '2. نوع الكفر',
    'custom.step3': '3. ارفع تصميمك',
    'custom.step4': '4. أضف كتابة',
    'custom.step5': '5. معاينة حية',
    'custom.upload_btn': 'ارفع صورة أو تصميم',
    'custom.text_placeholder': 'اكتب اسمك أو عبارتك المفضلة...',
    'custom.font': 'الخط',
    'custom.color': 'لون الخط',
    'custom.zoom': 'تكبير / تصغير',
    'custom.rotate': 'دوران',
    'custom.reset': 'إعادة ضبط',
    'custom.disclaimer': 'ملاحظة: قد تختلف ألوان الطباعة بنسبة طفيفة عن شاشات الهواتف بسبب طبيعة الأحبار.',
    'custom.add_custom_to_cart': 'إتمام التصميم وإضافته للسلة',

    // Matching Cases
    'matching.title': 'كفرات ثنائية متناسقة',
    'matching.subtitle': 'للأزواج، الأصدقاء، والأحباب — اختارا تصميمين متطابقين أو متكاملين لأي هاتفين مختلفين مع خصم 15% تلقائياً.',
    'matching.device1': 'الهاتف الأول',
    'matching.device2': 'الهاتف الثاني',
    'matching.add_bundle': 'إضافة الثنائي إلى السلة مع الخصم',

    // Bundle Builder
    'bundle.title': 'صمّم مجموعتك الخاصة ووفر حتى 25%',
    'bundle.subtitle': 'اختر 2 إلى 4 كفرات واحصل على توفير تصاعدي فوري.',
    'bundle.select_size': 'اختر عدد الكفرات',
    'bundle.selected_items': 'الكفرات المختارة:',
    'bundle.total_savings': 'إجمالي التوفير:',
    'bundle.add_to_cart': 'إضافة المجموعة للسلة',

    // Gift Mode
    'gift.title': 'هل هذه هدية؟',
    'gift.enable': 'تفعيل وضع الهدية',
    'gift.recipient_name': 'اسم متلقي الهدية',
    'gift.recipient_address': 'عنوان المستلم (اختياري للشحن المباشر)',
    'gift.message': 'رسالة الإهداء في كرت أنيق',
    'gift.hide_invoice': 'إخفاء الأسعار من الفاتورة المرفقة',

    // Quiz
    'quiz.title': 'اختبار اكتشاف الأسلوب',
    'quiz.subtitle': 'أجب عن 4 أسئلة سريعة لنقترح لك الكفرات الأقرب لذوقك وشخصيتك.',
    'quiz.start': 'ابدأ الاختبار',
    'quiz.next': 'التالي',
    'quiz.results_title': 'هذا هو ذوقك الفريد!',
    'quiz.restart': 'إعادة الاختبار',

    // Drops & Design of the Week
    'drop.badge': 'إصدار حصري محدود',
    'drop.ends_in': 'ينتهي خلال:',
    'drop.remaining': 'المتبقي:',
    'vote.title': 'تصميم الأسبوع — صوّت لتصميمك المفضل',
    'vote.button': 'صوّت لهذا التصميم',
    'vote.voted': 'شكراً لتصويتك!',

    // Community
    'community.title': 'معرض المبدعين ومجتمع TK',
    'community.subtitle': 'صور عملائنا مع كفراتهم المطبوعة. شاركنا إطلالة هاتفك!',
    'community.upload_btn': 'شارك صورتك معنا',
    'community.create_similar': 'اصنع شيئاً مشابهاً',

    // Cart & Checkout
    'cart.title': 'سلة المشتريات',
    'cart.empty': 'سلتك فارغة حالياً. تصفح أحدث التشكيلات لإيجاد كفرك المفضل!',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.discount': 'الخصم',
    'cart.shipping': 'الشحن',
    'cart.free_shipping_hint': 'أضف منتجات بقيمة {amount} ج.م إضافية للحصول على شحن مجاني!',
    'cart.total': 'الإجمالي النهائي',
    'cart.checkout_btn': 'متابعة الدفع',
    'cart.coupon_placeholder': 'كود الخصم (مثال: TK10)',
    'cart.apply_coupon': 'تطبيق',

    // Checkout Form
    'checkout.title': 'إتمام الطلب',
    'checkout.guest_notice': 'لا يلزم تسجيل حساب! يمكنك الشراء كضيف مباشرة وبكل سهولة.',
    'checkout.fullname': 'الاسم بالكامل',
    'checkout.phone': 'رقم الهاتف (للتواصل وتأكيد الشحن)',
    'checkout.email': 'البريد الإلكتروني (لتتبع الطلب)',
    'checkout.governorate': 'المحافظة',
    'checkout.city': 'المدينة / المنطقة',
    'checkout.address': 'العنوان بالتفصيل (اسم الشارع، رقم المبنى والشقة)',
    'checkout.notes': 'ملاحظات إضافية للتوصيل',
    'checkout.payment_method': 'طريقة الدفع',
    'checkout.cod': 'الدفع عند الاستلام (Cash on Delivery)',
    'checkout.card': 'بطاقة بنكية / فيزا / ماستركارد',
    'checkout.place_order': 'تأكيد وإرسال الطلب',

    // Order Confirmation & Tracking
    'order.success_title': 'تم استلام طلبك بنجاح! 🎉',
    'order.number': 'رقم الطلب:',
    'order.track_hint': 'يمكنك تتبع حالة تجهيز وطباعة وشحن كفرك في أي وقت.',
    'track.title': 'تتبع حالة طلبك',
    'track.enter_order_num': 'أدخل رقم الطلب',
    'track.enter_phone': 'رقم الهاتف المسجل بالطلب',
    'track.button': 'تتبع الطلب',
    'track.current_status': 'الحالة الحالية:',

    // Footer
    'footer.about_brand': 'براند مصري إبداعي متخصص في طباعة كفرات الهواتف الفريدة والتصاميم المخصصة التي تحكي قصتك وتبرز أسلوبك.',
    'footer.quick_links': 'روابط سريعة',
    'footer.help': 'المساعدة وخدمة العملاء',
    'footer.track_order': 'تتبع طلبك',
    'footer.shipping_policy': 'الشحن والاسترجاع',
    'footer.privacy_policy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.contact_us': 'تواصل معنا',
    'footer.rights': 'جميع الحقوق محفوظة © 2026 TK-PRINT. تصميم وتصنيع بكل فخر في مصر.',
    'footer.whatsapp': 'تواصل معنا عبر واتساب'
  },
  en: {
    // Top Bar
    'topbar.announcement': '✨ Free Shipping on orders over 999 EGP | Custom Cases Available Now',
    'topbar.close': 'Close',

    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.collections': 'Collections',
    'nav.find_phone': 'Find Your Phone',
    'nav.custom_studio': 'Custom Studio',
    'nav.matching': 'Matching Cases',
    'nav.bundles': 'Build Your Bundle',
    'nav.drops': 'Limited Drops',
    'nav.community': 'Community Gallery',
    'nav.design_of_week': 'Design of the Week',
    'nav.quiz': 'Style Quiz',
    'nav.cart': 'Cart',
    'nav.wishlist': 'Wishlist',
    'nav.account': 'My Account',
    'nav.admin': 'Admin Dashboard',
    'nav.search': 'Search...',
    'nav.search_placeholder': 'Search cases, designs, or phone models...',

    // Hero
    'hero.title_p1': 'Your Phone.',
    'hero.title_p2': 'Your Style.',
    'hero.subtitle': 'Cases made to match your personality. Discover your next favorite design or create something completely yours.',
    'hero.shop_button': 'Shop Collection',
    'hero.design_button': 'Design Your Case',

    // Find Your Phone
    'find_phone.title': 'First, Find Your Phone.',
    'find_phone.subtitle': "Let's find the perfect case for your exact device.",
    'find_phone.select_brand': 'Select Brand',
    'find_phone.select_model': 'Select Model',
    'find_phone.action_button': 'Find Cases',
    'find_phone.active_device': 'Your selected phone:',
    'find_phone.change_device': 'Change Phone',
    'find_phone.all_brands': 'All Brands',
    'find_phone.search_models': 'Search models...',
    'find_phone.compatible_only': 'Show Compatible Only',

    // Quick Shortcuts
    'shortcut.find_phone.title': 'Find My Phone',
    'shortcut.find_phone.desc': 'Cases that fit.',
    'shortcut.custom.title': 'Design Your Case',
    'shortcut.custom.desc': 'Turn your idea into reality.',
    'shortcut.gift.title': 'Gift a Case',
    'shortcut.gift.desc': 'Make it personal.',
    'shortcut.matching.title': 'Matching',
    'shortcut.matching.desc': 'Two cases, one story.',

    // Collections
    'collections.title': 'Explore Our Collections',
    'collections.view_all': 'View All',
    'collections.bestsellers': 'Best Sellers',
    'collections.cute': 'Cute Collection',
    'collections.minimal': 'Minimal Collection',
    'collections.art': 'Art & Illustration',
    'collections.romantic': 'Romantic',
    'collections.dark': 'Dark & Minimal',
    'collections.funny': 'Funny',
    'collections.custom': 'Custom Cases',

    // Products
    'product.add_to_cart': 'Add to Cart',
    'product.quick_view': 'Quick View',
    'product.buy_now': 'Buy Now',
    'product.compatible_with': 'Compatible with',
    'product.case_type': 'Case Type',
    'product.finish': 'Finish',
    'product.in_stock': 'In Stock',
    'product.low_stock': 'Only few left in stock',
    'product.out_of_stock': 'Out of Stock',
    'product.reviews': 'reviews',
    'product.egp': 'EGP',
    'product.recently_viewed': 'Recently Viewed',
    'product.frequently_bought': 'Frequently Bought Together',
    'product.details': 'Product Details',
    'product.delivery_estimate': 'Estimated Delivery: 2 - 4 business days in Egypt',

    // Custom Studio
    'custom.title': 'Your Idea. Your Case.',
    'custom.step1': '1. Choose Device',
    'custom.step2': '2. Case Type',
    'custom.step3': '3. Upload Artwork',
    'custom.step4': '4. Add Custom Text',
    'custom.step5': '5. Live Preview',
    'custom.upload_btn': 'Upload Image / Artwork',
    'custom.text_placeholder': 'Add your name or favorite quote...',
    'custom.font': 'Font Family',
    'custom.color': 'Text Color',
    'custom.zoom': 'Zoom',
    'custom.rotate': 'Rotate',
    'custom.reset': 'Reset',
    'custom.disclaimer': 'Note: Physical print colors may vary slightly from screen preview due to print inks and device display calibration.',
    'custom.add_custom_to_cart': 'Save Design & Add to Cart',

    // Matching Cases
    'matching.title': 'Matching Cases',
    'matching.subtitle': 'For couples, best friends, and loved ones — choose two complementary cases for different phone models with an automatic 15% discount.',
    'matching.device1': 'Device 1',
    'matching.device2': 'Device 2',
    'matching.add_bundle': 'Add Matching Set to Cart',

    // Bundle Builder
    'bundle.title': 'Build Your Own Bundle & Save up to 25%',
    'bundle.subtitle': 'Pick 2 to 4 phone cases and unlock progressive tiered discounts.',
    'bundle.select_size': 'Select Bundle Size',
    'bundle.selected_items': 'Selected Cases:',
    'bundle.total_savings': 'Total Savings:',
    'bundle.add_to_cart': 'Add Bundle to Cart',

    // Gift Mode
    'gift.title': 'Is this a gift?',
    'gift.enable': 'Enable Gift Mode',
    'gift.recipient_name': 'Recipient Name',
    'gift.recipient_address': 'Recipient Address (optional for direct delivery)',
    'gift.message': 'Personalized Gift Card Message',
    'gift.hide_invoice': 'Hide prices on physical package invoice',

    // Quiz
    'quiz.title': 'Find My Style Quiz',
    'quiz.subtitle': 'Answer 4 quick questions and we will recommend cases that match your aesthetic.',
    'quiz.start': 'Start Quiz',
    'quiz.next': 'Next',
    'quiz.results_title': 'Your Style Aesthetic!',
    'quiz.restart': 'Retake Quiz',

    // Drops & Design of the Week
    'drop.badge': 'Limited Drop',
    'drop.ends_in': 'Ends In:',
    'drop.remaining': 'Remaining:',
    'vote.title': 'Design of the Week — Cast Your Vote',
    'vote.button': 'Vote for this Design',
    'vote.voted': 'Thanks for voting!',

    // Community
    'community.title': 'Community Gallery',
    'community.subtitle': 'Real cases shared by TK-PRINT customers. Show us how you style your phone!',
    'community.upload_btn': 'Share Your Phone Case',
    'community.create_similar': 'Create Something Similar',

    // Cart & Checkout
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty. Explore our latest collections to find your favorite case!',
    'cart.subtotal': 'Subtotal',
    'cart.discount': 'Discount',
    'cart.shipping': 'Shipping',
    'cart.free_shipping_hint': 'Add {amount} EGP more for FREE shipping!',
    'cart.total': 'Final Total',
    'cart.checkout_btn': 'Proceed to Checkout',
    'cart.coupon_placeholder': 'Promo code (e.g. TK10)',
    'cart.apply_coupon': 'Apply',

    // Checkout Form
    'checkout.title': 'Complete Your Order',
    'checkout.guest_notice': 'No account required! Quick, seamless guest checkout is always available.',
    'checkout.fullname': 'Full Name',
    'checkout.phone': 'Phone Number (for courier contact)',
    'checkout.email': 'Email Address (for order tracking)',
    'checkout.governorate': 'Governorate',
    'checkout.city': 'City / District',
    'checkout.address': 'Street Address, Building, Apartment',
    'checkout.notes': 'Delivery Notes / Special Instructions',
    'checkout.payment_method': 'Payment Method',
    'checkout.cod': 'Cash on Delivery (COD)',
    'checkout.card': 'Credit / Debit Card (Online Payment)',
    'checkout.place_order': 'Place Order',

    // Order Confirmation & Tracking
    'order.success_title': 'Order Received Successfully! 🎉',
    'order.number': 'Order Number:',
    'order.track_hint': 'You can track the live status of your custom print and shipping anytime.',
    'track.title': 'Track Your Order',
    'track.enter_order_num': 'Order Number',
    'track.enter_phone': 'Phone Number',
    'track.button': 'Track Order',
    'track.current_status': 'Current Status:',

    // Footer
    'footer.about_brand': 'Creative lifestyle phone case brand specializing in aesthetic prints, bespoke custom studios, and durable protection. Handcrafted & printed with care in Egypt.',
    'footer.quick_links': 'Quick Links',
    'footer.help': 'Customer Support',
    'footer.track_order': 'Track Order',
    'footer.shipping_policy': 'Shipping & Returns',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.contact_us': 'Contact Us',
    'footer.rights': 'All rights reserved © 2026 TK-PRINT. Designed & printed with love in Egypt.',
    'footer.whatsapp': 'Chat with us on WhatsApp'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Arabic as instructed: "Arabic is the default language. English is secondary."
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    // Check saved language preference in localStorage
    const saved = localStorage.getItem('tk_language') as Language | null;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLanguageState(saved);
      document.documentElement.setAttribute('lang', saved);
      document.documentElement.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr');
    } else {
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tk_language', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, toggleLanguage, t }}>
      <div dir={direction} className={direction === 'rtl' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
