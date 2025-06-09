export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.*'],
  testPathIgnorePatterns: ['/node_modules/', '/__snapshots__/'],
  moduleNameMapper: {
    '^plugins/(.*)$': '<rootDir>/plugins/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.m?[jt]sx?$': 'babel-jest',
  },
};
