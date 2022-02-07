import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import * as SSEUtils from "~/src/utils/sse";

import { Button } from "~/src/components/Button";

import { RunUI } from "~/src/components/pia-ui/RunUI";

import "./common.css";


export const Patient = () => {

  const { patientId } = Router.useParams<{patientId: string}>();

  const [sse, setSse] = React.useState<EventSource>(
    SSEUtils.connect(
      `${process.env.PIA_URL}/notifications/patient/${patientId}`,
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
      }
  ));
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  React.useEffect(
    () => {
      const go = async () => {
        try {
          const resp = await PIAUtils.findRuns(`state=running&index.patient-id=${patientId}&index.roles$contains=patient`);
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
                <Button text={run.index.title.toString() || run.state}
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
