"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number";
import { calculateRetirementPlan, RetirementPlanResult } from "@/lib/calculators";

export default function IncomePlanningCalculatorRefined() {
  const [name, setName] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Calculate results based on inputs
  const calculationResults = useMemo<RetirementPlanResult | null>(() => {
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

    // More reasonable validation limits
    if (retirement <= current || current < 15 || retirement > 100 ||
      expectancy <= retirement || expenses <= 0 || inflation < 0 || expectedReturnRate < 0) return null;

    return calculateRetirementPlan(
      current,
      retirement,
      expectancy,
      expenses,
      inflation,
      expectedReturnRate
    );
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

      // Validate age inputs with more reasonable limits
      if (retirement > current && current >= 15 && retirement <= 100 &&
        expectancy > retirement && expenses > 0 && inflation >= 0 && expectedReturnRate >= 0) {
        setShowResults(true);
      }
    }
  };

  const renderResults = () => {
    // Type guard to ensure calculationResults is not null
    if (!calculationResults) return null;

    // Use non-null assertion since we've already checked
    const { retirementCorpus, monthlySavingsRequired, yearsUntilRetirement, futureMonthlyExpenses } = calculationResults!;

    return (
      <div className="space-y-6">
        <div className="md:flex items-center justify-between gap-6 p-6 bg-slate-50/80 rounded-2xl border border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 font-medium font-serif text-sm uppercase tracking-wider">Retirement Corpus</span>
            <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-none text-left">
              {formatLargeNumber(retirementCorpus)}
            </span>
            <span className="text-sm text-slate-400 font-medium">
              Required to maintain lifestyle
            </span>
          </div>

          <div className="hidden md:block w-px h-16 bg-slate-200"></div>
          <div className="md:hidden w-full h-px bg-slate-200 my-4"></div>

          <div className="flex flex-col gap-1 items-start md:items-end">
            <span className="text-indigo-600 font-medium font-serif text-sm uppercase tracking-wider">Monthly Savings</span>
            <span className="text-3xl sm:text-4xl font-bold text-indigo-600 tracking-tight leading-none">
              {formatLargeNumber(monthlySavingsRequired)}
            </span>
            <span className="text-sm text-indigo-600/60 font-medium">
              To reach your goal
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
            <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Time to Ret.</span>
            <span className="block text-xl font-serif font-bold text-slate-700">{yearsUntilRetirement} Years</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
            <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Future Exp.</span>
            <span className="block text-xl font-serif font-bold text-slate-700">{formatLargeNumber(futureMonthlyExpenses)}</span>
          </div>
        </div>
      </div>
    );
  };



  const handleShare = () => {
    if (!calculationResults) return;

    const { retirementCorpus, monthlySavingsRequired, yearsUntilRetirement, futureMonthlyExpenses } = calculationResults;

    const shareText = `🏖️ Retirement Corpus Needed
to maintain your lifestyle

${formatLargeNumber(retirementCorpus)}

💸 Monthly Savings Required
to build retirement corpus

${formatLargeNumber(monthlySavingsRequired)}

You need to invest ${formatLargeNumber(monthlySavingsRequired)} every month for the next ${yearsUntilRetirement} years to build a retirement corpus of ${formatLargeNumber(retirementCorpus)}.

Based on your current monthly expenses of ${formatLargeNumber(parseFloat(monthlyExpenses))}, you'll need ${formatLargeNumber(futureMonthlyExpenses)} per month at retirement (considering an inflation rate of ${inflationRate}% p.a.). With an expected return of ${expectedReturn}% p.a., your corpus will generate ${formatLargeNumber(futureMonthlyExpenses)} per month.`;

    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-b from-indigo-50/70 to-indigo-100/50 backdrop-blur supports-[backdrop-filter]:bg-indigo-50/30 border border-indigo-200/80 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-2 mb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex items-center justify-center py-4">
        <CardTitle className="text-center text-xl font-bold text-indigo-800 flex items-center justify-center gap-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          Retirement Planning Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="retirementPlannerName" className="text-sm font-medium text-indigo-800">Your Name</Label>
            <Input
              id="retirementPlannerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Arjun Sharma"
              className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
            />
          </div>

          {/* Age Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="retirementPlannerCurrentAge" className="text-sm font-medium text-indigo-800">Current Age</Label>
              <FormattedInput
                id="retirementPlannerCurrentAge"
                inputMode="numeric"
                value={currentAge}
                onFormattedChange={setCurrentAge}
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                placeholder="e.g., 35 years"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirementPlannerRetirementAge" className="text-sm font-medium text-indigo-800">Retirement Age</Label>
              <FormattedInput
                id="retirementPlannerRetirementAge"
                inputMode="numeric"
                value={retirementAge}
                onFormattedChange={setRetirementAge}
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                placeholder="e.g., 60 years"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirementPlannerLifeExpectancy" className="text-sm font-medium text-indigo-800">Life Expectancy</Label>
              <FormattedInput
                id="retirementPlannerLifeExpectancy"
                inputMode="numeric"
                value={lifeExpectancy}
                onFormattedChange={setLifeExpectancy}
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                placeholder="e.g., 85 years"
              />
            </div>
          </div>

          {/* Financial Inputs */}
          <div className="space-y-2">
            <Label htmlFor="retirementPlannerMonthlyExpenses" className="text-sm font-medium text-indigo-800">Current Monthly Expenses (₹)</Label>
            <FormattedInput
              id="retirementPlannerMonthlyExpenses"
              inputMode="numeric"
              value={monthlyExpenses}
              onFormattedChange={setMonthlyExpenses}
              className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
              placeholder="e.g., ₹50,000 per month"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="retirementPlannerInflationRate" className="text-sm font-medium text-indigo-800">Expected Inflation Rate (% p.a.)</Label>
              <FormattedInput
                id="retirementPlannerInflationRate"
                inputMode="decimal"
                value={inflationRate}
                onFormattedChange={setInflationRate}
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                placeholder="e.g., 6% per year"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirementPlannerExpectedReturn" className="text-sm font-medium text-indigo-800">Expected Rate of Return (% p.a.)</Label>
              <FormattedInput
                id="retirementPlannerExpectedReturn"
                inputMode="decimal"
                value={expectedReturn}
                onFormattedChange={setExpectedReturn}
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                placeholder="e.g., 10% per year"
              />
            </div>
          </div>

          {/* Error Messages */}
          {currentAge && parseInt(currentAge) < 15 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Current age must be at least 15 years.
              </p>
            </div>
          )}

          {retirementAge && parseInt(retirementAge) > 100 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Retirement age must be at most 100 years.
              </p>
            </div>
          )}

          {monthlyExpenses && parseFloat(monthlyExpenses) <= 0 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Monthly expenses must be greater than 0.
              </p>
            </div>
          )}

          {inflationRate && parseFloat(inflationRate) < 0 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Inflation rate cannot be negative.
              </p>
            </div>
          )}

          {expectedReturn && parseFloat(expectedReturn) < 0 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Expected return rate cannot be negative.
              </p>
            </div>
          )}

          {currentAge && retirementAge && parseInt(retirementAge) <= parseInt(currentAge) && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Retirement age must be greater than current age.
              </p>
            </div>
          )}

          {retirementAge && lifeExpectancy && parseInt(lifeExpectancy) <= parseInt(retirementAge) && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-500 text-sm">
                Life expectancy must be greater than retirement age.
              </p>
            </div>
          )}

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg hover:from-indigo-600 hover:to-indigo-700 active:from-indigo-700 active:to-indigo-800 transition-all duration-300 ease-in-out rounded-xl font-medium"
            disabled={!name || !currentAge || !retirementAge || !lifeExpectancy || !monthlyExpenses || !inflationRate || !expectedReturn}
          >
            Calculate Retirement Plan
          </Button>

          {/* Results Display */}
          {showResults && calculationResults && (
            <div className="mt-8 p-5 bg-indigo-50/50 rounded-xl border border-indigo-200/80 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold mb-5 text-center text-indigo-800 flex items-center justify-center gap-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                Income Planning for {name}
              </h3>

              <div className="space-y-4 mb-6">
                {renderResults()}
              </div>

              {/* Share Button */}
              <Button
                onClick={handleShare}
                className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg hover:from-indigo-600 hover:to-indigo-700 active:from-indigo-700 active:to-indigo-800 transition-all duration-300 ease-in-out rounded-xl font-medium"
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