import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: [
    "<rootDir>"
  ],
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ],
  // Enable code coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Customize as needed
  collectCoverageFrom: [
    'src/**/*.ts',  // Include all TypeScript files
    '!src/**/*.d.ts',  // Exclude type definition files
    '!src/main.ts',  // Exclude main.ts if it's just a bootstrap file
    '!src/config/**',  // Exclude config files if needed
  ],
};

export default config;