import "@testing-library/jest-dom";
import * as dotenv from "dotenv";
import { mocked } from "ts-jest/utils";


// TODO: Review this. It may not be necessary.
// enable load of .env.test; required for correct test environment variable setup
dotenv.config();


// Prepare to deal with Fetch API requests:
global.fetch = jest.fn();

afterEach(() => {
  mocked(global.fetch, true).mockClear();
});
