import { toast } from "react-toastify";

import * as SessionUtils from "~/src/utils/session";
import * as ApiUtils from "~/src/utils/api";


export async function login(email: string, password: string) {
  const data = { user: { email, password } };
  try {
    const resp: ApiUtils.Result<SessionUtils.UserData> = await ApiUtils.api<SessionUtils.UserData>({
      method: "POST",
      data,
      url: `${process.env.URL_BACKEND}/auth/login`
    });
    if (resp.ok) {
      SessionUtils.saveAuthentication(resp.data, resp.jwt);
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
    const resp: ApiUtils.Result<{}> = await ApiUtils.api<{}>({
      method: "DELETE",
      url: `${process.env.URL_BACKEND}/auth/logout`
    });
    if (resp.ok) {
      SessionUtils.removeAuthentication();
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


export async function signup(email: string, password: string) {
  const data = { user: { email, password } };
  try {
    const resp: ApiUtils.Result<{}> = await ApiUtils.api<SessionUtils.UserData>({
      method: "POST",
      data,
      url: `${process.env.URL_BACKEND}/auth/signup`
    });
    return resp.ok;
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke in the signup process.");
    return false;
  }
}


export async function signupConfirm(token: string) {
  try {
    const resp: ApiUtils.Result<{}> = await ApiUtils.api<{}>({
      method: "GET",
      query: {confirmation_token: token},
      url: `${process.env.URL_BACKEND}/auth/confirmation`
    });
    return resp.ok;
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke in the signup confirmation process.");
    return false;
  }
}
