'use client';

import { useState, useEffect, useRef } from "react";
import { Heart, Bike, Car, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function InsuranceContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const [activeCategory, setActiveCategory] = useState<'all' | 'health-life' | 'vehicle'>('all');

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
        if (id === "health-insurance" || id === "life-insurance") {
          setActiveCategory("health-life");
        } else if (
          id === "two-wheeler-insurance" || 
          id === "four-wheeler-(car)-insurance" ||
          id.includes("vehicle") ||
          id.includes("wheeler")
        ) {
          setActiveCategory("vehicle");
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

  const insuranceServices = [
    {
      title: "Health Insurance",
      description: "Partner Insurers: Star Health & Care Health Insurance",
      benefits: [
        "Cashless hospitalisation.",
        "Covers in-patient, pre/post-hospitalisation.",
        "Includes daycare and AYUSH treatments.",
      ],
      documents: [
        "ID/Address Proof (Aadhaar, PAN).",
        "Age Proof (Birth/School Certificate).",
        "Medical history.",
        "Previous policy for renewals.",
        "Bank details for reimbursement.",
      ],
      process: [
        "Compare plans and select add-ons.",
        "Fill application with medical history.",
        "Pay premium online or via agent.",
        "Receive policy and ID card.",
        "Notify insurer and submit documents for claims.",
      ],
      costs: [
        "Premiums vary by age, sum insured, and family size", 
        "Individual plans: ₹5k-₹20k/year", 
        "Family plans: ₹10k-₹50k/year", 
        "(Indicative ranges. Use calculator for exact quote.)"
      ],
      icon: Heart,
      colorScheme: "emerald",
    },
    {
      title: "Two-Wheeler Insurance",
      description: "Comprehensive coverage for your motorcycle or scooter.",
      benefits: [
        "Mandatory third-party liability cover.",
        "Comprehensive cover for own-damage, theft, and disasters.",
      ],
      documents: [
        "Vehicle RC and owner's DL.",
        "ID/Address Proof (Aadhaar, PAN).",
        "Previous policy for renewals.",
        "Claim docs: FIR, bills, photos.",
      ],
      process: [
        "Choose Third-Party or Comprehensive cover.",
        "Get a quote with RC, DL, and ID.",
        "Pay premium for instant policy.",
        "For claims, contact insurer for inspection and cashless repair.",
      ],
      costs: [
        "Third-Party: ₹1.3k-₹3k/year (IRDAI regulated)", 
        "Comprehensive: ₹1.5k-₹6k/year (based on IDV, model, age)", 
        "(Indicative ranges. Use calculator for exact quote.)"
      ],
      icon: Bike,
      colorScheme: "blue",
    },
    {
      title: "Four-Wheeler (Car) Insurance",
      description: "Complete protection with comprehensive coverage options.",
      benefits: [
        "Mandatory third-party liability cover.",
        "Comprehensive cover for own-damage, theft, and accidents.",
        "Optional add-ons: Zero Depreciation, Engine Cover.",
      ],
      documents: [
        "Vehicle RC and driver's DL.",
        "ID/Address Proof (Aadhaar, PAN).",
        "Previous policy/NCB for renewals.",
        "Claim docs: FIR, police reports.",
      ],
      process: [
        "Select policy type, IDV, and add-ons.",
        "Get quote with vehicle and owner details.",
        "Pay premium for e-policy.",
        "For claims, contact insurer for assessment and cashless service.",
      ],
      costs: [
        "Third-Party: From ₹2k-₹3k/year (by engine size)", 
        "Comprehensive: Hatchback (₹7k-₹15k), Sedan (₹10k-₹20k), SUV (₹15k-₹30k)", 
        "(Based on IDV, model, NCB. Indicative ranges only.)"
      ],
      icon: Car,
      colorScheme: "purple",
    },
    {
      title: "Life Insurance",
      description: "Secure your family's future with life insurance from LIC.",
      benefits: [
        "Financial security for your family.",
        "Term, Endowment, Pension, and ULIP plans available.",
      ],
      documents: [
        "ID/Address Proof (Aadhaar, PAN).",
        "Age Proof (Birth/School Certificate).",
        "Bank and nominee details.",
        "Medical reports if required.",
      ],
      process: [
        "Choose plan, sum assured, and term.",
        "Complete application with health details.",
        "Undergo medical tests if required.",
        "Pay premium to issue policy.",
        "Nominee files claim with death certificate.",
      ],
      costs: [
        "Premiums depend on age, health, sum assured, and plan type", 
        "Term plans are most affordable", 
        "Endowment/ULIPs include savings, costing more"
      ],
      icon: ShieldCheck,
      colorScheme: "red",
    },
  ];

  const filteredServices = insuranceServices.filter((service) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'health-life') {
      return service.title === "Health Insurance" || service.title === "Life Insurance";
    }
    if (activeCategory === 'vehicle') {
      return service.title === "Two-Wheeler Insurance" || service.title === "Four-Wheeler (Car) Insurance";
    }
    return true;
  });

  return (
    <div className="pb-16 sm:pb-24 pt-8 relative overflow-hidden w-full">
      {/* Subtle Static Ambient Background Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-500/3 blur-[130px] pointer-events-none -z-10" />

      {/* Premium subtle dotted background overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        aria-hidden="true"
      />

      <div className="container mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 mb-2 w-full">
          <SimplePageHeader 
            title="Insurance" 
            description="Protect what matters most." 
            badge="Risk & Protection"
            badgeColorScheme="blue"
            className="mb-0" 
            color="from-blue-700 via-blue-600 to-blue-800" 
          />

          {/* Category Filter Pills Wrapper */}
          <div className="relative w-full max-w-xl mx-auto overflow-hidden z-20 py-0.5">
            {/* Left fade scroll indicator */}
            <button 
              type="button"
              onClick={() => scroll("left")}
              className={`absolute left-1 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 sm:hidden ${
                showLeftScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll left"
            >
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 ring-1 ring-black/[0.04]"><ChevronLeft className="flex-shrink-0 w-3.5 h-3.5 -translate-x-[0.5px] text-blue-600 animate-pulse-slow" /></span>
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
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 ring-1 ring-black/[0.04]"><ChevronRight className="flex-shrink-0 w-3.5 h-3.5 translate-x-[0.5px] text-blue-600 animate-pulse-slow" /></span>
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
                All Insurance
              </button>
              <button
                onClick={() => setActiveCategory('health-life')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'health-life'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Health & Life
              </button>
              <button
                onClick={() => setActiveCategory('vehicle')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'vehicle'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Motor Insurance
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {filteredServices.map((service, index) => (
            <div key={index}>
              <div id={service.title.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-28 sm:scroll-mt-32">
                <ServiceCard
                  className="sm:max-w-3xl sm:mx-auto"
                  title={service.title}
                  description={service.description}
                  benefits={service.benefits}
                  documents={service.documents}
                  process={service.process}
                  costs={service.costs}
                  icon={service.icon}
                  ctaText="Get Started"
                  colorScheme={service.colorScheme}
                  delay={0}
                  animation="elegant-fade"
                  whatsAppMessage={`Hi ${clientFirstName}, I'm interested in ${service.title.toLowerCase()}. Could you please help me understand the coverage options and premium details?`}
                />
              </div>

              {/* Modern minimal neutral divider between cards */}
              {index < filteredServices.length - 1 && (
                <div className="flex items-center justify-center gap-1.5 my-6 sm:my-8" aria-hidden="true">
                  <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
                  <div className="h-1 w-5 rounded-full bg-slate-200/50 dark:bg-slate-800/40" />
                  <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
