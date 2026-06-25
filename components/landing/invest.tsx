'use client';

import { TrendingUp } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestFaq from "@/components/landing/invest-faq";

export default function InvestContent() {
  const mutualFundServices = {
    title: "Mutual Funds",
    description: "Grow your wealth with mutual funds.",
    benefits: [
      "Expert fund management.",
      "Risk reduction through diversification.",
      "Accessible via SIP, SWP, or Lumpsum.",
      "High liquidity on business days.",
    ],
    documents: [
      "PAN and Aadhaar for KYC.",
      "Mother's name and nominee details.",
      "Live photo and digital signature.",
      "Email, mobile number, and bank details.",
    ],
    process: [
      "Complete one-time KYC with PAN and Aadhaar.",
      "Select a fund based on your risk profile.",
      "Invest via lump sum, SIP, or SWP.",
      "Monitor performance with NAV updates.",
    ],
    costs: [
      "Annual expense ratio (TER) for fund management.",
      "Exit load for early redemption (typically <1 year).",
      "Capital gains tax on profits (long/short-term).",
    ],
  };

  return (
    <div className="pb-16 sm:pb-24 pt-8 relative overflow-hidden w-full">
      {/* Subtle Static Ambient Background Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-teal-500/3 blur-[140px] pointer-events-none -z-10" />

      {/* Premium subtle dotted background overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        aria-hidden="true"
      />

      <div className="container mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <SimplePageHeader 
          title="Investments" 
          description="Grow your wealth, intelligently." 
          badge="Wealth & Growth"
          badgeColorScheme="orange"
          className="mb-4 sm:mb-6" 
          color="from-orange-700 via-orange-600 to-red-700" 
        />

        {/* Mutual Fund Advisory */}
        <div id="mutual-funds" className="scroll-mt-28 sm:scroll-mt-32">
          <ServiceCard
            className="sm:max-w-3xl sm:mx-auto"
            title={mutualFundServices.title}
            description={mutualFundServices.description}
            benefits={mutualFundServices.benefits}
            documents={mutualFundServices.documents}
            process={mutualFundServices.process}
            costs={mutualFundServices.costs}
            icon={TrendingUp}
            ctaText="Start Investing"
            colorScheme="orange"
            delay={0}
            animation="elegant-fade"
            whatsAppMessage={`Hi Monotosh, I'm interested in mutual funds and would like to start investing. Could you please help me understand the options based on my risk profile?`}
          />
        </div>

        {/* Modern minimal neutral divider */}
        <div className="flex items-center justify-center gap-1.5 my-6 sm:my-8" aria-hidden="true">
          <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
          <div className="h-1 w-5 rounded-full bg-slate-200/50 dark:bg-slate-800/40" />
          <div className="h-1 w-1 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
        </div>

        {/* FAQ Section */}
        <div id="mutual-fund-faq" className="scroll-mt-28 sm:scroll-mt-32">
          <InvestFaq />
        </div>
      </div>
    </div>
  );
}
