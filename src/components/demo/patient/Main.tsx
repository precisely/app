import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";

import * as Common from "~/src/components/demo/common";
import { Activities} from "~/src/components/demo/patient/Activities";
import { Run } from "~/src/components/demo/patient/Run";

import "~/src/components/demo/common.css";


export const Patient = () => {

  const { patientId } = Router.useParams<{patientId: string}>();

  const [_sse, _setSse] = Common.useNotificationState("patient", parseInt(patientId));

  const [patient, setPatient] = React.useState<PIAUtils.Patient>();
  Common.useGetPatientEffect(parseInt(patientId), setPatient);

  const renderHelper = () => {
    if (undefined === patient) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          Hello, {patient.name}!
          <RouterDOM.BrowserRouter>
            <RouterDOM.Switch>
              <RouterDOM.Route path="/demo/patient/:patientId/:runId"
                               render={(_props) => <Run patient={patient} />} />
              <RouterDOM.Route path="/demo/patient/:patientId"
                               render={(_props) => <Activities patient={patient} />} />
            </RouterDOM.Switch>
          </RouterDOM.BrowserRouter>
        </div>
      );
    }
  };

  return renderHelper();

};
