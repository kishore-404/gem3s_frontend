'use client';

import Image from 'next/image';
import Logo from '@/public/logo.png';

interface NavbarProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
  showMenuButton?: boolean;
}

export default function Navbar({ onMenuToggle, isMobileMenuOpen, showMenuButton = false }: NavbarProps) {
  return (
    <nav className="w-full border-b-[3px] border-gray-300 px-6 py-4 bg-white flex items-center justify-between z-30 shrink-0 relative">
      <a href="/">
        <Image src={Logo} alt="Logo" className="h-8 w-auto" />
      </a>

      {showMenuButton && (
        <button 
          className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-1 transition-colors"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      )}
    </nav>
  );
}