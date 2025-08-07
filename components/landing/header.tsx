import { MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Subtle gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-blue-50/20 to-purple-50/30 pointer-events-none" />

      {/* Main header container */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Left side - Logo and brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/monotosh_logo_1.1.png"
              alt="Monotosh Logo"
              width={40}
              height={40}
              className="rounded-xl shadow-sm"
            />
            <div>
              <h1 className="text-base md:text-lg font-semibold text-gray-800">WealthWise</h1>
              <p className="text-xs md:text-sm text-gray-600 font-semibold font-serif">Growth | Ambition | Stability</p>
            </div>
          </div>

          {/* Right side - WhatsApp contact */}
          <a
            href="https://wa.me/919836472260?text=Hi%20Monotosh%2C%20I'm%20interested%20in%20your%20financial%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gradient-to-br from-emerald-500/90 to-green-700/90 hover:from-emerald-600 hover:to-green-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}

