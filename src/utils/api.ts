import * as JWTDecode from "jwt-decode";

import * as AuthUtils from "~/src/utils/auth";


export interface Args {
  method: string,
  headers?: object,
  url: string,
  query?: Record<string, string>,
  data?: object
}


export interface Result<T> {
  status: number,
  ok: boolean,
  data?: T,
  jwt?: AuthUtils.JWT
}


export async function api<T>(args: Args): Promise<Result<T>> {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    ...args.headers
  };
  if (AuthUtils.isAuthenticated()) {
    headers["Authorization"] = AuthUtils.makeAuthorizationHeader();
  }
  const body = JSON.stringify(args.data);
  const url = args.query ?
              (`${args.url}?` + new URLSearchParams(args.query)) :
              args.url;
  const resp = await fetch(url, { method: args.method, headers, body });
  const res: Result<T> = {
    status: resp.status,
    ok: resp.ok
  };
  // attempt JSON body decode
  try {
    const respJson = await resp.json();
    res.data = respJson;
  }
  catch (err) {
    // probably no response body, do nothing
  }
  // attempt Authentication header JWT decode
  const jwtRaw = resp.headers.get("Authorization");
  if (jwtRaw) {
    const decoded: AuthUtils.JWTDecoded = JWTDecode.default(jwtRaw);
    res.jwt = {
      token: jwtRaw,
      decoded
    };
  }
  return res;
}
