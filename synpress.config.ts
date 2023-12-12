/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "cypress";
import setupNodeEvents from "./tests/e2e/plugins";

export default defineConfig({
  userAgent: "synpress",
  videosFolder: "./tests/e2e/videos",
  screenshotsFolder: "./tests/e2e/videos",
  e2e: {
    setupNodeEvents,
    baseUrl: "http://localhost:3000",
    supportFile: "./tests/e2e/support.ts",
    specPattern: "./tests/e2e/specs/*.spec.ts",
  },
});
