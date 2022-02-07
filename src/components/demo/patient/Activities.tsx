import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";

import "~/src/components/demo/common.css";


interface Props {
  patient: PIAUtils.Patient
}


export const Activities = (props: Props) => {

  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);

  React.useEffect(
    () => {
      const getActivities = async () => {
        try {
          const resp = await PIAUtils.findRuns(`state=running&index.patient-id=${props.patient.id}&index.roles$contains=patient`);
          setRuns(resp);
        }
        catch (error) {
          // TODO: Add proper error handling.
          toast.error("PIA request broke!");
        }
      };
      getActivities();
    },
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []
  );

  return (
    <div>
      <div>
        Activities:
        <ul>
          {runs.map(
            run => (
              <li key={run.id}
                  className="underline" >
                <RouterDOM.Link
                  to={{pathname: `/demo/patient/${props.patient.id}/${run.id}`,
                       state: {run}}}>
                  {run.index.title.toString() || run.state}
                </RouterDOM.Link>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );

};
