// Test script to validate different approaches for monthly savings calculation
function calculateRetirementWithDifferentSavings(input) {
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
  const monthlyRate = expectedReturnRate / 100 / 12;
  const numberOfMonths = yearsUntilRetirement * 12;
  
  // Test different approaches for monthly savings
  console.log("Testing different approaches for monthly savings:");
  
  // 1. Future value of ordinary annuity (current approach)
  let monthlySavingsOrdinary;
  if (monthlyRate === 0) {
    monthlySavingsOrdinary = retirementCorpus / numberOfMonths;
  } else {
    monthlySavingsOrdinary = retirementCorpus * monthlyRate / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  }
  console.log(`1. Ordinary annuity: ₹${monthlySavingsOrdinary.toFixed(2)}`);
  
  // 2. Future value of annuity due (payments at beginning of period)
  let monthlySavingsDue;
  if (monthlyRate === 0) {
    monthlySavingsDue = retirementCorpus / numberOfMonths;
  } else {
    monthlySavingsDue = retirementCorpus * monthlyRate / ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) * (1 + monthlyRate));
  }
  console.log(`2. Annuity due: ₹${monthlySavingsDue.toFixed(2)}`);
  
  // 3. What if we use a slightly different rate?
  // Let's try to solve for what monthly savings would give us the benchmark
  const benchmarkSavings = 2320.53;
  // FV = PMT * [((1 + r)^n - 1) / r]
  // PMT = FV / [((1 + r)^n - 1) / r]
  const futureValueFactor = (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate;
  const requiredSavings = retirementCorpus / futureValueFactor;
  console.log(`3. Required savings for benchmark corpus: ₹${requiredSavings.toFixed(2)}`);
  
  // 4. What corpus would give us the benchmark savings with ordinary annuity?
  const corpusForBenchmark = benchmarkSavings * (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate;
  console.log(`4. Corpus for benchmark savings (ordinary): ₹${corpusForBenchmark.toFixed(2)}`);
  
  // 5. What corpus would give us the benchmark savings with annuity due?
  const corpusForBenchmarkDue = benchmarkSavings * (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate * (1 + monthlyRate);
  console.log(`5. Corpus for benchmark savings (due): ₹${corpusForBenchmarkDue.toFixed(2)}`);
  
  return {
    retirementCorpus,
    monthlySavingsOrdinary,
    monthlySavingsDue,
    requiredSavings,
    corpusForBenchmark,
    corpusForBenchmarkDue
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

calculateRetirementWithDifferentSavings(testCase);