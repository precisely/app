import * as _ from "lodash";


export interface JWTDecoded {
  aud?: string;   // audience
  email?: string;
  exp: number;    // expiration time
  iat: number;    // issued at
  jti: string;    // JWT ID
  sub?: string;   // subject
}


export interface JWT {
  token: string;
  decoded: JWTDecoded;
}


export interface UserData {
  id: number;
  email: string;
}


export const LS_AUTH_ACCESS_TOKEN = "auth-access-token";
export const LS_AUTH_EXPIRES_AT = "auth-token-expires-at";
export const LS_AUTH_USER = "auth-user";


export function isAuthenticated() {
  const expiresAt = Number(localStorage.getItem(LS_AUTH_EXPIRES_AT));
  const accessToken: string = localStorage.getItem(LS_AUTH_ACCESS_TOKEN);
  
  if (accessToken &&
      accessToken.length > 0 &&
      expiresAt > 0 &&
      expiresAt > new Date().getTime()) {
    return accessToken;
  }
  
  return false;
}


export function saveAuthentication(data: UserData, jwt: JWT) {
  const expiresAt = (new Date().getTime() + jwt.decoded.exp * 1000).toString();
  localStorage.setItem(LS_AUTH_ACCESS_TOKEN, jwt.token);
  localStorage.setItem(LS_AUTH_EXPIRES_AT, expiresAt);
  localStorage.setItem(LS_AUTH_USER, JSON.stringify(data));
}


export function removeAuthentication() {
  const keys = [
    LS_AUTH_ACCESS_TOKEN,
    LS_AUTH_EXPIRES_AT,
    LS_AUTH_USER
  ];
  for (const k of keys) {
    localStorage.removeItem(k);
  }
}


export function makeAuthorizationHeader(): {[key: string]: string} {
  return {
    Authorization: `Bearer ${localStorage.getItem(LS_AUTH_ACCESS_TOKEN)}`
  };
}


export function username(): string {
  const user = JSON.parse(localStorage.getItem(LS_AUTH_USER));
  return _.get(user, ["email"], "");
}