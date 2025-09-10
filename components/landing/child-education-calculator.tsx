"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coins, Wallet } from "lucide-react";
import ChildEducationSipCalculator from "./child-education-sip-calculator";
import ChildEducationSipSwpCalculator from "./child-education-sip-swp-calculator";

interface ChildEducationCalculatorWrapperProps {
  className?: string;
}

export function ChildEducationCalculatorToggle({ 
  calculatorType, 
  onCalculatorTypeChange 
}: { 
  calculatorType: string; 
  onCalculatorTypeChange: (type: string) => void; 
}) {
  return (
    <ToggleGroup
      type="single"
      value={calculatorType}
      onValueChange={(val) => val && onCalculatorTypeChange(val)}
      className="bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-muted/40 rounded-full p-1 border shadow-sm sm:p-1.5"
      variant="outline"
    >
      <ToggleGroupItem
        value="sip"
        aria-label="SIP"
        className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500 data-[state=on]:to-teal-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-10 px-4 py-2 min-w-[4.5rem] sm:h-11 sm:px-5 sm:min-w-11 touch-manipulation"
      >
        <Coins className="mr-2 h-4 w-4" /> SIP
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sip-swp"
        aria-label="SIP with SWP"
        className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500 data-[state=on]:to-teal-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-10 px-4 py-2 min-w-[6rem] sm:h-11 sm:px-5 sm:min-w-11 touch-manipulation"
      >
        <Wallet className="mr-2 h-4 w-4" /> SIP + SWP
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ChildEducationCalculatorWithToggle() {
  const [calculatorType, setCalculatorType] = useState("sip");

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <ChildEducationCalculatorToggle 
          calculatorType={calculatorType} 
          onCalculatorTypeChange={setCalculatorType} 
        />
      </div>
      <ChildEducationCalculator 
        calculatorType={calculatorType} 
        onCalculatorTypeChange={setCalculatorType} 
      />
    </div>
  );
}

export default function ChildEducationCalculator({ 
  calculatorType,
  onCalculatorTypeChange
}: { 
  calculatorType?: string; 
  onCalculatorTypeChange?: (type: string) => void; 
}) {
  const [internalCalculatorType, setInternalCalculatorType] = useState("sip");

  // Use external state if provided, otherwise use internal state
  const effectiveCalculatorType = calculatorType !== undefined ? calculatorType : internalCalculatorType;
  const handleTypeChange = onCalculatorTypeChange !== undefined ? onCalculatorTypeChange : setInternalCalculatorType;

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-emerald-50/70 to-emerald-100/50 backdrop-blur supports-[backdrop-filter]:bg-emerald-50/30 border border-emerald-200/80 shadow-xl rounded-xl">
      <CardHeader className="pb-2 mb-6">
        <CardTitle className="text-center text-xl font-bold text-emerald-800">Child Education Planner 🎓</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Calculator Content */}
          <div className="mt-4">
            {effectiveCalculatorType === "sip" ? (
              <ChildEducationSipCalculator />
            ) : (
              <ChildEducationSipSwpCalculator />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}