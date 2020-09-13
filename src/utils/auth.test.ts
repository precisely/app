import * as MockAPI from "~/src/mocks/api";

import * as AuthUtils from "./auth";
import * as SessionUtils from "./session";


describe("AuthUtils", () => {

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
