import assert from "node:assert/strict";

import {
  calculateEducationPlan,
  calculateLumpsum,
  calculateMarriagePlan,
  calculateRetirementPlan,
  calculateSIP,
  calculateSWP,
} from "../../lib/calculators";

export function runBasicTests(): void {
  const sipResult = calculateSIP(5000, 12, 10);
  assert.deepEqual(sipResult, {
    totalInvested: 600000,
    wealthGained: 561695,
    futureValue: 1161695,
  });

  const lumpsumResult = calculateLumpsum(100000, 12, 10);
  assert.deepEqual(lumpsumResult, {
    totalInvested: 100000,
    wealthGained: 210585,
    futureValue: 310585,
  });

  const swpResult = calculateSWP(500000, 10000, 8, 5);
  assert.deepEqual(swpResult, {
    totalInvested: 500000,
    totalWithdrawn: 600000,
    finalBalance: 5256,
    wealthGained: 105256,
    futureValue: 5256,
  });

  const educationResult = calculateEducationPlan(1000000, 7, 13, 200000, 10);
  assert.deepEqual(educationResult, {
    projectedCost: 2409845,
    monthlyInvestment: 5363,
    yearsUntilEducation: 13,
    shortfall: 1719391,
  });

  const retirementResult = calculateRetirementPlan(30, 60, 85, 50000, 6, 10);
  assert.deepEqual(retirementResult, {
    retirementCorpus: 57228025,
    monthlySavingsRequired: 25107,
    yearsUntilRetirement: 30,
    yearsInRetirement: 25,
    futureMonthlyExpenses: 287175,
  });

  const marriageResult = calculateMarriagePlan(5, 25, 2000000, 7, 300000, 10);
  assert.deepEqual(marriageResult, {
    futureCostOfMarriage: 7739369,
    sipInvestment: 7472,
    lumpSumInvestment: 850408,
    yearsUntilMarriage: 20,
  });

  const zeroRateSip = calculateSIP(10000, 0, 10);
  assert.deepEqual(zeroRateSip, {
    totalInvested: 1200000,
    wealthGained: 0,
    futureValue: 1200000,
  });

  // SWP Exhaustion/Overdraw Bug Test (0% rate, principal 10k, withdrawing 5k/mo over 3 months)
  const exhaustedSwp = calculateSWP(10000, 5000, 0, 0.25); // 0.25 years is 3 months
  assert.deepEqual(exhaustedSwp, {
    totalInvested: 10000,
    totalWithdrawn: 10000,
    finalBalance: 0,
    wealthGained: 0,
    futureValue: 0,
  });
}

if (process.argv[1] && (process.argv[1].endsWith('basic-tests.ts') || process.argv[1].endsWith('basic-tests.js'))) {
  runBasicTests();
  console.log("Basic tests passed successfully.");
}