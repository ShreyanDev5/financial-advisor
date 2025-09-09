// Final validation script to confirm updated calculations match benchmark
function calculateRetirement(input) {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    monthlyExpenses,
    inflationRate,
    expectedReturnRate
  } = input;

  // Calculate years until retirement
  const yearsUntilRetirement = retirementAge - currentAge;
  
  // Calculate years in retirement
  const yearsInRetirement = lifeExpectancy - retirementAge;
  
  // Calculate future monthly expenses at retirement (considering inflation)
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsUntilRetirement);
  
  // Calculate annual expenses at retirement
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12;
  
  // Calculate retirement corpus needed using the present value of a growing annuity due formula
  // This accounts for expenses growing at the inflation rate during retirement
  // PV = PMT / (r - g) * [1 - ((1 + g) / (1 + r))^n] * (1 + r)
  // Where PMT = initial annual expenses, r = return rate, g = growth rate, n = years
  // The (1 + r) factor accounts for withdrawals at the beginning of each period (annuity due)
  const growthRate = inflationRate / 100; // Growth rate of expenses during retirement (inflation)
  const discountRate = expectedReturnRate / 100; // Discount rate (expected return)
  
  let retirementCorpus;
  if (Math.abs(discountRate - growthRate) < 0.0001) {
    // If rates are nearly equal, use the simplified formula to avoid division by zero
    retirementCorpus = annualExpensesAtRetirement * yearsInRetirement;
  } else {
    // Present value of growing annuity due formula (payments at beginning of period)
    retirementCorpus = annualExpensesAtRetirement / (discountRate - growthRate) * 
      (1 - Math.pow((1 + growthRate) / (1 + discountRate), yearsInRetirement)) * (1 + discountRate);
  }
  
  // Calculate monthly savings required to reach corpus
  // Using future value of annuity due formula: PMT = FV * r / [((1 + r)^n - 1) * (1 + r)]
  // This accounts for savings at the beginning of each period (annuity due)
  const monthlyRate = expectedReturnRate / 100 / 12;
  const numberOfMonths = yearsUntilRetirement * 12;
  
  let monthlySavingsRequired;
  if (monthlyRate === 0) {
    // If expected return is 0, simple division
    monthlySavingsRequired = retirementCorpus / numberOfMonths;
  } else {
    // Future value of annuity due formula (payments at beginning of period)
    monthlySavingsRequired = retirementCorpus * monthlyRate / ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) * (1 + monthlyRate));
  }
  
  return {
    retirementCorpus,
    monthlySavingsRequired,
    yearsUntilRetirement,
    yearsInRetirement,
    futureMonthlyExpenses
  };
}

// Test case from the problem
const testCase = {
  currentAge: 23,
  retirementAge: 45,
  lifeExpectancy: 70,
  monthlyExpenses: 10000,
  inflationRate: 6,
  expectedReturnRate: 15
};

console.log("Input Parameters:");
console.log(`Current Age: ${testCase.currentAge}`);
console.log(`Retirement Age: ${testCase.retirementAge}`);
console.log(`Life Expectancy: ${testCase.lifeExpectancy}`);
console.log(`Current Monthly Expenses (₹): ${testCase.monthlyExpenses.toLocaleString('en-IN')}`);
console.log(`Expected Inflation Rate (% p.a.): ${testCase.inflationRate}`);
console.log(`Expected Rate of Return (% p.a.): ${testCase.expectedReturnRate}`);

console.log("\nUpdated Output:");
const results = calculateRetirement(testCase);
console.log(`Retirement Corpus Needed: ₹${results.retirementCorpus.toFixed(2)}`);
console.log(`Monthly Savings Required: ₹${results.monthlySavingsRequired.toFixed(2)}`);

console.log("\nIndustry Benchmark Output:");
console.log("Retirement Corpus Needed: ₹ 48,05,036.43 (48.05 Lakhs)");
console.log("Monthly Savings Required: ₹ 2,320.53 (2.32 Thousands)");

console.log("\nDifference:");
const corpusDifference = 4805036.43 - results.retirementCorpus;
const savingsDifference = 2320.53 - results.monthlySavingsRequired;
console.log(`Retirement Corpus Difference: ₹${corpusDifference.toFixed(2)}`);
console.log(`Monthly Savings Difference: ₹${savingsDifference.toFixed(2)}`);

// Check if we've matched the benchmark
if (Math.abs(corpusDifference) < 1 && Math.abs(savingsDifference) < 1) {
  console.log("\n✅ SUCCESS: Calculations now match industry benchmark!");
} else {
  console.log("\n❌ MISMATCH: Calculations do not match industry benchmark.");
}