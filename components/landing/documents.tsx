'use client';

import { useState, useEffect, useRef } from "react";
import { UserCheck, FileCheck, Car, Baby, Briefcase, Calculator, FileText, ScrollText, BookUser, Handshake, HeartHandshake, Coins, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function DocumentsContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const [activeCategory, setActiveCategory] = useState<'all' | 'personal' | 'vehicle' | 'business'>('all');

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
        if (
          id.includes("pan") ||
          id.includes("aadhaar") ||
          id.includes("voter") ||
          id.includes("ration") ||
          id.includes("birth") ||
          id.includes("passport") ||
          id.includes("marriage")
        ) {
          setActiveCategory("personal");
        } else if (
          id.includes("driving") ||
          id.includes("licence") ||
          id.includes("vehicle") ||
          id.includes("ownership") ||
          id.includes("rto")
        ) {
          setActiveCategory("vehicle");
        } else if (
          id.includes("tax") ||
          id.includes("trade") ||
          id.includes("agreement") ||
          id.includes("affidavit") ||
          id.includes("business") ||
          id.includes("p.tax")
        ) {
          setActiveCategory("business");
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

  const allDocumentServices = [
    // --- PERSONAL IDS & REGISTRY ---
    {
      category: "personal" as const,
      title: "PAN Card Services",
      description: "New PAN, e-PAN, Corrections, Re-issue of Lost Card, Aadhaar-PAN Linking.",
      benefits: ["Mandatory official ID for all major financial transactions."],
      documents: [
        "Individual: Aadhaar, address proof, photos.",
        "Organization: Registration certificate, authorized person's ID.",
      ],
      process: [
        "Select service and fill form",
        "Submit required documents", 
        "Receive e-PAN immediately",
        "Physical card delivered later"
      ],
      costs: [
        "New PAN: ₹250",
        "e-PAN + Physical: ₹300", 
        "Correction: ₹250+",
        "Lost PAN: ₹250",
        "Aadhaar Link: ₹1,150",
        "Organization PAN: ₹550"
      ],
      icon: FileText,
      colorScheme: "blue",
      whatsAppMessage: "Hi Monotosh, I'd like to apply for a PAN card. Could you please help me understand the required documents and process?",
    },
    {
      category: "personal" as const,
      title: "Aadhaar Card Services",
      description: "New Enrolment, Address/Mobile/Name Updates, PVC Card, e-Aadhaar Download.",
      benefits: ["Essential identity proof for government and financial services."],
      documents: [
        "Aadhaar-linked mobile for OTP.",
        "ID proof (PAN, Voter ID).",
        "Address proof (utility bill).",
        "Birth certificate for new enrolment.",
      ],
      process: [
        "Book appointment if biometrics needed",
        "Fill form and attend appointment for biometrics",
        "Track application status",
        "Download e-Aadhaar once processed"
      ],
      costs: [
        "New Enrolment: ₹200",
        "Address Update: ₹250", 
        "Correction: ₹250+",
        "PVC Card: ₹100",
        "Download + Lamination: ₹60"
      ],
      icon: UserCheck,
      colorScheme: "blue",
      whatsAppMessage: "Hi Monotosh, I'd like to apply for an Aadhaar card. Could you please help me understand the required documents and process?",
    },
    {
      category: "personal" as const,
      title: "Voter ID Card Services",
      description: "New Card Application, Corrections, Address Change, Aadhaar/Mobile Linking.",
      benefits: ["Official citizenship proof and voting rights."],
      documents: [
        "Aadhaar with linked mobile",
        "PAN or Ration Card", 
        "Passport-size photo"
      ],
      process: [
        "Start online application with ₹100 advance",
        "Complete form and upload documents",
        "Track with acknowledgement number",
        "Download e-Voter ID or receive physical card"
      ],
      costs: [
        "New Card: ₹200 (₹100 non-refundable advance)",
        "Aadhaar/Mobile Link: ₹50",
        "Address Change/Correction: ₹200+", 
        "Download + Lamination: ₹100"
      ],
      icon: FileCheck,
      colorScheme: "orange",
      whatsAppMessage: "Hi Monotosh, I'd like to apply for a Voter ID card. Could you please help me understand the required documents and process?",
    },
    {
      category: "personal" as const,
      title: "Ration Card Services",
      description: "New Card Application, Add/Remove Member, Corrections, Aadhaar/Mobile Linking, Dealer Change.",
      benefits: ["Access to subsidized food grains and official address proof."],
      documents: [
        "Aadhaar with linked mobile for all members.",
        "Birth certificate for children.",
        "Proof of family head.",
        "Income/residential certificates for new family.",
      ],
      process: [
        "Choose service and complete online form",
        "Upload required documents", 
        "Check status after ~20 days",
        "Download e-Ration card"
      ],
      costs: [
        "New Card: ₹250",
        "Aadhaar/Mobile Link: ₹50",
        "Address/Dealer Change: ₹200/₹150",
        "Correction: ₹200+", 
        "New Family: ₹300/person"
      ],
      icon: FileText,
      colorScheme: "emerald",
      whatsAppMessage: "Hi Monotosh, I'd like to apply for a Ration card. Could you please help me understand the required documents and process?",
    },
    {
      category: "personal" as const,
      title: "Birth Certificate Services",
      description: "New Application, Corrections, Download & Lamination.",
      benefits: ["Primary proof of age and identity for schools and passports."],
      documents: [
        "New: Hospital birth proof, parents' Aadhaar/Voter cards, attested Form-1.",
        "Correction: Existing certificate, child's and parents' IDs.",
      ],
      process: [
        "Fill online form",
        "Upload hospital proof and IDs",
        "Track with acknowledgement number", 
        "Download once processed"
      ],
      costs: [
        "New Certificate: ₹500",
        "Correction: ₹500", 
        "Download + Lamination: ₹150"
      ],
      icon: Baby,
      colorScheme: "purple",
      whatsAppMessage: "Hi Monotosh, I'd like to apply for a Birth certificate. Could you please help me understand the required documents and process?",
    },
    {
      category: "personal" as const,
      title: "Passport Services (Online OTP-Based Application)",
      description: "Convenient Application, Flexible Scheduling, Multiple Service Options.",
      benefits: [
        "Official legal travel document and citizenship proof.",
        "Full assistance in application filing and scheduling.",
        "Hassle-free preparation for your physical interview."
      ],
      documents: [
        "New: Aadhaar (OTP-linked) + 1 other ID (Voter, PAN, etc.).",
        "Renewal: Old passport copy.",
        "Lost: Address/DOB proof, ID, FIR, old passport copy (if available), affidavit.",
      ],
      process: [
        "Apply online with OTP",
        "Upload documents and select service",
        "Pay required fees", 
        "Schedule and attend appointment with original documents",
        "Passport issued after verification"
      ],
      costs: [
        "New (36 pages): ₹2,100",
        "New (60 pages): ₹2,650", 
        "Renewal: ₹2,200",
        "Lost: ₹3,500"
      ],
      icon: BookUser,
      colorScheme: "red",
      whatsAppMessage: "Hi Monotosh, I need help with passport services. Could you please guide me through the application process?",
    },
    {
      category: "personal" as const,
      title: "Marriage Registration Services",
      description: "Seamless marriage registration with legal recognition.",
      benefits: [
        "Legally valid marriage certificate for visa and immigration.",
        "Saves time with end-to-end guidance through the registrar office.",
        "Vital proof for joint bank accounts, insurance, and home loans."
      ],
      documents: [
        "Aadhaar, address proof, DOB proof for couple.",
        "Photos of couple.",
        "Invitation card (if available).",
        "2 witnesses with ID/address proof.",
      ],
      process: [
        "File application at registrar's office or online",
        "Submit documents and photos", 
        "Officials verify identities of couple and witnesses",
        "Certificate issued after signing"
      ],
      costs: [
        "Starts at ₹3,000", 
        "Varies by state and fees"
      ],
      icon: HeartHandshake,
      colorScheme: "teal",
      whatsAppMessage: "Hi Monotosh, I'd like information about marriage registration services. Could you please explain the requirements and process?",
    },

    // --- DRIVING & VEHICLE ---
    {
      category: "vehicle" as const,
      title: "New Driving Licence",
      description: "Hassle-free driving license services with bookings, mock tests, and RTO support.",
      benefits: [
        "Legally drive private or commercial vehicles.",
        "Excellent universally accepted photo identity proof.",
        "Mock tests and RTO guidance for stress-free exams."
      ],
      documents: [
        "Aadhaar (mandatory)",
        "Voter ID", 
        "Blood group certificate",
        "Fitness certificate (for applicants >40 years)",
        "Passport-size photos"
      ],
      process: [
        "Choose vehicle type",
        "Complete application and upload documents",
        "Book and attend learner/final RTO tests", 
        "Receive driving licence"
      ],
      costs: [
        "2-Wheeler: ₹2,500",
        "4-Wheeler: ₹3,000", 
        "2+4 Wheeler: ₹4,800",
        "Commercial: ₹4,100"
      ],
      icon: Car,
      colorScheme: "blue",
      whatsAppMessage: "Hi Monotosh, I'd like to apply for a driving licence. Could you please help me understand the requirements and process?",
    },
    {
      category: "vehicle" as const,
      title: "Licence Renewal, Corrections & Duplicates",
      description: "Renewal, Name/Address/DOB Correction, Duplicate/Lost Licence Replacement.",
      benefits: [
        "Keeps your driving permit legally active and valid.",
        "Updates match other primary documents to avoid KYC failures.",
        "Fast duplicate issuance for lost or damaged physical cards."
      ],
      documents: [
        "Original Driving Licence",
        "Aadhaar", 
        "Voter ID",
        "Passport-size photos",
        "FIR (for lost licence only)"
      ],
      process: [
        "Apply online or at RTO",
        "Submit documents (plus FIR if needed)",
        "Re-test if expired >1 year", 
        "Receive updated/duplicate licence"
      ],
      costs: [
        "Renewal: ₹1,800 (+ fines)",
        "Name Correction: ₹2,550 (includes affidavit)", 
        "Address/DOB Correction: ₹1,850 (includes affidavit)",
        "Lost Licence: ₹2,550 (includes report/affidavit)"
      ],
      icon: Car,
      colorScheme: "orange",
      whatsAppMessage: "Hi Monotosh, I need help with licence renewal, corrections, or duplicates. Could you please guide me through the process?",
    },
    {
      category: "vehicle" as const,
      title: "Ownership (Name) Transfer",
      description: "Legally transfer vehicle ownership from seller to buyer.",
      benefits: [
        "Protects the seller from liability after sale.",
        "Legally secures vehicle title under the buyer's name.",
        "Ensures smooth insurance claim transfers."
      ],
      documents: [
        "Original RC (Registration Certificate)",
        "Valid insurance", 
        "Valid PUC (Pollution Under Control)",
        "Buyer and seller IDs",
        "Signed Forms 29/30",
        "Financier NOC (if applicable)"
      ],
      process: [
        "Sign Forms 29/30",
        "Submit documents to RTO",
        "Pay required fee", 
        "Await processing and receive new RC in buyer's name"
      ],
      costs: [
        "2-Wheeler: ~₹4,500",
        "Fees for larger vehicles vary"
      ],
      icon: Handshake,
      colorScheme: "emerald",
      whatsAppMessage: "Hi Monotosh, I need help with vehicle registration services. Could you please guide me through the process?",
    },
    {
      category: "vehicle" as const,
      title: "Other Vehicle Services",
      description: "RC / Smart Card Issuance, MV Road Tax Payment, Certificate of Fitness (CF), Fine / Penalty Payment.",
      benefits: [
        "Maintains road tax compliance to avoid impoundment.",
        "Certified vehicle fitness (CF) for safe driving.",
        "Quick smart card replacement for broken or lost physical RCs."
      ],
      documents: [],
      process: [],
      costs: [
        "RC/Smart Card: ~₹1,000",
        "Road Tax: ₹150-₹750 admin fee (+ tax)", 
        "CF (2-wheeler): ~₹3,500",
        "Fines vary by violation"
      ],
      icon: FileText,
      colorScheme: "red",
      whatsAppMessage: "Hi Monotosh, I need help with vehicle registration services. Could you please guide me through the process?",
    },

    // --- BUSINESS & TAX ---
    {
      category: "business" as const,
      title: "Trade License",
      description: "Legal permission to operate your business. Required for compliance.",
      benefits: [
        "Protects your business from regulatory legal actions.",
        "Builds credibility with customers, vendors, and banks.",
        "A mandatory pre-requisite for other commercial licenses."
      ],
      documents: [
        "ID proof (Aadhaar, PAN)",
        "Property tax receipt or rent agreement", 
        "Contact details"
      ],
      process: [
        "Complete application and attach documents",
        "We submit and follow up with authorities",
        "Receive trade licence once approved"
      ],
      costs: [
        "New: Panchayat/Municipality (₹500), Corporation (₹1,000)",
        "Renewal: Panchayat/Municipality (₹300), Corporation (₹500)", 
        "Government fees vary by location"
      ],
      icon: Briefcase,
      colorScheme: "orange",
      whatsAppMessage: "Hi Monotosh, I need help with trade license. Could you please provide more information about the process and requirements?",
    },
    {
      category: "business" as const,
      title: "Agreements & Affidavits",
      description: "Professionally drafted, legally valid documents prepared by experienced lawyers.",
      benefits: [
        "Rent, business, sale agreements; judicial/non-judicial affidavits.",
        "Legally binding protection crafted by expert lawyers.",
        "Prevents future disputes with clear terms and clauses."
      ],
      documents: [],
      process: [
        "Share document type and party details",
        "Review draft prepared by our lawyers",
        "Final document signed and attested"
      ],
      costs: [
        "Fees vary by complexity", 
        "Contact for quote"
      ],
      icon: ScrollText,
      colorScheme: "purple",
      whatsAppMessage: "Hi Monotosh, I need help with agreements & affidavits. Could you please provide more information about the process and requirements?",
    },
    {
      category: "business" as const,
      title: "Professional Tax (P.Tax)",
      description: "Ensure compliance with state-level tax for professionals and businesses to avoid penalties.",
      benefits: [
        "Prevents heavy state-level penalty charges.",
        "Mandatory for obtaining state-level business permits.",
        "Demonstrates clean corporate tax governance."
      ],
      documents: [],
      process: [
        "Determine applicability by state/income",
        "Register on state portal", 
        "File returns and pay tax on time"
      ],
      costs: [
        "Monthly tax: ₹110 (₹10-15k income), ₹130 (₹15-25k), ₹150 (₹25-40k), ₹200 (>₹40k)",
        "Rates vary by state"
      ],
      icon: Coins,
      colorScheme: "blue",
      whatsAppMessage: "Hi Monotosh, I need help with professional tax (p.tax). Could you please provide more information about the process and requirements?",
    },
    {
      category: "business" as const,
      title: "Income Tax Filing Services",
      description: "CA-guided filing for accuracy, including TDS and AIS review.",
      benefits: [
        "Avoid expensive late filing fees & penalties.",
        "Strong financial proof required for loan and visa approvals.",
        "CA-guided check of TDS, AIS, and Form 26AS for zero errors."
      ],
      documents: [
        "PAN, Aadhaar, bank statements.",
        "Form 16, Form 26AS, TDS certificates.",
        "Capital gains details.",
        "Books of accounts (for business).",
      ],
      process: [
        "Choose plan and upload documents",
        "Our specialist reviews your documents",
        "We file your return with tax authorities", 
        "You receive ITR copy for your records"
      ],
      costs: [
        "Salary: from ₹699",
        "Capital Gain: from ₹999", 
        "Small Business: from ₹1,699",
        "Salaried + Business: from ₹2,599",
        "Complex: from ₹4,999", 
        "(Indicative prices)"
      ],
      icon: Calculator,
      colorScheme: "purple",
      whatsAppMessage: "Hi Monotosh, I'd like assistance with income tax filing. Could you please help me understand the process and required documents?",
    },
  ];

  const filteredServices = allDocumentServices.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <div className="pb-16 sm:pb-24 pt-8 relative overflow-hidden w-full">
      {/* Subtle Static Ambient Background Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-violet-500/3 blur-[130px] pointer-events-none -z-10" />

      {/* Premium subtle dotted background overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        aria-hidden="true"
      />

      <div className="container mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 mb-2 w-full">
          <SimplePageHeader 
            title="Documents" 
            description="We simplify the application process for Aadhaar, PAN, and more." 
            badge="Essential Services"
            badgeColorScheme="purple"
            className="mb-0" 
            color="from-purple-700 via-purple-600 to-violet-800" 
          />

          {/* Category Filter Pills Wrapper */}
          <div className="relative w-full max-w-2xl mx-auto overflow-hidden z-20 py-0.5">
            {/* Left fade scroll indicator */}
            <button 
              type="button"
              onClick={() => scroll("left")}
              className={`absolute left-1 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 sm:hidden ${
                showLeftScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll left"
            >
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 ring-1 ring-black/[0.04]"><ChevronLeft className="flex-shrink-0 w-3.5 h-3.5 -translate-x-[0.5px] text-purple-600 animate-pulse-slow" /></span>
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
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 ring-1 ring-black/[0.04]"><ChevronRight className="flex-shrink-0 w-3.5 h-3.5 translate-x-[0.5px] text-purple-600 animate-pulse-slow" /></span>
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
                All Services
              </button>
              <button
                onClick={() => setActiveCategory('personal')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'personal'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Personal IDs & Registry
              </button>
              <button
                onClick={() => setActiveCategory('vehicle')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'vehicle'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Driving & Vehicle
              </button>
              <button
                onClick={() => setActiveCategory('business')}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === 'business'
                    ? 'bg-white/70 backdrop-blur-md text-slate-900 border-slate-300/50 shadow-sm shadow-slate-200/30'
                    : 'bg-slate-50/30 text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800 hover:border-slate-200/50'
                }`}
              >
                Business & Tax
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
                  ctaText={service.category === 'business' || service.title.includes("Registration") ? "Get Started" : "Apply Now"}
                  colorScheme={service.colorScheme}
                  delay={0}
                  animation="elegant-fade"
                  whatsAppMessage={service.whatsAppMessage?.replace("Monotosh", clientFirstName)}
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
