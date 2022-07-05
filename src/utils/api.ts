export interface Args {
  method: string,
  headers?: Record<string, string>,
  url: string,
  query?: Record<string, string>,
  data?: unknown
}


export interface Result<T> {
  status: number,
  ok: boolean,
  data?: T
}


export async function api<T>(args: Args): Promise<Result<T>> {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    ...args.headers
  };
  const body = JSON.stringify(args.data);
  const url = args.query ?
    (`${args.url}?` + new URLSearchParams(args.query)) :
    args.url;
  console.log("PIA API call:", args.method.toUpperCase(), url, JSON.stringify(body));
  const resp = await fetch(url, { method: args.method, headers, body });
  const res: Result<T> = {
    status: resp.status,
    ok: resp.ok
  };
  // attempt JSONDatabody decode
  try {
    const respJson = await resp.json();
    res.data = respJson;
  }
  catch (err) {
    // probably no response body, do nothing
  }
  return res;
}
