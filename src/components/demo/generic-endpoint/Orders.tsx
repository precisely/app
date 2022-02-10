import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import * as Common from "~/src/components/demo/common";

import "~/src/components/demo/common.css";

interface Props {
  endpointId: number,
  endpointType: string
}

export const Orders = (props: Props) => {

  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  React.useEffect(
    Common.findRunsEffect(props.endpointType, setRuns, `index.${props.endpointType}-id=${props.endpointId}`),
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []
  );

  return (
    <div>
      <div>
        Orders:
        <ul>
          {runs.map(
            run => (
              <li key={run.id}
                className="underline" >
                <RouterDOM.Link
                  to={{
                    pathname: `/demo/${props.endpointType}/${props.endpointId}/${run.id}`,
                    state: { run }
                  }}>
                  <span>{run.index['patient-id']}</span>
                  <span>{run.index.patient.name}</span>
                  <span>{run.index.title.toString() || run.state}</span>
                  <span>{run.id}</span>

                </RouterDOM.Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );

};
