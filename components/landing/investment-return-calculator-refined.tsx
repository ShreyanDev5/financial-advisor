"use client";

import { useState } from "react";
import { InvestmentCalculatorCardRefined } from "@/components/ui/investment-calculator-card-refined";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coins, LineChart as LineChartIcon, Wallet } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function InvestmentCalculatorRefined() {
  const [investmentType, setInvestmentType] = useState("sip");

  const handleInvestmentTypeChange = (type: string) => {
    setInvestmentType(type);
  };

  return (
    <AnimatedSection animation="elegant-fade" delay={50} duration={400}>
      <div className="container mx-auto space-y-8 px-0 sm:px-6 lg:px-8 font-sans">
        <div className="flex justify-center px-2 sm:px-0">
          <ToggleGroup
            type="single"
            value={investmentType}
            onValueChange={(val) => val && handleInvestmentTypeChange(val)}
            className="bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-muted/40 rounded-full p-1 border shadow-sm sm:p-1.5"
            variant="outline"
          >
            <ToggleGroupItem
              value="sip"
              aria-label="SIP"
              className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-red-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-9 px-3.5 py-1.5 min-w-[4rem] sm:h-10 sm:px-4 sm:min-w-[4.5rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out"
            >
              <Coins className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> SIP
            </ToggleGroupItem>
            <ToggleGroupItem
              value="lumpsum"
              aria-label="Lump Sum"
              className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-red-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-9 px-3.5 py-1.5 min-w-[5.2rem] sm:h-10 sm:px-4 sm:min-w-[6rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out"
            >
              <LineChartIcon className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> Lump Sum
            </ToggleGroupItem>
            <ToggleGroupItem
              value="swp"
              aria-label="SWP"
              className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-red-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-9 px-3.5 py-1.5 min-w-[4rem] sm:h-10 sm:px-4 sm:min-w-[4.5rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out"
            >
              <Wallet className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> SWP
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="px-0 sm:px-0">
          <InvestmentCalculatorCardRefined investmentType={investmentType} key={investmentType} />
        </div>
      </div>
    </AnimatedSection>
  );
}