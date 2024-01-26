/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts']
}