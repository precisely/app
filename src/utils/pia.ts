import * as ApiUtils from "~/src/utils/api";


// FIXME: types any are not any, they're actually JSON

//Need to think more about how args would be used in the runs - is the type an array of JSON strings?
interface Run {
  id: string,
  state: "running" | "suspended" | "complete",
  result: string[],
  response: string[],
  runResponse: string[],
  returnMode?:  null | "block" | "redirect",
  nextId?: null | string,
  next?: null | string
}


export async function startRun(name: string, args: any[] = []): Promise<Run> {
  const resp = await ApiUtils.api<Run>({
    method: "POST",
    data: args,
    url: `${process.env.BACKEND_URL}/endpoints/pia/api/runs/${name}`
  });
  if (resp.ok) {
    console.log("This is the data in pia.ts ", resp.data);
    return resp.data;
  }
  else {
    // FIXME: error handling
    throw "???";
  }
}


/*
// FIXME: add keyword args:
// - permit: any
// - data: any
export async function continueRun(id: string) {
}


export async function getRun(id: string) {
}
*/
