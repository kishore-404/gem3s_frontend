'use client';

import Image from 'next/image';
import Logo from '@/public/logo.png';

export default function Navbar() {
  return (
    <nav className="w-full border-b-[3px] border-gray-300 px-8 py-5 bg-white flex items-center">
     <a href="/">
      <Image src={Logo} alt="Logo" className="h-8 w-auto" /></a>
    </nav>
  );
}