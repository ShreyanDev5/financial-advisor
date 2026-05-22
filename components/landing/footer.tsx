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
        bg: isActive ? "bg-emerald-50" : "hover:bg-gray-50",
        button: isActive ? "bg-emerald-100 text-emerald-700" : "text-gray-400 group-hover:text-emerald-500",
        text: isActive ? "text-emerald-700 font-semibold" : "text-gray-400 group-hover:text-emerald-600",
      },
      blue: {
        bg: isActive ? "bg-blue-50" : "hover:bg-gray-50",
        button: isActive ? "bg-blue-100 text-blue-700" : "text-gray-400 group-hover:text-blue-500",
        text: isActive ? "text-blue-700 font-semibold" : "text-gray-400 group-hover:text-blue-600",
      },
      orange: {
        bg: isActive ? "bg-orange-50" : "hover:bg-gray-50",
        button: isActive ? "bg-orange-100 text-orange-700" : "text-gray-400 group-hover:text-orange-500",
        text: isActive ? "text-orange-700 font-semibold" : "text-gray-400 group-hover:text-orange-600",
      },
      teal: {
        bg: isActive ? "bg-teal-50" : "hover:bg-gray-50",
        button: isActive ? "bg-teal-100 text-teal-700" : "text-gray-400 group-hover:text-teal-500",
        text: isActive ? "text-teal-700 font-semibold" : "text-gray-400 group-hover:text-teal-600",
      },
      purple: {
        bg: isActive ? "bg-purple-50" : "hover:bg-gray-50",
        button: isActive ? "bg-purple-100 text-purple-700" : "text-gray-400 group-hover:text-purple-500",
        text: isActive ? "text-purple-700 font-semibold" : "text-gray-400 group-hover:text-purple-600",
      },
    };
    return colors[colorScheme];
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.015)] z-50">
      <div className="flex justify-around items-center py-1 px-1" role="tablist" aria-label="Primary navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          const tabColors = getTabColors(tab.colorScheme as 'emerald' | 'blue' | 'orange' | 'purple' | 'teal', isActive);

          return (
            <Link href={tab.href} key={tab.id} className={`
                flex flex-col items-center justify-center gap-0.5 p-1 rounded-xl
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500
                transition-all duration-300 ease-in-out
                transform active:scale-95
                w-1/5 group
                ${tabColors.bg}
              `} role="tab" aria-selected={isActive} aria-label={tab.label}>
              <div className={`p-2.5 rounded-full transition-all duration-200 ${tabColors.button}`}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className={`text-[11px] font-medium transition-colors duration-200 ${tabColors.text}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}