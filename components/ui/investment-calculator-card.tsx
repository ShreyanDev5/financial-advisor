"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type CalculatedResult = {
  totalInvested: number;
  wealthGained: number;
  futureValue?: number;
  totalWithdrawn?: number;
  finalBalance?: number;
} | null;

export function InvestmentCalculatorCard({ investmentType }: { investmentType: string }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [totalInvestment, setTotalInvestment] = useState("100000");
  const [investmentAmount, setInvestmentAmount] = useState("5000");
  const [withdrawalAmount, setWithdrawalAmount] = useState("5000");
  const [expectedReturnRate, setExpectedReturnRate] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");

  // Ensure consistent number formatting across SSR and client
  const numberFormatter = useMemo(() => new Intl.NumberFormat(["en-IN", "en-US"], {
    maximumFractionDigits: 0,
  }), []);
  const formatAmount = (value?: number) => numberFormatter.format(Math.round(value || 0));

  const calculatedResult: CalculatedResult = useMemo(() => {
    const principal = parseFloat(totalInvestment);
    const monthlyInvestment = parseFloat(investmentAmount);
    const monthlyWithdrawal = parseFloat(withdrawalAmount);
    const annualRate = parseFloat(expectedReturnRate) / 100;
    const years = parseInt(timePeriod);

    if (investmentType === "sip") {
      if (isNaN(monthlyInvestment) || isNaN(annualRate) || isNaN(years)) return null;
      const monthlyRate = annualRate / 12;
      const months = years * 12;
      const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const totalInvested = monthlyInvestment * months;
      const wealthGained = futureValue - totalInvested;
      return { totalInvested, wealthGained, futureValue };
    }

    if (investmentType === "lumpsum") {
        if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) return null;
        const futureValue = principal * Math.pow(1 + annualRate, years);
        const wealthGained = futureValue - principal;
        return { totalInvested: principal, wealthGained, futureValue };
    }

    if (investmentType === "swp") {
        if (isNaN(principal) || isNaN(monthlyWithdrawal) || isNaN(annualRate) || isNaN(years)) return null;
        const monthlyRate = annualRate / 12;
        const months = years * 12;
        let balance = principal;
        let totalWithdrawn = 0;

        for (let i = 0; i < months; i++) {
            balance = balance * (1 + monthlyRate) - monthlyWithdrawal;
            totalWithdrawn += monthlyWithdrawal;
        }

        const wealthGained = balance + totalWithdrawn - principal;
        return { totalInvested: principal, totalWithdrawn, finalBalance: balance, wealthGained };
    }

    return null;
  }, [totalInvestment, investmentAmount, withdrawalAmount, expectedReturnRate, timePeriod, investmentType]);

  const { chartData } = useMemo(() => {
    if (!calculatedResult) {
      return { chartData: [] as { name: string; value: number; key: "invested" | "gains" }[] };
    }

    if (investmentType === "sip" || investmentType === "lumpsum") {
      const invested = Math.max(0, Number(calculatedResult.totalInvested || 0));
      const gains = Math.max(0, Number(calculatedResult.wealthGained || 0));
      return {
        chartData: [
          { name: "Invested", value: invested, key: "invested" },
          { name: "Returns", value: gains, key: "gains" },
        ],
      };
    }

    // SWP: minimal composition (Invested vs Gains)
    const invested = Math.max(0, Number(calculatedResult.totalInvested || 0));
    const gains = Math.max(0, Number(calculatedResult.wealthGained || 0));
    return {
      chartData: [
        { name: "Invested", value: invested, key: "invested" },
        { name: "Gains", value: gains, key: "gains" },
      ],
    };
  }, [calculatedResult, investmentType]);

  // Premium color scheme suitable for financial UI
  const investedColor = "#2563eb"; // blue-600
  const gainsColor = "#10b981"; // emerald-500
  const hasChartData = chartData.some((d) => Number(d.value) > 0);
  const investedValue = Math.max(0, Number(chartData.find((d) => d.key === "invested")?.value || 0));
  const returnsValue = Math.max(0, Number(chartData.find((d) => d.key === "gains")?.value || 0));
  const donutSize = 320;
  const r = 96; // (outer 120 + inner 72) / 2
  const strokeWidth = 48; // outer - inner
  const circumference = 2 * Math.PI * r;

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-b from-background/60 to-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40 border border-border/60 shadow-xl rounded-xl">
      <CardHeader className="pb-2 mb-6">
        <CardTitle className="text-center text-xl font-bold">{investmentType.toUpperCase()} Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8 ml-8">
            {investmentType === "sip" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="investmentAmount">Monthly Investment (₹)</Label>
                  <Input id="investmentAmount" inputMode="numeric" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} className="w-36" />
                </div>
                <Slider value={[Number(investmentAmount) || 0]} onValueChange={([v]) => setInvestmentAmount(String(Math.round(v)))} min={500} max={200000} step={500} />
              </div>
            )}
            {investmentType === "lumpsum" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="totalInvestment">Total Investment (₹)</Label>
                  <Input id="totalInvestment" inputMode="numeric" value={totalInvestment} onChange={(e) => setTotalInvestment(e.target.value)} className="w-36" />
                </div>
                <Slider value={[Number(totalInvestment) || 0]} onValueChange={([v]) => setTotalInvestment(String(Math.round(v)))} min={10000} max={5000000} step={10000} />
              </div>
            )}
            {investmentType === "swp" && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="totalInvestment">Total Investment (₹)</Label>
                    <Input id="totalInvestment" inputMode="numeric" value={totalInvestment} onChange={(e) => setTotalInvestment(e.target.value)} className="w-36" />
                  </div>
                  <Slider value={[Number(totalInvestment) || 0]} onValueChange={([v]) => setTotalInvestment(String(Math.round(v)))} min={10000} max={5000000} step={10000} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="withdrawalAmount">Monthly Withdrawal (₹)</Label>
                    <Input id="withdrawalAmount" inputMode="numeric" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} className="w-36" />
                  </div>
                  <Slider value={[Number(withdrawalAmount) || 0]} onValueChange={([v]) => setWithdrawalAmount(String(Math.round(v)))} min={1000} max={200000} step={500} />
                </div>
              </>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="expectedReturnRate">Expected Return Rate (% p.a.)</Label>
                <Input id="expectedReturnRate" inputMode="numeric" value={expectedReturnRate} onChange={(e) => setExpectedReturnRate(e.target.value)} className="w-24" />
              </div>
              <Slider value={[Number(expectedReturnRate) || 0]} onValueChange={([v]) => setExpectedReturnRate(String(v))} min={1} max={24} step={0.5} />
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="timePeriod">Time Period (Years)</Label>
                <Input id="timePeriod" inputMode="numeric" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="w-24" />
              </div>
              <Slider value={[Number(timePeriod) || 0]} onValueChange={([v]) => setTimePeriod(String(v))} min={1} max={40} step={1} />
            </div>

            <div className="h-2" />

            {calculatedResult && (
              <div className="flex flex-col gap-4 mt-2">
                {investmentType === 'sip' && (
                  <>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-base font-semibold">₹{formatAmount(calculatedResult.totalInvested)}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Returns</p>
                      <p className="text-base font-semibold">₹{formatAmount(calculatedResult.wealthGained)}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border bg-primary/10">
                      <p className="text-sm text-primary">Future Value</p>
                      <p className="text-lg font-bold text-primary">₹{formatAmount(calculatedResult.futureValue)}</p>
                    </div>
                  </>
                )}
                {investmentType === 'lumpsum' && (
                  <>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-base font-semibold">₹{formatAmount(calculatedResult.totalInvested)}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Returns</p>
                      <p className="text-base font-semibold">₹{formatAmount(calculatedResult.wealthGained)}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border bg-primary/10">
                      <p className="text-sm text-primary">Future Value</p>
                      <p className="text-lg font-bold text-primary">₹{formatAmount(calculatedResult.futureValue)}</p>
                    </div>
                  </>
                )}
                {investmentType === 'swp' && (
                  <>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-base font-semibold">₹{formatAmount(calculatedResult.totalInvested)}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Withdrawn</p>
                      <p className="text-base font-semibold">₹{formatAmount(calculatedResult.totalWithdrawn)}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border bg-primary/10">
                      <p className="text-sm text-primary">Final Balance</p>
                      <p className="text-lg font-bold text-primary">₹{formatAmount(calculatedResult.finalBalance)}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-full flex justify-center overflow-visible" suppressHydrationWarning>
              {!isMounted ? (
                <div className="h-[320px] w-full max-w-[320px] animate-pulse rounded-lg bg-muted/30" />
              ) : hasChartData ? (
                <div className="mt-2 sm:mt-3 flex flex-col items-center">
                <svg
                  width={donutSize}
                  height={donutSize}
                  viewBox={`0 0 ${donutSize} ${donutSize}`}
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
                          stroke="#e5e7eb" /* neutral track for subtle base */
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
                  {/* Center label removed per requirement */}
                </svg>
                <div className="mt-3 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: investedColor }} />
                    <span className="text-muted-foreground">Invested</span>
                    <span className="font-semibold" style={{ color: investedColor }}>₹{formatAmount(investedValue)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: gainsColor }} />
                    <span className="text-muted-foreground">Returns</span>
                    <span className="font-semibold" style={{ color: gainsColor }}>₹{formatAmount(returnsValue)}</span>
                  </div>
                </div>
                </div>
              ) : (
                <div className="h-[320px] w-full max-w-[320px] flex items-center justify-center rounded-lg border text-sm text-muted-foreground">
                  Adjust inputs to see the chart
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}