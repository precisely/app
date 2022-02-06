import * as React from "react";

import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";


import * as SSEUtils from "~/src/utils/sse";

import { RunUI } from "~/src/components/pia-ui/RunUI";

import type { Run, Patient } from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { TherapyOverview } from "~/src/components/demo/TherapyOverview";

export const Clinic = () => {

  const [sse, setSse] = React.useState<EventSource>(
    SSEUtils.connect(`${process.env.PIA_URL}/notifications/clinic/1`, (sse, event) => toast.info(event.data)));
  const [patientId, setPatientId] = React.useState<number>();
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  const getClinicRuns = async () => {
    const resp = await PIAUtils.findRuns(`state=running&status.roles$contains=doctor`);
    return await Promise.all(resp.map(resolveClinicRun));
  };

  const resolveClinicRun = async (run: Run) => {
    run.status.patient = await PIAUtils.getPatient(run.status["patient-id"]);
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
    switch (run.status.overview?.alert?.level) {
      case "info": return "green";
      case "warning": return "yellow";
      case "attention": return "red";
      default: return "green";
    }
  };

  const toggleRunVisibility = (run: Run) => {
    setRuns(runs.map(r => {
      if (r.id == run.id) {
        r.status.visible = !run.status.visible;
      }
      return r;
    }));
  };

  const therapeuticRunsTable = () => (
    <div>
      <span style={{alignContent: 'center'}}>Anticoagulation Therapy Programs:</span>
      <div>
        <table style={{  width: '100%' }}>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age</th>
              <th>Phase</th>
              <th>Dose</th>
              <th>Last INR</th>
              <th>Alert</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(
              run => (
                <tr key={run.id} onClick={() => toggleRunVisibility(run)}>
                  <td>{run.status.patient.name}</td>
                  <td>{run.status.patient.age}</td>
                  <td>{run.status?.overview?.phase}</td>
                  <td>{run.status?.overview?.dose}</td>
                  <td>{run.status?.overview ? run.status?.overview["last-inr"] : null}</td>
                  <td color={alertColor(run)}>{run.status?.overview?.alert?.text}</td>
                  {(run.status.visible)
                    ? <TherapyOverview run={run}></TherapyOverview>
                    : null}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const newPatient = (patientId: number) => {
    PIAUtils.startRun('anticoagulation', [patientId]).then(getClinicRuns).then(setRuns);
  };

  return (
    <div>
      <div className="pt-6 grid grid-cols-6">
        <h1>Anticoagulation Therapy</h1>
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
            {therapeuticRunsTable()}
          </div>
        </div>
      </div>

    </div>
  );

};
