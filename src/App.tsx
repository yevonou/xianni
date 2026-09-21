import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { ResumeAchievementsSection } from './components/ResumeAchievementsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { CaseModal } from './components/CaseModal';
import { ContactModal } from './components/ContactModal';
import { ProjectData } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] text-[#0C0C0C] overflow-x-clip selection:bg-[#7621B0] selection:text-white">
      {/* 1. HeroSection: GSAP Video Hero with 16:9 media shell and studio backdrop */}
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. MarqueeSection: Horizontal scrolling interfaces marquee */}
      <MarqueeSection />

      {/* 3. ResumeAchievementsSection: What I Decode - Personal record & achievements */}
      <ResumeAchievementsSection />

      {/* 4. ProjectsSection: Practical Work - Large sticky project card showcase */}
      <ProjectsSection onViewCase={(project) => setSelectedProject(project)} />

      {/* Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Case Details Interactive Modal */}
      <CaseModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Contact & Collaboration Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
