import { toast } from "react-toastify";

import * as SessionUtils from "~/src/utils/session";
import * as ApiUtils from "~/src/utils/api";


// if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() == "development") {
//   console.log("This is the login URL in auth.ts", process.env.BACKEND_URL);
// }


export async function login(email: string, password: string) {
  const data = { user: { email, password } };
  try {
    const resp = await ApiUtils.api<SessionUtils.UserData>({
      method: "POST",
      data,
      url: `${process.env.BACKEND_URL}/auth/login`
    });
    if (resp.ok) {
      SessionUtils.saveAuthentication(resp.data, resp.jwt);
      toast.info("Login successful. Welcome.");
    }
    else {
      toast.error("Unknown or wrong email or password!");
    }
    return resp.ok;
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke!");
    return false;
  }
}


export async function logout() {
  try {
    const resp: ApiUtils.Result<null> = await ApiUtils.api<null>({
      method: "DELETE",
      url: `${process.env.BACKEND_URL}/auth/logout`
    });
    if (resp.ok) {
      SessionUtils.removeAuthentication();
      toast.info("Logout successful. Goodbye!");
    }
    else {
      toast.error("Logout failed.");
    }
    return resp.ok;
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke horribly!");
    return false;
  }
}


export async function signup(email: string, password: string) {
  const data = { user: { email, password } };
  try {
    const resp: ApiUtils.Result<SessionUtils.UserData> = await ApiUtils.api<SessionUtils.UserData>({
      method: "POST",
      data,
      url: `${process.env.BACKEND_URL}/auth/signup`
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
    const resp: ApiUtils.Result<null> = await ApiUtils.api<null>({
      method: "GET",
      query: {confirmation_token: token},
      url: `${process.env.BACKEND_URL}/auth/confirmation`
    });
    return resp.ok;
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke in the signup confirmation process.");
    return false;
  }
}


export async function reset(email: string) {
  const data = { user: { email } };
  try {
    const resp: ApiUtils.Result<SessionUtils.UserData> = await ApiUtils.api<SessionUtils.UserData>({
      method: "POST",
      data,
      url: `${process.env.BACKEND_URL}/auth/password`
    });
    return resp.ok;
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke in the reset password request process.");
    return false;
  }
}


export async function resetConfirm(token: string, password: string) {
  try {
    const data = { user: { reset_password_token: token, password } };
    const resp: ApiUtils.Result<null> = await ApiUtils.api<null>({
      method: "PUT",
      data,
      url: `${process.env.BACKEND_URL}/auth/password`
    });
    return resp.ok;
  }
  catch (error) {
    // TODO: Add proper error handling.
    toast.error("Something broke in the reset confirmation process.");
    return false;
  }
}
