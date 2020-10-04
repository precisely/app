import * as History from "history";
import * as React from "react";
import * as TLR from "@testing-library/react";

import * as MockAPI from "~/src/mocks/api";
import * as ReactUtils from "~/src/utils/react";
import * as SessionUtils from "~/src/utils/session";

import { Login } from "./Login";


describe("Login", () => {

  afterEach(() => {
    SessionUtils.removeAuthentication();
  });

  test("basic rendering", async () => {
    TLR.render(ReactUtils.routedComponent((props) => <Login {...props} />));
    expect(TLR.screen.getByText(/Welcome/)).toHaveTextContent("Welcome Back to Precisely");
  });

  test("successful login", async () => {
    // prep
    MockAPI.oneLoginAs("alice@example.com");
    const history = History.createMemoryHistory({initialEntries: ["/landing/login"]});
    history.push = jest.fn();
    TLR.render(ReactUtils.routedComponent(
      (props) => <Login {...props} />,
      {route: "/landing/login", history}
    ));
    // fill out form
    TLR.fireEvent.change(TLR.screen.getByLabelText("Email"), {target: {value: "alice@example.com"}});
    TLR.fireEvent.change(TLR.screen.getByLabelText("Password"), {target: {value: "password"}});
    TLR.fireEvent.click(TLR.screen.getByText("Login"));
    // this should redirect back to the original
    await TLR.waitFor(() => {
      expect(history.push).toBeCalled();
    });
  });

  test("failed login", async () => {
    // prep
    MockAPI.oneLoginAs("alice@example.com");
    const history = History.createMemoryHistory({initialEntries: ["/landing/login"]});
    history.push = jest.fn();
    TLR.render(ReactUtils.routedComponent(
      (props) => <Login {...props} />,
      {route: "/landing/login", history}
    ));
    // fill out form
    TLR.fireEvent.change(TLR.screen.getByLabelText("Email"), {target: {value: "bob@example.com"}});
    TLR.fireEvent.change(TLR.screen.getByLabelText("Password"), {target: {value: "password"}});
    TLR.fireEvent.click(TLR.screen.getByText("Login"));
    // this should redirect back to the original
    await TLR.waitFor(() => {
      expect(history.push).not.toBeCalled();
    });
  });

});
