import {
  PhoneBrand,
  PhoneModel,
  Collection,
  Product,
  Coupon,
  ShippingRate,
  LimitedDrop,
  DesignOfWeekVote,
  CommunityPost
} from '@/types/tk-print';

export const INITIAL_BRANDS: PhoneBrand[] = [
  { id: 'b_apple', name: 'Apple iPhone', slug: 'apple', modelsCount: 16 },
  { id: 'b_samsung', name: 'Samsung Galaxy', slug: 'samsung', modelsCount: 14 },
  { id: 'b_xiaomi', name: 'Xiaomi', slug: 'xiaomi', modelsCount: 8 },
  { id: 'b_oppo', name: 'Oppo', slug: 'oppo', modelsCount: 6 },
  { id: 'b_huawei', name: 'Huawei', slug: 'huawei', modelsCount: 5 }
];

export const INITIAL_MODELS: PhoneModel[] = [
  // Apple
  {
    id: 'm_iphone_16_pro_max',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 16 Pro Max',
    slug: 'iphone-16-pro-max',
    cameraLayout: 'square-triple',
    supportedCaseTypes: ['matte', 'glossy', 'transparent', 'heavy-duty'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow', 'soft-touch'],
    isPopular: true
  },
  {
    id: 'm_iphone_16_pro',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 16 Pro',
    slug: 'iphone-16-pro',
    cameraLayout: 'square-triple',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow'],
    isPopular: true
  },
  {
    id: 'm_iphone_16',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 16',
    slug: 'iphone-16',
    cameraLayout: 'pill-vertical',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow'],
    isPopular: true
  },
  {
    id: 'm_iphone_15_pro_max',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    cameraLayout: 'square-triple',
    supportedCaseTypes: ['matte', 'glossy', 'transparent', 'heavy-duty'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow'],
    isPopular: true
  },
  {
    id: 'm_iphone_15_pro',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    cameraLayout: 'square-triple',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow'],
    isPopular: true
  },
  {
    id: 'm_iphone_15',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 15',
    slug: 'iphone-15',
    cameraLayout: 'pill-vertical',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow'],
    isPopular: true
  },
  {
    id: 'm_iphone_14_pro',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 14 Pro',
    slug: 'iphone-14-pro',
    cameraLayout: 'square-triple',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow']
  },
  {
    id: 'm_iphone_13',
    brandId: 'b_apple',
    brandName: 'Apple iPhone',
    name: 'iPhone 13',
    slug: 'iphone-13',
    cameraLayout: 'pill-vertical',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow']
  },

  // Samsung
  {
    id: 'm_samsung_s24_ultra',
    brandId: 'b_samsung',
    brandName: 'Samsung Galaxy',
    name: 'Galaxy S24 Ultra',
    slug: 'galaxy-s24-ultra',
    cameraLayout: 'traffic-light',
    supportedCaseTypes: ['matte', 'glossy', 'transparent', 'heavy-duty'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow'],
    isPopular: true
  },
  {
    id: 'm_samsung_s24_plus',
    brandId: 'b_samsung',
    brandName: 'Samsung Galaxy',
    name: 'Galaxy S24+',
    slug: 'galaxy-s24-plus',
    cameraLayout: 'traffic-light',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow']
  },
  {
    id: 'm_samsung_s24',
    brandId: 'b_samsung',
    brandName: 'Samsung Galaxy',
    name: 'Galaxy S24',
    slug: 'galaxy-s24',
    cameraLayout: 'traffic-light',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow'],
    isPopular: true
  },
  {
    id: 'm_samsung_a55',
    brandId: 'b_samsung',
    brandName: 'Samsung Galaxy',
    name: 'Galaxy A55 5G',
    slug: 'galaxy-a55',
    cameraLayout: 'traffic-light',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow']
  },

  // Xiaomi
  {
    id: 'm_xiaomi_14_ultra',
    brandId: 'b_xiaomi',
    brandName: 'Xiaomi',
    name: 'Xiaomi 14 Ultra',
    slug: 'xiaomi-14-ultra',
    cameraLayout: 'center-circle',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy', 'anti-yellow']
  },
  {
    id: 'm_xiaomi_redmi_note_13',
    brandId: 'b_xiaomi',
    brandName: 'Xiaomi',
    name: 'Redmi Note 13 Pro',
    slug: 'redmi-note-13-pro',
    cameraLayout: 'square-triple',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy']
  },

  // Oppo
  {
    id: 'm_oppo_reno_11',
    brandId: 'b_oppo',
    brandName: 'Oppo',
    name: 'Oppo Reno 11 Pro',
    slug: 'oppo-reno-11-pro',
    cameraLayout: 'pill-vertical',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy']
  },

  // Huawei
  {
    id: 'm_huawei_pura_70',
    brandId: 'b_huawei',
    brandName: 'Huawei',
    name: 'Huawei Pura 70 Pro',
    slug: 'huawei-pura-70-pro',
    cameraLayout: 'center-circle',
    supportedCaseTypes: ['matte', 'glossy', 'transparent'],
    supportedFinishes: ['matte', 'glossy']
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'c_bestsellers',
    nameEn: 'Best Sellers',
    nameAr: 'الأكثر مبيعاً',
    slug: 'best-sellers',
    descriptionEn: 'Our most loved phone cases chosen by thousands of happy customers.',
    descriptionAr: 'الكفرات الأكثر طلباً وإعجاباً المختارة من قِبل آلاف العملاء السعداء.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    productCount: 18,
    accentColor: '#EFA6C1'
  },
  {
    id: 'c_cute',
    nameEn: 'Cute Collection',
    nameAr: 'التشكيلة اللطيفة',
    slug: 'cute-collection',
    descriptionEn: 'Heart patterns, bows, sweet doodles, and soft feminine aesthetics.',
    descriptionAr: 'نقشات القلوب، الفيونكات، والرسومات الناعمة ذات الطابع الأنثوي الراقي.',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    productCount: 14,
    accentColor: '#F2AEC7'
  },
  {
    id: 'c_minimal',
    nameEn: 'Minimal Collection',
    nameAr: 'مينيمال وهادئ',
    slug: 'minimal-collection',
    descriptionEn: 'Clean typography, subtle tones, and timeless aesthetic simplicity.',
    descriptionAr: 'خطوط أنيقة، تدرجات هادئة، وبساطة ملفتة تناسب الإطلالات اليومية.',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
    productCount: 12,
    accentColor: '#F8F1ED'
  },
  {
    id: 'c_art',
    nameEn: 'Art & Illustration',
    nameAr: 'فن ورسم',
    slug: 'art-illustration',
    descriptionEn: 'Curated creative pieces by independent artists and illustrators.',
    descriptionAr: 'لوحات فنية ورسومات إبداعية مميزة لفنانين ورسامين مستقلين.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    productCount: 16,
    accentColor: '#DFB4CC'
  },
  {
    id: 'c_romantic',
    nameEn: 'Romantic & Vintage',
    nameAr: 'رومانسي وفينتاج',
    slug: 'romantic',
    descriptionEn: 'Gentle blush tones, poetic phrases, and nostalgic botanicals.',
    descriptionAr: 'تدرجات الورد، عبارات دافئة، وزهور فينتاج تعبق بالذكريات الجميلة.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    productCount: 9,
    accentColor: '#EFA6C1'
  },
  {
    id: 'c_dark',
    nameEn: 'Dark & Minimal',
    nameAr: 'دارك ومينيمال',
    slug: 'dark-minimal',
    descriptionEn: 'Matte blacks, dark typography, and monochromatic edge.',
    descriptionAr: 'الأسود المات الفاخر، خطوط داكنة هادئة، ولمسات تليق بأصحاب الذوق الرفيع.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    productCount: 11,
    accentColor: '#292329'
  },
  {
    id: 'c_funny',
    nameEn: 'Funny & Playful',
    nameAr: 'مرح وضحك',
    slug: 'funny',
    descriptionEn: 'Memes, relatable humor, and witty expressions for everyday smiles.',
    descriptionAr: 'كوميديا خفيفة، ميمز، وعبارات مرحة تضفي بهجة على يومك.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    productCount: 8,
    accentColor: '#EAA5BF'
  },
  {
    id: 'c_custom',
    nameEn: 'Custom Cases',
    nameAr: 'تصميم مخصص',
    slug: 'custom-cases',
    descriptionEn: 'Crafted entirely by you with your photos, texts, and cherished memories.',
    descriptionAr: 'من إبداعك أنت بالكامل باستخدام صورك الخاصة، اسمك، وذكرياتك الغالية.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    productCount: 5,
    accentColor: '#D982A5'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_blush_hearts',
    nameEn: 'Blush Hearts Pattern Case',
    nameAr: 'كفر القلوب الوردية المتناغمة',
    slug: 'blush-hearts-case',
    descriptionEn: 'A signature TK-PRINT best-seller featuring soft blush red hearts scattered across a powder-pink matte canvas. Raised camera bezel for superior lens protection.',
    descriptionAr: 'التصميم الأيقوني الأكثر طلباً من TK-PRINT. قلوب وردية أنيقة متناثرة على خلفية مات ناعمة مع حواف مرتفعة لحماية الكاميرا والشاشة بدقة.',
    price: 380,
    salePrice: 320,
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'cute',
    collectionIds: ['c_bestsellers', 'c_cute', 'c_romantic'],
    compatibleModelIds: ['m_iphone_16_pro_max', 'm_iphone_16_pro', 'm_iphone_16', 'm_iphone_15_pro_max', 'm_iphone_15_pro', 'm_iphone_15', 'm_iphone_14_pro', 'm_iphone_13', 'm_samsung_s24_ultra', 'm_samsung_s24', 'm_samsung_a55'],
    caseTypes: ['matte', 'glossy', 'transparent'],
    finishes: ['matte', 'glossy'],
    tags: ['hearts', 'pink', 'cute', 'bestseller', 'romantic'],
    rating: 4.9,
    reviewCount: 142,
    isBestSeller: true,
    isNewArrival: false,
    stock: 85,
    mood: 'cute'
  },
  {
    id: 'prod_good_vibes',
    nameEn: 'Good Vibes Only Handwritten Case',
    nameAr: 'كفر Good Vibes Only بخط اليد',
    slug: 'good-vibes-only-case',
    descriptionEn: 'Minimal warm cream backdrop with an uplifting handwritten editorial script and subtle mini heart flourish. Anti-scratch UV protection.',
    descriptionAr: 'خلفية كريمية دافئة مع خط يدوي فني راقٍ ورمز قلب صغير. طباعة بتقنية الأشعة فوق البنفسجية مقاومة للخدوش وتغير الألوان.',
    price: 360,
    salePrice: 295,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'minimal',
    collectionIds: ['c_bestsellers', 'c_minimal', 'c_art'],
    compatibleModelIds: ['m_iphone_16_pro_max', 'm_iphone_16_pro', 'm_iphone_16', 'm_iphone_15_pro_max', 'm_iphone_15_pro', 'm_iphone_15', 'm_samsung_s24_ultra', 'm_samsung_s24_plus', 'm_samsung_s24', 'm_xiaomi_14_ultra'],
    caseTypes: ['matte', 'glossy'],
    finishes: ['matte', 'soft-touch'],
    tags: ['quotes', 'minimal', 'cream', 'bestseller', 'editorial'],
    rating: 4.8,
    reviewCount: 98,
    isBestSeller: true,
    isNewArrival: false,
    stock: 64,
    mood: 'minimal'
  },
  {
    id: 'prod_lilac_bows',
    nameEn: 'Lilac Ribbon Bows Case',
    nameAr: 'كفر فيونكات اللافندر الأنيق',
    slug: 'lilac-ribbon-bows-case',
    descriptionEn: 'Pastel lilac purple casing adorned with hand-drawn aesthetic ribbon bows. Perfectly balances coquette charm and sleek modern finish.',
    descriptionAr: 'لون لافندر هادئ مع رسومات فيونكات شريطية أنيقة. يجمع بين النعومة والجاذبية العصرية مع متانة استثنائية لحماية الهاتف.',
    price: 380,
    salePrice: 330,
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'cute',
    collectionIds: ['c_bestsellers', 'c_cute', 'c_art'],
    compatibleModelIds: ['m_iphone_16_pro_max', 'm_iphone_16_pro', 'm_iphone_16', 'm_iphone_15_pro_max', 'm_iphone_15_pro', 'm_iphone_15', 'm_samsung_s24_ultra', 'm_samsung_s24', 'm_oppo_reno_11', 'm_huawei_pura_70'],
    caseTypes: ['matte', 'glossy', 'transparent'],
    finishes: ['matte', 'anti-yellow'],
    tags: ['lilac', 'bows', 'coquette', 'cute', 'lavender'],
    rating: 4.95,
    reviewCount: 180,
    isBestSeller: true,
    isNewArrival: true,
    stock: 42,
    mood: 'cute'
  },
  {
    id: 'prod_matte_noir_wave',
    nameEn: 'Matte Noir Abstract Lines Case',
    nameAr: 'كفر الخطوط التجريدية الأسود الفاخر',
    slug: 'matte-noir-lines-case',
    descriptionEn: 'Ultra-sleek dark graphite with subtle fluid line art. Premium velvet matte texture that repels fingerprints and smudges.',
    descriptionAr: 'أسود جرافيتي فائق الفخامة مع خطوط انسيابية تجريدية. ملمس مخملي مات مقاوم لبصمات الأصابع والتعرق مع قبضة مريحة.',
    price: 390,
    salePrice: 340,
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'dark',
    collectionIds: ['c_dark', 'c_minimal'],
    compatibleModelIds: ['m_iphone_16_pro_max', 'm_iphone_16_pro', 'm_iphone_15_pro_max', 'm_iphone_15_pro', 'm_samsung_s24_ultra', 'm_samsung_s24_plus', 'm_xiaomi_14_ultra'],
    caseTypes: ['matte', 'heavy-duty'],
    finishes: ['matte', 'soft-touch'],
    tags: ['dark', 'black', 'abstract', 'minimal', 'sleek'],
    rating: 4.85,
    reviewCount: 76,
    isBestSeller: false,
    isNewArrival: true,
    stock: 35,
    mood: 'dark'
  },
  {
    id: 'prod_strawberry_matcha',
    nameEn: 'Strawberry Matcha Latte Case',
    nameAr: 'كفر الفراولة والماتشا باستيل',
    slug: 'strawberry-matcha-case',
    descriptionEn: 'Playful color-block swirls of pastel strawberry pink and soft matcha green with cute retro botanical icons.',
    descriptionAr: 'تموجات باستيل مبهجة تجمع بين وردي الفراولة وأخضر الماتشا الهادئ مع رسومات زهور ريترو لطيفة.',
    price: 370,
    salePrice: 310,
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'art',
    collectionIds: ['c_art', 'c_cute', 'c_funny'],
    compatibleModelIds: ['m_iphone_16', 'm_iphone_15', 'm_iphone_14_pro', 'm_iphone_13', 'm_samsung_s24', 'm_samsung_a55'],
    caseTypes: ['glossy', 'matte'],
    finishes: ['glossy', 'anti-yellow'],
    tags: ['matcha', 'strawberry', 'pastel', 'colorful', 'retro'],
    rating: 4.75,
    reviewCount: 54,
    isBestSeller: false,
    isNewArrival: true,
    stock: 28,
    mood: 'colorful'
  },
  {
    id: 'prod_celestial_sun_moon',
    nameEn: 'Celestial Sun & Moon Duo Case',
    nameAr: 'كفر الشمس والقمر الفلكي الأسطوري',
    slug: 'celestial-sun-moon-case',
    descriptionEn: 'Gold foil style celestial sun and crescent moon design. Excellent as a single statement case or paired with a matching case.',
    descriptionAr: 'تصميم فلكي أسطوري للشمس الذهبية وهلال القمر الرقيق. رائع ككفر فردي أنيق أو ضمن طقم ثنائي متطابق.',
    price: 395,
    salePrice: 345,
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'romantic',
    collectionIds: ['c_romantic', 'c_art', 'c_bestsellers'],
    compatibleModelIds: ['m_iphone_16_pro_max', 'm_iphone_16_pro', 'm_iphone_16', 'm_iphone_15_pro_max', 'm_iphone_15_pro', 'm_samsung_s24_ultra', 'm_samsung_s24'],
    caseTypes: ['matte', 'glossy', 'transparent'],
    finishes: ['matte', 'anti-yellow'],
    tags: ['celestial', 'gold', 'sun', 'moon', 'matching'],
    rating: 4.9,
    reviewCount: 112,
    isBestSeller: true,
    isNewArrival: false,
    stock: 50,
    mood: 'romantic'
  }
];

export const INITIAL_SHIPPING_RATES: ShippingRate[] = [
  { id: 'zone_cairo_giza', zoneEn: 'Cairo & Giza', zoneAr: 'القاهرة والجيزة', cost: 50, estimatedDelivery: '2 - 3 business days' },
  { id: 'zone_alexandria', zoneEn: 'Alexandria', zoneAr: 'الإسكندرية', cost: 65, estimatedDelivery: '2 - 4 business days' },
  { id: 'zone_delta_canal', zoneEn: 'Delta & Suez Canal Cities', zoneAr: 'مدن الدلتا والقناة', cost: 75, estimatedDelivery: '3 - 5 business days' },
  { id: 'zone_upper_egypt', zoneEn: 'Upper Egypt', zoneAr: 'محافظات الصعيد', cost: 95, estimatedDelivery: '4 - 6 business days' },
  { id: 'zone_redsea_sinai', zoneEn: 'Red Sea & Sinai', zoneAr: 'البحر الأحمر وجنوب سيناء', cost: 110, estimatedDelivery: '4 - 7 business days' }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'TK10', discountPercent: 10, minSpend: 300, descriptionEn: '10% off on all cases above 300 EGP', descriptionAr: 'خصم 10% على كل الكفرات فوق 300 ج.م', isActive: true },
  { code: 'WELCOME20', discountPercent: 20, minSpend: 500, descriptionEn: '20% welcome discount for new customers', descriptionAr: 'خصم ترحيبي 20% للعملاء الجدد فوق 500 ج.م', isActive: true },
  { code: 'FREESHIP', discountFixed: 50, minSpend: 600, descriptionEn: 'Free delivery voucher on orders over 600 EGP', descriptionAr: 'قسيمة توصيل مجاني للطلبات فوق 600 ج.م', isActive: true }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    customerName: 'سلمى أحمد',
    deviceModel: 'iPhone 15 Pro',
    caption: 'الكفر يجنن والملمس ناعم جداً! بجد أحلى مما توقعت بكتير 🌸',
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    likes: 84,
    isApproved: true,
    isFeatured: true,
    createdAt: '2026-10-25'
  },
  {
    id: 'post_2',
    customerName: 'عمر خالد',
    deviceModel: 'Galaxy S24 Ultra',
    caption: 'طبعت تصميمي الخاص في الاستوديو والجودة طالعة خرافية والتفاصيل واضحة جداً 👌',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
    likes: 67,
    isApproved: true,
    isFeatured: true,
    createdAt: '2026-10-28'
  },
  {
    id: 'post_3',
    customerName: 'نورهان مصطفى',
    deviceModel: 'iPhone 14 Pro',
    caption: 'الكفرات الثنائية هدية عيد زواجنا.. زوجي انبسط منها أوي والباكيدجينج شيك جداً 💕',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
    likes: 112,
    isApproved: true,
    isFeatured: true,
    createdAt: '2026-10-30'
  }
];

export const INITIAL_LIMITED_DROP: LimitedDrop = {
  id: 'drop_fall_cherry',
  titleEn: 'Vintage Cherry Blossoms — Studio Edition',
  titleAr: 'أزهار الكرز الفينتاج — إصدار الاستوديو المحدود',
  descriptionEn: 'Only 100 units worldwide with gold foil stamping and embossed tactile cherry branches.',
  descriptionAr: '100 قطعة فقط مرقمة ومطبوعة بتقنية اللمسة البارزة مع رقائق الذهب العاكسة.',
  bannerImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
  totalUnits: 100,
  claimedUnits: 78,
  startDate: '2026-10-20',
  endDate: '2026-11-10',
  status: 'live',
  featuredProductId: 'prod_celestial_sun_moon'
};

export const INITIAL_DESIGN_OF_WEEK: DesignOfWeekVote[] = [
  {
    id: 'dow_1',
    titleEn: 'Pink Retro Cassette Tape',
    titleAr: 'كاسيت ريترو وردي نوستالجيا',
    designer: 'Maya Studio',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    votes: 342,
    weekRange: 'Week 44 — November 2026'
  },
  {
    id: 'dow_2',
    titleEn: 'Midnight Lotus Floral',
    titleAr: 'زهرة اللوتس في سكون الليل',
    designer: 'Karim Illustrates',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    votes: 289,
    weekRange: 'Week 44 — November 2026'
  },
  {
    id: 'dow_3',
    titleEn: 'Matcha Cat Cozy Afternoon',
    titleAr: 'قط الماتشا في عصر هادئ',
    designer: 'Nour Designs',
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    votes: 418,
    weekRange: 'Week 44 — November 2026',
    isWinner: true
  }
];
