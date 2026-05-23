"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number";
import { calculateMarriagePlan, MarriagePlanResult } from "@/lib/calculators";
import { CircleDollarSign, CreditCard, CheckCircle, Heart, AlertCircle, MessageSquare } from "lucide-react";

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
  const calculationResults = useMemo<MarriagePlanResult | null>(() => {
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

    return calculateMarriagePlan(
      childCurrentAge,
      childMarriageAge,
      expenditure,
      inflation,
      savedAmount,
      returnRate
    );
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
              <CircleDollarSign className="h-5 w-5 text-rose-600" />
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
              <CreditCard className="h-5 w-5 text-rose-600" />
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
              <CircleDollarSign className="h-5 w-5 text-rose-600" />
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
                 <CheckCircle className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-rose-800">
                  You need to invest <span className="font-bold">₹{formatLargeNumber(sipInvestment)?.replace('₹', '')}</span> every month for the next <span className="font-bold">{yearsUntilMarriage} years</span> to meet your child&apos;s marriage goal.
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
                 <CheckCircle className="h-5 w-5 text-rose-600" />
              </div>
              <p className="text-sm text-rose-800">
                Great! Your current savings are sufficient to meet your child&apos;s marriage goal.
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  const handleShare = () => {
    if (!calculationResults) return;

    const { futureCostOfMarriage, sipInvestment, lumpSumInvestment, yearsUntilMarriage } = calculationResults;

    // Generate the share text with refined formatting
    const shareText = `Here is our projected Child Marriage Plan:

💍 *Estimated Cost* (in ${yearsUntilMarriage} years): ${formatLargeNumber(futureCostOfMarriage)}
💸 *Required Monthly SIP*: ${formatLargeNumber(sipInvestment)}
💰 *Or One-time Investment*: ${formatLargeNumber(lumpSumInvestment)}

(Calculated at ${inflationRate}% inflation & ${expectedReturn}% expected return)`;

    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 w-full animate-elegant-fade">

      <Card className="w-full max-w-3xl mx-auto bg-white/75 backdrop-blur-2xl border border-white/60 shadow-strong rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-white/80">
        <CardHeader className="pb-4 border-b border-white/40 bg-gradient-to-r from-rose-500/10 to-pink-500/10 flex items-center justify-center py-5">
          <CardTitle className="text-center text-xl font-bold text-rose-850 flex items-center justify-center gap-2">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-full text-white shadow-sm ring-3 ring-white/50">
              <Heart className="h-4 w-4" />
            </div>
            <span className="font-serif tracking-tight text-rose-900">Child Marriage Planning Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 sm:pt-8 px-4 sm:px-8">
          <div className="space-y-6">
            {/* Child's Name Input */}
            <div className="space-y-2">
              <Label htmlFor="childMarriageChildName" className="text-sm font-semibold text-rose-950">Child&apos;s Name</Label>
              <Input
                id="childMarriageChildName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter your child's name"
                className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-400/15 font-medium"
              />
            </div>

            {/* Age Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childMarriageCurrentAge" className="text-sm font-semibold text-rose-950">Child&apos;s Current Age</Label>
                <FormattedInput
                  id="childMarriageCurrentAge"
                  inputMode="numeric"
                  value={currentAge}
                  onFormattedChange={setCurrentAge}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-400/15 font-medium"
                  placeholder="Enter current age"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="childMarriageMarriageAge" className="text-sm font-semibold text-rose-950">Planned Marriage Age</Label>
                <FormattedInput
                  id="childMarriageMarriageAge"
                  inputMode="numeric"
                  value={marriageAge}
                  onFormattedChange={setMarriageAge}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-400/15 font-medium"
                  placeholder="Enter marriage age"
                />
              </div>
            </div>

            {/* Financial Inputs */}
            <div className="space-y-2">
              <Label htmlFor="childMarriageEstimatedExpenditure" className="text-sm font-semibold text-rose-950">Estimated Marriage Expenditure (₹)</Label>
              <FormattedInput
                id="childMarriageEstimatedExpenditure"
                inputMode="numeric"
                value={estimatedExpenditure}
                onFormattedChange={setEstimatedExpenditure}
                className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-400/15 font-medium"
                placeholder="e.g., 1000000"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childMarriageInflationRate" className="text-sm font-semibold text-rose-950">Expected Inflation Rate (% p.a.)</Label>
                <FormattedInput
                  id="childMarriageInflationRate"
                  inputMode="decimal"
                  value={inflationRate}
                  onFormattedChange={setInflationRate}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-400/15 font-medium"
                  placeholder="e.g., 7"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="childMarriageExpectedReturn" className="text-sm font-semibold text-rose-950">Expected Rate of Return (% p.a.)</Label>
                <FormattedInput
                  id="childMarriageExpectedReturn"
                  inputMode="decimal"
                  value={expectedReturn}
                  onFormattedChange={setExpectedReturn}
                  className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-400/15 font-medium"
                  placeholder="e.g., 10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="childMarriageAmountSaved" className="text-sm font-semibold text-rose-950">Amount Already Saved (₹)</Label>
              <FormattedInput
                id="childMarriageAmountSaved"
                inputMode="numeric"
                value={amountSaved}
                onFormattedChange={setAmountSaved}
                className="w-full rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-3 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-400/15 font-medium"
                placeholder="e.g., 200000"
              />
            </div>

            {/* Error Message */}
            {currentAge && marriageAge && parseInt(marriageAge) <= parseInt(currentAge) && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-2xl border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-500 text-sm font-medium">
                  Marriage age must be greater than current age.
                </p>
              </div>
            )}

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/10 hover:shadow-lg hover:shadow-rose-500/15 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 rounded-2xl font-bold tracking-wide"
              disabled={!childName || !currentAge || !marriageAge || !estimatedExpenditure || !inflationRate || !amountSaved || !expectedReturn}
            >
              Calculate Marriage Plan
            </Button>

            {/* Results Display */}
            {showResults && calculationResults && (
              <div className="mt-8 p-6 bg-slate-50/80 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-5 text-center text-rose-900 flex items-center justify-center gap-2 font-serif">
                  <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2.5 rounded-full text-white shadow-sm ring-4 ring-white/50">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  Marriage Planning for {childName}
                </h3>

                <div className="space-y-4 mb-6">
                  {renderResults()}
                </div>

                {/* Share Button */}
                <Button
                  onClick={handleShare}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/10 hover:shadow-lg hover:shadow-pink-500/15 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 rounded-2xl font-bold tracking-wide mt-4"
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