'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useStore } from '@/context/StoreContext';
import { Heart, Sparkles, Camera, ArrowRight, ArrowLeft } from 'lucide-react';

export const CommunityGallerySection: React.FC = () => {
  const { language } = useLanguage();
  const { communityPosts, showToast } = useStore();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [caption, setCaption] = useState('');

  const approvedPosts = communityPosts.filter((p) => p.isApproved);

  const toggleLike = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts((prev) => prev.filter((p) => p !== id));
    } else {
      setLikedPosts((prev) => [...prev, id]);
      showToast('❤️ شكراً لتفاعلك!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    showToast(
      language === 'ar'
        ? 'تم استلام مشاركتك وسيقوم فريق العمل بمراجعتها واعتمادها قريباً! شكراً لك 🌸'
        : 'Thank you! Your photo was submitted for moderation and will appear soon!'
    );
    setCustomerName('');
    setDeviceModel('');
    setCaption('');
  };

  return (
    <section className="py-16 bg-white border-t border-[#F0E4E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-start">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F4] border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? '#TKPrintVibes في يد عملائنا' : '#TKPrintVibes in the wild'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#292329] tracking-tight">
              {language === 'ar' ? 'معرض المبدعين ومجتمع TK' : 'Community Gallery'}
            </h2>
            <p className="text-xs sm:text-sm text-[#817780] mt-1 font-medium">
              {language === 'ar'
                ? 'صور حقيقية أرسلها عملاؤنا مع كفراتهم المطبوعة بعد الاستخدام.'
                : 'Real photos shared by our happy customers styling their cases.'}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFF0F4] hover:bg-[#FFE3ED] text-[#D982A5] border border-[#EFA6C1]/40 font-bold rounded-2xl text-xs transition-colors shadow-2xs"
          >
            <Camera className="w-4 h-4" />
            <span>{language === 'ar' ? 'شارك صورة كفرك معنا' : 'Submit Your Photo'}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {approvedPosts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            const currentLikes = post.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={post.id}
                className="group relative bg-[#FFF8FA] rounded-3xl overflow-hidden border border-[#F0E4E9] hover:border-[#EFA6C1] transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                {/* Photo */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="absolute top-3 end-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#D982A5] text-[#D982A5]' : 'text-[#817780]'}`} />
                    <span className={isLiked ? 'text-[#D982A5]' : 'text-[#817780]'}>{currentLikes}</span>
                  </button>

                  {/* Device model tag */}
                  <span className="absolute bottom-3 start-3 px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                    {post.deviceModel}
                  </span>
                </div>

                {/* Caption and customer details */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-bold text-xs text-[#292329] mb-1">
                      {post.customerName}
                    </h4>
                    <p className="text-xs text-[#817780] leading-relaxed line-clamp-2">
                      &quot;{post.caption}&quot;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0E4E9] flex items-center justify-between">
                    <Link
                      href="/custom-studio"
                      className="text-xs font-bold text-[#D982A5] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{language === 'ar' ? 'اصنع شيئاً مشابهاً' : 'Create something similar'}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Submit Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[#F0E4E9]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 end-4 p-2 text-[#817780] hover:text-[#292329]"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-[#292329] mb-1">
              {language === 'ar' ? 'شارك صورتك في مجتمع TK-PRINT' : 'Share Your Phone Case Photo'}
            </h3>
            <p className="text-xs text-[#817780] mb-4">
              {language === 'ar'
                ? 'شاركنا إطلالة كفرك لننشرها في المعرض بعد مراجعتها من فريقنا!'
                : 'Share your aesthetic case styling to get featured in our gallery!'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#292329] block mb-1">
                  {language === 'ar' ? 'اسمك' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: ندى أحمد' : 'e.g. Nada Ahmed'}
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#292329] block mb-1">
                  {language === 'ar' ? 'موديل هاتفك' : 'Your Phone Model'}
                </label>
                <input
                  type="text"
                  required
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: iPhone 15 Pro' : 'e.g. iPhone 15 Pro'}
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#292329] block mb-1">
                  {language === 'ar' ? 'تعليقك أو رأيك في الكفر' : 'Caption / Thoughts'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={language === 'ar' ? 'كيف يبدو كفرك وملمسه؟' : 'How does your case look and feel?'}
                  className="w-full bg-[#FFF8FA] border border-[#F0E4E9] rounded-xl px-3 py-2 text-xs text-[#292329] focus:outline-none focus:ring-1 focus:ring-[#D982A5]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D982A5] hover:bg-[#c96d93] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إرسال الصورة للمراجعة' : 'Submit for Moderation'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

