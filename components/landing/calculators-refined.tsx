'use client';


import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestmentCalculatorRefined from "@/components/landing/investment-return-calculator-refined";
import { ChildEducationCalculatorWithToggleRefined } from "@/components/landing/child-education-planner-refined";
import ChildMarriageCalculatorRefined from "@/components/landing/child-marriage-planner-refined";
import IncomePlanningCalculatorRefined from "@/components/landing/retirement-planner-refined";

export default function CalculatorsContentRefined() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'investment' | 'education' | 'retirement' | 'marriage'>('all');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScrollLimits = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowLeftScroll(el.scrollLeft > 4);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowRightScroll(el.scrollLeft < maxScroll - 4);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollLimits();

    const resizeObserver = new ResizeObserver(() => {
      checkScrollLimits();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", checkScrollLimits);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, []);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1).toLowerCase();
        if (id.includes("investment")) {
          setActiveCategory("investment");
        } else if (id.includes("education")) {
          setActiveCategory("education");
        } else if (id.includes("income") || id.includes("retirement")) {
          setActiveCategory("retirement");
        } else if (id.includes("marriage") || id.includes("wedding")) {
          setActiveCategory("marriage");
        }
      }
    };

    // Run immediately
    checkHash();

    // Check at multiple intervals to handle any router hydration/navigation delays
    const interval = setInterval(checkHash, 100);

    // Add event listener for hash changes
    window.addEventListener("hashchange", checkHash);

    // Clean up after 1.5 seconds to prevent continuous background polling
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  return (
    <div className="pb-16 sm:pb-24 pt-8 relative overflow-hidden w-full">
      {/* Subtle Static Ambient Background Orbs for a smooth, premium feel */}
      <div className="absolute top-[8%] left-[-10%] w-[400px] h-[400px] rounded-full bg-orange-500/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/3 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[58%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-rose-500/3 blur-[140px] pointer-events-none -z-10" />

      {/* Premium subtle dotted background overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        aria-hidden="true"
      />

      <div className="container mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 mb-2 w-full">
          <div className="text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100 mb-1">
              Planning Tools
            </span>
            <SimplePageHeader 
              title="Financial Calculators" 
              description="Estimate your returns and plan your financial future with our easy-to-use calculators."
              className="mb-0" 
              color="from-orange-700 via-orange-600 to-red-700" 
            />
          </div>

          {/* Category Filter Pills Wrapper */}
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden z-20 py-0.5">
            {/* Left fade scroll indicator */}
            <button 
              type="button"
              onClick={() => scroll("left")}
              className={`absolute left-1 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 sm:hidden ${
                showLeftScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll left"
            >
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 ring-1 ring-black/[0.04]"><ChevronLeft className="flex-shrink-0 w-3.5 h-3.5 -translate-x-[0.5px] text-orange-600 animate-pulse-slow" /></span>
            </button>

            {/* Right fade scroll indicator */}
            <button 
              type="button"
              onClick={() => scroll("right")}
              className={`absolute right-1 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 sm:hidden ${
                showRightScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll right"
            >
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 ring-1 ring-black/[0.04]"><ChevronRight className="flex-shrink-0 w-3.5 h-3.5 translate-x-[0.5px] text-orange-600 animate-pulse-slow" /></span>
            </button>

            <div 
              ref={scrollContainerRef}
              onScroll={checkScrollLimits}
              className="flex overflow-x-auto sm:overflow-x-visible whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full justify-start sm:justify-center gap-2 px-4 sm:px-0 py-2 relative z-20"
            >
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'all'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                All Planners
              </button>
              <button
                onClick={() => setActiveCategory('investment')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'investment'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Investment (SIP/Lump Sum)
              </button>
              <button
                onClick={() => setActiveCategory('education')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'education'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Child Education
              </button>
              <button
                onClick={() => setActiveCategory('retirement')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'retirement'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Retirement
              </button>
              <button
                onClick={() => setActiveCategory('marriage')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'marriage'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Child Marriage
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {/* Investment Calculator */}
          {(activeCategory === 'all' || activeCategory === 'investment') && (
            <div id="investment-calculator" className="scroll-mt-28 sm:scroll-mt-32">
              <InvestmentCalculatorRefined />
            </div>
          )}

          {/* Divider */}
          {activeCategory === 'all' && (
            <div className="flex items-center justify-center gap-1.5 my-8" aria-hidden="true">
              <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
              <div className="h-1 w-5 rounded-full bg-slate-200/50 dark:bg-slate-800/40" />
              <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
            </div>
          )}

          {/* Child Education Calculator */}
          {(activeCategory === 'all' || activeCategory === 'education') && (
            <div id="child-education-calculator" className="scroll-mt-28 sm:scroll-mt-32">
              <ChildEducationCalculatorWithToggleRefined />
            </div>
          )}

          {/* Divider */}
          {activeCategory === 'all' && (
            <div className="flex items-center justify-center gap-1.5 my-8" aria-hidden="true">
              <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
              <div className="h-1 w-5 rounded-full bg-slate-200/50 dark:bg-slate-800/40" />
              <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
            </div>
          )}

          {/* Income Planning Calculator */}
          {(activeCategory === 'all' || activeCategory === 'retirement') && (
            <div id="income-planning-calculator" className="scroll-mt-28 sm:scroll-mt-32">
              <IncomePlanningCalculatorRefined />
            </div>
          )}

          {/* Divider */}
          {activeCategory === 'all' && (
            <div className="flex items-center justify-center gap-1.5 my-8" aria-hidden="true">
              <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
              <div className="h-1 w-5 rounded-full bg-slate-200/50 dark:bg-slate-800/40" />
              <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
            </div>
          )}

          {/* Marriage Expense Planner */}
          {(activeCategory === 'all' || activeCategory === 'marriage') && (
            <div id="child-marriage-calculator" className="scroll-mt-28 sm:scroll-mt-32">
              <ChildMarriageCalculatorRefined />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}