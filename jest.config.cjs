module.exports = {
  roots: ["<rootDir>/tests"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup/setupAtlas.js"],
  testTimeout: 20000,
  transform: {}
};