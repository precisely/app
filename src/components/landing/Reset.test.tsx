import * as React from "react";
import * as TLR from "@testing-library/react";

import * as MockAPI from "~/src/mocks/api";
import * as ReactUtils from "~/src/utils/react";
import * as SessionUtils from "~/src/utils/session";

import { Reset } from "./Reset";


describe("Reset", () => {

  afterEach(() => {
    SessionUtils.removeAuthentication();
  });

  test("basic rendering", async () => {
    TLR.render(ReactUtils.routedComponent((_props) => <Reset />));
    expect(TLR.screen.getByText(/Reset your/)).toHaveTextContent("Reset your password");
  });

  test("reset request", async () => {
    // prep
    MockAPI.onePasswordReset();
    // render
    TLR.render(ReactUtils.routedComponent((_props) => <Reset />));
    // fill out form
    TLR.fireEvent.change(TLR.screen.getByLabelText("Email"), {target: {value: "alice@example.com"}});
    TLR.fireEvent.click(TLR.screen.getByText("Reset"));
    // check
    await TLR.waitFor(() => {
      expect(TLR.screen.getByText(/Your password/)).toHaveTextContent("Your password will be reset. Please check your email.");
      });
  });

});
