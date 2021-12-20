import * as ApiUtils from "~/src/utils/api";
import { JSONData } from '../components/app/types';
import { toast } from 'react-toastify';

// FIXME: types any are not any, they're actually JSON
//type JSONData= null | boolean | number | string | {string: JSONData | [JSONData;


//Need to think more about how args would be used in the runs - is the type an array of JSONDatastrings?
export interface Run {
  id: string,
  state: "running" | "suspended" | "complete",
  result: JSONData,
  response: [JSONData],
  run_response: [JSONData],
  return_mode?:  null | "block" | "redirect",
  next_id?: null | string,
  next?: null | string
}


export async function startRun(name: string, args: any[] = []): Promise<Run> {
  const resp = await ApiUtils.api<Run>({
    method: "POST",
    data: args,
    url: `${process.env.PIA_URL}/api/runs/${name}`
  });
  if (resp.ok) {
    console.log("startRun returned ", resp.data);
    return resp.data;
  }
  else {
    toast.error("Server error while continuing run")
    // FIXME: error handling
    throw "???";
  }
}

export async function continueRun(runId: string, data: JSONData= null, permit: JSONData= null): Promise<Run> {
  const resp = await ApiUtils.api<Run>({
    method: "POST",
    data: { data, permit },
    url: `${process.env.PIA_URL}/api/runs/${runId}/continue`
  });
  if (resp.ok) {
    console.log("continueRun returned ", resp.data);
    return resp.data;
  }
  else {
    toast.error("Server error while continuing run")
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
