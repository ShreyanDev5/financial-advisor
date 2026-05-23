"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Subtle gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-blue-50/20 to-purple-50/30 pointer-events-none" />

      {/* Main header container */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
        <div className="px-5 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {/* Left side - Logo and brand */}
          <div className="flex items-center gap-2.5 md:gap-3">
            <Image
              src="/monotosh_logo_1.1.png"
              alt="Monotosh Logo"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="flex flex-col justify-center leading-tight">
              <h1 className="text-base sm:text-lg md:text-xl font-bold font-serif bg-gradient-to-r from-emerald-800 to-teal-900 bg-clip-text text-transparent tracking-tight">
                WealthWise
              </h1>
              <p className="flex items-center text-[8.5px] sm:text-[10px] md:text-xs text-emerald-900/60 font-semibold tracking-widest uppercase mt-0.5">
                Growth <span className="mx-1 sm:mx-1.5 text-emerald-500/50">•</span> Ambition <span className="mx-1 sm:mx-1.5 text-emerald-500/50">•</span> Stability
              </p>
            </div>
          </div>

          {/* Right side - WhatsApp contact */}
          <div className={`transition-all duration-300 ease-in-out ${isScrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <a
              href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'd%20like%20to%20learn%20more%20about%20your%20financial%20advisory%20services.%20Could%20we%20connect%3F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-emerald-500/90 to-green-700/90 hover:from-emerald-600 hover:to-green-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

