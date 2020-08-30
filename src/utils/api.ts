import JWTDecode from "jwt-decode";

import * as SessionUtils from "~/src/utils/session";


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
  jwt?: SessionUtils.JWT
}


export async function api<T>(args: Args): Promise<Result<T>> {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    ...args.headers
  };
  if (SessionUtils.isAuthenticated()) {
    headers["Authorization"] = SessionUtils.authorization();
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
    const decoded: SessionUtils.JWTDecoded = JWTDecode(jwtRaw);
    res.jwt = {
      token: jwtRaw,
      decoded
    };
  }
  return res;
}
