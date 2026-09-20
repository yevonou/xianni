import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectData } from '../types';
import { ViewCaseButton } from './reusable/ViewCaseButton';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onViewCase: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onViewCase,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      id={`project-wrapper-${project.number}`}
      className="sticky top-24 md:top-32 h-[85vh] min-h-[640px] flex items-center justify-center"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        id={`project-card-${project.number}`}
        className="w-full bg-[#FFFFFF] border-2 border-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 shadow-[0_24px_80px_rgba(12,12,12,0.10)] flex flex-col justify-between overflow-hidden"
      >
        {/* Top Row: Number, category label, project name, View Case button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#0C0C0C]/15">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              id={`project-num-${project.number}`}
              className="font-black text-4xl sm:text-5xl md:text-6xl text-[#0C0C0C] leading-none"
            >
              {project.number}
            </span>
            <div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#0C0C0C]/60">
                {project.category}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#0C0C0C] tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="self-end sm:self-center">
            <ViewCaseButton
              id={`view-case-btn-${project.number}`}
              onClick={() => onViewCase(project)}
            />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid (Left 40% stacked 2 images, Right 60% 1 tall image) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 pt-4 sm:pt-6">
          {/* Left Column 40% */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div className="h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-[#0C0C0C]/10 bg-[#F4F4F6]">
              <img
                src={project.col1Image1}
                alt={`${project.name} - Erick Chen Evaluation Image 1`}
                loading="lazy"
                className="w-full h-full object-cover select-none hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="h-[clamp(160px,22vw,340px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-[#0C0C0C]/10 bg-[#F4F4F6]">
              <img
                src={project.col1Image2}
                alt={`${project.name} - Erick Chen Evaluation Image 2`}
                loading="lazy"
                className="w-full h-full object-cover select-none hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column 60% */}
          <div className="md:col-span-7 h-full min-h-[260px] md:min-h-[auto]">
            <div className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-[#0C0C0C]/10 bg-[#F4F4F6]">
              <img
                src={project.col2Image}
                alt={`${project.name} - Erick Chen Main Architecture & Interface`}
                loading="lazy"
                className="w-full h-full object-cover select-none hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
