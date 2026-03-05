import { runBasicTests } from "./calculator-tests/basic-tests";
import { runComprehensiveTests } from "./calculator-tests/comprehensive-tests";
import { runFormattingTests } from "./calculator-tests/formatting-tests";

type Suite = {
  name: string;
  run: () => void;
};

const suites: Suite[] = [
  { name: "Basic calculator tests", run: runBasicTests },
  { name: "Comprehensive calculator tests", run: runComprehensiveTests },
  { name: "Number formatting tests", run: runFormattingTests },
];

function runAllTests(): void {
  let passed = 0;

  console.log("Running all calculator tests...\n");

  for (const suite of suites) {
    try {
      console.log(`Running ${suite.name}...`);
      suite.run();
      passed += 1;
      console.log(`PASS: ${suite.name}\n`);
    } catch (error) {
      console.error(`FAIL: ${suite.name}`);
      const message = error instanceof Error ? error.message : String(error);
      console.error(message);
      process.exit(1);
    }
  }

  console.log(`All test suites passed (${passed}/${suites.length}).`);
}

runAllTests();