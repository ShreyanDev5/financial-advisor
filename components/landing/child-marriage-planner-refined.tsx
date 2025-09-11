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

export default function ChildMarriageCalculatorRefined() {
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/70 rounded-xl border border-rose-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-rose-600">Projected Cost of Marriage</p>
              <p className="font-medium text-rose-800">after {yearsUntilMarriage} years</p>
            </div>
          </div>
          <span className="font-bold text-lg text-rose-800">
            {formatLargeNumber(futureCostOfMarriage)}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/70 rounded-xl border border-rose-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-rose-600">Monthly SIP Investment Required</p>
              <p className="font-medium text-rose-800">to meet marriage goal</p>
            </div>
          </div>
          <span className="font-bold text-lg text-rose-800">
            {formatLargeNumber(sipInvestment)}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/70 rounded-xl border border-rose-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-rose-600">One-time Lump Sum Investment Required</p>
              <p className="font-medium text-rose-800">to meet marriage goal</p>
            </div>
          </div>
          <span className="font-bold text-lg text-rose-800">
            {formatLargeNumber(lumpSumInvestment)}
          </span>
        </div>
        
        {sipInvestment > 0 ? (
          <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-rose-100 p-2 rounded-lg mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-rose-800">
                  You need to invest <span className="font-bold">₹{formatLargeNumber(sipInvestment)?.replace('₹', '')}</span> every month for the next <span className="font-bold">{yearsUntilMarriage} years</span> to meet your child's marriage goal.
                </p>
                <p className="text-sm font-medium text-rose-800 mt-1">
                  OR make a one-time investment of <span className="font-bold">₹{formatLargeNumber(lumpSumInvestment)?.replace('₹', '')}</span> today.
                </p>
                <p className="text-xs text-rose-600/80 mt-2">
                  *Calculations consider an inflation rate of {inflationRate}% p.a. and an expected return of {expectedReturn}% p.a.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-rose-800">
                Great! Your current savings are sufficient to meet your child's marriage goal.
              </p>
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
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-rose-50/70 to-rose-100/50 backdrop-blur supports-[backdrop-filter]:bg-rose-50/30 border border-rose-200/80 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-2 mb-6 bg-gradient-to-r from-rose-500/10 to-pink-500/10 flex items-center justify-center py-4">
        <CardTitle className="text-center text-xl font-bold text-rose-800 flex items-center justify-center gap-2">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          Child Marriage Planning Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Child's Name Input */}
          <div className="space-y-2">
            <Label htmlFor="childMarriageChildName" className="text-sm font-medium text-rose-800">Child's Name</Label>
            <Input 
              id="childMarriageChildName" 
              value={childName} 
              onChange={(e) => setChildName(e.target.value)} 
              placeholder="Enter your child's name"
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300 rounded-lg"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="childMarriageCurrentAge" className="text-sm font-medium text-rose-800">Child's Current Age</Label>
              <FormattedInput 
                id="childMarriageCurrentAge" 
                inputMode="numeric" 
                value={currentAge} 
                onFormattedChange={setCurrentAge} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300 rounded-lg" 
                placeholder="Enter current age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="childMarriageMarriageAge" className="text-sm font-medium text-rose-800">Planned Marriage Age</Label>
              <FormattedInput 
                id="childMarriageMarriageAge" 
                inputMode="numeric" 
                value={marriageAge} 
                onFormattedChange={setMarriageAge} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300 rounded-lg" 
                placeholder="Enter marriage age"
              />
            </div>
          </div>

          {/* Financial Inputs */}
          <div className="space-y-2">
            <Label htmlFor="childMarriageEstimatedExpenditure" className="text-sm font-medium text-rose-800">Estimated Marriage Expenditure (₹)</Label>
            <FormattedInput 
              id="childMarriageEstimatedExpenditure" 
              inputMode="numeric" 
              value={estimatedExpenditure} 
              onFormattedChange={setEstimatedExpenditure} 
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300 rounded-lg" 
              placeholder="e.g., 1000000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="childMarriageInflationRate" className="text-sm font-medium text-rose-800">Expected Inflation Rate (% p.a.)</Label>
              <FormattedInput 
                id="childMarriageInflationRate" 
                inputMode="decimal" 
                value={inflationRate} 
                onFormattedChange={setInflationRate} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300 rounded-lg" 
                placeholder="e.g., 7"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="childMarriageExpectedReturn" className="text-sm font-medium text-rose-800">Expected Rate of Return (% p.a.)</Label>
              <FormattedInput 
                id="childMarriageExpectedReturn" 
                inputMode="decimal" 
                value={expectedReturn} 
                onFormattedChange={setExpectedReturn} 
                className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300 rounded-lg" 
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="childMarriageAmountSaved" className="text-sm font-medium text-rose-800">Amount Already Saved for Child's Marriage (₹)</Label>
            <FormattedInput 
              id="childMarriageAmountSaved" 
              inputMode="numeric" 
              value={amountSaved} 
              onFormattedChange={setAmountSaved} 
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300 rounded-lg" 
              placeholder="e.g., 200000"
            />
          </div>

          {/* Error Message */}
          {currentAge && marriageAge && parseInt(marriageAge) <= parseInt(currentAge) && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Marriage age must be greater than current age.
              </p>
            </div>
          )}

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:from-rose-600 hover:to-rose-700 active:from-rose-700 active:to-rose-800 transition-all duration-300 ease-in-out rounded-xl font-medium"
            disabled={!childName || !currentAge || !marriageAge || !estimatedExpenditure || !inflationRate || !amountSaved || !expectedReturn}
          >
            Calculate Marriage Plan
          </Button>

          {/* Results Display */}
          {showResults && calculationResults && (
            <div className="mt-8 p-5 bg-rose-50/50 rounded-xl border border-rose-200/80 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold mb-5 text-center text-rose-800 flex items-center justify-center gap-2">
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                Marriage Planning for {childName}
              </h3>
              
              <div className="space-y-4 mb-6">
                {renderResults()}
              </div>
              
              {/* Share Button */}
              <Button 
                onClick={handleShare} 
                className="w-full py-3 mt-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:from-rose-600 hover:to-rose-700 active:from-rose-700 active:to-rose-800 transition-all duration-300 ease-in-out rounded-xl font-medium"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Share Results via WhatsApp
                </div>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}