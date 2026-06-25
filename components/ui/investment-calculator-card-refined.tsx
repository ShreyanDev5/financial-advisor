import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Slider } from "@/components/ui/slider";
import { formatLargeNumber } from "@/lib/format-large-number";
import { calculateSIP, calculateLumpsum, calculateSWP, CalculationResult, SWPResult } from "@/lib/calculators";
import { RotateCcw, CircleDollarSign, CreditCard } from "lucide-react";


// Piecewise-linear mappings for sliders to provide more gradual controls at common lower ranges.
// 1. SIP Monthly Investment (₹500 to ₹10 Lakhs)
// - 0% to 50% pos: ₹500 to ₹50,000 (step = ₹500)
// - 50% to 100% pos: ₹50,000 to ₹10,00,000 (step = ₹5,000)
const sipValToPos = (val: number): number => {
  if (val <= 500) return 0;
  if (val >= 1000000) return 100;
  if (val <= 50000) {
    return ((val - 500) / 49500) * 50;
  }
  return 50 + ((val - 50000) / 950000) * 50;
};
const sipPosToVal = (pos: number): number => {
  if (pos <= 0) return 500;
  if (pos >= 100) return 1000000;
  if (pos <= 50) {
    const val = 500 + (pos / 50) * 49500;
    return Math.round(val / 500) * 500;
  }
  const val = 50000 + ((pos - 50) / 50) * 950000;
  return Math.round(val / 5000) * 5000;
};

// 2. Lumpsum Total Investment (₹1,000 to ₹1 Crore)
// - 0% to 50% pos: ₹1,000 to ₹10,00,000 (10 Lakhs) (step = ₹1,000)
// - 50% to 100% pos: ₹10,00,000 to ₹1,00,00,000 (1 Crore) (step = ₹50,000)
const lumpValToPos = (val: number): number => {
  if (val <= 1000) return 0;
  if (val >= 10000000) return 100;
  if (val <= 1000000) {
    return ((val - 1000) / 999000) * 50;
  }
  return 50 + ((val - 1000000) / 9000000) * 50;
};
const lumpPosToVal = (pos: number): number => {
  if (pos <= 0) return 1000;
  if (pos >= 100) return 10000000;
  if (pos <= 50) {
    const val = 1000 + (pos / 50) * 999000;
    return Math.round(val / 1000) * 1000;
  }
  const val = 1000000 + ((pos - 50) / 50) * 9000000;
  return Math.round(val / 50000) * 50000;
};

// 3. SWP Total Investment (₹10,000 to ₹1 Crore)
// - 0% to 50% pos: ₹10,000 to ₹10,00,000 (10 Lakhs) (step = ₹10,000)
// - 50% to 100% pos: ₹10,00,000 to ₹1,00,00,000 (1 Crore) (step = ₹50,000)
const swpInvValToPos = (val: number): number => {
  if (val <= 10000) return 0;
  if (val >= 10000000) return 100;
  if (val <= 1000000) {
    return ((val - 10000) / 990000) * 50;
  }
  return 50 + ((val - 1000000) / 9000000) * 50;
};
const swpInvPosToVal = (pos: number): number => {
  if (pos <= 0) return 10000;
  if (pos >= 100) return 10000000;
  if (pos <= 50) {
    const val = 10000 + (pos / 50) * 990000;
    return Math.round(val / 10000) * 10000;
  }
  const val = 1000000 + ((pos - 50) / 50) * 9000000;
  return Math.round(val / 50000) * 50000;
};

// 4. SWP Withdrawal Amount (₹500 to ₹2.5 Lakhs)
// - 0% to 50% pos: ₹500 to ₹25,000 (step = ₹500)
// - 50% to 100% pos: ₹25,000 to ₹2,50,000 (step = ₹2,500)
const swpWdValToPos = (val: number): number => {
  if (val <= 500) return 0;
  if (val >= 250000) return 100;
  if (val <= 25000) {
    return ((val - 500) / 24500) * 50;
  }
  return 50 + ((val - 25000) / 225000) * 50;
};
const swpWdPosToVal = (pos: number): number => {
  if (pos <= 0) return 500;
  if (pos >= 100) return 250000;
  if (pos <= 50) {
    const val = 500 + (pos / 50) * 24500;
    return Math.round(val / 500) * 500;
  }
  const val = 25000 + ((pos - 50) / 50) * 225000;
  return Math.round(val / 2500) * 2500;
};


export function InvestmentCalculatorCardRefined({ investmentType }: { investmentType: string }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [totalInvestment, setTotalInvestment] = useState("100000");
  const [investmentAmount, setInvestmentAmount] = useState("5000");
  const [withdrawalAmount, setWithdrawalAmount] = useState("5000");
  const [expectedReturnRate, setExpectedReturnRate] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");

  // Validation checks
  const errors = useMemo(() => {
    const errs: Record<string, string> = {};

    if (investmentType === "sip") {
      const amt = parseFloat(investmentAmount);
      if (investmentAmount !== "") {
        if (isNaN(amt)) errs.investmentAmount = "Please enter a valid number";
        else if (amt < 100 || amt > 10000000) errs.investmentAmount = "Amount should be between ₹100 and ₹1 Crore";
      }
    }

    if (investmentType === "lumpsum") {
      const tot = parseFloat(totalInvestment);
      if (totalInvestment !== "") {
        if (isNaN(tot)) errs.totalInvestment = "Please enter a valid number";
        else if (tot < 100 || tot > 100000000) errs.totalInvestment = "Amount should be between ₹100 and ₹10 Crores";
      }
    }

    if (investmentType === "swp") {
      const tot = parseFloat(totalInvestment);
      if (totalInvestment !== "") {
        if (isNaN(tot)) errs.totalInvestment = "Please enter a valid number";
        else if (tot < 1000 || tot > 100000000) errs.totalInvestment = "Amount should be between ₹1,000 and ₹10 Crores";
      }

      const wd = parseFloat(withdrawalAmount);
      if (withdrawalAmount !== "") {
        if (isNaN(wd)) errs.withdrawalAmount = "Please enter a valid number";
        else if (wd < 100 || wd > 10000000) errs.withdrawalAmount = "Withdrawal should be between ₹100 and ₹1 Crore";
        else if (!isNaN(tot) && wd > tot) errs.withdrawalAmount = "Withdrawal cannot exceed the initial investment";
      }
    }

    const rate = parseFloat(expectedReturnRate);
    if (expectedReturnRate !== "") {
      if (isNaN(rate)) errs.expectedReturnRate = "Please enter a valid rate";
      else if (rate < 0.1 || rate > 50) errs.expectedReturnRate = "Rate should be between 0.1% and 50%";
    }

    const yrs = parseInt(timePeriod);
    if (timePeriod !== "") {
      if (isNaN(yrs)) errs.timePeriod = "Please enter a valid number of years";
      else if (yrs < 1 || yrs > 40) errs.timePeriod = "Period should be between 1 and 40 years";
    }

    return errs;
  }, [investmentType, investmentAmount, totalInvestment, withdrawalAmount, expectedReturnRate, timePeriod]);

  const calculatedResult: CalculationResult | SWPResult | null = useMemo(() => {
    // Return null if there are validation errors
    if (Object.keys(errors).length > 0) return null;

    // Return null if any required input field is empty
    if (expectedReturnRate === "" || timePeriod === "") return null;
    if (investmentType === "sip" && investmentAmount === "") return null;
    if (investmentType === "lumpsum" && totalInvestment === "") return null;
    if (investmentType === "swp" && (totalInvestment === "" || withdrawalAmount === "")) return null;

    const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

    let principal = parseFloat(totalInvestment);
    if (isNaN(principal)) principal = 100000;
    principal = clamp(principal, 100, 100000000);

    let monthlyAmt = parseFloat(investmentAmount);
    if (isNaN(monthlyAmt)) monthlyAmt = 5000;
    monthlyAmt = clamp(monthlyAmt, 100, 10000000);

    let withdrawalAmt = parseFloat(withdrawalAmount);
    if (isNaN(withdrawalAmt)) withdrawalAmt = 5000;
    withdrawalAmt = clamp(withdrawalAmt, 100, Math.min(10000000, principal));

    let annualRate = parseFloat(expectedReturnRate);
    if (isNaN(annualRate)) annualRate = 12;
    annualRate = clamp(annualRate, 0.1, 50);

    let years = parseInt(timePeriod);
    if (isNaN(years)) years = 10;
    years = clamp(years, 1, 40);

    if (investmentType === "sip") {
      return calculateSIP(monthlyAmt, annualRate, years);
    }

    if (investmentType === "lumpsum") {
      return calculateLumpsum(principal, annualRate, years);
    }

    if (investmentType === "swp") {
      return calculateSWP(principal, withdrawalAmt, annualRate, years);
    }

    return null;
  }, [totalInvestment, investmentAmount, withdrawalAmount, expectedReturnRate, timePeriod, investmentType, errors]);

  const { chartData } = useMemo(() => {
    if (!calculatedResult) {
      return { chartData: [] as { name: string; value: number; key: "invested" | "gains" }[] };
    }

    // For SWP, we show Invested vs Wealth Gained (which is net profit)
    // Or do we want to show Remaining Balance vs Total Withdrawn?
    // The previous implementation showed Invested vs Gains.
    // Let's stick to the interface contract:
    // invested = totalInvested
    // gains = wealthGained

    const invested = Math.max(0, calculatedResult.totalInvested);
    const gains = Math.max(0, calculatedResult.wealthGained);

    return {
      chartData: [
        { name: "Invested", value: invested, key: "invested" },
        { name: "Returns", value: gains, key: "gains" },
      ],
    };
  }, [calculatedResult]);

  // Premium color scheme suitable for financial UI
  const investedColor = "#475569"; // slate-600 (neutral & sophisticated)
  const gainsColor = "#059669"; // emerald-600 (clean & premium)
  const hasChartData = chartData.some((d) => Number(d.value) > 0);
  const investedValue = Math.max(0, Number(chartData.find((d) => d.key === "invested")?.value || 0));
  const returnsValue = Math.max(0, Number(chartData.find((d) => d.key === "gains")?.value || 0));
  const donutSize = 260; // Slightly increased size for better mobile readability
  const r = 78; // Adjusted radius for larger donut ( (outer 104 + inner 52) / 2 )
  const strokeWidth = 52; // outer - inner (keeping the same thickness ratio)
  const circumference = 2 * Math.PI * r;

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/75 backdrop-blur-2xl border border-white/60 shadow-strong rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-white/80">
      <CardHeader className="pb-4 border-b border-white/40 bg-gradient-to-r from-orange-500/10 to-red-500/10 flex items-center justify-center py-5">
        <CardTitle className="text-center text-xl font-bold text-orange-850 flex items-center justify-center gap-2">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-full text-white shadow-sm ring-3 ring-white/50">
            {investmentType === "sip" && <RotateCcw className="h-4 w-4" />}
            {investmentType === "lumpsum" && <CircleDollarSign className="h-4 w-4" />}
            {investmentType === "swp" && <CreditCard className="h-4 w-4" />}
          </div>
          <span className="font-serif tracking-tight text-orange-900">
            {investmentType === "sip" && "SIP Calculator"}
            {investmentType === "lumpsum" && "Lumpsum Calculator"}
            {investmentType === "swp" && "SWP Calculator"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 sm:pt-6 px-3.5 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:gap-12">
          <div className="space-y-8 sm:space-y-10">
            {investmentType === "sip" && (
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full mx-auto">
                  <Label htmlFor="investmentAmount" className="text-sm font-semibold text-orange-950 w-full sm:w-1/2">Monthly Investment (₹)</Label>
                  <FormattedInput
                    id="investmentAmount"
                    inputMode="numeric"
                    value={investmentAmount}
                    onFormattedChange={setInvestmentAmount}
                    className="w-full sm:w-1/3 rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-2.5 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/15 font-medium"
                  />
                </div>
                {errors.investmentAmount && (
                  <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.investmentAmount}</p>
                )}
                <div className="pt-2">
                  <Slider value={[sipValToPos(Number(investmentAmount) || 0)]} onValueChange={([v]) => setInvestmentAmount(String(sipPosToVal(v)))} min={0} max={100} step={1} className="mx-auto w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-slate-100 [&>span:first-child>span]:bg-slate-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-slate-300 [&_[role=slider]]:shadow-sm [&_[role=slider]]:transition-transform [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-95 [&_[role=slider]]:focus-visible:ring-0 [&_[role=slider]]:focus-visible:outline-none" />
                </div>
              </div>
            )}
            {investmentType === "lumpsum" && (
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full mx-auto">
                  <Label htmlFor="totalInvestment" className="text-sm font-semibold text-orange-950 w-full sm:w-1/2">Total Investment (₹)</Label>
                  <FormattedInput
                    id="totalInvestment"
                    inputMode="numeric"
                    value={totalInvestment}
                    onFormattedChange={setTotalInvestment}
                    className="w-full sm:w-1/3 rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-2.5 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/15 font-medium"
                  />
                </div>
                {errors.totalInvestment && (
                  <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.totalInvestment}</p>
                )}
                <div className="pt-2">
                  <Slider value={[lumpValToPos(Number(totalInvestment) || 0)]} onValueChange={([v]) => setTotalInvestment(String(lumpPosToVal(v)))} min={0} max={100} step={1} className="mx-auto w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-slate-100 [&>span:first-child>span]:bg-slate-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-slate-300 [&_[role=slider]]:shadow-sm [&_[role=slider]]:transition-transform [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-95 [&_[role=slider]]:focus-visible:ring-0 [&_[role=slider]]:focus-visible:outline-none" />
                </div>
              </div>
            )}
            {investmentType === "swp" && (
              <>
                <div className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full mx-auto">
                    <Label htmlFor="totalInvestment" className="text-sm font-semibold text-orange-950 w-full sm:w-1/2">Total Investment (₹)</Label>
                    <FormattedInput
                      id="totalInvestment"
                      inputMode="numeric"
                      value={totalInvestment}
                      onFormattedChange={setTotalInvestment}
                      className="w-full sm:w-1/3 rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-2.5 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/15 font-medium"
                    />
                  </div>
                  {errors.totalInvestment && (
                    <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.totalInvestment}</p>
                  )}
                  <div className="pt-2">
                    <Slider value={[swpInvValToPos(Number(totalInvestment) || 0)]} onValueChange={([v]) => setTotalInvestment(String(swpInvPosToVal(v)))} min={0} max={100} step={1} className="mx-auto w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-slate-100 [&>span:first-child>span]:bg-slate-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-slate-300 [&_[role=slider]]:shadow-sm [&_[role=slider]]:transition-transform [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-95 [&_[role=slider]]:focus-visible:ring-0 [&_[role=slider]]:focus-visible:outline-none" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full mx-auto">
                    <Label htmlFor="withdrawalAmount" className="text-sm font-semibold text-orange-950 w-full sm:w-1/2">Monthly Withdrawal (₹)</Label>
                    <FormattedInput
                      id="withdrawalAmount"
                      inputMode="numeric"
                      value={withdrawalAmount}
                      onFormattedChange={setWithdrawalAmount}
                      className="w-full sm:w-1/3 rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-2.5 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/15 font-medium"
                    />
                  </div>
                  {errors.withdrawalAmount && (
                    <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.withdrawalAmount}</p>
                  )}
                  <div className="pt-2">
                    <Slider value={[swpWdValToPos(Number(withdrawalAmount) || 0)]} onValueChange={([v]) => setWithdrawalAmount(String(swpWdPosToVal(v)))} min={0} max={100} step={1} className="mx-auto w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-slate-100 [&>span:first-child>span]:bg-slate-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-slate-300 [&_[role=slider]]:shadow-sm [&_[role=slider]]:transition-transform [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-95 [&_[role=slider]]:focus-visible:ring-0 [&_[role=slider]]:focus-visible:outline-none" />
                  </div>
                </div>
              </>
            )}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full mx-auto">
                <Label htmlFor="expectedReturnRate" className="text-sm font-semibold text-orange-950 w-full sm:w-1/2">Expected Return Rate (% p.a.)</Label>
                <Input id="expectedReturnRate" inputMode="numeric" value={expectedReturnRate} onChange={(e) => setExpectedReturnRate(e.target.value)} className="w-full sm:w-1/3 rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-2.5 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/15 font-medium" />
              </div>
              {errors.expectedReturnRate && (
                <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.expectedReturnRate}</p>
              )}
              <div className="pt-2">
                <Slider value={[Number(expectedReturnRate) || 0]} onValueChange={([v]) => setExpectedReturnRate(String(v))} min={1} max={30} step={0.1} className="mx-auto w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-slate-100 [&>span:first-child>span]:bg-slate-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-slate-300 [&_[role=slider]]:shadow-sm [&_[role=slider]]:transition-transform [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-95 [&_[role=slider]]:focus-visible:ring-0 [&_[role=slider]]:focus-visible:outline-none" />
              </div>
            </div>
            <div className="space-y-2.5 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full mx-auto">
                <Label htmlFor="timePeriod" className="text-sm font-semibold text-orange-950 w-full sm:w-1/2">Time Period (Years)</Label>
                <Input id="timePeriod" inputMode="numeric" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="w-full sm:w-1/3 rounded-2xl border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-2.5 text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-400/15 font-medium" />
              </div>
              {errors.timePeriod && (
                <p className="text-red-500 text-xs text-left font-semibold mt-1">{errors.timePeriod}</p>
              )}
              <div className="pt-2">
                <Slider value={[Number(timePeriod) || 0]} onValueChange={([v]) => setTimePeriod(String(v))} min={1} max={40} step={1} className="mx-auto w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-slate-100 [&>span:first-child>span]:bg-slate-800 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-slate-300 [&_[role=slider]]:shadow-sm [&_[role=slider]]:transition-transform [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:active:scale-95 [&_[role=slider]]:focus-visible:ring-0 [&_[role=slider]]:focus-visible:outline-none" />
              </div>
            </div>

            {/* Moved the pie chart to the bottom of the input sliders */}
            <div className="w-full flex justify-center overflow-visible" suppressHydrationWarning>
              {!isMounted ? (
                <div className="h-[260px] w-full max-w-[260px] md:h-[320px] md:max-w-[320px] animate-pulse rounded-2xl bg-muted/30" />
              ) : hasChartData ? (
                <div className="mt-4 flex flex-col items-center w-full px-2 py-2">
                  <svg
                    width={donutSize}
                    height={donutSize}
                    viewBox={`0 0 ${donutSize} ${donutSize}`}
                    className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80"
                    role="img"
                    aria-label="Donut chart"
                  >
                    {(() => {
                      const invested = Math.max(0, Number(chartData.find((d) => d.key === "invested")?.value || 0));
                      const gains = Math.max(0, Number(chartData.find((d) => d.key === "gains")?.value || 0));
                      const total = invested + gains;
                      if (total <= 0) return null;

                      const investedLen = (invested / total) * circumference;
                      const gainsLen = circumference - investedLen;

                      return (
                        <g transform={`translate(${donutSize / 2}, ${donutSize / 2}) rotate(-90)`}>
                          <circle
                            r={r}
                            fill="none"
                            stroke="#f1f5f9" /* sleek track base */
                            strokeWidth={strokeWidth}
                            strokeLinecap="butt"
                          />
                          <circle
                            r={r}
                            fill="none"
                            stroke={investedColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${investedLen} ${circumference - investedLen}`}
                            strokeDashoffset={0}
                            strokeLinecap="butt"
                          />
                          <circle
                            r={r}
                            fill="none"
                            stroke={gainsColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${gainsLen} ${circumference - gainsLen}`}
                            strokeDashoffset={-investedLen}
                            strokeLinecap="butt"
                          />
                        </g>
                      );
                    })()}
                  </svg>
                  {/* Spacing for mobile screens */}
                  <div className="md:hidden h-4"></div>
                  {/* Spacing for desktop screens */}
                  <div className="hidden md:block h-6"></div>
                  
                  {/* Desktop View Results Block */}
                  <div className="hidden md:flex items-stretch justify-between gap-6 p-6 bg-slate-50/50 backdrop-blur-sm rounded-2xl border border-slate-200/30 shadow-sm text-center">
                    <div className="flex-[1.2] flex flex-col gap-4 justify-center">
                      <div className="flex items-center gap-3">
                        <span className="inline-block h-3.5 w-3.5 rounded-full shadow-sm" style={{ backgroundColor: investedColor }} />
                        <span className="text-slate-500 font-semibold font-sans text-sm whitespace-nowrap">Invested</span>
                        <span className="font-semibold text-slate-600 text-lg ml-auto font-sans">{formatLargeNumber(investedValue)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-block h-3.5 w-3.5 rounded-full shadow-sm" style={{ backgroundColor: gainsColor }} />
                        <span className="text-slate-500 font-semibold font-sans text-sm whitespace-nowrap">{investmentType === "swp" ? "Total Withdrawal" : "Total Returns"}</span>
                        <span className="font-semibold text-emerald-600 text-lg ml-auto font-sans">
                          {formatLargeNumber(investmentType === "swp" ? (calculatedResult as SWPResult)?.totalWithdrawn || 0 : returnsValue)}
                        </span>
                      </div>
                    </div>

                    <div className="w-px bg-slate-200 self-stretch my-1"></div>

                    {calculatedResult && (
                      <div className="flex-[0.8] flex flex-col items-start justify-center gap-1.5 pl-4">
                        <span className="text-slate-500 font-bold text-xs font-sans uppercase tracking-wider whitespace-nowrap">
                          {investmentType === 'swp' ? 'Final Balance' : 'Future Value'}
                        </span>
                        <span
                          className="font-bold text-slate-900 tracking-tight font-sans text-3xl leading-none"
                        >
                          {formatLargeNumber(
                            investmentType === 'swp'
                              ? (calculatedResult as SWPResult)?.finalBalance || 0
                              : (calculatedResult as CalculationResult)?.futureValue || 0
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Mobile View Results Block */}
                  <div className="flex flex-col items-stretch justify-center gap-3 w-full p-4 bg-slate-50/50 backdrop-blur-sm rounded-2xl border border-slate-200/30 shadow-sm text-center md:hidden">
                    <div className="flex flex-col gap-3 w-full px-2">
                      {/* Invested Amount Card */}
                      <div className="flex flex-col items-center p-3.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm text-center">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: investedColor }} />
                          <span className="text-slate-500 font-medium font-sans text-xs uppercase tracking-wider">Invested Amount</span>
                        </div>
                        <span className="font-semibold text-slate-600 font-sans text-lg break-all leading-tight">
                          {formatLargeNumber(investedValue)}
                        </span>
                      </div>

                      {/* Returns/Withdrawal Card */}
                      <div className="flex flex-col items-center p-3.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm text-center">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: gainsColor }} />
                          <span className="text-slate-500 font-medium font-sans text-xs uppercase tracking-wider">
                            {investmentType === "swp" ? "Total Withdrawal" : "Total Returns"}
                          </span>
                        </div>
                        <span className="font-semibold text-emerald-600 font-sans text-lg break-all leading-tight">
                          {formatLargeNumber(investmentType === "swp" ? ((calculatedResult as SWPResult)?.totalWithdrawn || 0) : returnsValue)}
                        </span>
                      </div>

                      {/* Final Value/Balance Card */}
                      <div className="flex flex-col items-center p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm text-center">
                        <span className="text-slate-600 font-medium text-xs uppercase tracking-wider mb-1 font-sans">
                          {investmentType === 'swp' ? 'Final Balance' : 'Future Value'}
                        </span>
                        <span
                          className="font-bold text-slate-900 break-all font-sans text-xl leading-tight"
                        >
                          {formatLargeNumber(
                            investmentType === 'sip' ? (calculatedResult as CalculationResult).futureValue || 0 :
                              investmentType === 'lumpsum' ? (calculatedResult as CalculationResult).futureValue || 0 :
                                (calculatedResult as SWPResult).finalBalance || 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[260px] w-full max-w-[260px] md:h-[320px] md:max-w-[320px] flex items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-muted-foreground p-6 text-center font-sans">
                  Please enter valid inputs to see the chart and results
                </div>
              )}
            </div>

            <div className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}