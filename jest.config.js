module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest'
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect'
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass|svg)$": "identity-obj-proxy"
    },
};
