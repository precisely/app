import * as JWTSimple from "jwt-simple";

import * as SessionUtils from "~/src/utils/session";


export function loginAs(email: string) {
  const iat = Math.round((Date.now()) / 1000);
  const exp = Math.round((Date.now() + (15 * 60)) / 1000);
  const jti = "deadbeef";
  const tokenData: SessionUtils.JWTDecoded = {email, iat, exp, jti};
  const token = JWTSimple.encode(tokenData, "key");
  SessionUtils.saveAuthentication(
    {id: 1, email},
    {token, decoded: tokenData}
  );
}
