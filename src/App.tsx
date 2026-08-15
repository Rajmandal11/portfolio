import React, { useState, useEffect } from 'react';
import { Background3DCanvas } from './components/Background3DCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { InteractiveLabSection } from './components/InteractiveLabSection';
import { ProjectsGrid } from './components/ProjectsGrid';
import { AchievementsSection } from './components/AchievementsSection';
import { GitHubSection } from './components/GitHubSection';
import { TimelineSection } from './components/TimelineSection';
import { EducationSection } from './components/EducationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Footer } from './components/Footer';
import { AdminDrawer } from './components/AdminDrawer';
import { AudioSynthesizer } from './components/AudioSynthesizer';
import { ChangeImageModal } from './components/ChangeImageModal';
import { HowToGuideModal } from './components/HowToGuideModal';
import { LoadingScreen } from './components/LoadingScreen';
import { PROJECTS as INITIAL_PROJECTS } from './data/portfolioData';
import { AccentColor, Project } from './types';
import profileImageAsset from './assets/images/r.jpeg';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [accentColor, setAccentColor] = useState<AccentColor>('cyan');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [adminOpen, setAdminOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[]>(INITIAL_PROJECTS);
  const [profileImage, setProfileImage] = useState<string>(profileImageAsset);
  const [isChangeImageOpen, setIsChangeImageOpen] = useState(false);
  const [isHowToGuideOpen, setIsHowToGuideOpen] = useState(false);

  // Sync root CSS variables with accent color preset selection
  useEffect(() => {
    const root = document.documentElement;
    const themeMap: Record<AccentColor, { primary: string; glow: string; border: string; bg: string }> = {
      cyan: {
        primary: '#38bdf8',
        glow: 'rgba(56, 189, 248, 0.25)',
        border: 'rgba(56, 189, 248, 0.35)',
        bg: 'rgba(56, 189, 248, 0.08)'
      },
      emerald: {
        primary: '#10b981',
        glow: 'rgba(16, 185, 129, 0.25)',
        border: 'rgba(16, 185, 129, 0.3)',
        bg: 'rgba(16, 185, 129, 0.08)'
      },
      violet: {
        primary: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.25)',
        border: 'rgba(139, 92, 246, 0.3)',
        bg: 'rgba(139, 92, 246, 0.08)'
      },
      gold: {
        primary: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.25)',
        border: 'rgba(245, 158, 11, 0.3)',
        bg: 'rgba(245, 158, 11, 0.08)'
      }
    };

    const currentTheme = themeMap[accentColor];
    root.style.setProperty('--accent-primary', currentTheme.primary);
    root.style.setProperty('--accent-glow', currentTheme.glow);
    root.style.setProperty('--accent-border', currentTheme.border);
    root.style.setProperty('--accent-bg', currentTheme.bg);
  }, [accentColor]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddProject = (newProject: Project) => {
    setProjectsList((prev) => [newProject, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#020610] text-slate-100 selection:bg-sky-400 selection:text-black relative overflow-x-hidden">
      {/* Persistent Full-Page Ambient Grid & Glowing Light-Blue Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />

      {/* Atmospheric Radial Light Blue Glow Orbs along entire page height */}
      <div className="fixed -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[140px] pointer-events-none z-0 animate-cyan-glow" />
      <div className="fixed top-[30%] -right-40 w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none z-0 animate-pulse" />
      <div className="fixed top-[65%] -left-40 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-sky-400/10 blur-[140px] pointer-events-none z-0 animate-cyan-glow" />

      {/* 3D Floating WebGL Background Canvas */}
      <Background3DCanvas accentColor={accentColor} />

      {/* Main Page Layout Stack */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <Navbar
          accentColor={accentColor}
          onAccentChange={setAccentColor}
          onOpenContact={() => scrollTo('contact-section')}
          activeSection={activeSection}
        />

        {/* Hero Section */}
        <Hero
          accentColor={accentColor}
          profileImage={profileImage}
          onExploreLab={() => scrollTo('interactive-lab')}
          onOpenContact={() => scrollTo('contact-section')}
          onOpenChangeImage={() => setIsChangeImageOpen(true)}
          onOpenHowToGuide={() => setIsHowToGuideOpen(true)}
        />

        {/* About Section */}
        <AboutSection
          accentColor={accentColor}
          profileImage={profileImage}
          onOpenChangeImage={() => setIsChangeImageOpen(true)}
        />

        {/* Skills Arsenal Section */}
        <SkillsSection accentColor={accentColor} />

        {/* Core Spotlight: Interactive Prototype Stage */}
        <InteractiveLabSection
          accentColor={accentColor}
          onOpenProject={setSelectedProject}
        />

        {/* Featured Projects Grid */}
        <ProjectsGrid
          accentColor={accentColor}
          projects={projectsList}
          onOpenProject={setSelectedProject}
          onAddNewProject={() => setAdminOpen(true)}
          onOpenHowToGuide={() => setIsHowToGuideOpen(true)}
        />

        {/* Awards & Certifications */}
        <AchievementsSection accentColor={accentColor} />

        {/* Open Source & GitHub Contribution Activity */}
        <GitHubSection accentColor={accentColor} />

        {/* Career Timeline */}
        <TimelineSection accentColor={accentColor} />

        {/* Education Background */}
        <EducationSection accentColor={accentColor} />

        {/* Endorsements & Peer Reviews */}
        <TestimonialsSection accentColor={accentColor} />

        {/* Blog & Publications */}
        <BlogSection accentColor={accentColor} />

        {/* Contact Section */}
        <ContactSection accentColor={accentColor} />

        {/* Footer */}
        <Footer accentColor={accentColor} />
      </div>

      {/* Case Study Inspector Drawer Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accentColor={accentColor}
      />

      {/* Admin Panel Drawer */}
      <AdminDrawer
        isOpen={adminOpen}
        onToggle={() => setAdminOpen(!adminOpen)}
        onAddProject={handleAddProject}
        profileImage={profileImage}
        onUpdateProfileImage={(newUrl) => setProfileImage(newUrl)}
        onOpenHowToGuide={() => setIsHowToGuideOpen(true)}
      />

      {/* Change Image Modal */}
      <ChangeImageModal
        isOpen={isChangeImageOpen}
        onClose={() => setIsChangeImageOpen(false)}
        currentImage={profileImage}
        onSaveImage={(newUrl) => setProfileImage(newUrl)}
        accentColor={accentColor}
      />

      {/* How To Guide Modal */}
      <HowToGuideModal
        isOpen={isHowToGuideOpen}
        onClose={() => setIsHowToGuideOpen(false)}
        onOpenAddProject={() => setAdminOpen(true)}
        onOpenChangeImage={() => setIsChangeImageOpen(true)}
        accentColor={accentColor}
      />

      {/* High-Tech AI Boot Sequence Loading Screen */}
      {isLoading && (
        <LoadingScreen
          accentColor={accentColor}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Ambient Sound Synthesizer */}
      <AudioSynthesizer />
    </div>
  );
}
