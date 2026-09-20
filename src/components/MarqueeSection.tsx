import React, { useEffect, useRef, useState } from 'react';
import { MARQUEE_GIFS_ROW_1, MARQUEE_GIFS_ROW_2 } from '../constants/assets';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            // Formula: (window.scrollY - sectionTop + window.innerHeight) * 0.3
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Triple items for seamless horizontal scroll
  const tripledRow1 = [...MARQUEE_GIFS_ROW_1, ...MARQUEE_GIFS_ROW_1, ...MARQUEE_GIFS_ROW_1];
  const tripledRow2 = [...MARQUEE_GIFS_ROW_2, ...MARQUEE_GIFS_ROW_2, ...MARQUEE_GIFS_ROW_2];

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative w-full bg-[#FFFFFF] pt-12 sm:pt-16 md:pt-20 pb-10 overflow-hidden"
    >
      {/* Heading above rows */}
      <div className="px-5 sm:px-8 md:px-10 mb-10">
        <div className="flex items-center gap-3">
          <h2
            id="marquee-heading"
            className="text-[#0C0C0C] uppercase font-black tracking-tight text-[clamp(2.4rem,8vw,110px)] leading-none"
          >
            Tested Interfaces
          </h2>
          <span className="hidden md:inline-block w-3 h-3 rounded-full bg-[#1FD66E]" />
        </div>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest text-[#0C0C0C]/60 font-medium">
          Real-time interface telemetry and live multimodal testing log
        </p>
      </div>

      {/* Marquee Row 1 (Moves Right on scroll) */}
      <div className="w-full overflow-hidden mb-3">
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: row1Transform,
          }}
        >
          {tripledRow1.map((url, i) => (
            <div
              key={`row1-${i}`}
              className="shrink-0 w-[78vw] max-w-[420px] aspect-[420/270] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden border border-[#0C0C0C]/15 bg-[#F5F5F7] shadow-sm"
            >
              <img
                src={url}
                alt={`Erick Chen AI Interface Evaluation Frame ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover select-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Moves Left on scroll) */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: row2Transform,
          }}
        >
          {tripledRow2.map((url, i) => (
            <div
              key={`row2-${i}`}
              className="shrink-0 w-[78vw] max-w-[420px] aspect-[420/270] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden border border-[#0C0C0C]/15 bg-[#F5F5F7] shadow-sm"
            >
              <img
                src={url}
                alt={`Erick Chen AI Interface Evaluation Frame ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
