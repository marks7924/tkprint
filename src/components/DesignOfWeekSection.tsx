'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { INITIAL_DESIGN_OF_WEEK } from '@/data/mock-db';
import { Sparkles, ThumbsUp, Check } from 'lucide-react';

export const DesignOfWeekSection: React.FC = () => {
  const { language } = useLanguage();
  const [candidates, setCandidates] = useState(INITIAL_DESIGN_OF_WEEK);
  const [votedId, setVotedId] = useState<string | null>(null);

  const handleVote = (id: string) => {
    if (votedId) return; // Prevent duplicate voting
    setVotedId(id);
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );
  };

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <section className="py-14 bg-white border-b border-[#F0E4E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F4] border border-[#EFA6C1]/40 rounded-full text-xs font-bold text-[#D982A5] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تصويت المجتمع الأسبوعي' : 'Weekly Community Vote'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#292329] tracking-tight">
            {language === 'ar' ? 'تصميم الأسبوع القادم — صوّت لتصميمك المفضل' : 'Design of the Week — Cast Your Vote'}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#817780]">
            {language === 'ar'
              ? 'التصميم الحاصل على أكبر عدد من الأصوات سيتم إنتاجه رسمياً وطرحه بخصم خاص 20% يوم الجمعة!'
              : 'The design with the most votes gets officially printed and released at 20% off this Friday!'}
          </p>
        </div>

        {/* Voting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((item) => {
            const hasVotedThis = votedId === item.id;
            const votePercent = totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0;

            return (
              <div
                key={item.id}
                className={`relative bg-[#FFF8FA] rounded-3xl p-5 border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                  hasVotedThis
                    ? 'border-[#D982A5] ring-2 ring-[#EFA6C1]/40'
                    : 'border-[#F0E4E9] hover:border-[#EFA6C1]'
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.titleEn}
                    className="w-full h-full object-cover"
                  />
                  {item.isWinner && (
                    <span className="absolute top-3 start-3 px-3 py-1 bg-[#D982A5] text-white text-[11px] font-black rounded-full shadow-xs">
                      {language === 'ar' ? 'متصدر التصويت 👑' : 'Top Voted 👑'}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-extrabold text-[#292329] text-base">
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </h3>
                  <span className="text-xs text-[#817780] block mt-0.5">
                    {language === 'ar' ? `المصمم: ${item.designer}` : `By ${item.designer}`}
                  </span>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#817780]">{item.votes} {language === 'ar' ? 'صوت' : 'votes'}</span>
                      <span className="text-[#D982A5]">{votePercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#EFA6C1] to-[#D982A5] rounded-full transition-all duration-500"
                        style={{ width: `${votePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Vote CTA */}
                <button
                  onClick={() => handleVote(item.id)}
                  disabled={Boolean(votedId)}
                  className={`mt-5 w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    hasVotedThis
                      ? 'bg-emerald-600 text-white'
                      : votedId
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      : 'bg-white hover:bg-[#FFF0F4] text-[#292329] border border-[#F0E4E9] hover:border-[#D982A5]'
                  }`}
                >
                  {hasVotedThis ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تم تسجيل صوتك!' : 'Voted!'}</span>
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-4 h-4 text-[#D982A5]" />
                      <span>{language === 'ar' ? 'صوّت لهذا التصميم' : 'Vote for this'}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

