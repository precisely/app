import * as React from "react";
import * as TLR from "@testing-library/react";

import * as MockAPI from "~/src/mocks/api";
import * as ReactUtils from "~/src/utils/react";
import * as SessionUtils from "~/src/utils/session";

import { ResetConfirm } from "./ResetConfirm";


describe("ResetConfirm", () => {

  afterEach(() => {
    SessionUtils.removeAuthentication();
  });

  test("successful reset confirm", async () => {
    MockAPI.onePasswordResetConfirm();
    TLR.render(ReactUtils.routedComponent(
      (props) => {
	return <ResetConfirm {...props} />;
      },
      {route: "/landing/reset/confirm/:token", path: "/landing/reset/confirm/abcd1234"}
    ));
    expect(TLR.screen.getByText("Reset Password"));
    // fill out form
    TLR.fireEvent.change(TLR.screen.getByLabelText("New password"), {target: {value: "password"}});
    TLR.fireEvent.click(TLR.screen.getByText("Reset"));
    // check
    await TLR.waitFor(() => {
      expect(TLR.screen.getByText(/Your password/)).toHaveTextContent("Your password was successfully reset!");
    });
  });

  test("failed reset", async () => {
    TLR.render(ReactUtils.routedComponent(
      (props) => {
	return <ResetConfirm {...props} />;
      },
      {route: "/landing/reset/confirm/:token", path: "/landing/reset/confirm/abcd1234"}
    ));
    expect(TLR.screen.getByText("Reset Password"));
    // fill out form
    TLR.fireEvent.change(TLR.screen.getByLabelText("New password"), {target: {value: "password"}});
    TLR.fireEvent.click(TLR.screen.getByText("Reset"));
    // check
    await TLR.waitFor(() => {
      expect(TLR.screen.getByText(/Password reset/)).toHaveTextContent("Password reset failed.");
    });
  });

});
