'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/navbar';
import Doctors from '@/app/assets/doctor.png';
import logo from "@/public/logo.png"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col overflow-hidden">
      
      <Navbar />
      <main className="flex-1 flex flex-col relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 lg:py-12 justify-center">
       
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">
       
          <div className="flex-1 flex flex-col items-start justify-center w-full order-2 lg:order-1  lg:mt-0">
         
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-800 font-semibold text-lg md:text-xl">
                Welcome to
              </span>
             <Image src={logo} alt="Logo" className="h-8 w-auto" />
            </div>

            <h1 className="flex flex-col items-start text-[36px] md:text-[48px] lg:text-[54px] font-serif leading-[1.15] text-black">
              <span>Delivering Smart</span>
       
              <div className="inline-flex text-white mt-3 mb-3  ">
                <span className="bg-gradient-to-r from-[#046F9A] to-[#DE282A] text-[26px] md:text-[40px] lg:text-[46px]  rounded-full py-1.5 md:py-2 px-6 md:px-8 text-white">
  Digital Health Solutions
</span>
              </div>
              
              <span>That Drive Growth</span>
            </h1>
            
          </div>

          <div className="flex-1 w-full max-w-[600px] lg:max-w-none flex justify-center items-end order-1 lg:order-2 relative">
           
            <Image 
              src={Doctors} 
              alt="Medical Team" 
              className="w-full h-auto object-contain max-h-[400px] lg:max-h-[550px] drop-shadow-xl"
            />
          </div>

        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mt-16 lg:mt-24 pb-10 z-10 relative">
          
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-[280px] bg-[#126b8a] hover:bg-[#0e566f] text-white font-serif text-[22px] tracking-wide py-4 px-10 rounded-full transition-transform hover:scale-105 duration-300 shadow-md">
              LOGIN
            </button>
          </Link>

          <Link href="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-[280px] bg-[#da292e] hover:bg-[#c32227] text-white font-serif text-[22px] tracking-wide py-4 px-10 rounded-full transition-transform hover:scale-105 duration-300 shadow-md">
              REGISTER
            </button>
          </Link>

        </div>

      </main>
    </div>
  );
}