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
  const [childAge, setChildAge] = useState("5");
  const [monthlySavings, setMonthlySavings] = useState("500");
  const [paymentTenure, setPaymentTenure] = useState("10"); // "10" or "15"
  const [investmentType, setInvestmentType] = useState("balanced"); // "conservative", "balanced", "aggressive"
  const [educationStartAge, setEducationStartAge] = useState("18"); // Age when education starts
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo(() => {
    if (!childName || !childAge || !monthlySavings || !paymentTenure || !educationStartAge) return null;

    const savings = parseFloat(monthlySavings) || 0;
    const tenure = parseInt(paymentTenure);
    const currentAge = parseInt(childAge);
    const startAge = parseInt(educationStartAge);
    
    // Validate inputs
    if (startAge <= currentAge || currentAge < 0 || startAge > 30) return null;
    
    // Set return rates based on investment type
    let annualReturnRate;
    switch(investmentType) {
      case "conservative":
        annualReturnRate = 0.07; // 7% for conservative investments
        break;
      case "aggressive":
        annualReturnRate = 0.11; // 11% for aggressive investments
        break;
      case "balanced":
      default:
        annualReturnRate = 0.09; // 9% for balanced investments
    }
    
    const monthlyReturnRate = annualReturnRate / 12;
    const totalMonths = tenure * 12;
    
    // Future value of monthly savings (annuity calculation)
    const futureValue = savings * ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate);
    
    // Calculate years until education starts
    const yearsUntilEducation = startAge - currentAge;
    
    // Calculate corpus at education start time with compounding
    const corpusAtEducationStart = futureValue * Math.pow(1 + annualReturnRate, Math.max(0, yearsUntilEducation - tenure));
    
    // Calculate the years when education support is provided (5 years of education)
    const educationYears = [];
    for (let i = 0; i < 5; i++) {
      educationYears.push(startAge + i);
    }
    
    // Calculate annual support and education fund based on corpus
    // Using a more realistic approach rather than hardcoded ratios
    const annualSupport = corpusAtEducationStart * 0.08; // 8% annual withdrawal during education
    const educationFund = corpusAtEducationStart * 0.20; // 20% one-time education fund
    
    // Remaining corpus after education expenses
    const remainingCorpus = corpusAtEducationStart - (annualSupport * 5) - educationFund;
    
    // Monthly income from remaining corpus (assuming 6% annual withdrawal post-education)
    const annualIncome = remainingCorpus * 0.06;
    const monthlyIncome = annualIncome / 12;
    
    return {
      corpusAtEducationStart,
      annualSupport,
      educationFund,
      educationYears,
      remainingCorpus,
      monthlyIncome,
      yearsUntilEducation,
      investmentTypeLabel: investmentType.charAt(0).toUpperCase() + investmentType.slice(1)
    };
  }, [childName, childAge, monthlySavings, paymentTenure, educationStartAge, investmentType]);

  const handleCalculate = () => {
    if (childName && childAge && monthlySavings && educationStartAge) {
      const currentAge = parseInt(childAge);
      const startAge = parseInt(educationStartAge);
      
      // Validate age inputs
      if (startAge > currentAge && currentAge >= 0 && startAge <= 30) {
        setShowResults(true);
      }
    }
  };

  const handleShare = () => {
    if (!calculationResults) return;
    
    const { corpusAtEducationStart, annualSupport, educationFund } = calculationResults;
    
    // Generate the share text
    let shareText = `📚 Child Education Planning for ${childName}:

`;
    shareText += `💰 Corpus at Education Start: ${formatLargeNumber(corpusAtEducationStart)}
`;
    shareText += `💸 Annual Education Support: ${formatLargeNumber(annualSupport)}
`;
    shareText += `🏦 One-Time Education Fund: ${formatLargeNumber(educationFund)}
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
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Child's Name Input */}
          <div className="space-y-2">
            <Label htmlFor="childName" className="text-sm sm:text-base text-emerald-700">Child&#39;s Name</Label>
            <Input 
              id="childName" 
              value={childName} 
              onChange={(e) => setChildName(e.target.value)} 
              placeholder="Enter your child&#39;s name"
              className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="childAge" className="text-sm sm:text-base text-emerald-700">Child&#39;s Current Age</Label>
              <FormattedInput 
                id="childAge" 
                inputMode="numeric" 
                value={childAge} 
                onFormattedChange={setChildAge} 
                className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
                placeholder="Enter current age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="educationStartAge" className="text-sm sm:text-base text-emerald-700">Education Start Age</Label>
              <FormattedInput 
                id="educationStartAge" 
                inputMode="numeric" 
                value={educationStartAge} 
                onFormattedChange={setEducationStartAge} 
                className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
                placeholder="Enter start age"
              />
            </div>
          </div>

          {/* Monthly Savings Input */}
          <div className="space-y-2">
            <Label htmlFor="monthlySavings" className="text-sm sm:text-base text-emerald-700">Monthly Savings (₹)</Label>
            <FormattedInput 
              id="monthlySavings" 
              inputMode="numeric" 
              value={monthlySavings} 
              onFormattedChange={setMonthlySavings} 
              className="w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300" 
              placeholder="Enter monthly savings amount"
            />
          </div>

          {/* Payment Tenure Options */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium text-emerald-700">Payment Tenure</Label>
            <RadioGroup 
              value={paymentTenure} 
              onValueChange={setPaymentTenure} 
              className="grid grid-cols-2 gap-3 sm:flex sm:flex-row"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="10" 
                  id="education-tenure-10" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="education-tenure-10"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">10 Years</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="15" 
                  id="education-tenure-15" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="education-tenure-15"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">15 Years</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Investment Type Options */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium text-emerald-700">Investment Strategy</Label>
            <RadioGroup 
              value={investmentType} 
              onValueChange={setInvestmentType} 
              className="grid grid-cols-3 gap-3 sm:flex sm:flex-row"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="conservative" 
                  id="education-investment-conservative" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="education-investment-conservative"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Conservative (7%)</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="balanced" 
                  id="education-investment-balanced" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="education-investment-balanced"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Balanced (9%)</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="aggressive" 
                  id="education-investment-aggressive" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="education-investment-aggressive"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Aggressive (11%)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:from-emerald-500 hover:to-emerald-600 active:from-emerald-700 active:to-emerald-800 transition-all duration-300 ease-in-out"
            disabled={!childName || !childAge || !monthlySavings || !educationStartAge}
          >
            Calculate Education Plan
          </Button>

          {/* Results Display */}
          {showResults && calculationResults && (
            <div className="mt-8 p-4 sm:p-5 bg-emerald-50/50 rounded-lg border border-emerald-200/80">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-emerald-800">
                &#128218; Education Planning for {childName}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-emerald-100">
                  <span className="font-medium text-sm sm:text-base text-emerald-700">
                    &#128176; Corpus at Education Start ({calculationResults.yearsUntilEducation} years)
                  </span>
                  <span className="font-bold text-base sm:text-lg text-emerald-800">
                    {formatLargeNumber(calculationResults.corpusAtEducationStart)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-emerald-100">
                  <span className="font-medium text-sm sm:text-base text-emerald-700">
                    &#128184; Annual Education Support
                  </span>
                  <span className="font-bold text-base sm:text-lg text-emerald-800">
                    {formatLargeNumber(calculationResults.annualSupport)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-emerald-100">
                  <span className="font-medium text-sm sm:text-base text-emerald-700">
                    &#127974; One-Time Education Fund
                  </span>
                  <span className="font-bold text-base sm:text-lg text-emerald-800">
                    {formatLargeNumber(calculationResults.educationFund)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-emerald-100">
                  <span className="font-medium text-sm sm:text-base text-emerald-700">
                    &#128142; Remaining Corpus
                  </span>
                  <span className="font-bold text-base sm:text-lg text-emerald-800">
                    {formatLargeNumber(calculationResults.remainingCorpus)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-emerald-100">
                  <span className="font-medium text-sm sm:text-base text-emerald-700">
                    &#128181; Monthly Income After Education
                  </span>
                  <span className="font-bold text-base sm:text-lg text-emerald-800">
                    {formatLargeNumber(calculationResults.monthlyIncome)}
                  </span>
                </div>
              </div>
              
              <div className="text-xs sm:text-sm text-emerald-600/80 mt-2 text-center">
                *Assumptions: 8% annual withdrawal during education, 20% one-time fund, 6% post-education withdrawal
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