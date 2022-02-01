import { toast } from 'react-toastify';

import * as ApiUtils from "~/src/utils/api";
import { JSONData } from "~/src/utils/types";


//Need to think more about how args would be used in the runs - is the type an array of JSONDatastrings?
export interface Run {
  id: string,
  state: "running" | "suspended" | "complete",
  output: [JSONData],
  return_mode?:  null | "block" | "redirect",
  next_id?: null | string,
  next?: null | string
}


export async function startRun(name: string, args: any[] = []): Promise<Run> {
  const resp = await ApiUtils.api<Run>({
    method: "POST",
    data: args,
    url: `${process.env.PIA_URL}/api/runs/start/${name}`
  });
  if (resp.ok) {
    console.log("startRun returned ", resp.data);
    return resp.data;
  }
  else {
    // FIXME: error handling
    toast.error("startRun failed");
    console.log("startRun failed", resp);
    throw "???";
  }
}

export async function continueRun(runId: string, data: JSONData = null, permit: JSONData = null): Promise<Run> {
  const resp = await ApiUtils.api<Run>({
    method: "POST",
    data: { data, permit },
    url: `${process.env.PIA_URL}/api/runs/continue/${runId}`
  });
  if (resp.ok) {
    console.log("continueRun returned ", resp.data);
    return resp.data;
  }
  else {
    // FIXME: error handling
    toast.error("continueRun failed");
    console.log("continueRun failed", resp);
    throw "???";
  }
}

export async function getRun(runId: string): Promise<Run> {
  const resp = await ApiUtils.api<Run>({
    method: "GET",
    url: `${process.env.PIA_URL}/api/runs/${runId}`
  });
  if (resp.ok) {
    console.log("getRun returned ", resp.data);
    return resp.data;
  }
  else {
    // FIXME: error handling
    toast.error("getRun failed");
    console.log("getRun failed", resp);
    throw "???";
  }
}

// query string format: state=running&status.patient-id=123&status.roles$=patient
// FIXME: This should accept a JS object and convert it into this format string instead.
export async function findRuns(query: string): Promise<Run[]> {
  const resp = await ApiUtils.api<Run[]>({
    method: "GET",
    url: `${process.env.PIA_URL}/api/runs/find?${query}`
  });
  if (resp.ok) {
    console.log("findRuns returned ", resp.data);
    return resp.data;
  }
  else {
    // FIXME: error handling
    toast.error("findRuns failed");
    console.log("findRuns failed", resp);
    throw "???";
  }
}
