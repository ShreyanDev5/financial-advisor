'use client';

import { TrendingUp, Shield, BarChart3, Target, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

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

  const investmentOptions = [
    {
      title: "Equity Mutual Funds",
      returns: "12-15% p.a.",
      risk: "High",
      tenure: "5+ years",
      icon: TrendingUp,
      color: "from-emerald-100 to-teal-100",
      iconColor: "text-emerald-500",
    },
    {
      title: "Debt Mutual Funds",
      returns: "7-9% p.a.",
      risk: "Low to Medium",
      tenure: "1-3 years",
      icon: Shield,
      color: "from-blue-100 to-indigo-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Hybrid Funds",
      returns: "9-12% p.a.",
      risk: "Medium",
      tenure: "3-5 years",
      icon: BarChart3,
      color: "from-purple-100 to-violet-100",
      iconColor: "text-purple-500",
    },
    {
      title: "ELSS Tax Saver",
      returns: "10-14% p.a.",
      risk: "High",
      tenure: "3+ years",
      icon: Target,
      color: "from-orange-100 to-red-100",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <SimplePageHeader title="Investment Solutions" description="Grow your wealth with smart investment strategies" color="orange-500 to-yellow-500" />

      {/* Mutual Fund Advisory */}
      <ServiceCard
        id={mutualFundServices.title.toLowerCase().replace(/\s+/g, "-")}
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
      />

      {/* Investment Options */}
      <AnimatedSection animation="fade-up" delay={200} duration={500}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Options</h3>
          <div className="grid gap-4">
            {investmentOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl hover:from-white/80 hover:to-gray-50/80 transition-all duration-200 border border-white/30 group transform-gpu"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm transform-gpu`}
                    >
                      <Icon className={`w-6 h-6 ${option.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{option.title}</h4>
                      <p className="text-sm text-gray-600">
                        {option.returns} • {option.risk} Risk • {option.tenure}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
