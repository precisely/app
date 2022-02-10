import * as React from "react";
import * as PIAUtils from "~/src/utils/pia";

import type { Run } from "~/src/utils/pia";
import { useTitle } from "~/src/utils/react";

import { Button } from "~/src/components/Button";
import * as Common from "~/src/components/demo/common";

import { ClinicTable } from "~/src/components/demo/clinic/ClinicTable";
import { Icon } from "~/src/components/demo/clinic/ui/Icon";
import { Layout } from "~/src/components/demo/clinic/ui/Layout";
import { PageTitle } from "~/src/components/demo/clinic/ui/PageTitle";
import { Input } from "~/src/components/demo/clinic/ui/Input";


export const Clinic = () => {

  useTitle("Precise.ly: Clinic UI");

  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const [patientId, setPatientId] = React.useState<number>();

  React.useEffect(Common.findRunsEffect('doctor', setRuns),
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []);

  const toggleRunVisibility = (run: Run) => {
    setRuns(
      runs.map((r) => {
        if (r.id == run.id) {
          r.index.visible = !run.index.visible;
        }
        return r;
      })
    );
  };

  const setNewPatient = (value: string) => {
    setPatientId(parseInt(value));
  };

  const newPatient = async () => {
    console.log("newPatient:", patientId);
    const newRun = await PIAUtils.startRun("anticoagulation", [patientId]);
    console.log("newPatient => newRun =", newRun);
    setRuns(await Common.findActiveRuns("doctor"));
    setPatientId(null);
  };

  return (
    <Layout>
      <PageTitle
        title="Patients"
        actions={
          <div className="flex items-center space-x-2">
            <Input
              value={patientId}
              setValue={setNewPatient}
              placeholder="Patient Id"
            />
            <Button color="brick" callback={newPatient}>
              <div className="flex items-center space-x-2">
                <Icon name="folderPlus" size={24} color={"blush"} />
                <span className="font-medium text-cloud">New Patient</span>
              </div>
            </Button>
          </div>
        }
      />
      <div className="flex-1">
        <ClinicTable data={runs} onRowClick={toggleRunVisibility} />
      </div>
    </Layout>
  );
};

// import * as React from "react";

// import { toast } from "react-toastify";

// import * as PIAUtils from "~/src/utils/pia";

// import * as SSEUtils from "~/src/utils/sse";

// import { RunUI } from "~/src/components/pia-ui/RunUI";

// import type { Run, Patient } from "~/src/utils/pia";

// import { Button } from "~/src/components/Button";
// import { TherapyDetail } from "~/src/components/demo/TherapyDetail";
// import { useNotificationState, alertColorFromLevel, useUpdateRunEffect, findActiveRuns } from './common';

// export const Clinic = () => {

//   const [sse, setSse] = useNotificationState('clinic');
//   const [patientId, setPatientId] = React.useState<number>();
//   const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
//   const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

//   useUpdateRunEffect('doctor', setRuns);

//   const switchRun = (run: PIAUtils.Run) => {
//     setCurrentRun(run);
//     // use PIA utils here to switch to the run (continue?)
//   };

//   const renderCurrentRun = () => currentRun ? <RunUI run={currentRun} /> : (<div></div>);

//   const toggleRunVisibility = (run: Run) => {
//     setRuns(runs.map(r => {
//       if (r.id == run.id) {
//         r.index.visible = !run.index.visible;
//       }
//       return r;
//     }));
//   };

//   const header = () =>
//     <thead key={"clinic-head"}>
//       <tr>
//         <th key={"therapeutic-patient"}>Patient</th>
//         <th key={"therapeutic-age"}>Age</th>
//         <th key={"therapeutic-phase"}>Phase</th>
//         <th key={"therapeutic-dose"}>Dose</th>
//         <th key={"therapeutic-last-inr"}>Last INR</th>
//         <th key={"therapeutic-alert"}>Alert</th>
//       </tr>
//     </thead>;

//   const patientRow = (run: Run) =>
//     <tr key={run.id} onClick={() => toggleRunVisibility(run)}>
//       <td key={run.id + "_p-name"} >{run.index.patient.name}</td>
//       <td key={run.id + "_p-age"} >{run.index.patient.age}</td>
//       <td key={run.id + "_p-phase"}>{run.index?.overview?.phase}</td>
//       <td key={run.id + "_p-dose"}>{run.index?.overview?.dose}</td>
//       <td key={run.id + "_p-last-inr"}>{run.index?.overview ? run.index?.overview["last-inr"] : null}</td>
//       <td key={run.id + "_p-alert"} color={alertColorFromLevel(run.index?.overview?.alert?.level)}>{run.index?.overview?.alert?.text}</td>
//     </tr>;

//   const detailRow = (run: Run) =>
//     run.index.visible
//       ? <tr key={run.id + "_detail"}><td colSpan={6}><TherapyDetail run={run}></TherapyDetail></td></tr>
//       : null;

//   const mainTable = () => (
//     <div>
//       <table style={{ width: '100%' }}>
//         {header()}
//         <tbody key={"clinic-body"}>
//           {runs.map(
//             (run, idx) => [
//               patientRow(run),
//               detailRow(run)
//             ])}
//         </tbody>
//       </table>
//     </div>
//   );

//   const newPatient = async (patientId: number) => {
//     console.log("newPatient:", patientId);
//     const newRun = await PIAUtils.startRun('anticoagulation', [patientId]);
//     console.log("newPatient => newRun =", newRun);
//     setRuns(await findActiveRuns('doctor'));
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-3 content-center">
//         <div className="flex items-center justify-center col-start-2 col-span-1">
//           Anticoagulation Therapy
//         </div>
//       </div>

//       <div className="pt-6 grid grid-cols-6">
//         <div className="col-start-3 col-span-1 pr-2">
//           <input className="w-full h-full"
//             type="number"
//             value={patientId}
//             onChange={(event) => setPatientId(parseInt(event.target.value))}
//             min="1" />
//         </div>
//         <div className="col-start-4">
//           <Button text="Start Patient"
//             color="cardinal"
//             classes="w-full py-2 pr-2"
//             callback={() => newPatient(patientId)} />
//         </div>
//       </div>

//       <div>
//         <div className="pt-6 grid grid-cols-6">
//           <div className="col-start-2 col-span-4 pr-2">
//             {mainTable()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// };
