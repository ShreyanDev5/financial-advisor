# Calculator Tests

This directory contains TypeScript test suites for calculator and formatting utilities.
All tests import runtime code from `lib/` directly, so they validate the same logic used by the app.

## Test Files

1. `basic-tests.ts` - Deterministic baseline checks for calculator outputs.
2. `comprehensive-tests.ts` - Edge-case and invariants validation for SIP, Lumpsum, and SWP.
3. `formatting-tests.ts` - Currency formatting checks for `formatLargeNumber`.

## Running Tests

From the project root:

```sh
# Run all calculator suites
npm test

# Run suites individually
npm run test:basic
npm run test:comprehensive
npm run test:formatting
```

## Coverage Notes

- Mathematical output validation for calculator utilities
- Edge cases such as zero rates, large values, and withdrawal-heavy SWP paths
- Indian currency formatting and invalid input handling