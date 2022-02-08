import * as React from "react";

import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";


import * as SSEUtils from "~/src/utils/sse";

import { RunUI } from "~/src/components/pia-ui/RunUI";

import type { Run, Patient } from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { TherapyDetail } from "~/src/components/demo/TherapyDetail";

/**
 * The Lab component
 * @returns
 */
export const Lab = () => {

  const [sse, setSse] = React.useState<EventSource>(
    SSEUtils.connect(`${process.env.PIA_URL}/notifications/lab/1`, (sse, event) => toast.info(event.data)));
  const [patientId, setPatientId] = React.useState<number>();
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  const getLabRuns = async () => {
    const resp = await PIAUtils.findRuns(`state=running&index.roles$contains=lab`);
    return await Promise.all(resp.map(resolveLabRun));
  };

  const resolveLabRun = async (run: Run) => {
    run.index.patient = await PIAUtils.getPatient(run.index["patient-id"]);
    return run;
  };

  React.useEffect(
    () => {
      const go = async () => {
        try {
          setRuns(await getLabRuns());
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

  const alertColor = (run: Run) => {
    switch (run.index.overview?.alert?.level) {
      case "info": return "green";
      case "warning": return "yellow";
      case "attention": return "red";
      default: return "green";
    }
  };

  const toggleRunVisibility = (run: Run) => {
    setRuns(runs.map(r => {
      if (r.id == run.id) {
        r.index.visible = !run.index.visible;
      }
      return r;
    }));
  };

  const header = () =>
    <thead key={"clinic-head"}>
      <tr>
        <th key={"orders"}>Name</th>
      </tr>
    </thead>;

  const patientRow = (run: Run, idx: number) =>
    <tr key={idx} onClick={() => toggleRunVisibility(run)}>
      <td key={"name_"+ idx} >{run.index.patient.name}</td>
    </tr>;

  const detailRow = (run: Run, idx: number) =>
    run.index.visible
      ? <tr key={"run_" + idx}><td colSpan={3}><RunUI run={run}></RunUI></td></tr>
      : null;

  const mainTable = () => (
    <div>
      <table style={{ width: '100%' }}>
        {header()}
        <tbody key={"lab-body"}>
          {runs.map(
            (run, idx) => [
              patientRow(run, idx),
              detailRow(run, idx)
            ])}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-3 content-center">
        <div className="flex items-center justify-center col-start-2 col-span-1">
          Lab Orders
        </div>
      </div>

      <div>
        <div className="pt-6 grid grid-cols-6">
          <div className="col-start-2 col-span-4 pr-2">
            {mainTable()}
          </div>
        </div>
      </div>
    </div>
  );

};
