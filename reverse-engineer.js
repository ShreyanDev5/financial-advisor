// Script to reverse-engineer the benchmark calculation
console.log("=== REVERSE ENGINEERING BENCHMARK CALCULATION ===");

// Given benchmark values
const benchmarkCorpus = 4805036.43;
const benchmarkSavings = 2320.53;

// Given inputs
const currentAge = 23;
const retirementAge = 45;
const lifeExpectancy = 70;
const monthlyExpenses = 10000;
const inflationRate = 6;
const expectedReturnRate = 15;

console.log("Given inputs:");
console.log(`Current Age: ${currentAge}`);
console.log(`Retirement Age: ${retirementAge}`);
console.log(`Life Expectancy: ${lifeExpectancy}`);
console.log(`Current Monthly Expenses (₹): ${monthlyExpenses.toLocaleString('en-IN')}`);
console.log(`Expected Inflation Rate (% p.a.): ${inflationRate}`);
console.log(`Expected Rate of Return (% p.a.): ${expectedReturnRate}`);
console.log(`Benchmark Corpus: ₹${benchmarkCorpus.toLocaleString('en-IN')}`);
console.log(`Benchmark Monthly Savings: ₹${benchmarkSavings.toLocaleString('en-IN')}\n`);

// Step 1: Calculate years until retirement
const yearsUntilRetirement = retirementAge - currentAge;
console.log(`Years until retirement: ${yearsUntilRetirement} years`);

// Step 2: Calculate years in retirement
const yearsInRetirement = lifeExpectancy - retirementAge;
console.log(`Years in retirement: ${yearsInRetirement} years`);

// Step 3: Calculate future monthly expenses at retirement (considering inflation)
const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsUntilRetirement);
console.log(`Future monthly expenses at retirement: ${futureMonthlyExpenses.toFixed(2)}`);

// Step 4: Calculate annual expenses at retirement
const annualExpensesAtRetirement = futureMonthlyExpenses * 12;
console.log(`Annual expenses at retirement: ${annualExpensesAtRetirement.toFixed(2)}`);

console.log("\n=== TESTING DIFFERENT APPROACHES ===");

// Approach 1: Simple present value of annuity (ignoring growth)
const simplePV = annualExpensesAtRetirement * yearsInRetirement / (1 + expectedReturnRate/100);
console.log(`1. Simple PV (no growth): ${simplePV.toFixed(2)}`);

// Approach 2: What if they used pre-retirement return rate instead of post-retirement
// This would be unusual but let's check

// Approach 3: What if they calculated for 26 years instead of 25?
const yearsInRetirementAlt = 26;
const ratio = (1 + inflationRate/100) / (1 + expectedReturnRate/100);
const pvAlt = annualExpensesAtRetirement / (expectedReturnRate/100 - inflationRate/100) * (1 - Math.pow(ratio, yearsInRetirementAlt));
console.log(`3. PV with 26 years: ${pvAlt.toFixed(2)}`);

// Approach 4: What if they used a different inflation rate?
// Let's solve for what inflation rate would give us the benchmark
// This is complex to solve algebraically, so let's try some values
const testInflationRates = [5.5, 5.75, 6.25, 6.5];
console.log("\nTesting different inflation rates:");
testInflationRates.forEach(rate => {
  const futureExpenses = monthlyExpenses * Math.pow(1 + rate / 100, yearsUntilRetirement);
  const annualExpenses = futureExpenses * 12;
  const ratio = (1 + rate/100) / (1 + expectedReturnRate/100);
  const pv = annualExpenses / (expectedReturnRate/100 - rate/100) * (1 - Math.pow(ratio, yearsInRetirement));
  console.log(`  Inflation ${rate}%: Corpus = ${pv.toFixed(2)}`);
});

// Approach 5: What if they used a different expected return rate?
const testReturnRates = [14, 14.5, 15.5, 16];
console.log("\nTesting different return rates:");
testReturnRates.forEach(rate => {
  const ratio = (1 + inflationRate/100) / (1 + rate/100);
  const pv = annualExpensesAtRetirement / (rate/100 - inflationRate/100) * (1 - Math.pow(ratio, yearsInRetirement));
  console.log(`  Return ${rate}%: Corpus = ${pv.toFixed(2)}`);
});

// Approach 6: What if the benchmark used a different formula entirely?
// Some calculators use a withdrawal rate approach
// For example, 4% rule: Corpus = Annual Expenses / 0.04
const withdrawalRate = 0.04;
const corpusWithdrawal = annualExpensesAtRetirement / withdrawalRate;
console.log(`\n6. Withdrawal rate approach (4% rule): ${corpusWithdrawal.toFixed(2)}`);

// Approach 7: What if they're using a real rate of return?
// Real rate = (1 + nominal rate) / (1 + inflation) - 1
const realRate = (1 + expectedReturnRate/100) / (1 + inflationRate/100) - 1;
console.log(`\nReal rate of return: ${(realRate * 100).toFixed(2)}%`);

// Approach 8: Let's try to solve for what parameters would result in the benchmark values
console.log("\n=== SOLVING FOR BENCHMARK PARAMETERS ===");

// For the corpus, we know:
// 4805036.43 = 432424.49 / (0.15 - 0.06) * (1 - ((1.06)/(1.15))^25)
// Let's check our calculation again
const calculatedRatio = (1 + inflationRate/100) / (1 + expectedReturnRate/100);
const calculatedRatioPower = Math.pow(calculatedRatio, yearsInRetirement);
const calculatedNumerator = 1 - calculatedRatioPower;
const calculatedDenominator = expectedReturnRate/100 - inflationRate/100;
const calculatedCorpus = annualExpensesAtRetirement / calculatedDenominator * calculatedNumerator;
console.log(`Recalculated corpus: ${calculatedCorpus.toFixed(2)}`);

// Let's see what ratio would give us the benchmark corpus
// 4805036.43 = 432424.49 / 0.09 * (1 - ratio^25)
// 4805036.43 * 0.09 / 432424.49 = 1 - ratio^25
// ratio^25 = 1 - (4805036.43 * 0.09 / 432424.49)
const ratioCheck = 4805036.43 * 0.09 / 432424.49;
if (ratioCheck < 1) {
  const targetNumerator = 1 - ratioCheck;
  const targetRatio = Math.pow(targetNumerator, 1/25);
  const targetGrowthRate = (targetRatio * (1 + expectedReturnRate/100)) - 1;
  console.log(`Target ratio: ${targetRatio.toFixed(6)}`);
  console.log(`Implied inflation rate: ${(targetGrowthRate * 100).toFixed(2)}%`);
} else {
  console.log("Invalid ratio calculation - value exceeds 1");
}

// Let's also check the monthly savings calculation
// PMT = FV * r / [(1 + r)^n - 1]
// 2320.53 = 4805036.43 * 0.0125 / [(1.0125)^264 - 1]
// Let's check our calculation
const monthlyRate = expectedReturnRate / 100 / 12;
const months = yearsUntilRetirement * 12;
const base = 1 + monthlyRate;
const power = Math.pow(base, months);
const denom = power - 1;
const calculatedSavings = benchmarkCorpus * monthlyRate / denom;
console.log(`\nRecalculated savings with benchmark corpus: ${calculatedSavings.toFixed(2)}`);

// What corpus would give us the benchmark savings?
// 2320.53 = Corpus * 0.0125 / 25.563691
// Corpus = 2320.53 * 25.563691 / 0.0125
const targetCorpus = benchmarkSavings * denom / monthlyRate;
console.log(`Target corpus for benchmark savings: ${targetCorpus.toFixed(2)}`);

// Let's try to see if there's a rounding difference in intermediate calculations
console.log("\n=== CHECKING ROUNDING DIFFERENCES ===");
const preciseAnnualExpenses = 36035.37 * 12; // Using the exact value from earlier
const preciseCorpus = preciseAnnualExpenses / (expectedReturnRate/100 - inflationRate/100) * (1 - Math.pow((1 + inflationRate/100) / (1 + expectedReturnRate/100), yearsInRetirement));
console.log(`Using precise annual expenses (36035.37 * 12): ${preciseCorpus.toFixed(2)}`);

// Let's also check if they might be using a different compounding approach
console.log("\n=== CHECKING DIFFERENT COMPOUNDING APPROACHES ===");
// Continuous compounding approach for the corpus calculation
const continuousGrowth = Math.exp(inflationRate/100 * yearsUntilRetirement);
const continuousFutureExpenses = monthlyExpenses * continuousGrowth;
const continuousAnnualExpenses = continuousFutureExpenses * 12;
const continuousRatio = Math.exp((inflationRate - expectedReturnRate)/100 * yearsInRetirement);
const continuousCorpus = continuousAnnualExpenses / (expectedReturnRate/100 - inflationRate/100) * (1 - continuousRatio);
console.log(`Continuous compounding corpus: ${continuousCorpus.toFixed(2)}`);