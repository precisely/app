import * as React from "react";

import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";


import * as SSEUtils from "~/src/utils/sse";

import { RunUI } from "~/src/components/pia-ui/RunUI";

import type { Run, Patient } from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { TherapyDetail } from "~/src/components/demo/TherapyDetail";
import { useStateConnectNotificationSSE, alertColorFromLevel, useEffectFindRuns, findActiveRuns } from './common';

export const Clinic = () => {

  const [sse, setSse] = useStateConnectNotificationSSE('clinic');
  const [patientId, setPatientId] = React.useState<number>();
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  useEffectFindRuns('doctor', setRuns);

  const switchRun = (run: PIAUtils.Run) => {
    setCurrentRun(run);
    // use PIA utils here to switch to the run (continue?)
  };

  const renderCurrentRun = () => currentRun ? <RunUI run={currentRun} /> : (<div></div>);

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
      <td key={run.id + "_p-alert"} color={alertColorFromLevel(run.index?.overview?.alert?.level)}>{run.index?.overview?.alert?.text}</td>
    </tr>;

  const detailRow = (run: Run) =>
    run.index.visible
      ? <tr key={run.id + "_detail"}><td colSpan={6}><TherapyDetail run={run}></TherapyDetail></td></tr>
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

  const newPatient = async (patientId: number) => {
    console.log("newPatient:", patientId);
    const newRun = await PIAUtils.startRun('anticoagulation', [patientId]);
    console.log("newPatient => newRun =", newRun);
    setRuns(await findActiveRuns('doctor'));
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
