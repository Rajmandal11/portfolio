import React, { useState, useEffect, useRef } from 'react';
import { AccentColor } from '../types';
import { Sparkles, ArrowUpRight, Menu, X, Circle, Palette, ChevronDown, Check } from 'lucide-react';

interface NavbarProps {
  accentColor: AccentColor;
  onAccentChange: (color: AccentColor) => void;
  onOpenContact: () => void;
  activeSection: string;
}

interface ThemePreset {
  id: AccentColor;
  name: string;
  tagline: string;
  dotClass: string;
  badgeClass: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'cyan',
    name: 'Arctic Light Blue',
    tagline: 'Electric sky blue stream & crystalline atmosphere',
    dotClass: 'bg-sky-400',
    badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30'
  },
  {
    id: 'emerald',
    name: 'Midnight Emerald',
    tagline: 'Deep obsidian canvas with matrix green glow',
    dotClass: 'bg-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    tagline: 'Neural purple spectrum with violet highlights',
    dotClass: 'bg-violet-400',
    badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/30'
  },
  {
    id: 'gold',
    name: 'Solar Gold',
    tagline: 'Warm amber glow & golden energy vectors',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  }
];

export const Navbar: React.FC<NavbarProps> = ({
  accentColor,
  onAccentChange,
  onOpenContact,
  activeSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentPreset = THEME_PRESETS.find(p => p.id === accentColor) || THEME_PRESETS[0];

  const accentStyles: Record<AccentColor, { glow: string; text: string; bg: string; border: string }> = {
    emerald: {
      glow: 'shadow-emerald-500/20',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500',
      border: 'border-emerald-500/30'
    },
    cyan: {
      glow: 'shadow-sky-500/20',
      text: 'text-sky-400',
      bg: 'bg-sky-400',
      border: 'border-sky-500/30'
    },
    violet: {
      glow: 'shadow-violet-500/20',
      text: 'text-violet-400',
      bg: 'bg-violet-500',
      border: 'border-violet-500/30'
    },
    gold: {
      glow: 'shadow-amber-500/20',
      text: 'text-amber-400',
      bg: 'bg-amber-500',
      border: 'border-amber-500/30'
    }
  };

  const currentAccent = accentStyles[accentColor];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030604]/90 backdrop-blur-md border-b border-emerald-950/50 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          id="brand-logo-link"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center group-hover:border-emerald-400 transition-colors shadow-lg">
            <span className={`w-3.5 h-3.5 rounded-sm ${currentAccent.bg} shadow-sm animate-pulse`} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white text-lg font-mono group-hover:text-emerald-400 transition-colors">
              RAJ MANDAL<span className="text-emerald-400">.</span>AI
            </span>
            <span className="text-[10px] tracking-widest text-emerald-400/70 uppercase -mt-1 font-mono">
              AI & ML Engineer
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-6 text-xs font-mono font-medium tracking-wider uppercase text-zinc-400">
          <button
            onClick={() => scrollTo('about-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'about' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollTo('skills-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'skills' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Arsenal
          </button>
          <button
            onClick={() => scrollTo('projects-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'projects' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo('achievements-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'achievements' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Awards
          </button>
          <button
            onClick={() => scrollTo('github-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'github' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            GitHub
          </button>
          <button
            onClick={() => scrollTo('timeline-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'timeline' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => scrollTo('education-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'education' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Education
          </button>
          <button
            onClick={() => scrollTo('blog-section')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 'blog' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Blog
          </button>
        </nav>

        {/* Right Actions & Theme Presets Dropdown */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Theme Presets Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="theme-presets-dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-black/80 border border-emerald-900/50 hover:border-emerald-400/80 transition-all font-mono text-xs text-zinc-300 hover:text-white shadow-lg"
              title="Select Color Scheme & Theme Preset"
            >
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] uppercase text-zinc-500 tracking-wider hidden xl:inline">Theme:</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${currentPreset.dotClass} shadow-sm`} />
                <span>{currentPreset.name}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Panel */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#070D0A]/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 font-mono text-xs">
                <div className="px-3 py-2 border-b border-emerald-950/80 mb-1 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Theme Presets</span>
                  <span className="text-[9px] text-zinc-500">CSS Variables Sync</span>
                </div>

                <div className="space-y-1">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = accentColor === preset.id;
                    return (
                      <button
                        key={preset.id}
                        id={`preset-option-${preset.id}`}
                        onClick={() => {
                          onAccentChange(preset.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                          isSelected
                            ? 'bg-emerald-950/60 border border-emerald-500/40 text-white'
                            : 'hover:bg-zinc-900/80 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="mt-0.5">
                          <span className={`w-3.5 h-3.5 rounded-full block ${preset.dotClass} shadow-md group-hover:scale-110 transition-transform`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{preset.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>
                          <p className="text-[10px] text-zinc-500 leading-tight mt-0.5 font-sans line-clamp-1">
                            {preset.tagline}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Connect Button */}
          <button
            id="navbar-connect-btn"
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium tracking-wide hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-white transition-all duration-300 shadow-lg shadow-emerald-950/50"
          >
            <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 animate-pulse" />
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070C09]/95 backdrop-blur-xl border-b border-emerald-900/40 px-6 py-6 flex flex-col gap-3 font-mono text-sm text-zinc-300">
          <button onClick={() => scrollTo('about-section')} className="text-left py-1.5 hover:text-emerald-400">About</button>
          <button onClick={() => scrollTo('skills-section')} className="text-left py-1.5 hover:text-emerald-400">Arsenal & Skills</button>
          <button onClick={() => scrollTo('projects-section')} className="text-left py-1.5 hover:text-emerald-400">Projects</button>
          <button onClick={() => scrollTo('achievements-section')} className="text-left py-1.5 hover:text-emerald-400">Awards & Certifications</button>
          <button onClick={() => scrollTo('github-section')} className="text-left py-1.5 hover:text-emerald-400">GitHub Activity</button>
          <button onClick={() => scrollTo('timeline-section')} className="text-left py-1.5 hover:text-emerald-400">Timeline</button>
          <button onClick={() => scrollTo('education-section')} className="text-left py-1.5 hover:text-emerald-400">Education</button>
          <button onClick={() => scrollTo('blog-section')} className="text-left py-1.5 hover:text-emerald-400">Blog Articles</button>
          <button onClick={() => scrollTo('contact-section')} className="text-left py-1.5 hover:text-emerald-400">Contact</button>
          
          <div className="pt-4 border-t border-emerald-950 flex flex-col gap-2">
            <span className="text-xs text-zinc-400 font-mono">Theme Presets</span>
            <div className="grid grid-cols-2 gap-2">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onAccentChange(preset.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl border text-left text-xs font-mono flex items-center gap-2 ${
                    accentColor === preset.id
                      ? 'bg-emerald-950 border-emerald-400 text-white'
                      : 'bg-black/60 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${preset.dotClass}`} />
                  <span className="truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full mt-3 py-3 rounded-xl bg-emerald-500 text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Let's Talk & Hire Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
