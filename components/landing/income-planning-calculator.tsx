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
  const [currentAge, setCurrentAge] = useState("30");
  const [monthlyInvestment, setMonthlyInvestment] = useState("1000");
  const [investmentTenure, setInvestmentTenure] = useState("20"); // "15", "20" or "25"
  const [retirementAge, setRetirementAge] = useState("60"); // "55", "60" or "65"
  const [investmentType, setInvestmentType] = useState("balanced"); // "conservative", "balanced", "aggressive"
  const [inflationRate, setInflationRate] = useState("6"); // Inflation rate assumption
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo(() => {
    if (!name || !currentAge || !monthlyInvestment || !investmentTenure || !retirementAge || !inflationRate) return null;

    const investment = parseFloat(monthlyInvestment) || 0;
    const tenure = parseInt(investmentTenure);
    const retirement = parseInt(retirementAge);
    const current = parseInt(currentAge);
    const inflation = parseFloat(inflationRate) / 100;
    
    // Validate inputs
    if (retirement <= current || current < 18 || retirement > 80) return null;
    
    // Set return rates based on investment type
    let annualReturnRate;
    switch(investmentType) {
      case "conservative":
        annualReturnRate = 0.07; // 7% for conservative investments
        break;
      case "aggressive":
        annualReturnRate = 0.12; // 12% for aggressive investments
        break;
      case "balanced":
      default:
        annualReturnRate = 0.10; // 10% for balanced investments
    }
    
    const monthlyReturnRate = annualReturnRate / 12;
    const totalMonths = tenure * 12;
    
    // Future value of monthly investments (annuity calculation)
    const futureValue = investment * ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate);
    
    // Calculate years until retirement
    const yearsUntilRetirement = retirement - current;
    
    // Calculate corpus at retirement with compounding
    const corpusAtRetirement = futureValue * Math.pow(1 + annualReturnRate, Math.max(0, yearsUntilRetirement - tenure));
    
    // Adjust for inflation to get real value
    const realCorpusValue = corpusAtRetirement / Math.pow(1 + inflation, yearsUntilRetirement);
    
    // Calculate monthly pension with different withdrawal strategies
    const withdrawalRates = [
      { rate: 0.04, label: "Conservative (4%)" },
      { rate: 0.05, label: "Moderate (5%)" },
      { rate: 0.06, label: "Optimal (6%)" },
      { rate: 0.07, label: "Growth (7%)" }
    ];
    
    const withdrawalOptions = withdrawalRates.map(option => ({
      label: option.label,
      annual: corpusAtRetirement * option.rate,
      monthly: (corpusAtRetirement * option.rate) / 12,
      inflationAdjustedAnnual: realCorpusValue * option.rate,
      inflationAdjustedMonthly: (realCorpusValue * option.rate) / 12
    }));
    
    // Calculate how long corpus will last with different withdrawal rates
    const longevityAnalysis = withdrawalRates.map(option => {
      const withdrawalAmount = corpusAtRetirement * option.rate;
      // Simplified calculation for years corpus will last
      const yearsLast = annualReturnRate > option.rate 
        ? corpusAtRetirement / (withdrawalAmount - (corpusAtRetirement * (annualReturnRate - option.rate)))
        : "Indefinite"; // If withdrawal rate is less than return rate
      
      return {
        label: option.label,
        years: typeof yearsLast === 'number' ? Math.round(yearsLast) : yearsLast
      };
    });
    
    // Rule of thumb calculation (12x expenses = corpus needed)
    const recommendedMonthlyExpenses = corpusAtRetirement / 12 / 12; // corpus / 144
    
    return {
      corpusAtRetirement,
      realCorpusValue,
      withdrawalOptions,
      longevityAnalysis,
      recommendedMonthlyExpenses,
      yearsUntilRetirement
    };
  }, [name, currentAge, monthlyInvestment, investmentTenure, retirementAge, investmentType, inflationRate]);

  const handleCalculate = () => {
    if (name && currentAge && monthlyInvestment && investmentTenure && retirementAge) {
      const current = parseInt(currentAge);
      const retirement = parseInt(retirementAge);
      
      // Validate age inputs
      if (retirement > current && current >= 18 && retirement <= 80) {
        setShowResults(true);
      }
    }
  };

  const handleShare = () => {
    if (!calculationResults) return;
    
    const { corpusAtRetirement, withdrawalOptions } = calculationResults;
    
    // Generate the share text
    let shareText = `💰 Income Planning Calculator Results for ${name}:

`;
    shareText += `🏦 Corpus at Retirement: ${formatLargeNumber(corpusAtRetirement)}
`;
    shareText += `💸 Monthly Pension (6% withdrawal): ${formatLargeNumber(withdrawalOptions[2]?.monthly || 0)}
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
        <CardTitle className="text-center text-xl font-bold text-indigo-800">Income Planning Calculator</CardTitle>
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
              placeholder="Enter your name"
              className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAge" className="text-sm sm:text-base text-indigo-700">Current Age</Label>
              <FormattedInput 
                id="currentAge" 
                inputMode="numeric" 
                value={currentAge} 
                onFormattedChange={setCurrentAge} 
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
                placeholder="Enter current age"
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
                placeholder="Enter retirement age"
              />
            </div>
          </div>

          {/* Monthly Investment Input */}
          <div className="space-y-2">
            <Label htmlFor="monthlyInvestment" className="text-sm sm:text-base text-indigo-700">Monthly Investment (₹)</Label>
            <FormattedInput 
              id="monthlyInvestment" 
              inputMode="numeric" 
              value={monthlyInvestment} 
              onFormattedChange={setMonthlyInvestment} 
              className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
              placeholder="Enter monthly investment amount"
            />
          </div>

          {/* Investment Tenure Options */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium text-indigo-700">Investment Tenure</Label>
            <RadioGroup 
              value={investmentTenure} 
              onValueChange={setInvestmentTenure} 
              className="grid grid-cols-3 gap-3 sm:flex sm:flex-row"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="15" 
                  id="tenure-15" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="tenure-15"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">15 Years</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="20" 
                  id="tenure-20" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="tenure-20"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">20 Years</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="25" 
                  id="tenure-25" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="tenure-25"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">25 Years</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Investment Type Options */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium text-indigo-700">Investment Strategy</Label>
            <RadioGroup 
              value={investmentType} 
              onValueChange={setInvestmentType} 
              className="grid grid-cols-3 gap-3 sm:flex sm:flex-row"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="conservative" 
                  id="investment-conservative" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="investment-conservative"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Conservative (7%)</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="balanced" 
                  id="investment-balanced" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="investment-balanced"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Balanced (10%)</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="aggressive" 
                  id="investment-aggressive" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="investment-aggressive"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Aggressive (12%)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Inflation Rate */}
          <div className="space-y-2">
            <Label htmlFor="inflationRate" className="text-sm sm:text-base text-indigo-700">Inflation Rate Assumption (%)</Label>
            <FormattedInput 
              id="inflationRate" 
              inputMode="numeric" 
              value={inflationRate} 
              onFormattedChange={setInflationRate} 
              className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
              placeholder="Enter inflation rate"
            />
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-700 active:to-indigo-800 transition-all duration-300 ease-in-out"
            disabled={!name || !currentAge || !monthlyInvestment || !investmentTenure || !retirementAge}
          >
            Calculate Income Plan
          </Button>

          {/* Results Display */}
          {showResults && calculationResults && (
            <div className="mt-8 p-4 sm:p-5 bg-indigo-50/50 rounded-lg border border-indigo-200/80">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-indigo-800">
                💰 Income Planning for {name}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-indigo-100">
                  <span className="font-medium text-sm sm:text-base text-indigo-700">
                    🏦 Corpus at Retirement ({calculationResults.yearsUntilRetirement} years)
                  </span>
                  <span className="font-bold text-base sm:text-lg text-indigo-800">
                    {formatLargeNumber(calculationResults.corpusAtRetirement)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-indigo-100">
                  <span className="font-medium text-sm sm:text-base text-indigo-700">
                    💵 Real Value (Inflation Adjusted)
                  </span>
                  <span className="font-bold text-base sm:text-lg text-indigo-800">
                    {formatLargeNumber(calculationResults.realCorpusValue)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-indigo-100">
                  <span className="font-medium text-sm sm:text-base text-indigo-700">
                    💡 Recommended Monthly Expenses
                  </span>
                  <span className="font-bold text-base sm:text-lg text-indigo-800">
                    {formatLargeNumber(calculationResults.recommendedMonthlyExpenses)}
                  </span>
                </div>
              </div>
              
              <h4 className="text-sm sm:text-base font-semibold mb-3 text-center text-indigo-800">
                Withdrawal Options:
              </h4>
              
              <div className="space-y-3 mb-6">
                {calculationResults.withdrawalOptions.map((option, index) => (
                  <div key={index} className="p-3 bg-white/50 rounded-md border border-indigo-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-indigo-700">{option.label}</span>
                      <span className="font-bold text-indigo-800">
                        {formatLargeNumber(option.monthly)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-indigo-600">Inflation Adjusted:</span>
                      <span className="font-medium text-indigo-700">
                        {formatLargeNumber(option.inflationAdjustedMonthly)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="text-sm sm:text-base font-semibold mb-3 text-center text-indigo-800">
                Longevity Analysis:
              </h4>
              
              <div className="space-y-2 mb-6">
                {calculationResults.longevityAnalysis.map((option, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white/50 rounded-md border border-indigo-100">
                    <span className="text-sm sm:text-base text-indigo-700">{option.label}</span>
                    <span className="font-medium text-sm sm:text-base text-indigo-800">
                      {option.years === "Indefinite" ? "Indefinite" : `${option.years} years`}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-xs sm:text-sm text-indigo-600/80 mt-2 text-center">
                *Assumptions: Returns based on investment strategy, {inflationRate}% inflation rate, withdrawal rates as shown
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