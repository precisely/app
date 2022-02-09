import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { RunUI } from "~/src/components/pia-ui/RunUI";

import * as Common from "~/src/components/demo/common";

import "./common.css";


export const Lab = () => {

  const { patientId } = Router.useParams<{patientId: string}>();

  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);

  React.useEffect(Common.findRunsEffect('lab', setRuns, `index.patient-id=${patientId}`),
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []);

  const renderHelper = () => {
    if (undefined === runs || runs.length < 1) {
      return (<div>no runs</div>);
    }
    else {
      return (
        <div>
          {runs.map(run => {
            return (
              <div key={run.id}>
                <div>
                  {run.index.title}
                </div>
                <RunUI run={run} />
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div>
      lab UI
      {renderHelper()}
    </div>
  );

};
