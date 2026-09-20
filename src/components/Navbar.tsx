import React from 'react';

interface NavbarProps {
  onOpenContact: () => void;
  id?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, id }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id={id} className="relative z-30 w-full px-6 md:px-10 pt-6 md:pt-8 bg-transparent">
      <nav className="flex items-center justify-between text-[#0C0C0C] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.25rem]">
        <a
          id="nav-link-profile"
          href="#resume"
          onClick={(e) => scrollToSection(e, 'resume')}
          className="transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Profile
        </a>
        <a
          id="nav-link-reviews"
          href="#projects"
          onClick={(e) => scrollToSection(e, 'projects')}
          className="transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Reviews
        </a>
        <a
          id="nav-link-practical-log"
          href="#marquee"
          onClick={(e) => scrollToSection(e, 'marquee')}
          className="transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Practical Log
        </a>
        <button
          id="nav-link-contact"
          type="button"
          onClick={onOpenContact}
          className="uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Contact
        </button>
      </nav>
    </header>
  );
};
