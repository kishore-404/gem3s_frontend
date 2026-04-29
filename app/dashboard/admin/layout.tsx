'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // To highlight the active menu item
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Navbar />
      

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar (Desktop & Mobile Slide-out) */}
        <aside className={`
          absolute inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-300 flex flex-col transition-transform duration-300 ease-in-out shrink-0
          md:relative md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}>
          <div className="flex-1 flex flex-col">
            
            {/* Doctors Link */}
            <Link href="/dashboard/admin/doctor" onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`w-full py-6 text-center font-serif text-[17px] transition-colors border-b border-gray-300 ${pathname.includes('/doctor') ? 'bg-[#126b8a] text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                Doctors
              </div>
            </Link>

            {/* Appointments Link */}
            <Link href="/dashboard/admin/appointment" onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`w-full py-6 text-center font-serif text-[17px] transition-colors border-b border-gray-300 ${pathname.includes('/appointments') ? 'bg-[#126b8a] text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                Appointments
              </div>
            </Link>

          </div>

          {/* Logout Button Pinned to Bottom */}
          <button 
            onClick={handleLogout}
            className="w-full py-5 bg-[#da292e] hover:bg-[#c32227] text-white text-lg font-serif tracking-wide transition-colors mt-auto"
          >
            Logout
          </button>
        </aside>

        {/* Dynamic Page Content Injected Here */}
        <main className="flex-1 overflow-y-auto bg-white p-6 md:p-12" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
          {children}
        </main>

      </div>
    </div>
  );
}