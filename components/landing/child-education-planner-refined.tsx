"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coins, Wallet, BookOpen } from "lucide-react";
import { ChildEducationCalculatorCardRefined } from "@/components/ui/child-education-calculator-card-refined";



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
      className="bg-slate-100/60 border-slate-200/40 backdrop-blur supports-[backdrop-filter]:bg-slate-100/40 rounded-full p-1 shadow-sm sm:p-1.5 border"
      variant="outline"
    >
      <ToggleGroupItem
        value="sip"
        aria-label="SIP"
        className="rounded-full data-[state=on]:bg-white data-[state=on]:text-slate-900 data-[state=on]:border-slate-200 data-[state=on]:shadow-sm border border-transparent h-9 px-3.5 py-1.5 min-w-[4rem] sm:h-10 sm:px-4 sm:min-w-[4.5rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out text-slate-500 hover:text-slate-800"
      >
        <Coins className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> SIP
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sip-swp"
        aria-label="SIP with SWP"
        className="rounded-full data-[state=on]:bg-white data-[state=on]:text-slate-900 data-[state=on]:border-slate-200 data-[state=on]:shadow-sm border border-transparent h-9 px-3.5 py-1.5 min-w-[5.2rem] sm:h-10 sm:px-4 sm:min-w-[6rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out text-slate-500 hover:text-slate-800"
      >
        <Wallet className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> SIP + SWP
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ChildEducationCalculatorWithToggleRefined() {
  const [calculatorType, setCalculatorType] = useState("sip");

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-center">
        <ChildEducationCalculatorToggleRefined 
          calculatorType={calculatorType} 
          onCalculatorTypeChange={setCalculatorType} 
        />
      </div>
      <ChildEducationCalculatorRefined 
        calculatorType={calculatorType} 
      />
    </div>
  );
}

export default function ChildEducationCalculatorRefined({ 
  calculatorType
}: { 
  calculatorType?: string;
}) {
  const [internalCalculatorType] = useState("sip");

  // Use external state if provided, otherwise use internal state
  const effectiveCalculatorType = calculatorType !== undefined ? calculatorType : internalCalculatorType;
  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/75 backdrop-blur-2xl border border-white/60 shadow-strong rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-white/80">
      <CardHeader className="pb-4 border-b border-white/40 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 flex items-center justify-center py-5">
        <CardTitle className="text-center text-xl font-bold text-emerald-850 flex items-center justify-center gap-2">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full text-white shadow-sm ring-3 ring-white/50">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="font-serif tracking-tight text-emerald-900">Child Education Planning Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 sm:pt-8 px-4 sm:px-8">
        <div className="mt-2 min-h-[420px] w-full">
          <ChildEducationCalculatorCardRefined calculatorType={effectiveCalculatorType} key={effectiveCalculatorType} />
        </div>
      </CardContent>
    </Card>
  );
}