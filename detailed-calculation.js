// Detailed test script to break down retirement calculator calculations step by step
function detailedCalculation(input) {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    monthlyExpenses,
    inflationRate,
    expectedReturnRate
  } = input;

  console.log("=== STEP-BY-STEP CALCULATION BREAKDOWN ===");
  
  // Step 1: Calculate years until retirement
  const yearsUntilRetirement = retirementAge - currentAge;
  console.log(`1. Years until retirement: ${retirementAge} - ${currentAge} = ${yearsUntilRetirement} years`);
  
  // Step 2: Calculate years in retirement
  const yearsInRetirement = lifeExpectancy - retirementAge;
  console.log(`2. Years in retirement: ${lifeExpectancy} - ${retirementAge} = ${yearsInRetirement} years`);
  
  // Step 3: Calculate future monthly expenses at retirement (considering inflation)
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsUntilRetirement);
  console.log(`3. Future monthly expenses at retirement:`);
  console.log(`   ${monthlyExpenses} × (1 + ${inflationRate}/100)^${yearsUntilRetirement}`);
  console.log(`   ${monthlyExpenses} × ${(Math.pow(1 + inflationRate / 100, yearsUntilRetirement)).toFixed(6)}`);
  console.log(`   = ${futureMonthlyExpenses.toFixed(2)}`);
  
  // Step 4: Calculate annual expenses at retirement
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12;
  console.log(`4. Annual expenses at retirement: ${futureMonthlyExpenses.toFixed(2)} × 12 = ${annualExpensesAtRetirement.toFixed(2)}`);
  
  // Step 5: Calculate retirement corpus needed
  const growthRate = inflationRate / 100;
  const discountRate = expectedReturnRate / 100;
  
  console.log(`5. Retirement corpus calculation:`);
  console.log(`   Growth rate (inflation): ${inflationRate}% = ${growthRate}`);
  console.log(`   Discount rate (return): ${expectedReturnRate}% = ${discountRate}`);
  
  let retirementCorpus;
  if (Math.abs(discountRate - growthRate) < 0.0001) {
    // If rates are nearly equal, use the simplified formula
    retirementCorpus = annualExpensesAtRetirement * yearsInRetirement / (1 + discountRate);
    console.log(`   Rates are nearly equal, using simplified formula:`);
    console.log(`   ${annualExpensesAtRetirement.toFixed(2)} × ${yearsInRetirement} / (1 + ${discountRate})`);
    console.log(`   = ${retirementCorpus.toFixed(2)}`);
  } else {
    // Present value of growing annuity formula
    const ratio = (1 + growthRate) / (1 + discountRate);
    const ratioPower = Math.pow(ratio, yearsInRetirement);
    const numerator = 1 - ratioPower;
    const denominator = discountRate - growthRate;
    retirementCorpus = annualExpensesAtRetirement / denominator * numerator;
    
    console.log(`   Using present value of growing annuity formula:`);
    console.log(`   Ratio: (1 + ${growthRate}) / (1 + ${discountRate}) = ${ratio.toFixed(6)}`);
    console.log(`   Ratio^${yearsInRetirement}: ${ratio.toFixed(6)}^${yearsInRetirement} = ${ratioPower.toFixed(6)}`);
    console.log(`   Numerator: 1 - ${ratioPower.toFixed(6)} = ${numerator.toFixed(6)}`);
    console.log(`   Denominator: ${discountRate} - ${growthRate} = ${denominator.toFixed(6)}`);
    console.log(`   ${annualExpensesAtRetirement.toFixed(2)} / ${denominator.toFixed(6)} × ${numerator.toFixed(6)}`);
    console.log(`   = ${retirementCorpus.toFixed(2)}`);
  }
  
  // Step 6: Calculate monthly savings required
  const monthlyRate = expectedReturnRate / 100 / 12;
  const numberOfMonths = yearsUntilRetirement * 12;
  
  console.log(`6. Monthly savings required:`);
  console.log(`   Monthly rate: ${expectedReturnRate}% / 12 = ${monthlyRate.toFixed(6)}`);
  console.log(`   Number of months: ${yearsUntilRetirement} × 12 = ${numberOfMonths}`);
  
  let monthlySavingsRequired;
  if (monthlyRate === 0) {
    monthlySavingsRequired = retirementCorpus / numberOfMonths;
    console.log(`   Monthly rate is 0, using simple division:`);
    console.log(`   ${retirementCorpus.toFixed(2)} / ${numberOfMonths} = ${monthlySavingsRequired.toFixed(2)}`);
  } else {
    const base = 1 + monthlyRate;
    const power = Math.pow(base, numberOfMonths);
    const denominator = power - 1;
    monthlySavingsRequired = retirementCorpus * monthlyRate / denominator;
    
    console.log(`   Using future value of ordinary annuity formula:`);
    console.log(`   Base: 1 + ${monthlyRate.toFixed(6)} = ${base.toFixed(6)}`);
    console.log(`   Base^${numberOfMonths}: ${base.toFixed(6)}^${numberOfMonths} = ${power.toFixed(6)}`);
    console.log(`   Denominator: ${power.toFixed(6)} - 1 = ${denominator.toFixed(6)}`);
    console.log(`   ${retirementCorpus.toFixed(2)} × ${monthlyRate.toFixed(6)} / ${denominator.toFixed(6)}`);
    console.log(`   = ${monthlySavingsRequired.toFixed(2)}`);
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
console.log(`Expected Rate of Return (% p.a.): ${testCase.expectedReturnRate}\n`);

const results = detailedCalculation(testCase);

console.log(`\n=== FINAL RESULTS ===`);
console.log(`Retirement Corpus Needed: ₹${Math.round(results.retirementCorpus).toLocaleString('en-IN')}`);
console.log(`Monthly Savings Required: ₹${Math.round(results.monthlySavingsRequired).toLocaleString('en-IN')}`);