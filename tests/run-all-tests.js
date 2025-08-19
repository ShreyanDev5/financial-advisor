// Script to run all calculator tests
// Run with: node tests/run-all-tests.js

const { spawn } = require('child_process');
const path = require('path');

// Test files to run
const testFiles = [
  'tests/calculator-tests/basic-tests.js',
  'tests/calculator-tests/comprehensive-tests.js',
  'tests/calculator-tests/formatting-tests.js'
];

// Function to run a single test file
function runTestFile(file) {
  return new Promise((resolve, reject) => {
    console.log(`\nRunning ${file}...\n`);
    
    const testProcess = spawn('node', [file], { stdio: 'inherit' });
    
    testProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${file} failed with exit code ${code}`));
      }
    });
    
    testProcess.on('error', (error) => {
      reject(error);
    });
  });
}

// Run all tests sequentially
async function runAllTests() {
  console.log('Running all calculator tests...\n');
  
  try {
    for (const file of testFiles) {
      await runTestFile(file);
    }
    
    console.log('\n🎉 All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
runAllTests();