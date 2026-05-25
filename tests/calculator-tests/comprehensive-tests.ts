import assert from "node:assert/strict";

import { calculateLumpsum, calculateSIP, calculateSWP } from "../../lib/calculators";

type SipCase = {
  monthlyInvestment: number;
  annualRate: number;
  years: number;
};

type LumpsumCase = {
  principal: number;
  annualRate: number;
  years: number;
};

type SwpCase = {
  principal: number;
  monthlyWithdrawal: number;
  annualRate: number;
  years: number;
};

const sipCases: SipCase[] = [
  { monthlyInvestment: 500, annualRate: 1, years: 1 },
  { monthlyInvestment: 10000, annualRate: 0, years: 10 },
  { monthlyInvestment: 5000, annualRate: 25, years: 20 },
  { monthlyInvestment: 1000000, annualRate: 30, years: 40 },
];

const lumpsumCases: LumpsumCase[] = [
  { principal: 1000, annualRate: 1, years: 1 },
  { principal: 1000000, annualRate: 0, years: 15 },
  { principal: 500000, annualRate: 25, years: 25 },
  { principal: 10000000, annualRate: 30, years: 40 },
];

const swpCases: SwpCase[] = [
  { principal: 10000, monthlyWithdrawal: 500, annualRate: 1, years: 1 },
  { principal: 1000000, monthlyWithdrawal: 10000, annualRate: 0, years: 10 },
  { principal: 1000000, monthlyWithdrawal: 50000, annualRate: 5, years: 5 },
  { principal: 10000000, monthlyWithdrawal: 100000, annualRate: 30, years: 30 },
];

function assertFiniteNumbers(values: object, label: string): void {
  for (const [key, rawValue] of Object.entries(values)) {
    assert.equal(typeof rawValue, "number", `${label}: ${key} should be numeric`);
    assert.equal(Number.isFinite(rawValue), true, `${label}: ${key} should be finite`);
  }
}

export function runComprehensiveTests(): void {
  for (const testCase of sipCases) {
    const result = calculateSIP(testCase.monthlyInvestment, testCase.annualRate, testCase.years);
    const expectedTotalInvested = testCase.monthlyInvestment * testCase.years * 12;

    assert.equal(result.totalInvested, expectedTotalInvested, "SIP total invested mismatch");
    assert.equal(result.futureValue >= 0, true, "SIP future value should be non-negative");
    assertFiniteNumbers(result, "SIP result");
  }

  for (const testCase of lumpsumCases) {
    const result = calculateLumpsum(testCase.principal, testCase.annualRate, testCase.years);

    assert.equal(result.totalInvested, testCase.principal, "Lumpsum total invested mismatch");
    assert.equal(result.futureValue >= 0, true, "Lumpsum future value should be non-negative");
    assertFiniteNumbers(result, "Lumpsum result");
  }

  for (const testCase of swpCases) {
    const result = calculateSWP(
      testCase.principal,
      testCase.monthlyWithdrawal,
      testCase.annualRate,
      testCase.years,
    );

    assert.equal(result.totalInvested, testCase.principal, "SWP total invested mismatch");
    assert.equal(result.totalWithdrawn >= 0, true, "SWP withdrawn amount should be non-negative");
    assert.equal(result.finalBalance >= 0, true, "SWP final balance should not be negative");
    assertFiniteNumbers(result, "SWP result");
  }
}

if (process.argv[1] && (process.argv[1].endsWith('comprehensive-tests.ts') || process.argv[1].endsWith('comprehensive-tests.js'))) {
  runComprehensiveTests();
  console.log("Comprehensive tests passed successfully.");
}