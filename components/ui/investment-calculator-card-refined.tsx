import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Slider } from "@/components/ui/slider";
import { formatLargeNumber } from "@/lib/format-large-number";
import { calculateSIP, calculateLumpsum, calculateSWP, CalculationResult, SWPResult } from "@/lib/calculators";


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

  const calculatedResult: CalculationResult | SWPResult | null = useMemo(() => {
    const principal = parseFloat(totalInvestment);
    const monthlyAmt = parseFloat(investmentAmount);
    const withdrawalAmt = parseFloat(withdrawalAmount);
    const annualRate = parseFloat(expectedReturnRate);
    const years = parseInt(timePeriod);

    if (investmentType === "sip") {
      if (isNaN(monthlyAmt) || isNaN(annualRate) || isNaN(years)) return null;
      return calculateSIP(monthlyAmt, annualRate, years);
    }

    if (investmentType === "lumpsum") {
      if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) return null;
      return calculateLumpsum(principal, annualRate, years);
    }

    if (investmentType === "swp") {
      if (isNaN(principal) || isNaN(withdrawalAmt) || isNaN(annualRate) || isNaN(years)) return null;
      return calculateSWP(principal, withdrawalAmt, annualRate, years);
    }

    return null;
  }, [totalInvestment, investmentAmount, withdrawalAmount, expectedReturnRate, timePeriod, investmentType]);

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
  const investedColor = "#2563eb"; // blue-600
  const gainsColor = "#10b981"; // emerald-500
  const hasChartData = chartData.some((d) => Number(d.value) > 0);
  const investedValue = Math.max(0, Number(chartData.find((d) => d.key === "invested")?.value || 0));
  const returnsValue = Math.max(0, Number(chartData.find((d) => d.key === "gains")?.value || 0));
  const donutSize = 260; // Slightly increased size for better mobile readability
  const r = 78; // Adjusted radius for larger donut ( (outer 104 + inner 52) / 2 )
  const strokeWidth = 52; // outer - inner (keeping the same thickness ratio)
  const circumference = 2 * Math.PI * r;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            {investmentType === "sip" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {investmentType === "lumpsum" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {investmentType === "swp" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          </div>
          {investmentType === "sip" && "SIP Calculator"}
          {investmentType === "lumpsum" && "Lumpsum Calculator"}
          {investmentType === "swp" && "SWP Calculator"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-10 sm:gap-12">
          <div className="space-y-8 sm:space-y-10">
            {investmentType === "sip" && (
              <div className="space-y-2 sm:space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 md:px-8 w-full mx-auto">
                  <Label htmlFor="investmentAmount" className="text-sm font-medium w-full sm:w-1/2">Monthly Investment (₹)</Label>
                  <FormattedInput
                    id="investmentAmount"
                    inputMode="numeric"
                    value={investmentAmount}
                    onFormattedChange={setInvestmentAmount}
                    className="w-full sm:w-1/3 rounded-lg"
                  />
                </div>
                <div className="px-2 md:px-8">
                  <Slider value={[Number(investmentAmount) || 0]} onValueChange={([v]) => setInvestmentAmount(String(Math.round(v)))} min={500} max={1000000} step={500} className="[&>span:first-child]:h-2 [&>span:first-child]:rounded-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md mx-auto w-[calc(100%-1rem)]" />
                </div>
              </div>
            )}
            {investmentType === "lumpsum" && (
              <div className="space-y-2 sm:space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 md:px-8 w-full mx-auto">
                  <Label htmlFor="totalInvestment" className="text-sm font-medium w-full sm:w-1/2">Total Investment (₹)</Label>
                  <FormattedInput
                    id="totalInvestment"
                    inputMode="numeric"
                    value={totalInvestment}
                    onFormattedChange={setTotalInvestment}
                    className="w-full sm:w-1/3 rounded-lg"
                  />
                </div>
                <div className="px-2 md:px-8">
                  <Slider value={[Number(totalInvestment) || 0]} onValueChange={([v]) => setTotalInvestment(String(Math.round(v)))} min={500} max={10000000} step={10000} className="[&>span:first-child]:h-2 [&>span:first-child]:rounded-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md mx-auto w-[calc(100%-1rem)]" />
                </div>
              </div>
            )}
            {investmentType === "swp" && (
              <>
                <div className="space-y-2 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 md:px-8 w-full mx-auto">
                    <Label htmlFor="totalInvestment" className="text-sm font-medium w-full sm:w-1/2">Total Investment (₹)</Label>
                    <FormattedInput
                      id="totalInvestment"
                      inputMode="numeric"
                      value={totalInvestment}
                      onFormattedChange={setTotalInvestment}
                      className="w-full sm:w-1/3 rounded-lg"
                    />
                  </div>
                  <div className="px-2 md:px-8">
                    <Slider value={[Number(totalInvestment) || 0]} onValueChange={([v]) => setTotalInvestment(String(Math.round(v)))} min={10000} max={10000000} step={10000} className="[&>span:first-child]:h-2 [&>span:first-child]:rounded-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md mx-auto w-[calc(100%-1rem)]" />
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 md:px-8 w-full mx-auto">
                    <Label htmlFor="withdrawalAmount" className="text-sm font-medium w-full sm:w-1/2">Monthly Withdrawal (₹)</Label>
                    <FormattedInput
                      id="withdrawalAmount"
                      inputMode="numeric"
                      value={withdrawalAmount}
                      onFormattedChange={setWithdrawalAmount}
                      className="w-full sm:w-1/3 rounded-lg"
                    />
                  </div>
                  <div className="px-2 md:px-8">
                    <Slider value={[Number(withdrawalAmount) || 0]} onValueChange={([v]) => setWithdrawalAmount(String(Math.round(v)))} min={500} max={1000000} step={500} className="[&>span:first-child]:h-2 [&>span:first-child]:rounded-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md mx-auto w-[calc(100%-1rem)]" />
                  </div>
                </div>
              </>
            )}
            <div className="space-y-2 sm:space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 md:px-8 w-full mx-auto">
                <Label htmlFor="expectedReturnRate" className="text-sm font-medium w-full sm:w-1/2">Expected Return Rate (% p.a.)</Label>
                <Input id="expectedReturnRate" inputMode="numeric" value={expectedReturnRate} onChange={(e) => setExpectedReturnRate(e.target.value)} className="w-full sm:w-1/3 rounded-lg" />
              </div>
              <div className="px-2 md:px-8">
                <Slider value={[Number(expectedReturnRate) || 0]} onValueChange={([v]) => setExpectedReturnRate(String(v))} min={1} max={30} step={0.5} className="[&>span:first-child]:h-2 [&>span:first-child]:rounded-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md mx-auto w-[calc(100%-1rem)]" />
              </div>
            </div>
            <div className="space-y-2 sm:space-y-2 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 md:px-8 w-full mx-auto">
                <Label htmlFor="timePeriod" className="text-sm font-medium w-full sm:w-1/2">Time Period (Years)</Label>
                <Input id="timePeriod" inputMode="numeric" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="w-full sm:w-1/3 rounded-lg" />
              </div>
              <div className="px-2 md:px-8">
                <Slider value={[Number(timePeriod) || 0]} onValueChange={([v]) => setTimePeriod(String(v))} min={1} max={40} step={1} className="[&>span:first-child]:h-2 [&>span:first-child]:rounded-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-md mx-auto w-[calc(100%-1rem)]" />
              </div>
            </div>

            {/* Moved the pie chart to the bottom of the input sliders */}
            <div className="w-full flex justify-center overflow-visible" suppressHydrationWarning>
              {!isMounted ? (
                <div className="h-[260px] w-full max-w-[260px] md:h-[320px] md:max-w-[320px] animate-pulse rounded-lg bg-muted/30" />
              ) : hasChartData ? (
                <div className="mt-2 sm:mt-3 flex flex-col items-center w-full px-2 py-2">
                  <svg
                    width={donutSize}
                    height={donutSize}
                    viewBox={`0 0 ${donutSize} ${donutSize}`}
                    className="w-64 h-64 md:w-80 md:h-80"
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
                  {/* Add minimal spacing for mobile screens */}
                  <div className="md:hidden h-2"></div>
                  {/* Add small spacing for desktop screens */}
                  <div className="hidden md:block h-4"></div>
                  {/* Desktop View */}
                  <div className="hidden md:flex items-center justify-center gap-6 text-base py-2">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-block h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: investedColor }} />
                        <span className="text-slate-600 font-medium font-serif">Invested</span>
                        <span className="font-bold text-blue-600" style={{ fontSize: '1.25rem' }}>{formatLargeNumber(investedValue)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-block h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: gainsColor }} />
                        <span className="text-slate-600 font-medium font-serif">{investmentType === "swp" ? "Total Withdrawal" : "Total Returns"}</span>
                        <span className="font-bold text-emerald-600" style={{ fontSize: '1.25rem' }}>
                          {formatLargeNumber(investmentType === "swp" ? (calculatedResult as SWPResult)?.totalWithdrawn || 0 : returnsValue)}
                        </span>
                      </div>
                    </div>

                    <div className="h-16 w-px bg-slate-200 mx-4"></div>

                    {calculatedResult && (
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-slate-500 font-medium text-sm font-serif uppercase tracking-wider">
                          {investmentType === 'swp' ? 'Final Balance' : 'Future Value'}
                        </span>
                        <span
                          className="font-bold text-slate-900 tracking-tight"
                          style={{
                            fontSize: '2.5rem',
                            lineHeight: 1
                          }}
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

                  {/* Mobile View */}
                  <div className="flex flex-col items-center justify-center gap-2 text-base md:hidden w-full">
                    <div className="flex flex-col w-full px-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: investedColor }} />
                          <span className="text-muted-foreground font-medium text-sm">Invested</span>
                        </div>
                        <span className="font-bold text-blue-600 text-right truncate" style={{ fontSize: '1rem' }}>{formatLargeNumber(investedValue)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col w-full px-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: gainsColor }} />
                          <span className="text-muted-foreground font-medium text-sm">{investmentType === "swp" ? "Withdrawal" : "Returns"}</span>
                        </div>
                        <span className="font-bold text-emerald-600 text-right truncate" style={{ fontSize: '1rem' }}>{formatLargeNumber(investmentType === "swp" ? ((calculatedResult as SWPResult)?.totalWithdrawn || 0) : returnsValue)}</span>
                      </div>
                    </div>

                    <hr className="w-[90%] my-2 border-muted" />

                    {calculatedResult && (
                      <div className="flex flex-col items-center w-full px-2">
                        <span className="text-slate-500 font-medium text-sm uppercase tracking-widest mb-1">
                          {investmentType === 'swp' ? 'Final Balance' : 'Future Value'}
                        </span>
                        <span
                          className="font-bold text-slate-900 text-center break-all"
                          style={{
                            fontSize: '1.75rem',
                            lineHeight: 1.1
                          }}
                        >
                          {formatLargeNumber(
                            investmentType === 'sip' ? (calculatedResult as CalculationResult).futureValue || 0 :
                              investmentType === 'lumpsum' ? (calculatedResult as CalculationResult).futureValue || 0 :
                                (calculatedResult as SWPResult).finalBalance || 0
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-[260px] w-full max-w-[260px] md:h-[320px] md:max-w-[320px] flex items-center justify-center rounded-lg border text-sm text-muted-foreground">
                  Adjust inputs to see the chart
                </div>
              )}
            </div>

            <div className="h-2" />

            {calculatedResult && (
              <div className="mt-2">
                <div className="text-center text-sm text-muted-foreground hidden">
                  Adjust the inputs to see how they affect your returns
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}