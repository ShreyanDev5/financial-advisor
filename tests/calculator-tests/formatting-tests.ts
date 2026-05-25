import assert from "node:assert/strict";

import { formatLargeNumber } from "../../lib/format-large-number";

type FormatCase = {
  input: number | string | null | undefined;
  expected: string;
};

const formatCases: FormatCase[] = [
  { input: 0, expected: "₹0" },
  { input: 500, expected: "₹500" },
  { input: 1000, expected: "₹1,000" },
  { input: 10000, expected: "₹10,000" },
  { input: 100000, expected: "₹1,00,000" },
  { input: 1000000, expected: "₹10,00,000" },
  { input: 1234567890, expected: "₹1,23,45,67,890" },
  { input: -5000, expected: "-₹5,000" },
  { input: "987654", expected: "₹9,87,654" },
  { input: null, expected: "₹0" },
  { input: undefined, expected: "₹0" },
  { input: "not-a-number", expected: "₹0" },
];

export function runFormattingTests(): void {
  for (const testCase of formatCases) {
    const value = formatLargeNumber(testCase.input);
    assert.equal(
      value,
      testCase.expected,
      `formatLargeNumber(${String(testCase.input)}) should be ${testCase.expected}`,
    );
  }
}

if (process.argv[1] && (process.argv[1].endsWith('formatting-tests.ts') || process.argv[1].endsWith('formatting-tests.js'))) {
  runFormattingTests();
  console.log("Formatting tests passed successfully.");
}