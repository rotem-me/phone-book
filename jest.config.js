module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  roots: ["./tests"],
  // setupFiles: ["./jest.setup.ts"],
  setupFilesAfterEnv: ["./jest.globalSetup.ts"],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};
