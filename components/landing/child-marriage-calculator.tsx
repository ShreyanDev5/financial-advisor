"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number.js";

// Define the type for calculation results
interface CalculationResults {
  futureCostOfMarriage: number;
  sipInvestment: number;
  lumpSumInvestment: number;
  yearsUntilMarriage: number;
}

export default function ChildMarriageCalculator() {
  const [childName, setChildName] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [marriageAge, setMarriageAge] = useState("");
  const [estimatedExpenditure, setEstimatedExpenditure] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo<CalculationResults | null>(() => {
    if (!childName || !currentAge || !marriageAge || !estimatedExpenditure || !inflationRate || !amountSaved || !expectedReturn) return null;

    const childCurrentAge = parseInt(currentAge);
    const childMarriageAge = parseInt(marriageAge);
    const expenditure = parseFloat(estimatedExpenditure) || 0;
    const inflation = parseFloat(inflationRate) || 0;
    const savedAmount = parseFloat(amountSaved) || 0;
    const returnRate = parseFloat(expectedReturn) || 0;
    
    // Validate inputs
    if (childMarriageAge <= childCurrentAge || childCurrentAge < 0 || childMarriageAge > 40) return null;
    if (expenditure <= 0 || inflation < 0 || returnRate < 0) return null;
    
    // Calculate years until marriage
    const yearsUntilMarriage = childMarriageAge - childCurrentAge;
    
    // Calculate future cost of marriage with inflation
    const futureCostOfMarriage = expenditure * Math.pow(1 + inflation / 100, yearsUntilMarriage);
    
    // Calculate future value of amount already saved
    const futureValueOfSavings = savedAmount * Math.pow(1 + returnRate / 100, yearsUntilMarriage);
    
    // Calculate shortfall
    const shortfall = futureCostOfMarriage - futureValueOfSavings;
    
    // If no shortfall, no investment needed
    if (shortfall <= 0) {
      return {
        futureCostOfMarriage,
        sipInvestment: 0,
        lumpSumInvestment: 0,
        yearsUntilMarriage
      };
    }
    
    // Calculate SIP investment required to cover shortfall
    // Using the future value of ordinary annuity formula: PMT = FV * r / ((1 + r)^n - 1)
    const monthlyRate = returnRate / 100 / 12;
    const numberOfMonths = yearsUntilMarriage * 12;
    
    let sipInvestment;
    if (monthlyRate === 0) {
      sipInvestment = shortfall / numberOfMonths;
    } else {
      // Future value of ordinary annuity formula (payments at end of period)
      sipInvestment = shortfall * monthlyRate / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    }
    
    // Calculate lump sum investment required to cover shortfall
    // Using present value formula: PV = FV / (1 + r)^n
    const lumpSumInvestment = shortfall / Math.pow(1 + returnRate / 100, yearsUntilMarriage);
    
    return {
      futureCostOfMarriage,
      sipInvestment,
      lumpSumInvestment,
      yearsUntilMarriage
    };
  }, [childName, currentAge, marriageAge, estimatedExpenditure, inflationRate, amountSaved, expectedReturn]);

  const handleCalculate = () => {
    if (childName && currentAge && marriageAge && estimatedExpenditure && inflationRate && amountSaved && expectedReturn) {
      const childCurrentAge = parseInt(currentAge);
      const childMarriageAge = parseInt(marriageAge);
      const expenditure = parseFloat(estimatedExpenditure);
      const inflation = parseFloat(inflationRate);
      const savedAmount = parseFloat(amountSaved);
      const returnRate = parseFloat(expectedReturn);
      
      // Validate inputs
      if (isNaN(childCurrentAge) || isNaN(childMarriageAge) || isNaN(expenditure) || 
          isNaN(inflation) || isNaN(savedAmount) || isNaN(returnRate)) return;
      
      // Validate age inputs
      if (childMarriageAge > childCurrentAge && childCurrentAge >= 0 && childMarriageAge <= 40 && 
          expenditure > 0 && inflation >= 0 && returnRate >= 0) {
        setShowResults(true);
      }
    }
  };

  const renderResults = () => {
    // Type guard to ensure calculationResults is not null
    if (!calculationResults) return null;
    
    // Use non-null assertion since we've already checked
    const { futureCostOfMarriage, sipInvestment, lumpSumInvestment, yearsUntilMarriage } = calculationResults!;
    
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
          <span className="font-medium text-sm sm:text-base text-rose-700">
            💰 Projected Cost of Marriage after {yearsUntilMarriage} years
          </span>
          <span className="font-bold text-base sm:text-lg text-rose-800">
            {formatLargeNumber(futureCostOfMarriage)}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
          <span className="font-medium text-sm sm:text-base text-rose-700">
            💸 Monthly SIP Investment Required
          </span>
          <span className="font-bold text-base sm:text-lg text-rose-800">
            {formatLargeNumber(sipInvestment)}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
          <span className="font-medium text-sm sm:text-base text-rose-700">
            💰 One-time Lump Sum Investment Required
          </span>
          <span className="font-bold text-base sm:text-lg text-rose-800">
            {formatLargeNumber(lumpSumInvestment)}
          </span>
        </div>
        
        {sipInvestment > 0 ? (
          <div className="bg-rose-100/50 p-3 rounded-md border border-rose-200">
            <div className="text-xs sm:text-sm text-rose-700 text-center font-medium">
              You need to invest ₹{formatLargeNumber(sipInvestment)?.replace('₹', '')} every month for the next {yearsUntilMarriage} years to meet your child&#39;s marriage goal.
            </div>
            <div className="text-xs sm:text-sm text-rose-700 text-center font-medium mt-1">
              OR make a one-time investment of ₹{formatLargeNumber(lumpSumInvestment)?.replace('₹', '')} today.
            </div>
            <div className="text-xs sm:text-sm text-rose-600/80 mt-2 text-center">
              *Calculations consider an inflation rate of {inflationRate}% p.a. and an expected return of {expectedReturn}% p.a.
            </div>
          </div>
        ) : (
          <div className="bg-rose-100/50 p-3 rounded-md border border-rose-200 text-center">
            <div className="text-xs sm:text-sm text-rose-700">
              Great! Your current savings are sufficient to meet your child&#39;s marriage goal.
            </div>
          </div>
        )}
      </>
    );
  };

  const handleShare = () => {
    if (!calculationResults) return;
    
    const { futureCostOfMarriage, sipInvestment, lumpSumInvestment } = calculationResults;
    
    // Generate the share text
    let shareText = `💍 Marriage Expense Planner for ${childName}:\n\n`;
    shareText += `💒 Future Cost of Marriage: ${formatLargeNumber(futureCostOfMarriage)}\n`;
    shareText += `🔁 SIP Investment Required: ${formatLargeNumber(sipInvestment)}\n`;
    shareText += `💼 Lump Sum Investment Required: ${formatLargeNumber(lumpSumInvestment)}\n`;
    
    // Encode the text for WhatsApp
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-rose-50/70 to-rose-100/50 backdrop-blur supports-[backdrop-filter]:bg-rose-50/30 border border-rose-200/80 shadow-xl rounded-xl">
      <CardHeader className="pb-2 mb-6">
        <CardTitle className="text-center text-xl font-bold text-rose-800">Child Marriage Planning Calculator 💍</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Child's Name Input */}
          <div className="space-y-2">
            <Label htmlFor="childName" className="text-sm sm:text-base text-rose-700">Child&apos;s Name</Label>
            <Input 
              id="childName" 
              value={childName} 
              onChange={(e) => setChildName(e.target.value)} 
              placeholder="Enter your child&apos;s name"
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAge" className="text-sm sm:text-base text-rose-700">Child&apos;s Current Age</Label>
              <FormattedInput 
                id="currentAge" 
                inputMode="numeric" 
                value={currentAge} 
                onFormattedChange={setCurrentAge} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300" 
                placeholder="Enter current age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="marriageAge" className="text-sm sm:text-base text-rose-700">Planned Marriage Age</Label>
              <FormattedInput 
                id="marriageAge" 
                inputMode="numeric" 
                value={marriageAge} 
                onFormattedChange={setMarriageAge} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300" 
                placeholder="Enter marriage age"
              />
            </div>
          </div>

          {/* Financial Inputs */}
          <div className="space-y-2">
            <Label htmlFor="estimatedExpenditure" className="text-sm sm:text-base text-rose-700">Estimated Marriage Expenditure (₹)</Label>
            <FormattedInput 
              id="estimatedExpenditure" 
              inputMode="numeric" 
              value={estimatedExpenditure} 
              onFormattedChange={setEstimatedExpenditure} 
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300" 
              placeholder="e.g., 1000000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inflationRate" className="text-sm sm:text-base text-rose-700">Expected Inflation Rate (% p.a.)</Label>
              <FormattedInput 
                id="inflationRate" 
                inputMode="decimal" 
                value={inflationRate} 
                onFormattedChange={setInflationRate} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300" 
                placeholder="e.g., 7"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expectedReturn" className="text-sm sm:text-base text-rose-700">Expected Rate of Return (% p.a.)</Label>
              <FormattedInput 
                id="expectedReturn" 
                inputMode="decimal" 
                value={expectedReturn} 
                onFormattedChange={setExpectedReturn} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300" 
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountSaved" className="text-sm sm:text-base text-rose-700">Amount Already Saved for Child&apos;s Marriage (₹)</Label>
            <FormattedInput 
              id="amountSaved" 
              inputMode="numeric" 
              value={amountSaved} 
              onFormattedChange={setAmountSaved} 
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300" 
              placeholder="e.g., 200000"
            />
          </div>

          {/* Error Message */}
          {currentAge && marriageAge && parseInt(marriageAge) <= parseInt(currentAge) && (
            <div className="text-red-500 text-sm text-center mt-2">
              Marriage age must be greater than current age.
            </div>
          )}

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:from-rose-500 hover:to-rose-600 active:from-rose-700 active:to-rose-800 transition-all duration-300 ease-in-out"
            disabled={!childName || !currentAge || !marriageAge || !estimatedExpenditure || !inflationRate || !amountSaved || !expectedReturn}
          >
            Calculate Marriage Plan
          </Button>

          {/* Results Display */}
          {showResults && calculationResults && (
            <div className="mt-8 p-4 sm:p-5 bg-rose-50/50 rounded-lg border border-rose-200/80">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-rose-800">
                💍 Marriage Planning for {childName}
              </h3>
              
              <div className="space-y-4 mb-6">
                {renderResults()}
              </div>
              
              {/* Share Button */}
              <Button 
                onClick={handleShare} 
                className="w-full mt-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:from-rose-500 hover:to-rose-600 active:from-rose-700 active:to-rose-800 transition-all duration-300 ease-in-out"
              >
                Share Results via WhatsApp
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}