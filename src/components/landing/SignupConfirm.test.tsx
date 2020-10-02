import * as React from "react";
import * as TLR from "@testing-library/react";

import * as MockAPI from "~/src/mocks/api";
import * as ReactUtils from "~/src/utils/react";
import * as SessionUtils from "~/src/utils/session";

import { SignupConfirm } from "./SignupConfirm";


describe("SignupConfirm", () => {

  afterEach(() => {
    SessionUtils.removeAuthentication();
  });

  test("successful confirm", async () => {
    MockAPI.oneSignupConfirm();
    TLR.render(ReactUtils.routedComponent(
      (props) => {
	return <SignupConfirm {...props} />;
      },
      {route: "/landing/signup/confirm/:token", path: "/landing/signup/confirm/abcd1234"}
    ));
    await TLR.waitFor(() => {
      expect(TLR.screen.getAllByText(/Confirmation/)[1])
	.toHaveTextContent("Confirmation succeeded!");
    });
  });

  test("failed confirm", async () => {
    TLR.render(ReactUtils.routedComponent(
      (props) => {
	return <SignupConfirm {...props} />;
      },
      {route: "/landing/signup/confirm/:token", path: "/landing/signup/confirm/abcd1234"}
    ));
    await TLR.waitFor(() => {
      expect(TLR.screen.getAllByText(/Confirmation/)[1])
	.toHaveTextContent("Confirmation failed.");
    });
  });

});
