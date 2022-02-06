/**
 * Shows standard elements of a therapeutic program
 *   - The patient being treated
 *   - Current activities
 */
import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";

import type { Run, Patient } from "~/src/utils/pia";

interface Props {
  run: Run
}

export const TherapyOverview = (props: Props) => {

  const [run, setRun] = React.useState<PIAUtils.Run>(props.run);

  // React.useEffect(
  //   () => {
  //     const go = async () => {
  //       try {
  //         setRun(await getClinicRuns());
  //       }
  //       catch (error) {
  //         // TODO: Add proper error handling.
  //         toast.error("PIA request broke!");
  //       }
  //     };
  //     go();
  //   },
  //   // TODO: Change the empty list dependencies argument (below) to useEffect so it
  //   // forces a refresh when the server informs the client that an invalidation of
  //   // the run list has occurred.
  //   []
  // );

  // const switchRun = (run: PIAUtils.Run) => {
  //   setCurrentRun(run);
  //   // use PIA utils here to switch to the run (continue?)
  // };

  // const renderCurrentRun = () => {
  //   if (undefined === currentRun) {
  //     return (<div></div>);
  //   }
  //   else {
  //     return (
  //       <RunUI run={currentRun} />
  //     );
  //   }
  // };

  return (
    <div>
      <div>
        Activities:
        {/* <ul>
          {run.status.runs.map(
            (run: Run) => (
              <li key={run.id}>
                <div>{run.status.patient.name}</div>
                <div>{run.status.patient.age}</div>
              </li>
              // <li key={run.id}>
              //   <Button text={run.status.title || run.id}
              //           color="cardinal"
              //           callback={() => switchRun(run)} />
              // </li>
          ))}
        </ul> */}
      </div>

    </div>
  );

};
