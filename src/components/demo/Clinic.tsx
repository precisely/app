import * as React from "react";

import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";


import * as SSEUtils from "~/src/utils/sse";

import { RunUI } from "~/src/components/pia-ui/RunUI";

import type { Run, Patient } from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { TherapyOverview } from "~/src/components/demo/TherapyOverview";
import { random } from "lodash";

export const Clinic = () => {

  const [sse, setSse] = React.useState<EventSource>(
    SSEUtils.connect(`${process.env.PIA_URL}/notifications/clinic/1`, (sse, event) => toast.info(event.data)));
  const [patientId, setPatientId] = React.useState<number>();
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  const getClinicRuns = async () => {
    const resp = await PIAUtils.findRuns(`state=running&index.roles$contains=doctor`);
    return await Promise.all(resp.map(resolveClinicRun));
  };

  const resolveClinicRun = async (run: Run) => {
    run.index.patient = await PIAUtils.getPatient(run.index["patient-id"]);
    return run;
  };

  React.useEffect(
    () => {
      const go = async () => {
        try {
          setRuns(await getClinicRuns());
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
        <th key={"therapeutic-patient"}>Patient</th>
        <th key={"therapeutic-age"}>Age</th>
        <th key={"therapeutic-phase"}>Phase</th>
        <th key={"therapeutic-dose"}>Dose</th>
        <th key={"therapeutic-last-inr"}>Last INR</th>
        <th key={"therapeutic-alert"}>Alert</th>
      </tr>
    </thead>;

  const patientRow = (run: Run) =>
    <tr key={run.id} onClick={() => toggleRunVisibility(run)}>
      <td key={run.id + "_p-name"} >{run.index.patient.name}</td>
      <td key={run.id + "_p-age"} >{run.index.patient.age}</td>
      <td key={run.id + "_p-phase"}>{run.index?.overview?.phase}</td>
      <td key={run.id + "_p-dose"}>{run.index?.overview?.dose}</td>
      <td key={run.id + "_p-last-inr"}>{run.index?.overview ? run.index?.overview["last-inr"] : null}</td>
      <td key={run.id + "_p-alert"} color={alertColor(run)}>{run.index?.overview?.alert?.text}</td>
    </tr>;

  const detailRow = (run: Run) =>
    run.index.visible
      ? <tr key={run.id + "_detail"}><td colSpan={6}><TherapyOverview run={run}></TherapyOverview></td></tr>
      : null;

  const mainTable = () => (
    <div>
      <table style={{ width: '100%' }}>
        {header()}
        <tbody key={"clinic-body"}>
          {runs.map(
            (run, idx) => [
              patientRow(run),
              detailRow(run)
            ])}
        </tbody>
      </table>
    </div>
  );

  const newPatient = (patientId: number) => {
    PIAUtils.startRun('anticoagulation', [patientId]).then(getClinicRuns).then(setRuns);
  };

  return (
    <div>
      <div className="grid grid-cols-3 content-center">
        <div className="flex items-center justify-center col-start-2 col-span-1">
          Anticoagulation Therapy
        </div>
      </div>

      <div className="pt-6 grid grid-cols-6">
        <div className="col-start-3 col-span-1 pr-2">
          <input className="w-full h-full"
            type="number"
            value={patientId}
            onChange={(event) => setPatientId(parseInt(event.target.value))}
            min="1" />
        </div>
        <div className="col-start-4">
          <Button text="Start Patient"
            color="cardinal"
            classes="w-full py-2 pr-2"
            callback={() => newPatient(patientId)} />
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
