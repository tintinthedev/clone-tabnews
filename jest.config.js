const nextJest = require("next/jest");

const createJestConfig = nextJest();

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["<rootDir>/tests/config/setupEnv.js"],
  testTimeout: 60000,
});

module.exports = jestConfig;
