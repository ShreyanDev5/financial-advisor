'use client';

import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestmentCalculator from "@/components/landing/investment-calculator";
import ChildEducationCalculator from "@/components/landing/child-education-calculator";
import ChildMarriageCalculator from "@/components/landing/child-marriage-calculator";
import IncomePlanningCalculator from "@/components/landing/income-planning-calculator";

export default function CalculatorsContent() {
  return (
    <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
      <SimplePageHeader 
        title="Financial Calculators" 
        description="Estimate your returns and plan your financial future with our easy-to-use calculators."
        className="mb-0 [&>h1]:text-4xl sm:[&>h1]:text-6xl" 
        color="from-teal-500 to-emerald-500" 
      />

      {/* Gray divider to separate sections */}
      <div className="sm:max-w-5xl sm:mx-auto my-2">
        <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Investment Calculator */}
      <div id="investment-calculator" className="scroll-mt-28 sm:scroll-mt-32">
        <InvestmentCalculator />
      </div>

      {/* Gray divider to separate sections */}
      <div className="sm:max-w-5xl sm:mx-auto my-2">
        <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Child Education Calculator */}
      <div id="child-education-calculator" className="scroll-mt-28 sm:scroll-mt-32">
        <ChildEducationCalculator />
      </div>

      {/* Gray divider to separate sections */}
      <div className="sm:max-w-5xl sm:mx-auto my-2">
        <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Income Planning Calculator */}
      <div id="income-planning-calculator" className="scroll-mt-28 sm:scroll-mt-32">
        <IncomePlanningCalculator />
      </div>

      {/* Gray divider to separate sections */}
      <div className="sm:max-w-5xl sm:mx-auto my-2">
        <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Child Marriage Calculator */}
      <div id="child-marriage-calculator" className="scroll-mt-28 sm:scroll-mt-32">
        <ChildMarriageCalculator />
      </div>
    </div>
  );
}