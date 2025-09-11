"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number.js";

// Define the type for calculation results
interface CalculationResults {
  projectedCost: number;
  monthlyInvestment: number;
  yearsUntilEducation: number;
}

export default function ChildEducationSipCalculatorRefined() {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [educationStartAge, setEducationStartAge] = useState("");
  const [presentCost, setPresentCost] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo<CalculationResults | null>(() => {
    if (!childName || !childAge || !educationStartAge || !presentCost || !inflationRate || !expectedReturn) return null;

    const currentAge = parseInt(childAge);
    const startAge = parseInt(educationStartAge);
    const presentCostValue = parseFloat(presentCost) || 0;
    const inflationRateValue = parseFloat(inflationRate) || 0;
    const amountSavedValue = parseFloat(amountSaved) || 0;
    const expectedReturnValue = parseFloat(expectedReturn) || 0;
    
    // Validate inputs
    if (isNaN(currentAge) || isNaN(startAge) || isNaN(presentCostValue) || 
        isNaN(inflationRateValue) || isNaN(expectedReturnValue)) return null;
    
    if (startAge <= currentAge || currentAge < 0 || startAge > 30 || 
        presentCostValue <= 0 || inflationRateValue < 0 || expectedReturnValue < 0) return null;
    
    // Calculate years until education starts
    const yearsUntilEducation = startAge - currentAge;
    
    // Calculate projected cost of education after inflation
    const projectedCost = presentCostValue * Math.pow(1 + inflationRateValue / 100, yearsUntilEducation);
    
    // Calculate future value of amount already saved
    const futureValueOfSavings = amountSavedValue * Math.pow(1 + expectedReturnValue / 100, yearsUntilEducation);
    
    // Calculate the shortfall
    const shortfall = projectedCost - futureValueOfSavings;
    
    // If no shortfall, no monthly investment needed
    if (shortfall <= 0) {
      return {
        projectedCost,
        monthlyInvestment: 0,
        yearsUntilEducation
      };
    }
    
    // Calculate monthly investment required to cover shortfall
    // Using the future value of ordinary annuity formula: PMT = FV * r / ((1 + r)^n - 1)
    const monthlyRate = expectedReturnValue / 100 / 12;
    const numberOfMonths = yearsUntilEducation * 12;
    
    // If expected return is 0, simple division
    let monthlyInvestment;
    if (monthlyRate === 0) {
      monthlyInvestment = shortfall / numberOfMonths;
    } else {
      // Future value of ordinary annuity formula (payments at end of period)
      monthlyInvestment = shortfall * monthlyRate / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    }
    
    return {
      projectedCost,
      monthlyInvestment,
      yearsUntilEducation
    };
  }, [childName, childAge, educationStartAge, presentCost, inflationRate, amountSaved, expectedReturn]);

  const handleCalculate = () => {
    if (childName && childAge && educationStartAge && presentCost && inflationRate && expectedReturn) {
      const currentAge = parseInt(childAge);
      const startAge = parseInt(educationStartAge);
      const presentCostValue = parseFloat(presentCost);
      const inflationRateValue = parseFloat(inflationRate);
      const expectedReturnValue = parseFloat(expectedReturn);
      
      // Validate all inputs
      if (isNaN(currentAge) || isNaN(startAge) || isNaN(presentCostValue) || 
          isNaN(inflationRateValue) || isNaN(expectedReturnValue)) return;
      
      // Validate age inputs
      if (startAge > currentAge && currentAge >= 0 && startAge <= 30 && 
          presentCostValue > 0 && inflationRateValue >= 0 && expectedReturnValue >= 0) {
        setShowResults(true);
      }
    }
  };

  const renderResults = () => {
    // Type guard to ensure calculationResults is not null
    if (!calculationResults) return null;
    
    // Use non-null assertion since we've already checked
    const { monthlyInvestment, yearsUntilEducation, projectedCost } = calculationResults!;
    
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/70 rounded-xl border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-emerald-600">Projected Cost of Education</p>
              <p className="font-medium text-emerald-800">after {yearsUntilEducation} years</p>
            </div>
          </div>
          <span className="font-bold text-lg text-emerald-800">
            {formatLargeNumber(projectedCost)}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/70 rounded-xl border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-emerald-600">Monthly Investment Required</p>
              <p className="font-medium text-emerald-800">to meet education goal</p>
            </div>
          </div>
          <span className="font-bold text-lg text-emerald-800">
            {formatLargeNumber(monthlyInvestment)}
          </span>
        </div>
        
        {monthlyInvestment > 0 ? (
          <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  You need to invest <span className="font-bold">₹{formatLargeNumber(monthlyInvestment)?.replace('₹', '')}</span> every month for the next <span className="font-bold">{yearsUntilEducation} years</span> to meet your child's education goal.
                </p>
                <p className="text-xs text-emerald-600/80 mt-2">
                  *Calculations consider an inflation rate of {inflationRate}% p.a. and an expected return of {expectedReturn}% p.a.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-emerald-800">
                Great! Your current savings are sufficient to meet your child's education goal.
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  const handleShare = () => {
    if (!calculationResults) return;
    
    const { projectedCost, monthlyInvestment } = calculationResults;
    
    // Generate the share text
    let shareText = `🎓 Child Education Planning for ${childName}:\n\n`;
    shareText += `💰 Projected Cost of Education: ${formatLargeNumber(projectedCost)}\n`;
    shareText += `💰 Monthly Investment Required: ${formatLargeNumber(monthlyInvestment)}\n`;
    
    // Encode the text for WhatsApp
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 min-h-[420px] w-full">
      {/* Child's Name Input */}
      <div className="space-y-2">
        <Label htmlFor="childEducationCostChildName" className="text-sm font-medium text-emerald-800">Child's Name</Label>
        <Input 
          id="childEducationCostChildName" 
          value={childName} 
          onChange={(e) => setChildName(e.target.value)} 
          placeholder="e.g., Arjun"
          className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 rounded-lg"
        />
      </div>

      {/* Age Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="childEducationCostChildAge" className="text-sm font-medium text-emerald-800">Child's Current Age</Label>
          <FormattedInput 
            id="childEducationCostChildAge" 
            inputMode="numeric" 
            value={childAge} 
            onFormattedChange={setChildAge} 
            className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 rounded-lg" 
            placeholder="e.g., 5"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="childEducationCostEducationStartAge" className="text-sm font-medium text-emerald-800">Age When Child Will Go for Higher Education</Label>
          <FormattedInput 
            id="childEducationCostEducationStartAge" 
            inputMode="numeric" 
            value={educationStartAge} 
            onFormattedChange={setEducationStartAge} 
            className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 rounded-lg" 
            placeholder="e.g., 18"
          />
        </div>
      </div>

      {/* Financial Inputs */}
      <div className="space-y-2">
        <Label htmlFor="childEducationCostPresentCost" className="text-sm font-medium text-emerald-800">Present Cost of Higher Education (₹)</Label>
        <FormattedInput 
          id="childEducationCostPresentCost" 
          inputMode="numeric" 
          value={presentCost} 
          onFormattedChange={setPresentCost} 
          className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 rounded-lg" 
          placeholder="e.g., 1000000"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="childEducationCostInflationRate" className="text-sm font-medium text-emerald-800">Expected Inflation Rate (% p.a.)</Label>
          <FormattedInput 
            id="childEducationCostInflationRate" 
            inputMode="decimal" 
            value={inflationRate} 
            onFormattedChange={setInflationRate} 
            className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 rounded-lg" 
            placeholder="e.g., 7"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="childEducationCostExpectedReturn" className="text-sm font-medium text-emerald-800">Expected Rate of Return (% p.a.)</Label>
          <FormattedInput 
            id="childEducationCostExpectedReturn" 
            inputMode="decimal" 
            value={expectedReturn} 
            onFormattedChange={setExpectedReturn} 
            className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 rounded-lg" 
            placeholder="e.g., 10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="childEducationCostAmountSaved" className="text-sm font-medium text-emerald-800">Amount Already Saved for Child's Higher Education (₹)</Label>
        <FormattedInput 
          id="childEducationCostAmountSaved" 
          inputMode="numeric" 
          value={amountSaved} 
          onFormattedChange={setAmountSaved} 
          className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 rounded-lg" 
          placeholder="e.g., 200000"
        />
      </div>

      {/* Calculate Button */}
      <Button 
        onClick={handleCalculate} 
        className="w-full py-3 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-700 active:to-emerald-800 transition-all duration-300 ease-in-out rounded-xl font-medium"
        disabled={!childName || !childAge || !educationStartAge || !presentCost || !inflationRate || !expectedReturn}
      >
        Calculate Education Plan
      </Button>
      
      {/* Error Message */}
      {childAge && educationStartAge && parseInt(educationStartAge) <= parseInt(childAge) && (
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-500 text-sm">
            Education start age must be greater than current age.
          </p>
        </div>
      )}

      {/* Results Display */}
      {showResults && calculationResults && (
        <div className="mt-8 p-5 bg-emerald-50/50 rounded-xl border border-emerald-200/80 shadow-sm min-h-[300px]">
          <h3 className="text-base sm:text-lg font-semibold mb-5 text-center text-emerald-800 flex items-center justify-center gap-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Education Planning for {childName}
          </h3>
          
          <div className="space-y-4 mb-6">
            {renderResults()}
          </div>
          
          {/* Share Button */}
          <Button 
            onClick={handleShare} 
            className="w-full py-3 text-sm mt-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-800 active:to-emerald-900 transition-all duration-300 ease-in-out rounded-xl font-medium"
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
  );
}