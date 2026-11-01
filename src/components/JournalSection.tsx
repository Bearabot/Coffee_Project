import React, { useState } from 'react';
import { BookOpen, X, ArrowRight } from 'lucide-react';
import { JournalArticle } from '../types';

interface JournalSectionProps {
  articles: JournalArticle[];
}

export const JournalSection: React.FC<JournalSectionProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#857666] mb-2">
          <span>The Roastery Journal</span>
          <span aria-hidden="true">·</span>
          <span>Field Notes</span>
          <span aria-hidden="true">·</span>
          <span>Brewing Science</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18] tracking-tight [text-wrap:balance]">
          Stories from Soil to Cup
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#615546]">
          Essays on direct sourcing in the Andes, the ancient geometry of Uji matcha, and mineral extraction chemistry.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group flex flex-col justify-between bg-[#FAF7F2] rounded-2xl border border-[#E3DAC8] p-6 hover:border-[#C5B59E] hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div>
              {/* Unboxed Zero-Pill Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C7D6D] mb-3">
                <span className="text-[#A86E38] font-semibold">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedDate}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-bold text-[#1E1B18] group-hover:text-[#A86E38] transition-colors leading-snug">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-[#5C5243] mt-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Author & Read Link */}
            <div className="mt-6 pt-4 border-t border-[#EAE3D4] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#1E1B18]">{article.author.name}</div>
                <div className="text-[10px] text-[#8C7D6D] font-mono">{article.author.role}</div>
              </div>

              <span className="text-xs font-semibold text-[#1E1B18] group-hover:text-[#A86E38] flex items-center gap-1 transition-colors">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative bg-[#FAF7F2] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#DECDB3] shadow-2xl p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 text-[#7D6E5D] hover:text-[#1E1B18] rounded-full hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C7E6E] mb-3">
              <span className="text-[#A86E38] font-bold">{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.publishedDate}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1B17] leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="mt-3 pb-6 border-b border-[#EAE3D4] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E5DBC7] flex items-center justify-center font-serif font-bold text-[#1F1B17]">
                {selectedArticle.author.name.charAt(0)}
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#1F1B17]">{selectedArticle.author.name}</div>
                <div className="text-[#847766] font-mono">{selectedArticle.author.role}</div>
              </div>
            </div>

            {/* Article Content */}
            <div className="mt-6 space-y-6 text-[#453C31] text-sm sm:text-base leading-relaxed">
              <p className="font-serif text-lg italic text-[#594E3F] border-l-2 border-[#D97736] pl-4">
                "{selectedArticle.excerpt}"
              </p>

              {selectedArticle.contentSections.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#1F1B17]">
                    {section.heading}
                  </h3>
                  <p className="leading-relaxed text-[#4A4034]">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE3D4] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-[#1F1B17] hover:bg-[#35302A] text-white text-xs font-medium rounded-lg cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
