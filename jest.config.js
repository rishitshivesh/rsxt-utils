module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
      "^react$": "<rootDir>/node_modules/react",
      "^react-dom$": "<rootDir>/node_modules/react-dom",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  };
  