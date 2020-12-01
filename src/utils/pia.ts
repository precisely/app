import * as ApiUtils from "~/src/utils/api";


var nextId: string = "";


// FIXME: types any are not any, they're actually JSON


export async function startRun(name: string, args: any[] = []): Promise<any> {
  const resp = await ApiUtils.api<any>({
    method: "POST",
    data: args,
    url: `${process.env.BACKEND_URL}/endpoints/pia/api/runs/${name}`
  });
  if (resp.ok) {
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
