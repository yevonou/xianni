import React from 'react';
import { PROJECTS_DATA } from '../constants/assets';
import { ProjectCard } from './ProjectCard';
import { ProjectData } from '../types';

interface ProjectsSectionProps {
  onViewCase: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onViewCase }) => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#FAFAFA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <h2
              id="projects-heading"
              className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]"
            >
              Practical Work
            </h2>
            {/* Tiny Accent: a purple slash or green dot near the heading */}
            <span className="text-[#7621B0] font-light text-[clamp(2.5rem,10vw,140px)] select-none">
              /
            </span>
            <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#1FD66E] shadow-[0_0_8px_#1FD66E]" />
          </div>
          <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#0C0C0C]/60 font-medium max-w-xl">
            Verified testing notes, workflow methodologies, and architectural benchmarks by Erick Chen
          </p>
        </div>

        {/* Sticky Project Cards Stack */}
        <div className="relative pb-24">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
              onViewCase={onViewCase}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
