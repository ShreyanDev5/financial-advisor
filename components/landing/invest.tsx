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
      "Professional Management: Your money is managed by expert fund managers.",
      "Diversification: Spreads investment across multiple stocks or government bonds to reduce risk.",
      "Accessibility: Start with small amounts via Systematic Investment Plans (SIPs), Systematic Withdrawal Plans (SWPs), or Lumpsum investments (from ₹500 to ₹1 Cr and above).",
      "Liquidity: Easily buy or sell units on business days.",
    ],
    documents: [
      "PAN Card.",
      "Aadhaar Card for KYC (Know Your Customer) verification.",
      "Mother's Name.",
      "Nominee's Aadhaar.",
      "Live Photo / Digital Signature.",
      "Email Address & Mobile Number.",
      "Bank details or a cancelled cheque.",
    ],
    process: [
      "Complete KYC: A one-time verification process using your PAN and Aadhaar.",
      "Select Fund: Choose a fund category (Equity, Debt, Hybrid, Index) that matches your risk appetite and investment horizon.",
      "Invest: Invest a lump sum amount or start an SIP/SWP.",
      "Monitor: Track your investment performance through Net Asset Value (NAV) updates.",
    ],
    costs: [
      "Expense Ratio (TER): An annual fee charged by the fund for management and operational costs, disclosed in fund documents.",
      "Exit Load: A fee charged if you redeem your investment before a specified period (typically within one year).",
      "Taxation: Capital gains tax (either long-term or short-term) applies to profits and varies based on the fund type (equity/debt) and holding period.",
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
