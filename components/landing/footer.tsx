"use client";

import { Home, Shield, TrendingUp, FileText, Calculator } from "lucide-react";
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
    { id: "calculators", href: "/calculators", label: "Calculators", icon: Calculator, colorScheme: "teal" },
  ];

  const getTabColors = useCallback((colorScheme: 'emerald' | 'blue' | 'orange' | 'purple' | 'teal', isActive: boolean) => {
    const colors = {
      emerald: {
        bg: isActive ? "bg-gradient-to-br from-emerald-50 to-teal-50" : "",
        // Match header WhatsApp icon gradient exactly
        button: isActive
          ? "bg-gradient-to-br from-emerald-500/90 to-green-700/90 hover:from-emerald-600 hover:to-green-800 text-white shadow-lg"
          : "text-gray-400",
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
      teal: {
        bg: isActive ? "bg-gradient-to-br from-teal-50 to-emerald-50" : "",
        button: isActive ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-teal-600" : "text-gray-400",
      },
      purple: {
        bg: isActive ? "bg-gradient-to-br from-purple-50 to-violet-50" : "",
        button: isActive ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg" : "text-gray-400",
        text: isActive ? "text-purple-600" : "text-gray-400",
      },
    };
    return colors[colorScheme];
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-white/20 safe-area-pb z-50 shadow-2xl">
      <div className="flex items-center justify-between py-2 px-0" role="tablist" aria-label="Primary navigation">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = (pathname === '/' && tab.id === 'home') || pathname === tab.href;
          const tabColors = getTabColors(tab.colorScheme as 'emerald' | 'blue' | 'orange' | 'purple' | 'teal', isActive);
          
          // Add increased padding to first and last items for proper distance from edges
          const isFirstItem = index === 0;
          const isLastItem = index === tabs.length - 1;
          const paddingClass = isFirstItem ? "pl-3 sm:pl-4" : isLastItem ? "pr-3 sm:pr-4" : "px-0.5 sm:px-1";

          return (
            <Link href={tab.href} key={tab.id} className={`
                flex flex-col items-center gap-0.5 py-1.5 ${paddingClass} sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                transition-all duration-200 ease-out
                transform hover:scale-105 active:scale-95
                touch-manipulation select-none transform-gpu
                ${tabColors.bg}
              `} role="tab" aria-selected={isActive} aria-label={tab.label}>
              <div className={`p-3 sm:p-3.5 rounded-lg sm:rounded-xl transition-all duration-200 transform-gpu ${tabColors.button} min-w-11 min-h-11 sm:min-w-12 sm:min-h-12 flex items-center justify-center`}>
                <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5" aria-hidden="true" />
              </div>
              <span className={`text-[10px] sm:text-sm font-medium transition-colors duration-200 ${tabColors.text}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}