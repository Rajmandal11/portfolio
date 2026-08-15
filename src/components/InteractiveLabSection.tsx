import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ViewMode, AccentColor } from '../types';
import {
  Sparkles,
  Eye,
  Box,
  Grid,
  Code,
  Copy,
  Check,
  Maximize2,
  Sliders,
  Play,
  Activity,
  ArrowRight,
  RefreshCw,
  Zap
} from 'lucide-react';

interface InteractiveLabProps {
  accentColor: AccentColor;
  onOpenProject: (project: Project) => void;
}

export const InteractiveLabSection: React.FC<InteractiveLabProps> = ({
  accentColor,
  onOpenProject
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [copiedTokens, setCopiedTokens] = useState(false);
  
  // Interactive prototype state inside the stage
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [metricMultiplier, setMetricMultiplier] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== 'tilt3d') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleCopyTokens = () => {
    navigator.clipboard.writeText(JSON.stringify(currentProject.designTokens, null, 2));
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2500);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      setMetricMultiplier(prev => (prev === 1.5 ? 1 : prev + 0.1));
      count++;
      if (count >= 5) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 200);
  };

  return (
    <section id="interactive-lab" className="py-24 relative bg-[#050806] border-t border-emerald-950/40">
      
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-emerald-950 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>LIVE PROTOTYPE STAGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Interactive Project Previews
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl font-light">
              Test drive real-time digital products, inspect design tokens, and toggle 3D wireframe layers.
            </p>
          </div>

          {/* View Mode Toolbar */}
          <div className="flex items-center gap-1.5 bg-black/80 border border-emerald-900/40 rounded-xl p-1.5 backdrop-blur-md">
            <button
              id="view-mode-preview"
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'preview'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>2D Preview</span>
            </button>

            <button
              id="view-mode-tilt3d"
              onClick={() => setViewMode('tilt3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'tilt3d'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Orbit</span>
            </button>

            <button
              id="view-mode-wireframe"
              onClick={() => setViewMode('wireframe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'wireframe'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Wireframe</span>
            </button>

            <button
              id="view-mode-tokens"
              onClick={() => setViewMode('tokens')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'tokens'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Tokens</span>
            </button>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none mb-8">
          {PROJECTS.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                id={`lab-project-tab-${proj.id}`}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveTab('Overview');
                }}
                className={`px-5 py-3 rounded-xl text-xs font-mono tracking-wide whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10'
                    : 'bg-zinc-950/40 border-emerald-950/40 text-zinc-400 hover:text-zinc-200 hover:border-emerald-800/40'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span>{proj.title}</span>
                <span className="text-[10px] text-zinc-500">({proj.category})</span>
              </button>
            );
          })}
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Stage: Interactive Visual Canvas */}
          <div className="lg:col-span-8 space-y-4">
            <div
              className="relative w-full rounded-2xl glass-panel border border-emerald-500/25 p-6 overflow-hidden min-h-[460px] flex flex-col justify-between"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                transform: viewMode === 'tilt3d' ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` : 'none',
                transition: 'transform 0.2s ease-out'
              }}
            >
              {/* Stage Top Header Bar */}
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    https://preview.aura.design/app/{currentProject.id}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    MODE: {viewMode.toUpperCase()}
                  </span>
                  <button
                    onClick={() => onOpenProject(currentProject)}
                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    title="Expand Full Case Study"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* VIEW MODE 1 & 2 & 3: Interactive Render / Wireframe / 3D */}
              {viewMode !== 'tokens' && (
                <div className="relative rounded-xl overflow-hidden border border-emerald-900/30 bg-black/60 p-6 flex-1 flex flex-col justify-between">
                  
                  {/* Wireframe Overlay Grid */}
                  {viewMode === 'wireframe' && (
                    <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-20 flex flex-col justify-between p-4 border border-emerald-400/30">
                      <div className="text-[10px] font-mono text-emerald-400">LAYOUT: 8-COLUMN GRID SYSTEM [32px GAP]</div>
                      <div className="text-[10px] font-mono text-emerald-400 text-right">FLEX CONTAINER :: FLEX-ROW</div>
                    </div>
                  )}

                  {/* Project Image & Live UI Mockup Layer */}
                  <div className="relative rounded-xl overflow-hidden mb-6 aspect-video group">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        viewMode === 'wireframe' ? 'opacity-30 filter grayscale' : 'group-hover:scale-105'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Interactive UI Mockup Overlay Cards */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
                      
                      {/* Interactive Nav Tabs inside Prototype */}
                      <div className="flex items-center justify-between bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 mb-3">
                        <div className="flex items-center gap-2">
                          {['Overview', 'Analytics', 'Settings'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                                activeTab === tab
                                  ? 'bg-emerald-500 text-black font-semibold'
                                  : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <div className="text-xs font-mono text-emerald-400 font-bold">
                          {activeTab === 'Overview' && currentProject.prototypeState.metricValue}
                          {activeTab === 'Analytics' && `Live Yield: ${(9.4 * metricMultiplier).toFixed(2)}%`}
                          {activeTab === 'Settings' && 'Node Status: Optimal'}
                        </div>
                      </div>

                      {/* Interactive Simulated Graph / Bar Meter */}
                      <div className="flex items-end gap-2 h-16 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
                        {currentProject.prototypeState.graphData.map((val, idx) => (
                          <div
                            key={idx}
                            className="flex-1 rounded-t bg-emerald-500/60 hover:bg-emerald-400 transition-all duration-300"
                            style={{ height: `${Math.min(100, val * metricMultiplier)}%` }}
                            title={`Data Point ${idx + 1}: ${(val * metricMultiplier).toFixed(1)}`}
                          />
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Interactive Micro-Action Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs hover:bg-emerald-500/30 transition-colors flex items-center gap-2"
                      >
                        {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isSimulating ? 'Simulating...' : 'Test Micro-Interaction'}</span>
                      </button>

                      <span className="text-xs text-zinc-400 font-mono">
                        Active View: <span className="text-white font-semibold">{activeTab}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenProject(currentProject)}
                      className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
                    >
                      <span>Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              )}

              {/* VIEW MODE 4: Design Tokens Inspector */}
              {viewMode === 'tokens' && (
                <div className="rounded-xl bg-black/90 p-6 border border-emerald-900/50 font-mono text-xs text-emerald-400 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-emerald-950 pb-3">
                    <span className="text-zinc-400">// Design Tokens Export Format (W3C Standard)</span>
                    <button
                      onClick={handleCopyTokens}
                      className="px-3 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
                    >
                      {copiedTokens ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTokens ? 'Copied!' : 'Copy JSON'}</span>
                    </button>
                  </div>

                  <pre className="text-emerald-300 overflow-x-auto p-4 bg-zinc-950 rounded-lg border border-emerald-900/30 text-xs leading-relaxed">
{JSON.stringify(
  {
    $schema: "https://design-tokens.github.io/community-group/format/",
    project: currentProject.title,
    client: currentProject.client,
    tokens: currentProject.designTokens
  },
  null,
  2
)}
                  </pre>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase block">Primary</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentProject.designTokens.primaryColor }} />
                        {currentProject.designTokens.primaryColor}
                      </span>
                    </div>

                    <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase block">Surface</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentProject.designTokens.surfaceColor }} />
                        {currentProject.designTokens.surfaceColor}
                      </span>
                    </div>

                    <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase block">Font</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1 block truncate">
                        {currentProject.designTokens.typography}
                      </span>
                    </div>

                    <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase block">Grid Unit</span>
                      <span className="text-xs font-bold text-white mt-1 block">
                        {currentProject.designTokens.gridUnit}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Project Overview Card */}
            <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Featured Case Study
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {currentProject.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  {currentProject.client} — {currentProject.year}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {currentProject.summary}
              </p>

              {/* Impact Metrics Grid */}
              <div className="space-y-3 pt-4 border-t border-emerald-950">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Verified Impact Metrics
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {currentProject.impactMetrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-black/60 border border-emerald-900/40 text-center">
                      <p className="text-base font-bold font-mono text-emerald-400">{m.value}</p>
                      <p className="text-[9px] text-zinc-400 uppercase mt-0.5 line-clamp-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Deliverables
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.deliverables.map(del => (
                    <span key={del} className="px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/30 text-[11px] text-emerald-300 font-mono">
                      {del}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                id="lab-open-case-study-btn"
                onClick={() => onOpenProject(currentProject)}
                className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
              >
                <span>Launch Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
