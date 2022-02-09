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

  const [patient, setPatient] = React.useState<PIAUtils.Patient>();
  Common.useEffectGetPatient(parseInt(patientId), setPatient);

  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  Common.useEffectFindRuns("lab", setRuns, `index.patient-id=${patientId}`);

  const renderHelper = () => {
    if (undefined === runs) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          {runs.map(run => <RunUI run={run} />)}
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
