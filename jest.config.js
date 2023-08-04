const nextJest = require('next/jest')
// const dotEnv = require('dotenv');
// dotEnv.config({ path: '../.env.local' });
// console.log(`Running Jest with env: ${process.env.CUBE_API_URL}`);
const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)