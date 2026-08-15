import React, { useState } from 'react';
import { PILLARS } from '../data/portfolioData';
import { Pillar, AccentColor } from '../types';
import { ArrowUpRight, DollarSign, Cpu, Globe, CheckCircle2, ChevronRight } from 'lucide-react';

interface PillarsSectionProps {
  accentColor: AccentColor;
  onSelectPillar?: (pillar: Pillar) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  accentColor,
  onSelectPillar
}) => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-emerald-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-emerald-400" />;
      default: return <DollarSign className="w-6 h-6 text-emerald-400" />;
    }
  };

  const activePillar = PILLARS[activePillarIndex];

  return (
    <section id="pillars-section" className="py-24 relative bg-[#060907] border-t border-emerald-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Mission Header matching reference */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-500">
            THE STUDIO MISSION
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            We believe in a world where design moves freely— across platforms
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-light pt-2">
            Building future digital product ecosystems built on three core pillars:
          </p>
        </div>

        {/* 3 Pillar Cards matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => {
            const isActive = activePillarIndex === idx;
            return (
              <div
                key={pillar.number}
                id={`pillar-card-${idx}`}
                onClick={() => setActivePillarIndex(idx)}
                className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[320px] group ${
                  isActive
                    ? 'bg-emerald-950/30 border-2 border-emerald-500/60 shadow-xl shadow-emerald-500/10'
                    : 'glass-panel glass-panel-hover border border-emerald-900/30 hover:border-emerald-500/40'
                }`}
              >
                {/* Top Arrow Button matching reference top-right circle arrow */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-500 font-semibold tracking-wider">
                    {pillar.number}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-black border-emerald-400'
                      : 'bg-zinc-900/80 border-white/10 text-zinc-400 group-hover:text-white group-hover:border-emerald-400/50'
                  }`}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Center 3D Graphics representation */}
                <div className="my-8 flex justify-center items-center">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
                    isActive ? 'bg-emerald-500/20 border border-emerald-400/40 shadow-lg shadow-emerald-500/20' : 'bg-black/40 border border-white/5'
                  }`}>
                    {getIcon(pillar.iconName)}
                  </div>
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Pillar Interactive Deep-Dive Drawer/Panel */}
        <div className="mt-12 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-emerald-900/40 pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Pillar {activePillar.number} Deep Dive
              </span>
              <h4 className="text-2xl font-bold text-white mt-1">
                {activePillar.title} — {activePillar.subtitle}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {activePillar.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-semibold text-white">Algorithmic Precision</h5>
                <p className="text-xs text-zinc-400 mt-1">Zero-variance token logic and pixel-perfect layouts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-semibold text-white">3D Spatial Physics</h5>
                <p className="text-xs text-zinc-400 mt-1">Real-time webGL motion and tactile feedback layers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-semibold text-white">Enterprise Scalability</h5>
                <p className="text-xs text-zinc-400 mt-1">Cross-platform design token sync with 99.8% uptime.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
