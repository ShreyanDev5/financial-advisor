'use client';

import { TrendingUp } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestmentCalculator from "@/components/landing/investment-calculator";

export default function InvestContent() {
  const mutualFundServices = {
    title: "Licensed Mutual Fund Advisor",
    description:
      "Professional mutual fund advisory services with AMFI certification to help you build wealth through systematic investments.",
    benefits: [
      "AMFI certified advisory services",
      "Personalized portfolio management",
      "SIP and lump sum investment options",
      "Regular portfolio review and rebalancing",
      "Tax-efficient investment strategies",
      "Goal-based financial planning",
      "Direct mutual fund investments",
      "No hidden charges or commissions",
    ],
    documents: [
      "PAN Card (mandatory)",
      "Aadhaar Card",
      "Bank account details",
      "Cancelled cheque",
      "Income proof",
      "KYC documents",
      "Passport size photographs",
    ],
    process: [
      "Financial goal assessment",
      "Risk profiling and investment capacity analysis",
      "Portfolio recommendation based on goals",
      "KYC completion and documentation",
      "Investment execution and monitoring",
      "Regular review and rebalancing",
    ],
    pricing: "SIP starts from ₹500/month",
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
      <div id="licensed-mutual-fund-advisor" className="scroll-mt-28 sm:scroll-mt-32">
        <ServiceCard
          className="sm:max-w-5xl sm:mx-auto"
          title={mutualFundServices.title}
          description={mutualFundServices.description}
          benefits={mutualFundServices.benefits}
          documents={mutualFundServices.documents}
          process={mutualFundServices.process}
          pricing={mutualFundServices.pricing}
          icon={TrendingUp}
          ctaText="Start Investing"
          colorScheme="blue"
          delay={100}
          whatsAppMessage={`Hi Monotosh, I'm interested in ${mutualFundServices.title}. I'd like to start investing.`}
        />
      </div>
    </div>
  );
}
