'use client';

import { TrendingUp } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestmentCalculator from "@/components/landing/investment-calculator";

export default function InvestContent() {
  const mutualFundServices = {
    title: "Mutual Funds",
    description: "Professional mutual fund advisory services.",
    benefits: [
      "Expert fund management.",
      "Risk reduction through diversification.",
      "Accessible via SIP, SWP, or Lumpsum.",
      "High liquidity on business days.",
    ],
    documents: [
      "PAN and Aadhaar for KYC.",
      "Mother's name and Nominee's Aadhaar.",
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
    <div className="container mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      <SimplePageHeader title="Investment Solutions" description="Grow your wealth with our expert investment strategies." className="mb-0 [&>h1]:text-4xl sm:[&>h1]:text-6xl" color="from-orange-500 to-orange-700" />

      {/* Gray divider to separate sections */}
      <div className="sm:max-w-5xl sm:mx-auto my-2">
        <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Investment Calculator */}
      <div id="investment-calculator" className="scroll-mt-28 sm:scroll-mt-32">
        <InvestmentCalculator />
      </div>

      {/* Mutual Fund Advisory */}
      <div id="mutual-funds" className="scroll-mt-28 sm:scroll-mt-32">
        <ServiceCard
          className="sm:max-w-5xl sm:mx-auto"
          title={mutualFundServices.title}
          description={mutualFundServices.description}
          benefits={mutualFundServices.benefits}
          documents={mutualFundServices.documents}
          process={mutualFundServices.process}
          costs={mutualFundServices.costs}
          icon={TrendingUp}
          ctaText="Start Investing"
          colorScheme="blue"
          delay={0}
          animation="elegant-fade"
          whatsAppMessage={`Hi Monotosh, I'm interested in ${mutualFundServices.title}. I'd like to start investing.`}
        />
      </div>
    </div>
  );
}
