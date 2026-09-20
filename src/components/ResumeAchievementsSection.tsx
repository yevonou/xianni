import React from 'react';
import { RESUME_ACHIEVEMENTS } from '../constants/assets';
import { FadeIn } from './reusable/FadeIn';
import { AnimatedText } from './reusable/AnimatedText';

export const ResumeAchievementsSection: React.FC = () => {
  return (
    <section
      id="resume"
      className="relative w-full min-h-screen bg-[#FFFFFF] text-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <h2
              id="resume-heading"
              className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]"
            >
              What I Decode
            </h2>
          </div>

          {/* One-line summary using AnimatedText */}
          <div className="mt-6 sm:mt-8 max-w-[760px]">
            <AnimatedText
              id="resume-summary-animated"
              text="Erick Chen turns fast-moving AI products into clear reviews, practical tutorials, product breakdowns, and responsible technology judgment."
              className="text-base sm:text-lg md:text-xl text-[#0C0C0C]/70"
            />
          </div>
        </div>

        {/* Achievement Timeline / List */}
        <div className="border-t border-[#0C0C0C]/15">
          {RESUME_ACHIEVEMENTS.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.1}
              id={`achievement-row-${item.number}`}
              className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 relative group"
            >
              <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-6 md:gap-12">
                {/* Left: Giant Number + Active Purple Line Indicator */}
                <div className="flex items-center gap-4 shrink-0">
                  {item.isCurrent ? (
                    <div className="w-[2px] h-12 bg-[#7621B0] shrink-0" title="Active Focus" />
                  ) : (
                    <div className="w-[2px] h-12 bg-transparent shrink-0" />
                  )}
                  <span
                    id={`achievement-number-${item.number}`}
                    className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none select-none tracking-tight"
                  >
                    {item.number}
                  </span>
                </div>

                {/* Right: Category/Label, Title, Description */}
                <div className="flex-1 max-w-3xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#0C0C0C]/60">
                      {item.category}
                    </span>
                    {item.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase bg-[#1FD66E]/10 text-[#0C0C0C] font-medium border border-[#1FD66E]/30">
                        <span className="w-2 h-2 rounded-full bg-[#1FD66E] shadow-[0_0_6px_#1FD66E]" />
                        Active Log
                      </span>
                    )}
                  </div>

                  <h3 className="text-[#0C0C0C] font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] leading-snug tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-[#0C0C0C]/65 font-light leading-relaxed text-[clamp(0.85rem,1.6vw,1.25rem)] max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
