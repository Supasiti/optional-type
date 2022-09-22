import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testRegex: 'test.(js|ts|tsx)$',
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;
