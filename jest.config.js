module.exports = {
    preset: 'jest-expo', 
    setupFiles: [
      './test/jest.setup.js'    
    ],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/__mocks__/fileMock.js', 
    },
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect' 
    ],
    testMatch: [
        '<rootDir>/src/**/*.test.ts',
        '<rootDir>/src/**/*.test.tsx',
    ],
}