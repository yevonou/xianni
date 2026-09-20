import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ViewCaseButtonProps {
  onClick?: () => void;
  className?: string;
  id?: string;
  label?: string;
}

export const ViewCaseButton: React.FC<ViewCaseButtonProps> = ({
  onClick,
  className = '',
  id,
  label = 'View Case',
}) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-200 hover:bg-[#0C0C0C]/10 active:scale-95 cursor-pointer select-none ${className}`}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
};
