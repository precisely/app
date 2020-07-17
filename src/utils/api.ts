import * as JWTDecode from "jwt-decode";

import * as AuthUtils from "~/src/utils/auth";


export interface Result<T> {
  status: number,
  ok: boolean,
  data?: T,
  jwt?: AuthUtils.JWT
}


// TODO: Support optional additional headers. Keyword params appropriate?
export async function api<T>(
  url: string,
  method: string,
  data: object
): Promise<Result<T>> {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };
  if (AuthUtils.isAuthenticated()) {
    headers["Authorization"] = AuthUtils.makeAuthorizationHeader();
  }
  const body = JSON.stringify(data);
  const resp = await fetch(url, { method, headers, body });
  if (!resp.ok) {
    return {
      status: resp.status,
      ok: resp.ok
    };
  }
  const respJson = await resp.json();
  const jwtRaw = resp.headers.get("Authorization");
  if (jwtRaw) {
    const decoded: AuthUtils.JWTDecoded = JWTDecode.default(jwtRaw);
    return {
      status: resp.status,
      ok: resp.ok,
      data: respJson,
      jwt: {
        token: jwtRaw,
        decoded
      }
    };
  }
  else {
    return respJson;
  }
}