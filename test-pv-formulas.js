// Script to test different interpretations of the present value of growing annuity formula
function testPVFormulas() {
  const annualExpenses = 432424.49; // Annual expenses at retirement
  const inflationRate = 0.06; // 6%
  const returnRate = 0.15; // 15%
  const yearsInRetirement = 25;
  
  console.log("Testing different interpretations of PV of growing annuity formula:\n");
  
  // Standard formula (used in current implementation)
  const ratio1 = (1 + inflationRate) / (1 + returnRate);
  const pv1 = annualExpenses / (returnRate - inflationRate) * (1 - Math.pow(ratio1, yearsInRetirement));
  console.log(`1. Standard formula: ${pv1.toFixed(2)}`);
  
  // What if we use (1+g)/(1+r) in the denominator?
  const ratio2 = (1 + inflationRate) / (1 + returnRate);
  const pv2 = annualExpenses * (1 - Math.pow(ratio2, yearsInRetirement)) / (returnRate - inflationRate);
  console.log(`2. Rearranged formula: ${pv2.toFixed(2)}`);
  
  // What if we use a different interpretation of the timing?
  // Beginning of period vs end of period
  const pv3 = annualExpenses / (returnRate - inflationRate) * (1 - Math.pow(ratio1, yearsInRetirement)) * (1 + returnRate);
  console.log(`3. Beginning of period (annuity due): ${pv3.toFixed(2)}`);
  
  // What if we use a different compounding frequency?
  // Annual vs continuous
  const continuousRatio = Math.exp((inflationRate - returnRate) * yearsInRetirement);
  const pv4 = annualExpenses / (returnRate - inflationRate) * (1 - continuousRatio);
  console.log(`4. Continuous compounding: ${pv4.toFixed(2)}`);
  
  // What if we use a real rate approach?
  const realRate = (returnRate - inflationRate) / (1 + inflationRate);
  const pv5 = annualExpenses / realRate * (1 - Math.pow(1 + realRate, -yearsInRetirement));
  console.log(`5. Real rate approach: ${pv5.toFixed(2)}`);
  
  // What if we approximate using a simpler formula?
  // Some calculators use a rule of thumb
  const avgWithdrawalRate = (returnRate - inflationRate);
  const pv6 = annualExpenses / avgWithdrawalRate;
  console.log(`6. Simple withdrawal rate: ${pv6.toFixed(2)}`);
  
  // What if we consider that the first withdrawal happens immediately?
  const immediateWithdrawal = annualExpenses;
  const remainingPV = annualExpenses / (returnRate - inflationRate) * (1 - Math.pow(ratio1, yearsInRetirement - 1));
  const pv7 = immediateWithdrawal + remainingPV;
  console.log(`7. Immediate first withdrawal: ${pv7.toFixed(2)}`);
  
  // Let's try to work backward from the benchmark
  const benchmarkCorpus = 4805036.43;
  // If PV = PMT / (r-g) * [1 - ((1+g)/(1+r))^n]
  // Then [1 - ((1+g)/(1+r))^n] = PV * (r-g) / PMT
  const numeratorTarget = 1 - (benchmarkCorpus * (returnRate - inflationRate) / annualExpenses);
  const ratioTarget = Math.pow(numeratorTarget, 1/yearsInRetirement);
  const growthRateTarget = ratioTarget * (1 + returnRate) - 1;
  console.log(`\nTo match benchmark corpus:`);
  console.log(`  Required ratio: ${ratioTarget.toFixed(6)}`);
  console.log(`  Implied inflation rate: ${(growthRateTarget * 100).toFixed(2)}%`);
  
  // What if the benchmark uses a different time period?
  // Let's solve for the number of years that would give us the benchmark
  // [1 - ((1+g)/(1+r))^n] = PV * (r-g) / PMT
  // ((1+g)/(1+r))^n = 1 - PV * (r-g) / PMT
  // n * ln((1+g)/(1+r)) = ln(1 - PV * (r-g) / PMT)
  // n = ln(1 - PV * (r-g) / PMT) / ln((1+g)/(1+r))
  const logNumerator = Math.log(1 - (benchmarkCorpus * (returnRate - inflationRate) / annualExpenses));
  const logDenominator = Math.log((1 + inflationRate) / (1 + returnRate));
  const yearsTarget = logNumerator / logDenominator;
  console.log(`  Implied years in retirement: ${yearsTarget.toFixed(2)}`);
  
  // What if the benchmark uses a different return rate?
  // Let's solve for the return rate that would give us the benchmark
  // This is more complex, so let's try some values
  console.log(`\nTesting return rates to match benchmark:`);
  const testRates = [0.14, 0.145, 0.155, 0.16];
  testRates.forEach(rate => {
    const ratio = (1 + inflationRate) / (1 + rate);
    const pv = annualExpenses / (rate - inflationRate) * (1 - Math.pow(ratio, yearsInRetirement));
    console.log(`  Return rate ${rate*100}%: Corpus = ${pv.toFixed(2)}`);
  });
  
  // What if the benchmark uses a different inflation rate?
  console.log(`\nTesting inflation rates to match benchmark:`);
  const testInflation = [0.055, 0.0575, 0.0625, 0.065];
  testInflation.forEach(rate => {
    const ratio = (1 + rate) / (1 + returnRate);
    const annualExp = 10000 * Math.pow(1 + rate, 22) * 12;
    const pv = annualExp / (returnRate - rate) * (1 - Math.pow(ratio, yearsInRetirement));
    console.log(`  Inflation rate ${rate*100}%: Corpus = ${pv.toFixed(2)}`);
  });
}

testPVFormulas();