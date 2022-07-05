import "@testing-library/jest-dom";
import * as dotenv from "dotenv";

// TODO: Review this. It may not be necessary.
// enable load of .env.test; required for correct test environment variable setup
dotenv.config();

// Prepare to deal with Fetch API requests:
global.fetch = jest.fn();

afterEach(() => {
  jest.mocked(global.fetch, true).mockClear();
});
