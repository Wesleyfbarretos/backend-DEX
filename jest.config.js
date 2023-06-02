/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: ".env.test" });
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node"
};
