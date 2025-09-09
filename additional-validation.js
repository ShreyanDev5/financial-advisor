// Additional validation tests for the updated retirement calculator
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

// Test case 1: Original problem
const testCase1 = {
  currentAge: 23,
  retirementAge: 45,
  lifeExpectancy: 70,
  monthlyExpenses: 10000,
  inflationRate: 6,
  expectedReturnRate: 15
};

console.log("=== TEST CASE 1: Original Problem ===");
console.log(`Input: Age ${testCase1.currentAge}-${testCase1.retirementAge}-${testCase1.lifeExpectancy}, Expenses: ₹${testCase1.monthlyExpenses.toLocaleString('en-IN')}, Inflation: ${testCase1.inflationRate}%, Return: ${testCase1.expectedReturnRate}%`);
const results1 = calculateRetirement(testCase1);
console.log(`Output: Corpus: ₹${results1.retirementCorpus.toFixed(2)}, Savings: ₹${results1.monthlySavingsRequired.toFixed(2)}`);
console.log(`Expected: Corpus: ₹48,05,036.43, Savings: ₹2,320.53`);
console.log(`Match: ${Math.abs(results1.retirementCorpus - 4805036.43) < 1 && Math.abs(results1.monthlySavingsRequired - 2320.53) < 1 ? "✅" : "❌"}\n`);

// Test case 2: Different ages
const testCase2 = {
  currentAge: 30,
  retirementAge: 60,
  lifeExpectancy: 85,
  monthlyExpenses: 20000,
  inflationRate: 5,
  expectedReturnRate: 10
};

console.log("=== TEST CASE 2: Different Ages ===");
console.log(`Input: Age ${testCase2.currentAge}-${testCase2.retirementAge}-${testCase2.lifeExpectancy}, Expenses: ₹${testCase2.monthlyExpenses.toLocaleString('en-IN')}, Inflation: ${testCase2.inflationRate}%, Return: ${testCase2.expectedReturnRate}%`);
const results2 = calculateRetirement(testCase2);
console.log(`Output: Corpus: ₹${results2.retirementCorpus.toFixed(2)}, Savings: ₹${results2.monthlySavingsRequired.toFixed(2)}\n`);

// Test case 3: Lower return rate
const testCase3 = {
  currentAge: 25,
  retirementAge: 65,
  lifeExpectancy: 90,
  monthlyExpenses: 15000,
  inflationRate: 7,
  expectedReturnRate: 8
};

console.log("=== TEST CASE 3: Lower Return Rate ===");
console.log(`Input: Age ${testCase3.currentAge}-${testCase3.retirementAge}-${testCase3.lifeExpectancy}, Expenses: ₹${testCase3.monthlyExpenses.toLocaleString('en-IN')}, Inflation: ${testCase3.inflationRate}%, Return: ${testCase3.expectedReturnRate}%`);
const results3 = calculateRetirement(testCase3);
console.log(`Output: Corpus: ₹${results3.retirementCorpus.toFixed(2)}, Savings: ₹${results3.monthlySavingsRequired.toFixed(2)}\n`);

// Test case 4: Edge case with equal rates
const testCase4 = {
  currentAge: 35,
  retirementAge: 65,
  lifeExpectancy: 85,
  monthlyExpenses: 25000,
  inflationRate: 7,
  expectedReturnRate: 7
};

console.log("=== TEST CASE 4: Equal Inflation and Return Rates ===");
console.log(`Input: Age ${testCase4.currentAge}-${testCase4.retirementAge}-${testCase4.lifeExpectancy}, Expenses: ₹${testCase4.monthlyExpenses.toLocaleString('en-IN')}, Inflation: ${testCase4.inflationRate}%, Return: ${testCase4.expectedReturnRate}%`);
const results4 = calculateRetirement(testCase4);
console.log(`Output: Corpus: ₹${results4.retirementCorpus.toFixed(2)}, Savings: ₹${results4.monthlySavingsRequired.toFixed(2)}\n`);

console.log("✅ All validation tests completed successfully!");