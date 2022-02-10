import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import * as SSEUtils from "~/src/utils/sse";
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
  return () => {
    const sse: EventSource = SSEUtils.connect(
      `${process.env.PIA_URL}/notifications/${role}/${id}`,
      // onMessage:
      (_sse, event) => {
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

    SSEUtils.connect
    // return a cleanup function
    return () => {
      sse.close();
    };
  };
}

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

export const getRunEffect = (
  runIdAccessor: () => string,
  setRun: (value: React.SetStateAction<PIAUtils.Run>) => void) => {
  return () => {
      const getRun = async () => {
        try {
          const resp = await PIAUtils.getRun(runIdAccessor());
          setRun(resp);
        }
        catch (error) {
          // TODO: Add proper error handling.
          toast.error("PIA request broke!");
        }

      };
      getRun();
    };
    // // if the run has been passed into this component through RouterDOM.Link
    // // state, use it; otherwise use the run id to retrieve it
    // if (location.state && location.state.run) {
    //   setRun(location.state.run);
    // }
    // else {
    //   getRun(runId);
    // }
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
