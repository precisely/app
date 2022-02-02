import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import * as SSEUtils from "~/src/utils/sse";

import { Button } from "~/src/components/Button";

import { Run as PIAUIRun } from "~/src/components/pia-ui/Run";
import { RunUI } from "~/src/components/app/pia-old/RunUI";


export const Patient = () => {

  const patientId = 123;

  const [sse, setSse] = React.useState<EventSource>(
    SSEUtils.connect(`${process.env.PIA_URL}/notifications/patient/${patientId}`, (sse, event) => toast.info(event.data)));
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  React.useEffect(
    () => {
      const go = async () => {
        try {
          const resp = await PIAUtils.findRuns(`state=running&status.patient-id=${patientId}&status.roles$=patient`);
          setRuns(resp);
        }
        catch (error) {
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

  const switchRun = (run: PIAUtils.Run) => {
    setCurrentRun(run);
    // use PIA utils here to switch to the run (continue?)
  };

  const renderCurrentRun = () => {
    if (undefined === currentRun) {
      return (<div></div>);
    }
    else {
      // return (
      //   <PIAUIRun run={currentRun} />
      // );
      return (
        <RunUI run={currentRun} />
      );
    }
  };

  return (
    <div>
      <div>
        Patient runs:
        <ul>
          {runs.map(
            run => (
              <li key={run.id}>
                <Button text={run.id}
                        color="cardinal"
                        callback={() => switchRun(run)} />
              </li>
          ))}
        </ul>
      </div>
      {renderCurrentRun()}
    </div>
  );

};
