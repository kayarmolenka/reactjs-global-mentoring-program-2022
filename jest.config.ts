const config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(t|j)sx|s$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass|png)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src$1',
    '^components(.*)$': '<rootDir>/src/components$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

module.exports = config;
