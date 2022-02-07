import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import * as SSEUtils from "~/src/utils/sse";

import { Activities} from "~/src/components/demo/patient/Activities";
import { Run } from "~/src/components/demo/patient/Run";

import "~/src/components/demo/common.css";


export const Patient = () => {

  const { patientId } = Router.useParams<{patientId: string}>();

  const [sse, setSse] = React.useState<EventSource>(
    SSEUtils.connect(
      `${process.env.PIA_URL}/notifications/patient/${patientId}`,
      (sse, event) => {
        const raw = event.data;
        const data = JSON.parse(raw);
        console.log(event);
        console.log(data);
        toast.info(
          <a href={data["run-id"]}>{data["message"]}</a>,
          {
            autoClose: false,
            closeOnClick: false
          }
        );
      }
  ));

  const [patient, setPatient] = React.useState<PIAUtils.Patient>();

  React.useEffect(
    () => {
      const getPatient = async () => {
        try {
          const resp = await PIAUtils.getPatient(parseInt(patientId));
          setPatient(resp);
        }
        catch (error) {
          // TODO: Add proper error handling.
          toast.error("PIA request broke!");
        }
      };
      getPatient();
    },
    []
  );

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
