import React from 'react';
import { ArrowUp, Terminal, Radio } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className="relative w-full bg-[#FAFAFA] border-t border-[#0C0C0C]/15 px-6 md:px-10 py-12 sm:py-16 text-[#0C0C0C]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Brand Identity & Telemetry */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1FD66E] shadow-[0_0_6px_#1FD66E]" />
            <h4 className="font-black text-lg sm:text-xl uppercase tracking-tight text-[#0C0C0C]">
              Erick Chen
            </h4>
            <span className="text-[#0C0C0C]/30">//</span>
            <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/60 font-medium">
              AI Product Practical Log
            </span>
          </div>
          <p className="text-xs uppercase tracking-wider text-[#0C0C0C]/50 max-w-sm">
            Continuous field evaluation of frontier AI agents, generative reasoning models, and reproducible creator workflows.
          </p>
        </div>

        {/* Center: System Status Indicator */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#0C0C0C]/15 bg-[#F9F9FB] text-xs font-mono uppercase tracking-wider text-[#0C0C0C]/70">
          <Radio className="w-3.5 h-3.5 text-[#7621B0] animate-pulse" />
          <span>STATUS: FIELD TESTS ACTIVE</span>
          <span className="text-[#0C0C0C]/20">|</span>
          <span className="text-[#1FD66E]">2026 EDITION</span>
        </div>

        {/* Right: Quick actions & Scroll to top */}
        <div className="flex items-center gap-4">
          <button
            id="footer-contact-button"
            type="button"
            onClick={onOpenContact}
            className="text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-full border border-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white transition-all cursor-pointer"
          >
            Connect With Erick
          </button>
          <button
            id="scroll-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2.5 rounded-full border border-[#0C0C0C]/20 hover:border-[#0C0C0C] hover:bg-[#0C0C0C]/5 transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-[#0C0C0C]" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#0C0C0C]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-[#0C0C0C]/40 gap-4">
        <span>© {new Date().getFullYear()} ERICK CHEN. ALL TECHNICAL LOGS RESERVED.</span>
        <span>CLEAN WHITE STUDIO EDITION // NO OVERLAYS</span>
      </div>
    </footer>
  );
};
