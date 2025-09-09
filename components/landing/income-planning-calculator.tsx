"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number.js";

export default function IncomePlanningCalculator() {
  const [name, setName] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo(() => {
    if (!name || !currentAge || !retirementAge || !lifeExpectancy || !monthlyExpenses || !inflationRate || !expectedReturn) return null;

    const current = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    const expectancy = parseInt(lifeExpectancy);
    const expenses = parseFloat(monthlyExpenses) || 0;
    const inflation = parseFloat(inflationRate) || 0;
    const expectedReturnRate = parseFloat(expectedReturn) || 0;
    
    // Validate inputs
    if (isNaN(current) || isNaN(retirement) || isNaN(expectancy) || 
        isNaN(expenses) || isNaN(inflation) || isNaN(expectedReturnRate)) return null;
    
    if (retirement <= current || current < 18 || retirement > 80 || 
        expectancy <= retirement || expenses <= 0 || inflation < 0 || expectedReturnRate < 0) return null;
    
    // Calculate years until retirement
    const yearsUntilRetirement = retirement - current;
    
    // Calculate years in retirement
    const yearsInRetirement = expectancy - retirement;
    
    // Calculate future monthly expenses at retirement (considering inflation)
    const futureMonthlyExpenses = expenses * Math.pow(1 + inflation / 100, yearsUntilRetirement);
    
    // Calculate annual expenses at retirement
    const annualExpensesAtRetirement = futureMonthlyExpenses * 12;
    
    // Calculate retirement corpus needed using the present value of a growing annuity due formula
    // This accounts for expenses growing at the inflation rate during retirement
    // PV = PMT / (r - g) * [1 - ((1 + g) / (1 + r))^n] * (1 + r)
    // Where PMT = initial annual expenses, r = return rate, g = growth rate, n = years
    // The (1 + r) factor accounts for withdrawals at the beginning of each period (annuity due)
    const growthRate = inflation / 100; // Growth rate of expenses during retirement (inflation)
    const discountRate = expectedReturnRate / 100; // Discount rate (expected return)
    
    let retirementCorpus;
    if (Math.abs(discountRate - growthRate) < 0.0001) {
      // If rates are nearly equal, use the simplified formula to avoid division by zero
      retirementCorpus = annualExpensesAtRetirement * yearsInRetirement;
    } else {
      // Present value of growing annuity due formula (payments at beginning of period)
      retirementCorpus = annualExpensesAtRetirement / (discountRate - growthRate) * 
        (1 - Math.pow((1 + growthRate) / (1 + discountRate), yearsInRetirement)) * (1 + discountRate);
    }
    
    // Calculate monthly savings required to reach corpus
    // Using future value of annuity due formula: PMT = FV * r / [((1 + r)^n - 1) * (1 + r)]
    // This accounts for savings at the beginning of each period (annuity due)
    const monthlyRate = expectedReturnRate / 100 / 12;
    const numberOfMonths = yearsUntilRetirement * 12;
    
    let monthlySavingsRequired;
    if (monthlyRate === 0) {
      // If expected return is 0, simple division
      monthlySavingsRequired = retirementCorpus / numberOfMonths;
    } else {
      // Future value of annuity due formula (payments at beginning of period)
      monthlySavingsRequired = retirementCorpus * monthlyRate / ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) * (1 + monthlyRate));
    }
    
    return {
      retirementCorpus,
      monthlySavingsRequired,
      yearsUntilRetirement,
      yearsInRetirement,
      futureMonthlyExpenses
    };
  }, [name, currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn]);

  const handleCalculate = () => {
    if (name && currentAge && retirementAge && lifeExpectancy && monthlyExpenses && inflationRate && expectedReturn) {
      const current = parseInt(currentAge);
      const retirement = parseInt(retirementAge);
      const expectancy = parseInt(lifeExpectancy);
      const expenses = parseFloat(monthlyExpenses);
      const inflation = parseFloat(inflationRate);
      const expectedReturnRate = parseFloat(expectedReturn);
      
      // Validate all inputs
      if (isNaN(current) || isNaN(retirement) || isNaN(expectancy) || 
          isNaN(expenses) || isNaN(inflation) || isNaN(expectedReturnRate)) return;
      
      // Validate age inputs
      if (retirement > current && current >= 18 && retirement <= 80 && 
          expectancy > retirement && expenses > 0 && inflation >= 0 && expectedReturnRate >= 0) {
        setShowResults(true);
      }
    }
  };

  const handleShare = () => {
    if (!calculationResults) return;
    
    const { retirementCorpus, monthlySavingsRequired } = calculationResults;
    
    // Generate the share text
    let shareText = `💰 Retirement Planning Calculator Results for ${name}:

`;
    shareText += `🏦 Retirement Corpus Needed: ${formatLargeNumber(retirementCorpus)}
`;
    shareText += `💸 Monthly Savings Required: ${formatLargeNumber(monthlySavingsRequired)}
`;
    
    // Encode the text for WhatsApp
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-indigo-50/70 to-indigo-100/50 backdrop-blur supports-[backdrop-filter]:bg-indigo-50/30 border border-indigo-200/80 shadow-xl rounded-xl">
      <CardHeader className="pb-2 mb-6">
        <CardTitle className="text-center text-xl font-bold text-indigo-800">Retirement Planning Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base text-indigo-700">Your Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., Arjun Sharma"
              className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAge" className="text-sm sm:text-base text-indigo-700">Current Age</Label>
              <FormattedInput 
                id="currentAge" 
                inputMode="numeric" 
                value={currentAge} 
                onFormattedChange={setCurrentAge} 
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
                placeholder="e.g., 35 years"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retirementAge" className="text-sm sm:text-base text-indigo-700">Retirement Age</Label>
              <FormattedInput 
                id="retirementAge" 
                inputMode="numeric" 
                value={retirementAge} 
                onFormattedChange={setRetirementAge} 
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
                placeholder="e.g., 60 years"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lifeExpectancy" className="text-sm sm:text-base text-indigo-700">Life Expectancy</Label>
              <FormattedInput 
                id="lifeExpectancy" 
                inputMode="numeric" 
                value={lifeExpectancy} 
                onFormattedChange={setLifeExpectancy} 
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
                placeholder="e.g., 85 years"
              />
            </div>
          </div>

          {/* Financial Inputs */}
          <div className="space-y-2">
            <Label htmlFor="monthlyExpenses" className="text-sm sm:text-base text-indigo-700">Current Monthly Expenses (₹)</Label>
            <FormattedInput 
              id="monthlyExpenses" 
              inputMode="numeric" 
              value={monthlyExpenses} 
              onFormattedChange={setMonthlyExpenses} 
              className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
              placeholder="e.g., ₹50,000 per month"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="retirementInflationRate" className="text-sm sm:text-base text-indigo-700">Expected Inflation Rate (% p.a.)</Label>
              <FormattedInput 
                id="retirementInflationRate" 
                inputMode="decimal" 
                value={inflationRate} 
                onFormattedChange={setInflationRate} 
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
                placeholder="e.g., 6% per year"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retirementExpectedReturn" className="text-sm sm:text-base text-indigo-700">Expected Rate of Return (% p.a.)</Label>
              <FormattedInput 
                id="retirementExpectedReturn" 
                inputMode="decimal" 
                value={expectedReturn} 
                onFormattedChange={setExpectedReturn} 
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
                placeholder="e.g., 10% per year"
              />
            </div>
          </div>

          {/* Error Messages */}
          {currentAge && retirementAge && parseInt(retirementAge) <= parseInt(currentAge) && (
            <div className="text-red-500 text-sm text-center">
              Retirement age must be greater than current age.
            </div>
          )}
          
          {retirementAge && lifeExpectancy && parseInt(lifeExpectancy) <= parseInt(retirementAge) && (
            <div className="text-red-500 text-sm text-center">
              Life expectancy must be greater than retirement age.
            </div>
          )}

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-700 active:to-indigo-800 transition-all duration-300 ease-in-out"
            disabled={!name || !currentAge || !retirementAge || !lifeExpectancy || !monthlyExpenses || !inflationRate || !expectedReturn}
          >
            Calculate Retirement Plan
          </Button>

          {/* Results Display */}
          {showResults && calculationResults && (
            <div className="mt-8 p-4 sm:p-5 bg-indigo-50/50 rounded-lg border border-indigo-200/80">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-indigo-800">
                💰 Retirement Planning for {name}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-indigo-100">
                  <span className="font-medium text-sm sm:text-base text-indigo-700">
                    🏦 Retirement Corpus Needed
                  </span>
                  <span className="font-bold text-base sm:text-lg text-indigo-800">
                    {formatLargeNumber(calculationResults.retirementCorpus)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-indigo-100">
                  <span className="font-medium text-sm sm:text-base text-indigo-700">
                    💸 Monthly Savings Required
                  </span>
                  <span className="font-bold text-base sm:text-lg text-indigo-800">
                    {formatLargeNumber(calculationResults.monthlySavingsRequired)}
                  </span>
                </div>
                
                <div className="text-xs sm:text-sm text-indigo-600 mt-2 text-center">
                  You need to invest &#8377;{formatLargeNumber(calculationResults.monthlySavingsRequired).replace('₹', '')} every month for the next {calculationResults.yearsUntilRetirement} years to build a retirement corpus of &#8377;{formatLargeNumber(calculationResults.retirementCorpus).replace('₹', '')}.
                </div>
                
                <div className="text-xs sm:text-sm text-indigo-600/80 mt-2 text-center">
                  Based on your current monthly expenses of &#8377;{formatLargeNumber(parseFloat(monthlyExpenses)).replace('₹', '')}, 
                  which will grow to &#8377;{formatLargeNumber(calculationResults.futureMonthlyExpenses).replace('₹', '')} by retirement 
                  considering {inflationRate}% p.a. inflation.
                </div>
              </div>
              
              <div className="text-xs sm:text-sm text-indigo-600/80 mt-2 text-center">
                *Calculations consider an inflation rate of {inflationRate}% p.a. and an expected return of {expectedReturn}% p.a.
              </div>
              
              {/* Share Button */}
              <Button 
                onClick={handleShare} 
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg hover:from-indigo-600 hover:to-indigo-700 active:from-indigo-800 active:to-indigo-900 transition-all duration-300 ease-in-out"
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