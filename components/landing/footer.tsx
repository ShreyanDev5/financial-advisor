"use client";

import { Home, Shield, TrendingUp, FileText, Calculator } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const tabs = [
    { id: "home", href: "/", label: "Home", icon: Home, colorScheme: "emerald" as const },
    { id: "insurance", href: "/insurance", label: "Insurance", icon: Shield, colorScheme: "blue" as const },
    { id: "invest", href: "/invest", label: "Invest", icon: TrendingUp, colorScheme: "orange" as const },
    { id: "documents", href: "/documents", label: "Document", icon: FileText, colorScheme: "purple" as const },
    { id: "calculators", href: "/calculators", label: "Calculator", icon: Calculator, colorScheme: "red" as const },
  ];

  const tabSchemes = {
    emerald: {
      textActive: "text-emerald-600 dark:text-emerald-400",
      bgActive: "bg-emerald-500/[0.06] dark:bg-emerald-400/[0.08]",
      hoverText: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
    },
    blue: {
      textActive: "text-blue-600 dark:text-blue-400",
      bgActive: "bg-blue-500/[0.06] dark:bg-blue-400/[0.08]",
      hoverText: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
    },
    orange: {
      textActive: "text-orange-600 dark:text-orange-400",
      bgActive: "bg-orange-500/[0.06] dark:bg-orange-400/[0.08]",
      hoverText: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
    },
    purple: {
      textActive: "text-purple-600 dark:text-purple-400",
      bgActive: "bg-purple-500/[0.06] dark:bg-purple-400/[0.08]",
      hoverText: "group-hover:text-purple-500 dark:group-hover:text-purple-400",
    },
    red: {
      textActive: "text-red-600 dark:text-red-400",
      bgActive: "bg-red-500/[0.06] dark:bg-red-400/[0.08]",
      hoverText: "group-hover:text-red-500 dark:group-hover:text-red-400",
    },
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[480px] z-50">
      {/* High-end iOS Glassmorphism Container */}
      <div 
        className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/40 dark:border-slate-800/40 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.04)] rounded-2xl py-1.5 px-2 flex justify-around items-center" 
        role="tablist" 
        aria-label="Primary navigation"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          const scheme = tabSchemes[tab.colorScheme];

          return (
            <Link 
              href={tab.href} 
              key={tab.id} 
              className={`
                relative flex flex-col items-center justify-center pt-1.5 pb-1 rounded-xl
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500/50
                transition-all duration-300 ease-in-out
                transform active:scale-95 hover:scale-[1.03]
                w-1/5 group
              `} 
              role="tab" 
              aria-selected={isActive} 
              aria-label={tab.label}
            >
              {/* Subtle background glow circle behind the icon */}
              <div 
                className={`
                  p-1.5 rounded-full transition-all duration-300 flex items-center justify-center mb-0.5
                  ${isActive ? scheme.bgActive : "bg-transparent group-hover:bg-slate-100/50 dark:group-hover:bg-slate-800/40"}
                `}
              >
                <Icon 
                  className={`
                    w-[18px] h-[18px] sm:w-5 sm:h-5 transition-all duration-300
                    ${isActive ? scheme.textActive + " scale-110" : "text-slate-400 dark:text-slate-500 " + scheme.hoverText}
                  `} 
                  aria-hidden="true" 
                />
              </div>

              {/* Minimal Label */}
              <span 
                className={`
                  text-[10px] sm:text-[10.5px] tracking-wide transition-all duration-300 font-medium
                  ${isActive ? scheme.textActive + " font-semibold" : "text-slate-400 dark:text-slate-500 " + scheme.hoverText}
                `}
              >
                {tab.label}
              </span>

              {/* Elegant iOS-style active indicator dot */}
              <span 
                className={`
                  absolute -bottom-[2px] w-1 h-1 rounded-full transition-all duration-300 bg-current
                  ${isActive ? scheme.textActive + " opacity-100 scale-100" : "opacity-0 scale-0"}
                `}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}