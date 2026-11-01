'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PhoneBrand,
  PhoneModel,
  Product,
  Collection,
  CartItem,
  Coupon,
  ShippingRate,
  Order,
  OrderStatus,
  CommunityPost,
  CaseType,
  CaseFinish
} from '@/types/tk-print';
import {
  INITIAL_BRANDS,
  INITIAL_MODELS,
  INITIAL_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_SHIPPING_RATES,
  INITIAL_COUPONS,
  INITIAL_COMMUNITY_POSTS
} from '@/data/mock-db';

interface StoreContextType {
  brands: PhoneBrand[];
  models: PhoneModel[];
  collections: Collection[];
  products: Product[];
  shippingRates: ShippingRate[];
  coupons: Coupon[];
  communityPosts: CommunityPost[];
  
  // Selected Device (Find Your Phone)
  selectedBrand: PhoneBrand | null;
  selectedModel: PhoneModel | null;
  setSelectedBrand: (brand: PhoneBrand | null) => void;
  setSelectedModel: (model: PhoneModel | null) => void;
  clearSelectedDevice: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  selectedShippingRate: ShippingRate;
  setSelectedShippingRate: (rate: ShippingRate) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'statusHistory' | 'createdAt'>) => Order;
  getOrder: (orderNumber: string, phone?: string) => Order | undefined;

  // Admin Actions
  adminUpdateProduct: (product: Product) => void;
  adminAddProduct: (product: Omit<Product, 'id'>) => void;
  adminDeleteProduct: (productId: string) => void;
  adminUpdateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  adminApproveCommunityPost: (postId: string) => void;
  adminRejectCommunityPost: (postId: string) => void;

  // UI Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // State
  const [brands] = useState<PhoneBrand[]>(INITIAL_BRANDS);
  const [models] = useState<PhoneModel[]>(INITIAL_MODELS);
  const [collections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [shippingRates] = useState<ShippingRate[]>(INITIAL_SHIPPING_RATES);
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  const [selectedBrand, setSelectedBrand] = useState<PhoneBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedShippingRate, setSelectedShippingRate] = useState<ShippingRate>(INITIAL_SHIPPING_RATES[0]);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persistence from localStorage on client
  useEffect(() => {
    try {
      // Selected Phone
      const savedBrand = localStorage.getItem('tk_selected_brand');
      const savedModel = localStorage.getItem('tk_selected_model');
      if (savedBrand) {
        const found = INITIAL_BRANDS.find(b => b.id === savedBrand);
        if (found) setSelectedBrand(found);
      }
      if (savedModel) {
        const foundM = INITIAL_MODELS.find(m => m.id === savedModel);
        if (foundM) setSelectedModel(foundM);
      }

      // Cart
      const savedCart = localStorage.getItem('tk_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      // Wishlist
      const savedWishlist = localStorage.getItem('tk_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      // Orders
      const savedOrders = localStorage.getItem('tk_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      // Products (admin updates)
      const savedProducts = localStorage.getItem('tk_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));
    } catch {
      // ignore JSON parse error in SSR/private mode
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tk_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tk_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('tk_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tk_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Device Selection
  const handleSetSelectedBrand = (brand: PhoneBrand | null) => {
    setSelectedBrand(brand);
    if (brand) {
      localStorage.setItem('tk_selected_brand', brand.id);
    } else {
      localStorage.removeItem('tk_selected_brand');
    }
  };

  const handleSetSelectedModel = (model: PhoneModel | null) => {
    setSelectedModel(model);
    if (model) {
      localStorage.setItem('tk_selected_model', model.id);
      showToast(`✨ تم ضبط جهازك: ${model.name}`);
    } else {
      localStorage.removeItem('tk_selected_model');
    }
  };

  const clearSelectedDevice = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    localStorage.removeItem('tk_selected_brand');
    localStorage.removeItem('tk_selected_model');
  };

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
    };
    setCart(prev => [...prev, newItem]);
    showToast('🛍️ تمت الإضافة إلى سلة المشتريات!');
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
    showToast('تم حذف المنتج من السلة');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Discount calculation
  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFixed) {
      cartDiscount = appliedCoupon.discountFixed;
    }
  }

  // Free shipping on orders over 999 EGP as stated in header
  const isFreeShipping = cartSubtotal >= 999;
  const cartShipping = cartSubtotal > 0 ? (isFreeShipping ? 0 : selectedShippingRate.cost) : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'كود الخصم غير صحيح أو منتهي الصلاحية' };
    }
    if (found.minSpend && cartSubtotal < found.minSpend) {
      return { success: false, message: `الحد الأدنى لاستخدام هذا الكوبون هو ${found.minSpend} ج.م` };
    }
    setAppliedCoupon(found);
    return { success: true, message: `تم تفعيل كود الخصم بنجاح! (${found.code})` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('تمت الإزالة من المفضلة');
        return prev.filter(id => id !== productId);
      } else {
        showToast('❤️ تمت الإضافة إلى المفضلة');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently Viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const clearRecentlyViewed = () => setRecentlyViewed([]);

  // Orders
  const placeOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'statusHistory' | 'createdAt'>
  ): Order => {
    const orderNum = 'TK-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord_' + Date.now(),
      orderNumber: orderNum,
      status: 'Order Received',
      statusHistory: [
        {
          status: 'Order Received',
          timestamp: new Date().toISOString(),
          note: 'تم استلام طلبكم وجاري مراجعته لبدء الطباعة والتجهيز.'
        }
      ],
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrder = (orderNumber: string, phone?: string): Order | undefined => {
    const cleanNum = orderNumber.trim().toUpperCase();
    return orders.find(o => {
      const matchesNum = o.orderNumber.toUpperCase() === cleanNum;
      if (phone && phone.trim()) {
        const cleanPhone = phone.trim().replace(/\D/g, '');
        const orderPhone = o.phone.replace(/\D/g, '');
        return matchesNum && orderPhone.includes(cleanPhone);
      }
      return matchesNum;
    });
  };

  // Admin Product Actions
  const adminUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast('تم تحديث بيانات المنتج بنجاح');
  };

  const adminAddProduct = (item: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...item,
      id: 'prod_' + Date.now()
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast('تمت إضافة المنتج الجديد بنجاح');
  };

  const adminDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('تم حذف المنتج');
  };

  const adminUpdateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const step: { status: OrderStatus; timestamp: string; note?: string } = {
            status,
            timestamp: new Date().toISOString(),
            note: note || `تم تحديث حالة الطلب إلى: ${status}`
          };
          return {
            ...o,
            status,
            statusHistory: [...o.statusHistory, step]
          };
        }
        return o;
      })
    );
    showToast(`تم تغيير حالة الطلب إلى ${status}`);
  };

  const adminApproveCommunityPost = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, isApproved: true } : p))
    );
    showToast('تم اعتماد المنشور ونشره في المعرض العام');
  };

  const adminRejectCommunityPost = (postId: string) => {
    setCommunityPosts(prev => prev.filter(p => p.id !== postId));
    showToast('تم رفض وحذف المنشور');
  };

  return (
    <StoreContext.Provider
      value={{
        brands,
        models,
        collections,
        products,
        shippingRates,
        coupons,
        communityPosts,
        selectedBrand,
        selectedModel,
        setSelectedBrand: handleSetSelectedBrand,
        setSelectedModel: handleSetSelectedModel,
        clearSelectedDevice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        selectedShippingRate,
        setSelectedShippingRate,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
        orders,
        placeOrder,
        getOrder,
        adminUpdateProduct,
        adminAddProduct,
        adminDeleteProduct,
        adminUpdateOrderStatus,
        adminApproveCommunityPost,
        adminRejectCommunityPost,
        toastMessage,
        showToast
      }}
    >
      {children}
      {/* Global floating toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292329] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 rtl:space-x-reverse animate-bounce border border-[#EFA6C1]/40 text-sm font-medium">
          <span>{toastMessage}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
