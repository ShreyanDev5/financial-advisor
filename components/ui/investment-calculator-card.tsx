"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function InvestmentCalculatorCard({ investmentType }: { investmentType: string }) {
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

  const calculatedResult = useMemo(() => {
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

  const pieData = useMemo(() => {
    if (!calculatedResult) return [];
    if (investmentType === 'sip') {
        return [
            { name: 'Total Investment', value: calculatedResult.totalInvested },
            { name: 'Wealth Gained', value: calculatedResult.wealthGained },
        ];
    }
    if (investmentType === 'lumpsum') {
        return [
            { name: 'Total Investment', value: calculatedResult.totalInvested },
            { name: 'Wealth Gained', value: calculatedResult.wealthGained },
        ];
    }
    if (investmentType === 'swp') {
        return [
            { name: 'Total Withdrawn', value: calculatedResult.totalWithdrawn },
            { name: 'Final Balance', value: calculatedResult.finalBalance },
        ];
    }
    return [];
}, [calculatedResult, investmentType]);

  type GrowthPoint = { year: string; value: number; invested: number };

  const lineData = useMemo<GrowthPoint[]>(() => {
    const annualRate = parseFloat(expectedReturnRate) / 100;
    const years = parseInt(timePeriod);
    if (!Number.isFinite(annualRate) || !Number.isFinite(years)) return [];

    if (investmentType === 'sip') {
      const monthly = parseFloat(investmentAmount);
      if (!Number.isFinite(monthly)) return [];
      const monthlyRate = annualRate / 12;
      let value = 0;
      let invested = 0;
      const data: GrowthPoint[] = [];
      for (let y = 1; y <= years; y++) {
        for (let m = 0; m < 12; m++) {
          value = (value + monthly) * (1 + monthlyRate);
          invested += monthly;
        }
        data.push({ year: `Y${y}`, value, invested });
      }
      return data;
    }

    if (investmentType === 'lumpsum') {
      const principal = parseFloat(totalInvestment);
      if (!Number.isFinite(principal)) return [];
      const data: GrowthPoint[] = [];
      for (let y = 1; y <= years; y++) {
        const value = principal * Math.pow(1 + annualRate, y);
        data.push({ year: `Y${y}`, value, invested: principal });
      }
      return data;
    }

    // SWP
    const principal = parseFloat(totalInvestment);
    const withdrawal = parseFloat(withdrawalAmount);
    if (!Number.isFinite(principal) || !Number.isFinite(withdrawal)) return [];
    const monthlyRate = annualRate / 12;
    let balance = principal;
    const data: GrowthPoint[] = [];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) - withdrawal;
      }
      data.push({ year: `Y${y}`, value: Math.max(balance, 0), invested: principal });
    }
    return data;
  }, [investmentType, investmentAmount, totalInvestment, withdrawalAmount, expectedReturnRate, timePeriod]);

  const chartConfig: ChartConfig = {
    invested: {
      label: "Invested",
      color: "hsl(var(--muted-foreground))",
    },
    value: {
      label: investmentType === 'swp' ? 'Balance' : 'Value',
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-b from-background/60 to-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40 border border-border/60 shadow-xl rounded-xl">
      <CardHeader className="pb-2 mb-6">
        <CardTitle className="text-center text-2xl font-bold">{investmentType.toUpperCase()} Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
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

            <div className="h-6" />

            {calculatedResult && (
              <div className="flex flex-col gap-4 mt-6 text-center">
                {investmentType === 'sip' && (
                  <>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-lg font-semibold">₹{formatAmount(calculatedResult.totalInvested)}</p>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Returns</p>
                      <p className="text-lg font-semibold">₹{formatAmount(calculatedResult.wealthGained)}</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-primary/10">
                      <p className="text-sm text-primary">Future Value</p>
                      <p className="text-xl font-bold text-primary">₹{formatAmount(calculatedResult.futureValue)}</p>
                    </div>
                  </>
                )}
                {investmentType === 'lumpsum' && (
                  <>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-lg font-semibold">₹{formatAmount(calculatedResult.totalInvested)}</p>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Returns</p>
                      <p className="text-lg font-semibold">₹{formatAmount(calculatedResult.wealthGained)}</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-primary/10">
                      <p className="text-sm text-primary">Future Value</p>
                      <p className="text-xl font-bold text-primary">₹{formatAmount(calculatedResult.futureValue)}</p>
                    </div>
                  </>
                )}
                {investmentType === 'swp' && (
                  <>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-lg font-semibold">₹{formatAmount(calculatedResult.totalInvested)}</p>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Withdrawn</p>
                      <p className="text-lg font-semibold">₹{formatAmount(calculatedResult.totalWithdrawn)}</p>
                    </div>
                    <div className="p-3 rounded-lg border bg-primary/10">
                      <p className="text-sm text-primary">Final Balance</p>
                      <p className="text-xl font-bold text-primary">₹{formatAmount(calculatedResult.finalBalance)}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {calculatedResult && (
              <>
                <div className="rounded-xl border p-3">
                  <div className="text-sm font-medium mb-2">Breakdown</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <RechartsLegend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="rounded-xl border p-3">
                  <div className="text-sm font-medium mb-2">Growth Over Time</div>
                  <ChartContainer config={chartConfig} className="aspect-[16/10]">
                    <ReLineChart data={lineData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                      <XAxis dataKey="year" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} width={60} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="invested" stroke="var(--color-invested)" strokeWidth={2} dot={false} />
                    </ReLineChart>
                  </ChartContainer>
                </div>

                
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}