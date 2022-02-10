import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import * as SSEUtils from "~/src/utils/sse";

import { Activities } from "~/src/components/demo/patient/Activities";
import { Run } from "~/src/components/demo/patient/Run";
import { RunUI } from "~/src/components/pia-ui/RunUI";

import "~/src/components/demo/common.css";

export const useEffectFindRuns = (
  role: string,
  setRunsFn: (_: PIAUtils.Run[]) => void,
  extras: string = ""
) => {
  React.useEffect(
    () => {
      const go = async () => {
        try {
          setRunsFn(await findActiveRuns(role, extras));
        } catch (error) {
          // TODO: Add proper error handling.
          toast.error("PIA request broke!");
        }
      };
      go();
    },
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []
  );
};

export const useStateConnectNotificationSSE = (
  role: string,
  id: number = 1
) => {
  // FIXME: This should be useEffect and it should use a cleanup function to disconnect.
  return React.useState<EventSource>(
    SSEUtils.connect(
      `${process.env.PIA_URL}/notifications/${role}/${id}`,
      (sse, event) => {
        const raw = event.data;
        const data = JSON.parse(raw);
        console.log(event);
        console.log(data);
        toast.info(<a href={data["run-id"]}>{data["message"]}</a>, {
          autoClose: false,
          closeOnClick: false,
        });
      }
    )
  );
};

export const findActiveRuns = async (role: string, extras: string = "") => {
  const realExtras =
    "" === extras || extras.startsWith("&") ? extras : "&" + extras;
  const resp = await PIAUtils.findRuns(
    `state=running&index.roles$contains=${role}${realExtras}`
  );
  return await Promise.all(resp.map(resolveRunPatient));
};

export const resolveRunPatient = async (run: PIAUtils.Run) => {
  run.index.patient = await PIAUtils.getPatient(run.index["patient-id"]);
  return run;
};

export const useEffectGetPatient = (
  patientId: number,
  setPatientsFn: (_: PIAUtils.Patient) => void
) => {
  React.useEffect(() => {
    const getPatient = async () => {
      try {
        const resp = await PIAUtils.getPatient(patientId);
        setPatientsFn(resp);
      } catch (error) {
        // TODO: Add proper error handling.
        toast.error("PIA request broke!");
      }
    };
    getPatient();
  }, []);
};

export const alertColorFromLevel = (level: string) => {
  switch (level) {
    case "info":
      return "green";
    case "warning":
      return "yellow";
    case "attention":
      return "red";
    default:
      return "green";
  }
};

// TODO: replace this with Tailwind vars
// copied from tailwind.config.js
export const getColorFromTailwind = (color: string) => {
  const colorMap = {
    // primary:
    // - black and white
    ink: "#191818",
    cloud: "#F2F2F2",
    platinum: "#FCFCFC",
    coconut: "#FEFEFE",
    // TODO: update the color names with grey
    battleship: "#7E7E7E",
    grey: "#8D8D8D",
    silver: "#AFAFAF",
    lightgrey: "#EAEAEA",
    // - greys
    grey600: "#7E7E7E",
    grey500: "#8D8D8D",
    grey400: "#AFAFAF",
    grey300: "#D7D7D7",
    grey200: "#EAEAEA",
    // - reds and pinks
    brick: "#D43857",
    cardinal: "#E71F54",
    blush: "#F28599",
    puff: "#FDEDF2",
    // - blues
    cobalt: "#1A73E8",
    peppermint: "#F3F8FE",
    // - green
    parakeet: "#1EC69C",
    // secondary:
    clover: "#20C882",
    monarch: "#FA6400", // warning messages
    flame: "#E74C3C", // error messages
    proton: "#7451F0",
    butterscotch: "#F7B500",
    lapis: "#0080FF", // info messages
    salamander: "#FF4400",
    royal: "#7700F4",
    bubblegum: "#FF14B0",
    aqua: "#00DFEC",
  };
  return colorMap[color];
};
