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


export const getPatientEffect = (patientId: number, setPatientsFn: (_: PIAUtils.Patient) => void) => {
  return () => {
    const getPatient = async () => {
      try {
        const resp = await PIAUtils.getPatient(patientId);
        setPatientsFn(resp);
      }
      catch (error) {
        // TODO: Add proper error handling.
        toast.error("PIA request broke!");
      }
    };
    getPatient();
  }
};

export const serverSideEventSource = (role: string, id: number = 1) => {
  return SSEUtils.connect(
    `${process.env.PIA_URL}/notifications/${role}/${id}`,
    (sse, event) => {
      const raw = event.data;
      const data = JSON.parse(raw);
      console.log(event);
      console.log(data);
      toast.info(
        <a href={data["run-id"]}>{data["message"]}</a>,
        {
          autoClose: false,
          closeOnClick: false
        }
      );
    });
};

export const findRunsEffect = (role: string, setRunsFn: (_: PIAUtils.Run[]) => void, extras: string = "") => {
  return () => {
    const go = async () => {
      try {
        setRunsFn(await findActiveRuns(role, extras));
      }
      catch (error) {
        // TODO: Add proper error handling.
        toast.error("PIA request broke!");
      }
    };
    go();
  };
};


// export const useEffectFindRuns = (role: string, setRunsFn: (_: PIAUtils.Run[]) => void, extras: string = "") => {
//   React.useEffect(
//     () => {
//       const go = async () => {
//         try {
//           setRunsFn(await findActiveRuns(role, extras));
//         }
//         catch (error) {
//           // TODO: Add proper error handling.
//           toast.error("PIA request broke!");
//         }
//       };
//       go();
//     },
//     // TODO: Change the empty list dependencies argument (below) to useEffect so it
//     // forces a refresh when the server informs the client that an invalidation of
//     // the run list has occurred.
//     []
//   );
// };

// export const useStateConnectNotificationSSE = (role: string, id: number = 1) => {
//   // FIXME: This should be useEffect and it should use a cleanup function to disconnect.
//   return React.useState<EventSource>(
//     SSEUtils.connect(
//       `${process.env.PIA_URL}/notifications/${role}/${id}`,
//       (sse, event) => {
//         const raw = event.data;
//         const data = JSON.parse(raw);
//         console.log(event);
//         console.log(data);
//         toast.info(
//           <a href={data["run-id"]}>{data["message"]}</a>,
//           {
//             autoClose: false,
//             closeOnClick: false
//           }
//         );
//       }
//     ));
// };

export const findActiveRuns = async (role: string, extras: string = "") => {
  const realExtras = ("" === extras || extras.startsWith("&")) ? extras : ("&" + extras);
  const resp = await PIAUtils.findRuns(`state=running&index.roles$contains=${role}${realExtras}`);
  return await Promise.all(resp.map(resolveRunPatient));
};

export const resolveRunPatient = async (run: PIAUtils.Run) => {
  run.index.patient = await PIAUtils.getPatient(run.index["patient-id"]);
  return run;
};

export const useEffectGetPatient = (patientId: number, setPatientsFn: (_: PIAUtils.Patient) => void) => {
  React.useEffect(
    () => {
      const getPatient = async () => {
        try {
          const resp = await PIAUtils.getPatient(patientId);
          setPatientsFn(resp);
        }
        catch (error) {
          // TODO: Add proper error handling.
          toast.error("PIA request broke!");
        }
      };
      getPatient();
    },
    []
  );
};


export const alertColorFromLevel = (level: string) => {
  switch (level) {
    case "info": return "green";
    case "warning": return "yellow";
    case "attention": return "red";
    default: return "green";
  }
};
