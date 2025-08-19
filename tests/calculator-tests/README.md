# Calculator Tests

This directory contains comprehensive tests for the investment calculators in the financial advisor application.

## Test Files

1. `basic-tests.js` - Basic functionality tests for all three calculators (SIP, Lumpsum, SWP)
2. `comprehensive-tests.js` - Edge case and comprehensive tests with various scenarios
3. `formatting-tests.js` - Number formatting validation tests

## Running Tests

To run all tests, execute the following commands from the project root:

```bash
# Run basic tests
node tests/calculator-tests/basic-tests.js

# Run comprehensive tests
node tests/calculator-tests/comprehensive-tests.js

# Run formatting tests
node tests/calculator-tests/formatting-tests.js
```

## Test Coverage

The tests cover:

- Mathematical accuracy of all calculations
- Edge cases with minimum and maximum values
- Special scenarios like zero interest rates
- Number formatting in Indian Rupees (₹)
- Handling of very large numbers
- Negative balance scenarios in SWP calculator