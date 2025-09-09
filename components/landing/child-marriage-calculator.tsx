"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number.js";

export default function ChildMarriageCalculator() {
  const [childName, setChildName] = useState("");
  const [currentAge, setCurrentAge] = useState("5");
  const [marriageAge, setMarriageAge] = useState("25");
  const [monthlySavings, setMonthlySavings] = useState("500");
  const [paymentTenure, setPaymentTenure] = useState("15"); // "10", "15" or "20"
  const [investmentType, setInvestmentType] = useState("balanced"); // "conservative", "balanced", "aggressive"
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo(() => {
    if (!childName || !currentAge || !marriageAge || !monthlySavings || !paymentTenure) return null;

    const savings = parseFloat(monthlySavings) || 0;
    const tenure = parseInt(paymentTenure);
    const childCurrentAge = parseInt(currentAge);
    const childMarriageAge = parseInt(marriageAge);
    
    // Validate inputs
    if (childMarriageAge <= childCurrentAge || childCurrentAge < 0 || childMarriageAge > 40) return null;
    
    // Set return rates based on investment type
    let annualReturnRate;
    switch(investmentType) {
      case "conservative":
        annualReturnRate = 0.06; // 6% for conservative investments
        break;
      case "aggressive":
        annualReturnRate = 0.12; // 12% for aggressive investments
        break;
      case "balanced":
      default:
        annualReturnRate = 0.09; // 9% for balanced investments
    }
    
    const monthlyReturnRate = annualReturnRate / 12;
    const totalMonths = tenure * 12;
    
    // Future value of monthly savings (annuity calculation)
    const futureValue = savings * ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate);
    
    // Calculate years until marriage
    const yearsUntilMarriage = childMarriageAge - childCurrentAge;
    
    // Calculate corpus at marriage time with compounding
    const corpusAtMarriage = futureValue * Math.pow(1 + annualReturnRate, Math.max(0, yearsUntilMarriage - tenure));
    
    // Marriage expenses estimation with inflation adjustment
    // Assuming 6% annual inflation for marriage expenses
    const inflationRate = 0.06;
    const baseMarriageExpenses = 500000; // Base cost in today's terms
    const inflatedMarriageExpenses = baseMarriageExpenses * Math.pow(1 + inflationRate, yearsUntilMarriage);
    
    // User defined percentage for marriage expenses (default 20%)
    const marriageExpensesPercentage = 0.20;
    const marriageExpenses = corpusAtMarriage * marriageExpensesPercentage;
    
    // Emergency fund (10% of corpus)
    const emergencyFund = corpusAtMarriage * 0.10;
    
    // Remaining corpus after marriage expenses and emergency fund
    const remainingCorpus = corpusAtMarriage - marriageExpenses - emergencyFund;
    
    // Monthly income from remaining corpus (assuming 6% annual withdrawal)
    const annualIncome = remainingCorpus * 0.06;
    const monthlyIncome = annualIncome / 12;
    
    return {
      corpusAtMarriage,
      marriageExpenses,
      emergencyFund,
      remainingCorpus,
      monthlyIncome,
      yearsUntilMarriage,
      inflatedMarriageExpenses,
      investmentTypeLabel: investmentType.charAt(0).toUpperCase() + investmentType.slice(1)
    };
  }, [childName, currentAge, marriageAge, monthlySavings, paymentTenure, investmentType]);

  const handleCalculate = () => {
    if (childName && currentAge && marriageAge && monthlySavings && paymentTenure) {
      const childCurrentAge = parseInt(currentAge);
      const childMarriageAge = parseInt(marriageAge);
      
      // Validate age inputs
      if (childMarriageAge > childCurrentAge && childCurrentAge >= 0 && childMarriageAge <= 40) {
        setShowResults(true);
      }
    }
  };

  const handleShare = () => {
    if (!calculationResults) return;
    
    const { corpusAtMarriage, marriageExpenses, monthlyIncome } = calculationResults;
    
    // Generate the share text
    let shareText = `💍 Marriage Planning for ${childName}:\n\n`;
    shareText += `💰 Corpus at Marriage: ${formatLargeNumber(corpusAtMarriage)}\n`;
    shareText += `💍 Marriage Expenses: ${formatLargeNumber(marriageExpenses)}\n`;
    shareText += `💸 Monthly Income After Marriage: ${formatLargeNumber(monthlyIncome)}\n`;
    
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
            <Label htmlFor="childName" className="text-sm sm:text-base text-rose-700">Child's Name</Label>
            <Input 
              id="childName" 
              value={childName} 
              onChange={(e) => setChildName(e.target.value)} 
              placeholder="Enter your child's name"
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAge" className="text-sm sm:text-base text-rose-700">Child's Current Age</Label>
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

          {/* Monthly Savings Input */}
          <div className="space-y-2">
            <Label htmlFor="monthlySavings" className="text-sm sm:text-base text-rose-700">Monthly Savings (₹)</Label>
            <FormattedInput 
              id="monthlySavings" 
              inputMode="numeric" 
              value={monthlySavings} 
              onFormattedChange={setMonthlySavings} 
              className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300" 
              placeholder="Enter monthly savings amount"
            />
          </div>

          {/* Payment Tenure Options */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium text-rose-700">Payment Tenure</Label>
            <RadioGroup 
              value={paymentTenure} 
              onValueChange={setPaymentTenure} 
              className="grid grid-cols-3 gap-3 sm:flex sm:flex-row"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="10" 
                  id="tenure-10" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="tenure-10"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(244,114,182,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">10 Years</span>
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="15" 
                  id="tenure-15" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="tenure-15"
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(244,114,182,0.3)] transition-all duration-300 cursor-pointer"
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
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(244,114,182,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">20 Years</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Investment Type Options */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium text-rose-700">Investment Strategy</Label>
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
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(244,114,182,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Conservative (6%)</span>
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
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(244,114,182,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Balanced (9%)</span>
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
                  className="flex-1 text-center py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-[0_4px_12px_rgba(244,114,182,0.3)] transition-all duration-300 cursor-pointer"
                >
                  <span className="font-medium">Aggressive (12%)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:from-rose-500 hover:to-rose-600 active:from-rose-700 active:to-rose-800 transition-all duration-300 ease-in-out"
            disabled={!childName || !currentAge || !marriageAge || !monthlySavings || !paymentTenure}
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
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
                  <span className="font-medium text-sm sm:text-base text-rose-700">
                    💰 Corpus at Marriage ({calculationResults.yearsUntilMarriage} years)
                  </span>
                  <span className="font-bold text-base sm:text-lg text-rose-800">
                    {formatLargeNumber(calculationResults.corpusAtMarriage)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
                  <span className="font-medium text-sm sm:text-base text-rose-700">
                    💍 Marriage Expenses ({calculationResults.investmentTypeLabel} Strategy)
                  </span>
                  <span className="font-bold text-base sm:text-lg text-rose-800">
                    {formatLargeNumber(calculationResults.marriageExpenses)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
                  <span className="font-medium text-sm sm:text-base text-rose-700">
                    🚨 Emergency Fund
                  </span>
                  <span className="font-bold text-base sm:text-lg text-rose-800">
                    {formatLargeNumber(calculationResults.emergencyFund)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
                  <span className="font-medium text-sm sm:text-base text-rose-700">
                    💎 Remaining Corpus
                  </span>
                  <span className="font-bold text-base sm:text-lg text-rose-800">
                    {formatLargeNumber(calculationResults.remainingCorpus)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-white/50 rounded-md border border-rose-100">
                  <span className="font-medium text-sm sm:text-base text-rose-700">
                    💸 Monthly Income After Marriage
                  </span>
                  <span className="font-bold text-base sm:text-lg text-rose-800">
                    {formatLargeNumber(calculationResults.monthlyIncome)}
                  </span>
                </div>
              </div>
              
              <div className="text-xs sm:text-sm text-rose-600/80 mt-2 text-center">
                *Assumptions: 6% inflation for marriage expenses, 20% for marriage costs, 10% for emergency fund, 6% annual withdrawal rate
              </div>
              
              {/* Share Button */}
              <Button 
                onClick={handleShare} 
                className="w-full mt-6 bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg hover:from-rose-600 hover:to-rose-700 active:from-rose-800 active:to-rose-900 transition-all duration-300 ease-in-out"
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