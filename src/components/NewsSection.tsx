import React, { useState } from 'react';
import { PRESS_ARTICLES } from '../data/portfolioData';
import { PressArticle, AccentColor } from '../types';
import { ArrowUpRight, Newspaper, ExternalLink, Check } from 'lucide-react';

interface NewsSectionProps {
  accentColor: AccentColor;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ accentColor }) => {
  const [selectedArticle, setSelectedArticle] = useState<PressArticle | null>(null);

  return (
    <section id="news-section" className="py-24 relative bg-[#050806] border-t border-emerald-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header matching reference */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-500">
            IN THE NEWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Press & Recognition
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Stay updated with the latest developments, design system releases, and press announcements.
          </p>
        </div>

        {/* 3 Press Cards Grid matching reference bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESS_ARTICLES.map((article) => (
            <div
              key={article.id}
              id={`press-card-${article.id}`}
              onClick={() => setSelectedArticle(article)}
              className="relative rounded-2xl glass-panel glass-panel-hover border border-emerald-900/30 p-6 sm:p-8 flex flex-col justify-between cursor-pointer group min-h-[260px]"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 font-medium tracking-wider">
                  {article.publisher}
                </span>

                <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-zinc-400 font-light line-clamp-3">
                  {article.snippet}
                </p>
              </div>

              {/* Read Article CTA Button matching bottom right of reference cards */}
              <div className="pt-6 border-t border-emerald-950/80 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                  Read Article
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 text-zinc-400 group-hover:text-black group-hover:bg-emerald-400 group-hover:border-emerald-400 flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Press Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090E0B] border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
              <span className="text-xs font-mono text-emerald-400">
                {selectedArticle.publisher}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-zinc-500 hover:text-white text-xs font-mono"
              >
                [CLOSE]
              </button>
            </div>

            <h3 className="text-xl font-bold text-white leading-snug">
              {selectedArticle.title}
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {selectedArticle.snippet}
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-emerald-900/40 text-xs text-zinc-400 font-mono">
              Published on: {selectedArticle.date} — Verified Press Archive
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-lg bg-zinc-900 text-zinc-300 text-xs font-mono hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Opening press release: ${selectedArticle.title}`);
                  setSelectedArticle(null);
                }}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 text-black text-xs font-mono font-semibold flex items-center gap-2 hover:bg-emerald-400"
              >
                <span>Read Full Story</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
