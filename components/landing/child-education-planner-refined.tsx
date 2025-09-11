"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coins, Wallet } from "lucide-react";
import { ChildEducationCalculatorCardRefined } from "@/components/ui/child-education-calculator-card-refined";

interface ChildEducationCalculatorWrapperProps {
  className?: string;
}

export function ChildEducationCalculatorToggleRefined({ 
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
        className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500 data-[state=on]:to-teal-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-10 px-4 py-2 min-w-[4.5rem] sm:h-11 sm:px-5 sm:min-w-11 touch-manipulation transition-all duration-200 ease-out"
      >
        <Coins className="mr-2 h-4 w-4" /> SIP
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sip-swp"
        aria-label="SIP with SWP"
        className="rounded-full data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500 data-[state=on]:to-teal-500 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:ring-1 data-[state=on]:ring-black/10 h-10 px-4 py-2 min-w-[6rem] sm:h-11 sm:px-5 sm:min-w-11 touch-manipulation transition-all duration-200 ease-out"
      >
        <Wallet className="mr-2 h-4 w-4" /> SIP + SWP
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ChildEducationCalculatorWithToggleRefined() {
  const [calculatorType, setCalculatorType] = useState("sip");

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <ChildEducationCalculatorToggleRefined 
          calculatorType={calculatorType} 
          onCalculatorTypeChange={setCalculatorType} 
        />
      </div>
      <ChildEducationCalculatorRefined 
        calculatorType={calculatorType} 
        onCalculatorTypeChange={setCalculatorType} 
      />
    </div>
  );
}

export default function ChildEducationCalculatorRefined({ 
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
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-emerald-50/70 to-emerald-100/50 backdrop-blur supports-[backdrop-filter]:bg-emerald-50/30 border border-emerald-200/80 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-2 mb-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 flex items-center justify-center py-4">
        <CardTitle className="text-center text-xl font-bold text-emerald-800 flex items-center justify-center gap-2">
          <div className="bg-emerald-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          Child Education Planning Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Calculator Content */}
          <div className="mt-4 min-h-[420px] w-full">
            <ChildEducationCalculatorCardRefined calculatorType={effectiveCalculatorType} key={effectiveCalculatorType} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}