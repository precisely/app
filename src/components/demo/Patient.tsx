import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";

import { Button } from "~/src/components/Button";


export const Patient = () => {

  const patientId = 123;

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

  const renderCurrentRun = () => {
    if (undefined === currentRun) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          currently running {currentRun.id}
        </div>
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
                        callback={() => setCurrentRun(run)} />
              </li>
          ))}
        </ul>
      </div>
      {renderCurrentRun()}
    </div>
  );

};
