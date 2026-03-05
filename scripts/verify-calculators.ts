import { calculateSIP, calculateLumpsum, calculateSWP, calculateEducationPlan } from '@/lib/calculators';
import { formatLargeNumber } from '@/lib/format-large-number';

console.log("=== Financial Calculator Verifications ===\n");

// 1. SIP Verification
// Scenario: ₹5,000/mo, 12% annual return, 10 years
const sipResult = calculateSIP(5000, 12, 10);
console.log("SIP Test (5k, 12%, 10y):");
console.log(`Expected Invested: 6,00,000 | Calculated: ${sipResult.totalInvested}`);
console.log(`Expected Value: ~11.6L    | Calculated: ${sipResult.futureValue}`);
console.log(`Formatted: ${formatLargeNumber(sipResult.futureValue)}`);
console.log("-----------------------------------");

// 2. Lumpsum Verification
// Scenario: ₹1,00,000 one-time, 12% annual return, 10 years
const lumpsumResult = calculateLumpsum(100000, 12, 10);
console.log("Lumpsum Test (1L, 12%, 10y):");
console.log(`Expected Invested: 1,00,000 | Calculated: ${lumpsumResult.totalInvested}`);
// FV = 100000 * (1.12)^10 = 3,10,584.82
console.log(`Expected Value: ~3,10,585 | Calculated: ${lumpsumResult.futureValue}`);
console.log("-----------------------------------");

// 3. SWP Verification
// Scenario: ₹5,00,000 principal, ₹10,000/mo withdrawal, 8% return, 5 years
const swpResult = calculateSWP(500000, 10000, 8, 5);
console.log("SWP Test (5L, 10k/mo, 8%, 5y):");
console.log(`Expected Withdrawn: 6,00,000 | Calculated: ${swpResult.totalWithdrawn}`);
// From previous issue description: Expected Final ~5,218
console.log(`Expected Final: ~5,218       | Calculated: ${swpResult.finalBalance}`);
console.log("-----------------------------------");

// 4. Education Plan Verification
// Scenario: Cost 10L, Inflation 7%, 18y start - 5y current = 13y, Savings 2L, Return 10%
// Projected Cost = 10L * (1.07)^13 = 24.09L
// Savings FV = 2L * (1.10)^13 = 6.90L
// Shortfall = 24.09 - 6.90 = 17.19L
// Monthly Investment for 17.19L in 13y @ 10%...
const eduResult = calculateEducationPlan(1000000, 7, 13, 200000, 10);
console.log("Education Plan Test:");
console.log(`Projected Cost: ${eduResult.projectedCost}`);
console.log(`Monthly Inv: ${eduResult.monthlyInvestment}`);
console.log("-----------------------------------");
