import "@testing-library/jest-dom";
import * as dotenv from "dotenv";
// @ts-ignore
import fetch from "node-fetch";


// enable load of .env.test; required for correct test environment variable setup
dotenv.config();


if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}
