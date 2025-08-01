"use client";

import { Home, Shield, TrendingUp, FileText } from "lucide-react";
import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const tabs = [
    { id: "home", href: "/", label: "Home", icon: Home, colorScheme: "emerald" },
    { id: "insurance", href: "/insurance", label: "Insurance", icon: Shield, colorScheme: "blue" },
    { id: "invest", href: "/invest", label: "Invest", icon: TrendingUp, colorScheme: "orange" },
    { id: "documents", href: "/documents", label: "Documents", icon: FileText, colorScheme: "purple" },
  ];

  const getTabColors = useCallback((colorScheme, isActive) => {
    const colors = {
      emerald: {
        bg: isActive ? "bg-gradient-to-br from-emerald-50 to-teal-50" : "",
        button: isActive ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-emerald-600" : "text-gray-400",
      },
      blue: {
        bg: isActive ? "bg-gradient-to-br from-blue-50 to-indigo-50" : "",
        button: isActive ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-blue-600" : "text-gray-400",
      },
      orange: {
        bg: isActive ? "bg-gradient-to-br from-orange-50 to-red-50" : "",
        button: isActive ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-orange-600" : "text-gray-400",
      },
      purple: {
        bg: isActive ? "bg-gradient-to-br from-purple-50 to-violet-50" : "",
        button: isActive ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-purple-600" : "text-gray-400",
      },
    };
    return colors[colorScheme] || colors.emerald;
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-white/20 safe-area-pb z-50 shadow-2xl">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = (pathname === '/' && tab.id === 'home') || pathname === tab.href;
          const tabColors = getTabColors(tab.colorScheme, isActive);

          return (
            <Link href={tab.href} key={tab.id} className={`
                flex flex-col items-center gap-1 py-2 px-3 rounded-2xl
                transition-all duration-200 ease-out
                transform hover:scale-105 active:scale-95
                touch-manipulation select-none transform-gpu
                ${tabColors.bg}
              `}>
              <div className={`p-2 rounded-xl transition-all duration-200 transform-gpu ${tabColors.button}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium transition-colors duration-200 ${tabColors.text}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}