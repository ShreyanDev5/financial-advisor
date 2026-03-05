/**
 * Financial Calculator Utility Functions
 * 
 * Standard formulas for SIP, Lumpsum, and SWP calculations.
 * All interest rates should be passed as annual percentage (e.g., 12 for 12%).
 */

export interface CalculationResult {
  totalInvested: number;
  wealthGained: number;
  futureValue: number;
}

export interface SWPResult extends CalculationResult {
  totalWithdrawn: number;
  finalBalance: number;
}

export interface EducationPlanResult {
  projectedCost: number;
  monthlyInvestment: number;
  yearsUntilEducation: number;
  shortfall: number;
}

/**
 * Calculate Future Value for SIP (Systematic Investment Plan)
 * Formula: FV = P * ({[1 + i]^n - 1} / i) * (1 + i)  <-- for payment at beginning of period
 * OR:      FV = P * ({[1 + i]^n - 1} / i)            <-- for payment at end of period
 * 
 * We use the "payment at end of period" variation (Ordinary Annuity) as it's the standard for most online calculators,
 * BUT some Indian SIP calculators use "Annuity Due" (beginning of period).
 * 
 * To match standard industry results (like Groww/ETMoney), we often see variants.
 * We will use the standard Monthly Compounding formula.
 */
export function calculateSIP(
  monthlyInvestment: number,
  expectedReturnRate: number,
  years: number
): CalculationResult {
  if (monthlyInvestment <= 0 || years <= 0) {
    return { totalInvested: 0, wealthGained: 0, futureValue: 0 };
  }

  const monthlyRate = expectedReturnRate / 100 / 12;
  const months = years * 12;
  const totalInvested = monthlyInvestment * months;

  // Zero interest case
  if (expectedReturnRate === 0) {
    return { totalInvested, wealthGained: 0, futureValue: totalInvested };
  }

  // Future Value of Annuity Due (Standard for SIPs in India often assumes investment at start of month)
  // FV = P * [ (1+r)^n - 1 ] * (1+r) / r
  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate) / monthlyRate);

  const wealthGained = futureValue - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    wealthGained: Math.round(wealthGained),
    futureValue: Math.round(futureValue),
  };
}

/**
 * Calculate Lumpsum Returns
 * Formula: FV = P * (1 + r)^n
 */
export function calculateLumpsum(
  totalInvestment: number,
  expectedReturnRate: number,
  years: number
): CalculationResult {
  if (totalInvestment <= 0 || years <= 0) {
    return { totalInvested: 0, wealthGained: 0, futureValue: 0 };
  }

  const annualRateDecimal = expectedReturnRate / 100;

  // Compound Interest Formula
  const futureValue = totalInvestment * Math.pow(1 + annualRateDecimal, years);
  const wealthGained = futureValue - totalInvestment;

  return {
    totalInvested: Math.round(totalInvestment),
    wealthGained: Math.round(wealthGained),
    futureValue: Math.round(futureValue),
  };
}

/**
 * Calculate SWP (Systematic Withdrawal Plan)
 * We iteratively calculate the balance month by month to be precise.
 * Typically assumes withdrawal at the beginning of the month.
 */
export function calculateSWP(
  principal: number,
  monthlyWithdrawal: number,
  expectedReturnRate: number,
  years: number
): SWPResult {
  if (principal <= 0) {
    return { totalInvested: 0, totalWithdrawn: 0, finalBalance: 0, wealthGained: 0, futureValue: 0 };
  }

  const monthlyRate = expectedReturnRate / 100 / 12;
  const months = years * 12;

  let balance = principal;
  let totalWithdrawn = 0;

  for (let i = 0; i < months; i++) {
    // Withdrawal at beginning of month
    balance -= monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;

    // If balance goes negative, stop
    if (balance < 0) {
      balance = 0;
      break;
    }

    // Interest at end of month
    balance += balance * monthlyRate;
  }

  // Total Value = Final Balance + Total Withdrawn
  // Wealth Gained = (Final Balance + Total Withdrawn) - Initial Investment
  const totalValue = balance + totalWithdrawn;
  const wealthGained = totalValue - principal;

  return {
    totalInvested: Math.round(principal),
    totalWithdrawn: Math.round(totalWithdrawn),
    finalBalance: Math.round(balance),
    wealthGained: Math.round(wealthGained),
    // For SWP, 'futureValue' is ambiguous, but usually refers to remaining balance
    futureValue: Math.round(balance)
  };
}

/**
 * Calculate Education Plan (SIP based target)
 */
export function calculateEducationPlan(
  currentCost: number,
  inflationRate: number,
  yearsUntilEducation: number,
  currentSavings: number,
  expectedReturnRate: number
): EducationPlanResult {

  // 1. Projected Cost = Current Cost * (1 + inflation)^years
  const projectedCost = currentCost * Math.pow(1 + inflationRate / 100, yearsUntilEducation);

  // 2. Future Value of Current Savings
  const savingsFV = calculateLumpsum(currentSavings, expectedReturnRate, yearsUntilEducation).futureValue;

  // 3. Shortfall
  const shortfall = Math.max(0, projectedCost - savingsFV);

  if (shortfall === 0) {
    return { projectedCost, monthlyInvestment: 0, yearsUntilEducation, shortfall: 0 };
  }

  // 4. Monthly Investment Needed (classic Target SIP formula)
  // We reuse the SIP logic reverse equation:
  // FutureValue = P * [ (1+r)^n - 1 ] * (1+r) / r
  // P = FutureValue * r / ( [ (1+r)^n - 1 ] * (1+r) )

  const monthlyRate = expectedReturnRate / 100 / 12;
  const months = yearsUntilEducation * 12;

  let monthlyInvestment = 0;
  if (expectedReturnRate === 0) {
    monthlyInvestment = shortfall / months;
  } else {
    const numerator = shortfall * monthlyRate;
    const denominator = (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate);
    monthlyInvestment = numerator / denominator;
  }

  return {
    projectedCost: Math.round(projectedCost),
    monthlyInvestment: Math.round(monthlyInvestment),
    yearsUntilEducation,
    shortfall: Math.round(shortfall)
  };
}

export interface RetirementPlanResult {
  retirementCorpus: number;
  monthlySavingsRequired: number;
  yearsUntilRetirement: number;
  yearsInRetirement: number;
  futureMonthlyExpenses: number;
}

export function calculateRetirementPlan(
  currentAge: number,
  retirementAge: number,
  lifeExpectancy: number,
  monthlyExpenses: number,
  inflationRate: number,
  expectedReturnRate: number
): RetirementPlanResult {
  const yearsUntilRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  // Calculate future monthly expenses at retirement (considering inflation)
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsUntilRetirement);

  // Calculate annual expenses at retirement
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12;

  const growthRate = inflationRate / 100;
  const discountRate = expectedReturnRate / 100;

  let retirementCorpus: number;
  if (Math.abs(discountRate - growthRate) < 0.0001) {
    retirementCorpus = annualExpensesAtRetirement * yearsInRetirement;
  } else {
    // Present value of growing annuity due formula
    retirementCorpus = annualExpensesAtRetirement / (discountRate - growthRate) *
      (1 - Math.pow((1 + growthRate) / (1 + discountRate), yearsInRetirement)) * (1 + discountRate);
  }

  // Calculate monthly savings required (Annuity Due: payments at beginning)
  const monthlyRate = expectedReturnRate / 100 / 12;
  const numberOfMonths = yearsUntilRetirement * 12;

  let monthlySavingsRequired: number;
  if (monthlyRate === 0) {
    monthlySavingsRequired = retirementCorpus / numberOfMonths;
  } else {
    monthlySavingsRequired = retirementCorpus * monthlyRate /
      ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) * (1 + monthlyRate));
  }

  return {
    retirementCorpus: Math.round(retirementCorpus),
    monthlySavingsRequired: Math.round(monthlySavingsRequired),
    yearsUntilRetirement,
    yearsInRetirement,
    futureMonthlyExpenses: Math.round(futureMonthlyExpenses)
  };
}

export interface MarriagePlanResult {
  futureCostOfMarriage: number;
  sipInvestment: number;
  lumpSumInvestment: number;
  yearsUntilMarriage: number;
}

export function calculateMarriagePlan(
  childCurrentAge: number,
  marriageAge: number,
  estimatedExpenditure: number,
  inflationRate: number,
  amountSaved: number,
  expectedReturnRate: number
): MarriagePlanResult {
  const yearsUntilMarriage = marriageAge - childCurrentAge;

  // Calculate future cost of marriage with inflation
  const futureCostOfMarriage = estimatedExpenditure * Math.pow(1 + inflationRate / 100, yearsUntilMarriage);

  // Calculate future value of amount already saved
  const futureValueOfSavings = amountSaved * Math.pow(1 + expectedReturnRate / 100, yearsUntilMarriage);

  // Calculate shortfall
  const shortfall = futureCostOfMarriage - futureValueOfSavings;

  if (shortfall <= 0) {
    return {
      futureCostOfMarriage: Math.round(futureCostOfMarriage),
      sipInvestment: 0,
      lumpSumInvestment: 0,
      yearsUntilMarriage
    };
  }

  // Calculate SIP (Ordinary Annuity)
  const monthlyRate = expectedReturnRate / 100 / 12;
  const numberOfMonths = yearsUntilMarriage * 12;

  let sipInvestment: number;
  if (monthlyRate === 0) {
    sipInvestment = shortfall / numberOfMonths;
  } else {
    sipInvestment = shortfall * monthlyRate / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  }

  // Calculate Lumpsum
  const lumpSumInvestment = shortfall / Math.pow(1 + expectedReturnRate / 100, yearsUntilMarriage);

  return {
    futureCostOfMarriage: Math.round(futureCostOfMarriage),
    sipInvestment: Math.round(sipInvestment),
    lumpSumInvestment: Math.round(lumpSumInvestment),
    yearsUntilMarriage
  };
}
