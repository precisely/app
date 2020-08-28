import * as React from "react";
import * as TLR from "@testing-library/react";

import { Home } from "./Home";


const mocks = {
  useHistory: {
    push: jest.fn()
  }
};

// NB: Use this technique to test code relying on the useHistory hook.
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mocks.useHistory.push
  }),
}));


describe("Home", () => {

  test("basic rendering", async () => {
    TLR.render(<Home />);
    expect(TLR.screen.getByText(/Protects/)).toHaveTextContent("Protects you and your family");
  });

  test("go to signup", async () => {
    TLR.render(<Home />);
    const signupButton = TLR.screen.getByText("Get Started");
    TLR.fireEvent.click(signupButton);
    expect(mocks.useHistory.push).toHaveBeenCalledWith("/landing/signup");
  });

});
