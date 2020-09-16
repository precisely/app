import * as MockAPI from "~/src/mocks/api";
import * as MockSession from "~/src/mocks/session";

import * as AuthUtils from "~/src/utils/auth";
import * as SessionUtils from "~/src/utils/session";


describe("AuthUtils", () => {

  afterEach(() => {
    SessionUtils.removeAuthentication();
  });

  test("mock login", async () => {
    expect(SessionUtils.isAuthenticated()).toBeFalsy();
    MockSession.loginAs("alice@example.com");
    expect(SessionUtils.isAuthenticated()).toBeTruthy();
  });

  test("login-logout sequence", async () => {
    MockAPI.oneLoginAs("alice@example.com");
    expect(SessionUtils.isAuthenticated()).toBeFalsy();
    const res = await AuthUtils.login("alice@example.com", "password123");
    expect(res).toEqual(true);
    expect(SessionUtils.isAuthenticated()).toBeTruthy();
    MockAPI.oneLogout();
    await AuthUtils.logout();
    expect(SessionUtils.isAuthenticated()).toBeFalsy();
  });

});
