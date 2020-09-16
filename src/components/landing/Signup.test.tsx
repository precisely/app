import * as React from "react";
import * as TLR from "@testing-library/react";

import * as MockAPI from "~/src/mocks/api";
import * as ReactUtils from "~/src/utils/react";

import { Signup } from "./Signup";


describe("Signup", () => {

  test("basic rendering", async () => {
    TLR.render(ReactUtils.routedComponent((props) => <Signup {...props} />));
    expect(TLR.screen.getByText(/Create/)).toHaveTextContent("Create an Account");
  });

  test("signup", async () => {
    // prep
    MockAPI.oneSignup();
    TLR.render(ReactUtils.routedComponent((props) => <Signup {...props} />));
    // fill out form
    (TLR.screen.getByLabelText("Email") as HTMLInputElement).value =
      "alice@example.com";
    (TLR.screen.getByLabelText("Email") as HTMLInputElement).value =
      "password";
    TLR.fireEvent.click(
      TLR.screen.getByText("Sign Up"));
    // check
    await TLR.waitFor(() => {
      expect(TLR.screen.getByText(/Your signup/))
	.toHaveTextContent(
	  "Your signup application was received.");
    });
  });

});
