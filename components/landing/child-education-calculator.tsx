"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number.js";

export default function ChildEducationCalculator() {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [educationStartAge, setEducationStartAge] = useState("");
  const [presentCost, setPresentCost] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo(() => {
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

  const handleShare = () => {
    if (!calculationResults) return;
    
    const { projectedCost, monthlyInvestment } = calculationResults;
    
    // Generate the share text
    let shareText = `📚 Child Education Planning for ${childName}:

`;
    shareText += `💰 Projected Cost of Education: ${formatLargeNumber(projectedCost)}
`;
    shareText += `💸 Monthly Investment Required: ${formatLargeNumber(monthlyInvestment)}
`;
    
    // Encode the text for WhatsApp
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-emerald-50/70 to-emerald-100/50 backdrop-blur supports-[backdrop-filter]:bg-emerald-50/30 border border-emerald-200/80 shadow-xl rounded-xl">
      <CardHeader className="pb-2 mb-6">
        <CardTitle className="text-center text-xl font-bold text-emerald-800">Child Education Planning Calculator</CardTitle>
        <p className="text-center text-sm text-emerald-600 mt-2">
          Plan your child&apos;s education expenses and calculate monthly savings needed
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Child's Name Input */}
          <div className="space-y-2">
            <Label htmlFor="childName" className="text-sm sm:text-base text-emerald-700">Child&apos;s Name</Label>
            <Input 
              id="childName" 
              value={childName} 
              onChange={(e) => setChildName(e.target.value)} 
              placeholder="e.g., Arjun"
              className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="childAge" className="text-sm sm:text-base text-emerald-700">Child&apos;s Current Age</Label>
              <FormattedInput 
                id="childAge" 
                inputMode="numeric" 
                value={childAge} 
                onFormattedChange={setChildAge} 
                className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
                placeholder="e.g., 5"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="educationStartAge" className="text-sm sm:text-base text-emerald-700">Age When Child Will Go for Higher Education</Label>
              <FormattedInput 
                id="educationStartAge" 
                inputMode="numeric" 
                value={educationStartAge} 
                onFormattedChange={setEducationStartAge} 
                className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
                placeholder="e.g., 18"
              />
            </div>
          </div>

          {/* Financial Inputs */}
          <div className="space-y-2">
            <Label htmlFor="presentCost" className="text-sm sm:text-base text-emerald-700">Present Cost of Higher Education (₹)</Label>
            <FormattedInput 
              id="presentCost" 
              inputMode="numeric" 
              value={presentCost} 
              onFormattedChange={setPresentCost} 
              className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
              placeholder="e.g., 1000000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inflationRate" className="text-sm sm:text-base text-emerald-700">Expected Inflation Rate (% p.a.)</Label>
              <FormattedInput 
                id="inflationRate" 
                inputMode="decimal" 
                value={inflationRate} 
                onFormattedChange={setInflationRate} 
                className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
                placeholder="e.g., 7"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expectedReturn" className="text-sm sm:text-base text-emerald-700">Expected Rate of Return (% p.a.)</Label>
              <FormattedInput 
                id="expectedReturn" 
                inputMode="decimal" 
                value={expectedReturn} 
                onFormattedChange={setExpectedReturn} 
                className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountSaved" className="text-sm sm:text-base text-emerald-700">Amount Already Saved for Child&apos;s Higher Education (₹)</Label>
            <FormattedInput 
              id="amountSaved" 
              inputMode="numeric" 
              value={amountSaved} 
              onFormattedChange={setAmountSaved} 
              className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
              placeholder="e.g., 200000"
            />
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:from-emerald-500 hover:to-emerald-600 active:from-emerald-700 active:to-emerald-800 transition-all duration-300 ease-in-out"
            disabled={!childName || !childAge || !educationStartAge || !presentCost || !inflationRate || !expectedReturn}
          >
            Calculate Education Plan
          </Button>
          
          {/* Error Message */}
          {childAge && educationStartAge && parseInt(educationStartAge) <= parseInt(childAge) && (
            <div className="text-red-500 text-sm text-center mt-2">
              Education start age must be greater than current age.
            </div>
          )}

          {/* Results Display */}
          {showResults && calculationResults && (
            <div className="mt-8 p-4 sm:p-5 bg-emerald-50/50 rounded-lg border border-emerald-200/80">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-emerald-800">
                &#128218; Education Planning for {childName}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-emerald-100">
                  <span className="font-medium text-sm sm:text-base text-emerald-700">
                    &#128176; Projected Cost of Education after {calculationResults.yearsUntilEducation} years
                  </span>
                  <span className="font-bold text-base sm:text-lg text-emerald-800">
                    {formatLargeNumber(calculationResults.projectedCost)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-emerald-100">
                  <span className="font-medium text-sm sm:text-base text-emerald-700">
                    &#128184; Monthly Investment Required
                  </span>
                  <span className="font-bold text-base sm:text-lg text-emerald-800">
                    {formatLargeNumber(calculationResults.monthlyInvestment)}
                  </span>
                </div>
                
                {calculationResults.monthlyInvestment > 0 ? (
                  <div className="text-xs sm:text-sm text-emerald-600 mt-2 text-center">
                    You need to invest &#8377;{formatLargeNumber(calculationResults.monthlyInvestment).replace('₹', '')} every month for the next {calculationResults.yearsUntilEducation} years to meet your child&apos;s education goal.
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-emerald-600 mt-2 text-center">
                    Great! Your current savings are sufficient to meet your child&apos;s education goal.
                  </div>
                )}
              </div>
              
              <div className="text-xs sm:text-sm text-emerald-600/80 mt-2 text-center">
                *Calculations consider an inflation rate of {inflationRate}% p.a. and an expected return of {expectedReturn}% p.a.
              </div>
              
              {/* Share Button */}
              <Button 
                onClick={handleShare} 
                className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-800 active:to-emerald-900 transition-all duration-300 ease-in-out"
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