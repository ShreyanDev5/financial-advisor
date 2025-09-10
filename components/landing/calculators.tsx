'use client';

import { useState } from "react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestmentCalculator from "@/components/landing/investment-calculator";
import { ChildEducationCalculatorWithToggle } from "@/components/landing/child-education-calculator";
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
        <div className="text-center px-2 sm:px-0 mb-6">
          <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-gray-900 dark:text-white">
            Children Education Planner
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-5 sm:leading-7 text-gray-600 dark:text-gray-300">
            Plan your child&apos;s education expenses and calculate monthly savings needed.
          </p>
        </div>
        <div className="flex justify-center px-2 sm:px-0">
          <ChildEducationCalculatorWithToggle />
        </div>
      </div>

      {/* Gray divider to separate sections */}
      <div className="sm:max-w-5xl sm:mx-auto my-2">
        <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Income Planning Calculator */}
      <div id="income-planning-calculator" className="scroll-mt-28 sm:scroll-mt-32">
        <div className="text-center px-2 sm:px-0 mb-6">
          <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-gray-900 dark:text-white">
            Retirement Planning
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-5 sm:leading-7 text-gray-600 dark:text-gray-300">
            Secure your future—estimate the investment needed with our Retirement Planning Assistant.
          </p>
        </div>
        <IncomePlanningCalculator />
      </div>

      {/* Gray divider to separate sections */}
      <div className="sm:max-w-5xl sm:mx-auto my-2">
        <div className="h-px w-3/4 sm:w-2/3 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Marriage Expense Planner */}
      <div id="child-marriage-calculator" className="scroll-mt-28 sm:scroll-mt-32">
        <div className="text-center px-2 sm:px-0 mb-6">
          <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-gray-900 dark:text-white">
            Marriage Expense Planner
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-5 sm:leading-7 text-gray-600 dark:text-gray-300">
            Plan your child&#39;s future wedding expenses with our specialized calculator.
          </p>
        </div>
        <ChildMarriageCalculator />
      </div>
    </div>
  );
}