'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { OrderStatus, Product } from '@/types/tk-print';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Smartphone,
  Palette,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Download,
  Eye,
  Check,
  X,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { language } = useLanguage();
  const {
    products,
    orders,
    brands,
    models,
    communityPosts,
    adminUpdateOrderStatus,
    adminApproveCommunityPost,
    adminRejectCommunityPost,
    adminAddProduct,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'custom_orders' | 'products' | 'community'
  >('overview');

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Order Received' || o.status === 'Preparing').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'Delivered').length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Custom orders extract
  const customOrders = orders.flatMap((o) =>
    o.items
      .filter((i) => i.itemType === 'custom')
      .map((item) => ({
        orderNumber: o.orderNumber,
        customerName: o.customerName,
        customerPhone: o.phone,
        date: o.createdAt,
        item
      }))
  );

  // New product modal state
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdNameAr, setNewProdNameAr] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('350');
  const [newProdCategory, setNewProdCategory] = useState('cute');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNameEn || !newProdNameAr) return;

    adminAddProduct({
      nameEn: newProdNameEn,
      nameAr: newProdNameAr,
      slug: newProdNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      descriptionEn: 'Premium TK-PRINT custom designed case with durable impact protection.',
      descriptionAr: 'كفر أنيق عالي الجودة من TK-PRINT مع حماية فائقة ضد الصدمات.',
      price: Number(newProdPrice) || 350,
      images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80'],
      category: newProdCategory,
      collectionIds: ['c_bestsellers'],
      compatibleModelIds: models.map((m) => m.id),
      caseTypes: ['matte', 'glossy', 'transparent'],
      finishes: ['matte', 'glossy'],
      tags: ['new', 'custom', newProdCategory],
      rating: 5.0,
      reviewCount: 1,
      stock: 50,
      isNewArrival: true
    });

    setNewProductModal(false);
    setNewProdNameEn('');
    setNewProdNameAr('');
  };

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-e border-[#F0E4E9] flex flex-col justify-between p-6 shrink-0 hidden md:flex">
        <div>
          <div className="pb-6 border-b border-[#F0E4E9]">
            <BrandLogo size="sm" />
            <span className="text-[10px] uppercase font-black tracking-widest text-[#D982A5] block mt-1">
              Admin Portal • لوحة الإدارة
            </span>
          </div>

          <nav className="mt-6 space-y-1">
            {[
              { id: 'overview', labelEn: 'Overview', labelAr: 'نظرة عامة', icon: LayoutDashboard },
              { id: 'orders', labelEn: 'Orders', labelAr: 'الطلبيات', icon: ShoppingBag, badge: pendingOrdersCount },
              { id: 'custom_orders', labelEn: 'Custom Artwork', labelAr: 'تصاميم العملاء', icon: Palette, badge: customOrders.length },
              { id: 'products', labelEn: 'Products', labelAr: 'المنتجات', icon: Package, badge: products.length },
              { id: 'community', labelEn: 'Community Moderation', labelAr: 'مراجعة المعرض', icon: Users, badge: communityPosts.filter((p) => !p.isApproved).length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#FFF0F4] text-[#D982A5] shadow-2xs'
                      : 'text-[#292329] hover:bg-[#FFF8FA]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#D982A5]" />
                    <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
                  </div>
                  {Boolean(tab.badge) && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D982A5] text-white text-[10px] font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#F0E4E9]">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#F0E4E9] text-xs font-bold text-[#292329] hover:bg-[#FFF0F4]"
          >
            <span>{language === 'ar' ? 'العودة للمتجر الرئيسي' : 'Back to Store'}</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#F0E4E9]">
          <div>
            <h1 className="text-2xl font-black text-[#292329]">
              {activeTab === 'overview' && (language === 'ar' ? 'نظرة عامة على المتجر' : 'Store Analytics & Overview')}
              {activeTab === 'orders' && (language === 'ar' ? 'إدارة الطلبيات والشحن' : 'Orders & Shipments')}
              {activeTab === 'custom_orders' && (language === 'ar' ? 'ملفات وتصاميم الاستوديو المخصصة' : 'Custom Artwork Queue')}
              {activeTab === 'products' && (language === 'ar' ? 'إدارة كتالوج المنتجات' : 'Products & Catalog')}
              {activeTab === 'community' && (language === 'ar' ? 'مراجعة صور ومشاركات العملاء' : 'Community Moderation')}
            </h1>
            <p className="text-xs text-[#817780] mt-0.5">
              TK-PRINT Commercial Operations Hub
            </p>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={() => setNewProductModal(true)}
              className="px-4 py-2 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'إضافة منتج جديد' : 'New Product'}</span>
            </button>
          )}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-[#F0E4E9] soft-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#817780]">
                    {language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
                  </span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-[#292329]">
                  {totalRevenue} ج.م
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                  ↑ +18.4% {language === 'ar' ? 'مقارنة بالشهر الماضي' : 'vs last month'}
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#F0E4E9] soft-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#817780]">
                    {language === 'ar' ? 'الطلبات قيد التجهيز' : 'Active Orders'}
                  </span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-[#292329]">
                  {pendingOrdersCount} {language === 'ar' ? 'طلبية' : 'orders'}
                </div>
                <span className="text-[10px] text-amber-600 font-bold block mt-1">
                  {language === 'ar' ? 'تحتاج طباعة وشحن' : 'Need fulfillment'}
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#F0E4E9] soft-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#817780]">
                    {language === 'ar' ? 'متوسط قيمة الطلب' : 'Average Order Value'}
                  </span>
                  <TrendingUp className="w-4 h-4 text-[#D982A5]" />
                </div>
                <div className="text-2xl font-black text-[#292329]">
                  {averageOrderValue} ج.م
                </div>
                <span className="text-[10px] text-[#817780] block mt-1 font-medium">
                  {totalOrdersCount} {language === 'ar' ? 'إجمالي الطلبات' : 'lifetime orders'}
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#F0E4E9] soft-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#817780]">
                    {language === 'ar' ? 'طلبات استوديو مخصصة' : 'Custom Studio Cases'}
                  </span>
                  <Palette className="w-4 h-4 text-[#D982A5]" />
                </div>
                <div className="text-2xl font-black text-[#292329]">
                  {customOrders.length}
                </div>
                <span className="text-[10px] text-[#D982A5] font-bold block mt-1">
                  {language === 'ar' ? 'ملفات تصاميم جاهزة' : 'Artwork print ready'}
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow">
              <h3 className="font-black text-base text-[#292329] mb-4">
                {language === 'ar' ? 'أحدث الطلبيات المستلمة' : 'Recent Customer Orders'}
              </h3>

              {orders.length === 0 ? (
                <p className="text-xs text-[#817780] text-center py-8">
                  {language === 'ar' ? 'لا توجد طلبيات بعد.' : 'No orders recorded yet.'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead>
                      <tr className="border-b border-[#F0E4E9] text-[#817780]">
                        <th className="pb-3 font-bold text-start">رقم الطلب</th>
                        <th className="pb-3 font-bold text-start">العميل</th>
                        <th className="pb-3 font-bold text-start">المحافظة</th>
                        <th className="pb-3 font-bold text-start">الإجمالي</th>
                        <th className="pb-3 font-bold text-start">الحالة</th>
                        <th className="pb-3 font-bold text-end">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0E4E9]">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-[#FFF8FA]">
                          <td className="py-3 font-mono font-bold text-[#D982A5]">{o.orderNumber}</td>
                          <td className="py-3 font-bold text-[#292329]">{o.customerName}</td>
                          <td className="py-3 text-[#817780]">{o.city}</td>
                          <td className="py-3 font-black text-[#292329]">{o.total} ج.م</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-bold rounded-full text-[10px]">
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 text-end">
                            <button
                              onClick={() => setActiveTab('orders')}
                              className="text-xs font-bold text-[#D982A5] hover:underline"
                            >
                              عرض التفاصيل
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0E4E9]">
              <h3 className="font-black text-base text-[#292329]">
                {language === 'ar' ? 'سجل وإدارة جميع الطلبيات' : 'All Customer Orders'} ({orders.length})
              </h3>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-[#817780] text-center py-12">
                {language === 'ar' ? 'لا توجد طلبيات مسجلة بعد في النظام.' : 'No orders recorded yet.'}
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-5 rounded-2xl border border-[#F0E4E9] bg-[#FFF8FA] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-base text-[#D982A5]">
                          {o.orderNumber}
                        </span>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                          {o.paymentMethod === 'cod' ? 'دفع عند الاستلام' : 'بطاقة بنكية'}
                        </span>
                        <span className="text-xs text-[#817780]">
                          {new Date(o.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                        </span>
                      </div>

                      <div className="mt-2 text-xs text-[#817780]">
                        <strong className="text-[#292329] font-bold">{o.customerName}</strong> • {o.phone} • {o.address}, {o.city}
                      </div>

                      {/* Items */}
                      <div className="mt-2 text-[11px] text-[#292329] flex flex-wrap gap-2">
                        {o.items.map((item, idx) => (
                          <span key={idx} className="bg-white px-2 py-0.5 rounded-lg border border-[#F0E4E9]">
                            {item.product?.nameAr || item.selectedModelName} (×{item.quantity})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status updater dropdown */}
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[10px] text-[#817780] block mb-1">
                          تحديث مرحلة الطلب:
                        </span>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            adminUpdateOrderStatus(o.id, e.target.value as OrderStatus)
                          }
                          className="bg-white border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs font-bold text-[#292329]"
                        >
                          <option value="Order Received">Order Received</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Printing / Customization">Printing</option>
                          <option value="Quality Check">Quality Check</option>
                          <option value="Ready for Shipping">Ready for Shipping</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="text-end font-black text-lg text-[#292329]">
                        {o.total} ج.م
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. CUSTOM ORDERS & ARTWORK TAB */}
        {activeTab === 'custom_orders' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow space-y-6">
            <h3 className="font-black text-base text-[#292329] pb-4 border-b border-[#F0E4E9]">
              {language === 'ar' ? 'ملفات الطباعة الأصلية للاستوديو' : 'Custom Artwork Queue & Print Files'}
            </h3>

            {customOrders.length === 0 ? (
              <div className="text-center py-12 text-[#817780]">
                <Palette className="w-12 h-12 mx-auto text-[#D982A5] mb-2 opacity-50" />
                <p className="text-xs">
                  {language === 'ar' ? 'لا توجد طلبات تصاميم مخصصة حالياً.' : 'No custom studio orders yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customOrders.map((co, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl border border-[#F0E4E9] bg-[#FFF8FA] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-black text-sm text-[#D982A5]">
                          {co.orderNumber}
                        </span>
                        <span className="text-xs text-[#817780]">{co.customerName}</span>
                      </div>

                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4 border border-[#F0E4E9] flex items-center justify-center p-2">
                        <img
                          src={
                            co.item.customDesign?.uploadedImageUrl ||
                            co.item.customDesign?.previewUrl ||
                            '/assets/logo.jpg'
                          }
                          alt="custom print"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="text-xs space-y-1 text-[#817780]">
                        <p>
                          📱 الهاتف: <strong className="text-[#292329]">{co.item.selectedModelName}</strong>
                        </p>
                        {co.item.customDesign?.text && (
                          <p>
                            ✍️ النص المطبوع:{' '}
                            <strong className="text-[#D982A5]">
                              &quot;{co.item.customDesign.text}&quot;
                            </strong>
                          </p>
                        )}
                        {co.item.customDesign?.customerNote && (
                          <p className="italic text-[11px] text-[#292329]">
                            ملاحظة العميل: &quot;{co.item.customDesign.customerNote}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#F0E4E9] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#817780]">
                        نوع الكفر: {co.item.selectedCaseType}
                      </span>
                      {co.item.customDesign?.uploadedImageUrl && (
                        <a
                          href={co.item.customDesign.uploadedImageUrl}
                          download="customer_artwork.png"
                          className="px-4 py-2 bg-[#D982A5] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>تحميل الملف الأصلي</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow space-y-6">
            <h3 className="font-black text-base text-[#292329] pb-4 border-b border-[#F0E4E9]">
              {language === 'ar' ? 'المنتجات الحالية' : 'Store Products'} ({products.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl border border-[#F0E4E9] bg-[#FFF8FA] flex flex-col justify-between"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-white mb-3">
                    <img src={p.images[0]} alt={p.nameEn} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#292329] line-clamp-1">{p.nameAr}</h4>
                    <span className="text-xs font-black text-[#D982A5] block mt-0.5">
                      {p.salePrice || p.price} ج.م
                    </span>
                    <span className="text-[10px] text-[#817780] block mt-1">
                      المخزون: {p.stock} قطعة • التقييم: {p.rating} ★
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. COMMUNITY MODERATION TAB */}
        {activeTab === 'community' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F0E4E9] soft-shadow space-y-6">
            <h3 className="font-black text-base text-[#292329] pb-4 border-b border-[#F0E4E9]">
              {language === 'ar' ? 'مراجعة صور ومشاركات العملاء' : 'Customer Photo Submissions'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {communityPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl border border-[#F0E4E9] bg-[#FFF8FA] flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3">
                      <img src={post.imageUrl} alt="submission" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-xs text-[#292329]">{post.customerName}</h4>
                    <p className="text-[11px] text-[#817780] mt-1 italic">&quot;{post.caption}&quot;</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0E4E9] flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        post.isApproved
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {post.isApproved ? 'معتمد ومنشور ✓' : 'قيد المراجعة'}
                    </span>

                    {!post.isApproved && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => adminApproveCommunityPost(post.id)}
                          className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                          title="اعتماد"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => adminRejectCommunityPost(post.id)}
                          className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          title="رفض"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* New Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setNewProductModal(false)}
              className="absolute top-4 end-4 p-2 text-[#817780]"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-[#292329] mb-4">
              إضافة كفر هاتف جديد
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block mb-1 text-[#817780]">الاسم بالعربية</label>
                <input
                  type="text"
                  required
                  value={newProdNameAr}
                  onChange={(e) => setNewProdNameAr(e.target.value)}
                  placeholder="مثال: كفر باستيل الورد"
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#817780]">الاسم بالإنجليزية</label>
                <input
                  type="text"
                  required
                  value={newProdNameEn}
                  onChange={(e) => setNewProdNameEn(e.target.value)}
                  placeholder="e.g. Pastel Rose Case"
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#817780]">السعر (ج.م)</label>
                <input
                  type="number"
                  required
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#817780]">الفئة</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl p-2.5"
                >
                  <option value="cute">Cute & Coquette</option>
                  <option value="minimal">Minimal</option>
                  <option value="art">Art & Prints</option>
                  <option value="dark">Dark & Noir</option>
                  <option value="romantic">Romantic</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D982A5] text-white rounded-xl font-bold mt-4"
              >
                حفظ وإضافة المنتج
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
