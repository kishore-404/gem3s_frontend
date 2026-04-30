'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.role !== 'admin') {
        router.push('/dashboard/patient/appointment');
      }
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      <Navbar 
        showMenuButton={true} 
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-10 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside className={`
          absolute inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-300 flex flex-col shadow-2xl md:shadow-none
          transition-transform duration-300 ease-in-out shrink-0
          md:relative md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex-1 flex flex-col">
            <Link href="/dashboard/admin/doctor" onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`w-full py-6 text-center font-serif text-base md:text-lg transition-colors border-b border-gray-300 ${pathname.includes('/doctor') ? 'bg-[#126b8a] text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                Doctors
              </div>
            </Link>

            <Link href="/dashboard/admin/appointment" onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`w-full py-6 text-center font-serif text-base md:text-lg transition-colors border-b border-gray-300 ${pathname.includes('/appointment') ? 'bg-[#126b8a] text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                Appointments
              </div>
            </Link>
          </div>

          <button 
            onClick={handleLogout} 
            className="w-full py-5 bg-[#da292e] hover:bg-[#c32227] text-white text-base md:text-lg font-serif tracking-wide transition-colors mt-auto"
          >
            Logout
          </button>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-10">
          {children}
        </main>
        
      </div>
    </div>
  );
}