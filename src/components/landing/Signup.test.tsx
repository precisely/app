import * as History from "history";
import * as React from "react";
import * as TLR from "@testing-library/react";

import * as MockAPI from "~/src/mocks/api";
import * as MockSession from "~/src/mocks/session";
import * as ReactUtils from "~/src/utils/react";
import * as SessionUtils from "~/src/utils/session";

import { Signup } from "./Signup";


describe("Signup", () => {

  afterEach(() => {
    SessionUtils.removeAuthentication();
  });

  test("basic rendering", async () => {
    TLR.render(ReactUtils.routedComponent((props) => <Signup {...props} />));
    expect(TLR.screen.getByText(/Create/)).toHaveTextContent("Create an Account");
  });

  test("signup", async () => {
    // prep
    MockAPI.oneSignup();
    TLR.render(ReactUtils.routedComponent((props) => <Signup {...props} />));
    expect(TLR.screen.queryByText(/Create/)).toHaveTextContent("Create an Account");
    // fill out form
    TLR.fireEvent.change(TLR.screen.getByLabelText("Email"), {target: {value: "alice@example.com"}});
    TLR.fireEvent.change(TLR.screen.getByLabelText("Password"), {target: {value: "password"}});
    TLR.fireEvent.click(TLR.screen.getByText("Sign Up"));
    // check
    await TLR.waitFor(() => {
      expect(TLR.screen.getByText(/Your signup/))
	.toHaveTextContent(
	  "Your signup application was received.");
    });
  });

  test("prevent signup if logged in", async () => {
    const history = History.createMemoryHistory();
    MockSession.loginAs("alice@example.com");
    TLR.render(ReactUtils.routedComponent((props) => <Signup {...props} />, {history}));
    expect(history.location.pathname).toEqual("/");
    expect(TLR.screen.queryByText(/Create/)).toBeNull();
  });

});
