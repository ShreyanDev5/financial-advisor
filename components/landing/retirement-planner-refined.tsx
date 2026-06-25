"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number";
import { calculateRetirementPlan, RetirementPlanResult } from "@/lib/calculators";
import { Umbrella, CreditCard, MessageSquare, CheckCircle } from "lucide-react";

export default function IncomePlanningCalculatorRefined() {
  const [name, setName] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Validation checks
  const errors = useMemo(() => {
    const errs: Record<string, string> = {};

    if (name === "" && showResults) {
      errs.name = "Please enter your name";
    }

    const current = parseInt(currentAge);
    if (currentAge !== "") {
      if (isNaN(current)) errs.currentAge = "Please enter a valid age";
      else if (current < 15 || current > 99) errs.currentAge = "Current age must be between 15 and 99 years";
    }

    const retirement = parseInt(retirementAge);
    if (retirementAge !== "") {
      if (isNaN(retirement)) errs.retirementAge = "Please enter a valid age";
      else if (retirement < 15 || retirement > 100) errs.retirementAge = "Retirement age must be between 15 and 100 years";
      else if (!isNaN(current) && retirement <= current) errs.retirementAge = "Retirement age must be greater than current age";
    }

    const expectancy = parseInt(lifeExpectancy);
    if (lifeExpectancy !== "") {
      if (isNaN(expectancy)) errs.lifeExpectancy = "Please enter a valid life expectancy";
      else if (expectancy < 15 || expectancy > 120) errs.lifeExpectancy = "Life expectancy must be between 15 and 120 years";
      else if (!isNaN(retirement) && expectancy <= retirement) errs.lifeExpectancy = "Life expectancy must be greater than retirement age";
    }

    const expenses = parseFloat(monthlyExpenses);
    if (monthlyExpenses !== "") {
      if (isNaN(expenses)) errs.monthlyExpenses = "Please enter a valid amount";
      else if (expenses < 100 || expenses > 5000000) errs.monthlyExpenses = "Expenses should be between ₹100 and ₹50 Lakhs";
    }

    const inf = parseFloat(inflationRate);
    if (inflationRate !== "") {
      if (isNaN(inf)) errs.inflationRate = "Please enter a valid rate";
      else if (inf < 0 || inf > 30) errs.inflationRate = "Inflation rate should be between 0% and 30%";
    }

    const ret = parseFloat(expectedReturn);
    if (expectedReturn !== "") {
      if (isNaN(ret)) errs.expectedReturn = "Please enter a valid rate";
      else if (ret < 0 || ret > 50) errs.expectedReturn = "Return rate should be between 0% and 50%";
    }

    return errs;
  }, [name, currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn, showResults]);

  // Calculate results based on inputs
  const calculationResults = useMemo<RetirementPlanResult | null>(() => {
    if (!name || !currentAge || !retirementAge || !lifeExpectancy || !monthlyExpenses || !inflationRate || !expectedReturn || Object.keys(errors).length > 0) return null;

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
  }, [name, currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn, errors]);

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
        {/* Unified View Corpus & Savings */}
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 p-6 bg-slate-50/50 backdrop-blur-sm rounded-2xl border border-slate-200/30 shadow-sm text-center">
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-slate-500 font-medium font-sans text-[10px] uppercase tracking-wider mb-1.5">Retirement Corpus</span>
            <span className="text-lg sm:text-xl font-bold text-slate-900 break-all font-sans">
              {formatLargeNumber(retirementCorpus)}
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-1">Required to maintain lifestyle</span>
          </div>
          <div className="hidden sm:block w-px bg-slate-200 self-stretch my-1"></div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-indigo-600 font-medium font-sans text-[10px] uppercase tracking-wider mb-1.5">Monthly Savings Required</span>
            <span className="text-lg sm:text-xl font-bold text-indigo-600 break-all font-sans">
              {formatLargeNumber(monthlySavingsRequired)}
            </span>
            <span className="text-[10px] text-indigo-600/60 font-medium mt-1">To reach your goal</span>
          </div>
        </div>

        {/* Supporting Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50/50 backdrop-blur-sm p-4.5 rounded-2xl border border-slate-200/30 shadow-sm text-center justify-center flex flex-col items-center">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 font-sans">Time to Retirement</span>
            <span className="block text-lg font-bold text-slate-700 break-all font-sans">{yearsUntilRetirement} Years</span>
          </div>
          <div className="bg-slate-50/50 backdrop-blur-sm p-4.5 rounded-2xl border border-slate-200/30 shadow-sm text-center justify-center flex flex-col items-center">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 font-sans">Future Monthly Expenses</span>
            <span className="block text-lg font-bold text-slate-700 break-all font-sans">{formatLargeNumber(futureMonthlyExpenses)}</span>
          </div>
        </div>

        {/* Info Banner */}
        {monthlySavingsRequired > 0 ? (
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 shadow-sm text-left">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100/60 p-2 rounded-lg mt-0.5">
                 <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-850">
                  You need to save <span className="font-bold">₹{formatLargeNumber(monthlySavingsRequired)?.replace('₹', '')}</span> every month for the next <span className="font-bold">{yearsUntilRetirement} years</span> to build your target retirement corpus.
                </p>
                <p className="text-xs text-indigo-600/80 mt-2">
                  *Calculations consider an inflation rate of {inflationRate}% p.a. and an expected return of {expectedReturn}% p.a.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 shadow-sm text-left">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100/60 p-2 rounded-lg">
                 <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-sm text-indigo-850 font-medium">
                Great! Your current resources are sufficient to meet your retirement goals.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };



  const handleShare = () => {
    if (!calculationResults) return;

    const { retirementCorpus, monthlySavingsRequired, yearsUntilRetirement, futureMonthlyExpenses } = calculationResults;

    const shareText = `Here is our projected Retirement Plan:

🏖️ *Target Corpus Needed*: ${formatLargeNumber(retirementCorpus)}
💸 *Required Monthly Savings*: ${formatLargeNumber(monthlySavingsRequired)}
⏱️ *Time to Retirement*: ${yearsUntilRetirement} years

(Based on current expenses of ${formatLargeNumber(parseFloat(monthlyExpenses))}/mo, projecting ${formatLargeNumber(futureMonthlyExpenses)}/mo at retirement)`;

    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 w-full animate-elegant-fade">

      <Card className="w-full max-w-3xl mx-auto bg-white/75 backdrop-blur-2xl border border-white/60 shadow-strong rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-white/80">
        <CardHeader className="pb-4 border-b border-white/40 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex items-center justify-center py-5">
          <CardTitle className="text-center text-xl font-bold text-indigo-850 flex items-center justify-center gap-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full text-white shadow-sm ring-3 ring-white/50">
              <Umbrella className="h-4 w-4" />
            </div>
            <span className="font-serif tracking-tight text-indigo-900">Retirement Planning Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 sm:pt-8 px-4 sm:px-8">
          <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="retirementPlannerName" className="text-sm font-semibold text-indigo-950">Your Name</Label>
              <Input
                id="retirementPlannerName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Arjun Sharma"
                className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/15 font-medium"
              />
              {errors.name && (
                <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.name}</p>
              )}
            </div>

            {/* Age Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="retirementPlannerCurrentAge" className="text-sm font-semibold text-indigo-950">Current Age</Label>
                <FormattedInput
                  id="retirementPlannerCurrentAge"
                  inputMode="numeric"
                  value={currentAge}
                  onFormattedChange={setCurrentAge}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/15 font-medium"
                  placeholder="e.g., 35"
                />
                {errors.currentAge && (
                  <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.currentAge}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirementPlannerRetirementAge" className="text-sm font-semibold text-indigo-950">Retirement Age</Label>
                <FormattedInput
                  id="retirementPlannerRetirementAge"
                  inputMode="numeric"
                  value={retirementAge}
                  onFormattedChange={setRetirementAge}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/15 font-medium"
                  placeholder="e.g., 60"
                />
                {errors.retirementAge && (
                  <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.retirementAge}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirementPlannerLifeExpectancy" className="text-sm font-semibold text-indigo-950">Life Expectancy</Label>
                <FormattedInput
                  id="retirementPlannerLifeExpectancy"
                  inputMode="numeric"
                  value={lifeExpectancy}
                  onFormattedChange={setLifeExpectancy}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/15 font-medium"
                  placeholder="e.g., 85"
                />
                {errors.lifeExpectancy && (
                  <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.lifeExpectancy}</p>
                )}
              </div>
            </div>

            {/* Financial Inputs */}
            <div className="space-y-2">
              <Label htmlFor="retirementPlannerMonthlyExpenses" className="text-sm font-semibold text-indigo-950">Current Monthly Expenses (₹)</Label>
              <FormattedInput
                id="retirementPlannerMonthlyExpenses"
                inputMode="numeric"
                value={monthlyExpenses}
                onFormattedChange={setMonthlyExpenses}
                className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/15 font-medium"
                placeholder="e.g., ₹50,000 per month"
              />
              {errors.monthlyExpenses && (
                <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.monthlyExpenses}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="retirementPlannerInflationRate" className="text-sm font-semibold text-indigo-950">Expected Inflation Rate (% p.a.)</Label>
                <FormattedInput
                  id="retirementPlannerInflationRate"
                  inputMode="decimal"
                  value={inflationRate}
                  onFormattedChange={setInflationRate}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/15 font-medium"
                  placeholder="e.g., 6"
                />
                {errors.inflationRate && (
                  <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.inflationRate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirementPlannerExpectedReturn" className="text-sm font-semibold text-indigo-950">Expected Rate of Return (% p.a.)</Label>
                <FormattedInput
                  id="retirementPlannerExpectedReturn"
                  inputMode="decimal"
                  value={expectedReturn}
                  onFormattedChange={setExpectedReturn}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/15 font-medium"
                  placeholder="e.g., 10"
                />
                {errors.expectedReturn && (
                  <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.expectedReturn}</p>
                )}
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/15 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 rounded-2xl font-bold tracking-wide"
              disabled={!name || !currentAge || !retirementAge || !lifeExpectancy || !monthlyExpenses || !inflationRate || !expectedReturn || Object.keys(errors).length > 0}
            >
              Calculate Retirement Plan
            </Button>

            {/* Results Display */}
            {showResults && calculationResults && (
              <div className="mt-8 p-6 bg-slate-50/80 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-5 text-center text-indigo-900 flex items-center justify-center gap-2 font-serif">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 rounded-full text-white shadow-sm ring-4 ring-white/50">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  Income Planning for {name}
                </h3>

                <div className="space-y-4 mb-6">
                  {renderResults()}
                </div>

                {/* Share Button */}
                <Button
                  onClick={handleShare}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-indigo-650 text-white shadow-md shadow-purple-500/10 hover:shadow-lg hover:shadow-purple-500/15 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 rounded-2xl font-bold tracking-wide mt-4"
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Share Results via WhatsApp
                  </div>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}