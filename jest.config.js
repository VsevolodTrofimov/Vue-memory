module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/jest-vue-preprocessor"
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/$1"
  },
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.{vue,js}",
    "!src/*.{vue,js}",
    "!src/utility/gameConfig.js"
  ],
  coverageReporters: ["lcov", "json"],
  "mapCoverage": true
}
