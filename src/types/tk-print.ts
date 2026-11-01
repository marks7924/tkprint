export type Language = 'ar' | 'en';

export interface PhoneBrand {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  modelsCount?: number;
}

export interface PhoneModel {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  slug: string;
  cameraLayout: 'square-triple' | 'pill-vertical' | 'traffic-light' | 'center-circle' | 'horizontal-bar';
  supportedCaseTypes: CaseType[];
  supportedFinishes: CaseFinish[];
  isPopular?: boolean;
}

export type CaseType = 'transparent' | 'matte' | 'glossy' | 'heavy-duty' | 'leather-touch';
export type CaseFinish = 'matte' | 'glossy' | 'anti-yellow' | 'soft-touch';

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  collectionIds: string[];
  compatibleModelIds: string[]; // specific phone models
  caseTypes: CaseType[];
  finishes: CaseFinish[];
  tags: string[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isLimitedDrop?: boolean;
  isDesignOfWeek?: boolean;
  stock: number;
  mood?: 'cute' | 'minimal' | 'romantic' | 'dark' | 'vintage' | 'funny' | 'artistic' | 'colorful';
}

export interface Collection {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  productCount: number;
  accentColor?: string;
}

export interface CustomDesignPayload {
  id?: string;
  brandId: string;
  phoneModelId: string;
  phoneModelName: string;
  caseType: CaseType;
  finish: CaseFinish;
  uploadedImageUrl?: string;
  text?: string;
  fontFamily?: string;
  textColor?: string;
  textSize?: number;
  textYPosition?: number;
  zoom?: number;
  rotation?: number;
  previewUrl?: string;
  customerNote?: string;
}

export interface MatchingCasePair {
  id?: string;
  pairName: string;
  case1: {
    phoneModelId: string;
    phoneModelName: string;
    caseType: CaseType;
    designName: string;
    customNameOrDate?: string;
  };
  case2: {
    phoneModelId: string;
    phoneModelName: string;
    caseType: CaseType;
    designName: string;
    customNameOrDate?: string;
  };
  bundleDiscountPercent: number;
  totalPrice: number;
}

export interface BundleConfiguration {
  id: string;
  title: string;
  bundleSize: number; // 2, 3, or 4
  discountPercentage: number;
  items: {
    product: Product;
    phoneModelId: string;
    phoneModelName: string;
    caseType: CaseType;
  }[];
  totalPrice: number;
  discountedPrice: number;
  savings: number;
}

export interface CartItem {
  id: string;
  itemType: 'standard' | 'custom' | 'matching' | 'bundle';
  product?: Product;
  customDesign?: CustomDesignPayload;
  matchingPair?: MatchingCasePair;
  bundle?: BundleConfiguration;
  selectedModelId?: string;
  selectedModelName?: string;
  selectedCaseType?: CaseType;
  selectedFinish?: CaseFinish;
  quantity: number;
  price: number;
  originalPrice: number;
  isGift?: boolean;
  giftNote?: string;
  giftRecipientName?: string;
}

export interface ShippingRate {
  id: string;
  zoneEn: string;
  zoneAr: string;
  cost: number;
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  minSpend?: number;
  descriptionEn: string;
  descriptionAr: string;
  isActive: boolean;
}

export type OrderStatus =
  | 'Order Received'
  | 'Confirmed'
  | 'Preparing'
  | 'Printing / Customization'
  | 'Quality Check'
  | 'Ready for Shipping'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderStatusStep {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'card';
  paymentStatus: 'pending' | 'paid' | 'cash_on_delivery';
  status: OrderStatus;
  statusHistory: OrderStatusStep[];
  isGift?: boolean;
  giftDetails?: {
    recipientName: string;
    recipientAddress?: string;
    message: string;
    hidePricing: boolean;
  };
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  customerName: string;
  imageUrl: string;
  caption: string;
  deviceModel: string;
  likes: number;
  isApproved: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export interface LimitedDrop {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  bannerImage: string;
  totalUnits: number;
  claimedUnits: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'live' | 'sold_out' | 'ended';
  featuredProductId: string;
}

export interface DesignOfWeekVote {
  id: string;
  titleEn: string;
  titleAr: string;
  designer: string;
  imageUrl: string;
  votes: number;
  isWinner?: boolean;
  weekRange: string;
}
