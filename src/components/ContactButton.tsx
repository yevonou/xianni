import React from 'react';
import { Magnet } from './reusable/Magnet';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  id?: string;
  useMagnet?: boolean;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  id,
  useMagnet = true,
}) => {
  const buttonContent = (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-between rounded-full bg-[#0C0C0C] text-[#FFFFFF] border border-[#0C0C0C] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(118,33,176,0.35)] hover:border-[#7621B0] active:scale-98 cursor-pointer select-none ${className}`}
    >
      <span className="whitespace-nowrap">Work With Me</span>
      {/* Tiny 6px green dot inside the right side of the pill on hover / active */}
      <span className="ml-3 sm:ml-4 inline-block w-1.5 h-1.5 rounded-full bg-[#1FD66E] transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-125 shadow-[0_0_6px_#1FD66E]" />
    </button>
  );

  if (useMagnet) {
    return <Magnet padding={150} strength={3}>{buttonContent}</Magnet>;
  }

  return buttonContent;
};
