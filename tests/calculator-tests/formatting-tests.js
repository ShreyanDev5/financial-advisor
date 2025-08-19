// Test file for formatLargeNumber function
// Run with: node tests/format-number-tests.js

// Copy the formatLargeNumber function
function formatLargeNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return "₹0";
  
  // Handle negative values
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  
  // Round down to nearest integer
  const roundedValue = Math.floor(absoluteValue);
  
  // Only abbreviate numbers >= 1 billion (1,000,000,000)
  if (roundedValue >= 1e9) {
    // Format numbers based on their magnitude
    if (roundedValue >= 1e15) {
      // Quadrillion
      return `${isNegative ? '-' : ''}₹${(roundedValue / 1e15).toFixed(2)}Q`;
    } else if (roundedValue >= 1e12) {
      // Trillion
      return `${isNegative ? '-' : ''}₹${(roundedValue / 1e12).toFixed(2)}T`;
    } else if (roundedValue >= 1e9) {
      // Billion
      return `${isNegative ? '-' : ''}₹${(roundedValue / 1e9).toFixed(2)}B`;
    }
  } else {
    // For numbers < 1 billion, format with commas using Indian numbering system
    return `${isNegative ? '-' : ''}₹${roundedValue.toLocaleString('en-IN')}`;
  }
}

// Test cases for number formatting
const formatTestCases = [
  { input: 0, expected: "₹0" },
  { input: 500, expected: "₹500" },
  { input: 1000, expected: "₹1,000" },
  { input: 10000, expected: "₹10,000" },
  { input: 100000, expected: "₹1,00,000" },
  { input: 1000000, expected: "₹10,00,000" },
  { input: 10000000, expected: "₹1,00,00,000" },
  { input: 100000000, expected: "₹10,00,00,000" },
  { input: 1000000000, expected: "₹1.00B" },
  { input: 5000000000, expected: "₹5.00B" },
  { input: 100000000000, expected: "₹100.00B" },
  { input: 1000000000000, expected: "₹1.00T" },
  { input: 5000000000000, expected: "₹5.00T" },
  { input: 100000000000000, expected: "₹100.00T" },
  { input: 1000000000000000, expected: "₹1.00Q" },
  { input: -5000, expected: "-₹5,000" },
  { input: -1000000000, expected: "-₹1.00B" },
  { input: null, expected: "₹0" },
  { input: undefined, expected: "₹0" },
  { input: NaN, expected: "₹0" }
];

console.log("Running Number Formatting Tests...\n");

let passedTests = 0;
let totalTests = formatTestCases.length;

formatTestCases.forEach((testCase, index) => {
  const result = formatLargeNumber(testCase.input);
  const passed = result === testCase.expected;
  
  console.log(`Test ${index + 1}: Input: ${testCase.input}`);
  console.log(`  Expected: ${testCase.expected}`);
  console.log(`  Got:      ${result}`);
  console.log(`  ${passed ? '✅ PASSED' : '❌ FAILED'}\n`);
  
  if (passed) passedTests++;
});

console.log(`\nFormatting Test Results: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log("🎉 All formatting tests passed!");
} else {
  console.log("❌ Some formatting tests failed.");
}