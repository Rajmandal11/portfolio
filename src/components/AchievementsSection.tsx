import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { Achievement, AccentColor } from '../types';
import { Award, ExternalLink, ShieldCheck, Sparkles, X } from 'lucide-react';

interface AchievementsSectionProps {
  accentColor: AccentColor;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ accentColor }) => {
  const [selectedCert, setSelectedCert] = useState<Achievement | null>(null);

  return (
    <section id="achievements-section" className="py-24 relative overflow-hidden bg-[#030604]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
            <span className="w-6 h-px bg-emerald-400" />
            <span>Awards & Certifications</span>
            <span className="w-6 h-px bg-emerald-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Recognized <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Excellence</span>
          </h2>
          <p className="text-zinc-400 text-sm font-sans mt-3">
            Industry specializations, academic certifications, and competitive machine learning achievements.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCert(item)}
              className="group p-6 rounded-3xl bg-[#080D0A]/90 border border-emerald-900/40 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-xs shadow-md">
                  {item.badge}
                </span>
              </div>

              {/* Body Content */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold font-mono text-white mt-1 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-emerald-400/80 mt-1">
                  {item.org}
                </p>
                {item.desc && (
                  <p className="text-xs text-zinc-400 mt-3 font-sans line-clamp-3 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>

              {/* Card Footer Inspect Pill */}
              <div className="mt-6 pt-4 border-t border-emerald-950/80 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">
                <span>Inspect Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>

              {/* Accent Hover Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#080D0A] border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 font-mono">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedCert.icon}</span>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400">{selectedCert.year} • Verified</span>
                <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-900/40 my-4 text-xs">
              <p className="text-emerald-400 font-bold mb-1">{selectedCert.org}</p>
              <p className="text-zinc-300 leading-relaxed font-sans">{selectedCert.desc}</p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
