import { toast } from "react-toastify";

import * as AuthUtils from "~/src/utils/auth";
import * as ApiUtils from "~/src/utils/api";


export async function login(email: string, password: string) {
  const data = { user: { email, password } };
  try {
    const resp: ApiUtils.Result<AuthUtils.UserData> = await ApiUtils.api<AuthUtils.UserData>(
      `${process.env.URL_BACKEND}/auth/login`, "POST", data);
    if (resp.ok) {
      AuthUtils.saveAuthentication(resp.data, resp.jwt);
      toast.info("Login successful. Welcome.");
    }
    else {
      toast.error("Wrong username or password!");
    }
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke!");
  }
}


export async function logout() {
  try {
    const resp: ApiUtils.Result<{}> = await ApiUtils.api<{}>(
      `${process.env.URL_BACKEND}/auth/logout`, "DELETE");
    if (resp.ok) {
      AuthUtils.removeAuthentication();
      toast.info("Logout successful. Goodbye!");
    }
    else {
      toast.error("Logout failed.");
    }
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke horribly!");
  }
}
