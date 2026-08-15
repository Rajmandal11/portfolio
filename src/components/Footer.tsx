import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AccentColor } from '../types';
import { ArrowUp, Download, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  accentColor: AccentColor;
}

export const Footer: React.FC<FooterProps> = ({ accentColor }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPortfolio = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PERSONAL_INFO, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "raj-mandal-portfolio.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <footer className="bg-[#030504] border-t border-emerald-950/60 py-12 text-xs font-mono text-zinc-500 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-emerald-950/60 pb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm">
              RM
            </div>
            <span className="font-bold tracking-tight text-white text-base font-mono">
              RAJ MANDAL<span className="text-emerald-400">.</span>AI
            </span>
          </div>

          {/* System Status Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-900/40 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI Systems & 3D WebGL Status: Operational</span>
          </div>

          {/* Back to top & Download button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPortfolio}
              className="px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Portfolio</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-zinc-900 border border-emerald-900/40 text-zinc-400 hover:text-white hover:border-emerald-500/40 transition-all flex items-center gap-1.5"
            >
              <span>Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Navigation Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400">
          <p className="flex items-center gap-1.5">
            <span>© 2026 Raj Mandal. Built with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 inline fill-emerald-400" />
            <span>& AI 3D Architecture.</span>
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] text-zinc-500">
            <a href="#about-section" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#skills-section" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#projects-section" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#achievements-section" className="hover:text-emerald-400 transition-colors">Awards</a>
            <a href="#timeline-section" className="hover:text-emerald-400 transition-colors">Timeline</a>
            <a href="#education-section" className="hover:text-emerald-400 transition-colors">Education</a>
            <a href="#blog-section" className="hover:text-emerald-400 transition-colors">Blog</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
