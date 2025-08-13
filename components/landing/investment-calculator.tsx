
"use client";

import { useState } from "react";
import { InvestmentCalculatorCard } from "@/components/ui/investment-calculator-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coins, LineChart as LineChartIcon, Wallet } from "lucide-react";

export default function InvestmentCalculator() {
  const [investmentType, setInvestmentType] = useState("sip");

  const handleInvestmentTypeChange = (type: string) => {
    setInvestmentType(type);
  };

  return (
    <div className="container mx-auto space-y-8 px-0 sm:px-6 lg:px-8 font-sans">
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-gray-900 dark:text-white">
          Investment Calculator
        </h2>
        <p className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 dark:text-gray-300">
          Estimate your returns for SIP, Lump Sum, and SWP with beautiful visuals.
        </p>
      </div>

      <div className="flex justify-center px-4 sm:px-0">
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
            className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-red-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-9 px-4 min-w-[4.5rem] sm:h-11 sm:px-5 sm:min-w-11"
          >
            <Coins className="mr-2 h-4 w-4" /> SIP
          </ToggleGroupItem>
          <ToggleGroupItem
            value="lumpsum"
            aria-label="Lump Sum"
            className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-red-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-9 px-4 min-w-[4.5rem] sm:h-11 sm:px-5 sm:min-w-11"
          >
            <LineChartIcon className="mr-2 h-4 w-4" /> Lump Sum
          </ToggleGroupItem>
          <ToggleGroupItem
            value="swp"
            aria-label="SWP"
            className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-orange-500 data-[state=on]:to-red-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-9 px-4 min-w-[4.5rem] sm:h-11 sm:px-5 sm:min-w-11"
          >
            <Wallet className="mr-2 h-4 w-4" /> SWP
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="px-4 sm:px-0">
        <InvestmentCalculatorCard investmentType={investmentType} key={investmentType} />
      </div>
    </div>
  );
}
