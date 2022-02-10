import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import * as PIAUtils from "~/src/utils/pia";
import { useTitle } from "~/src/utils/react";

import * as Common from "~/src/components/demo/common";
import { HomePage } from "./pages/home/HomePage";
import { PatientProvider } from "./common";
import { ActivityPage } from "./pages/activity/ActivityPage";

export const Patient = () => {
  const { patientId } = Router.useParams<{ patientId: string }>();

  useTitle("Precise.ly: Patient UI");

  React.useEffect(
    Common.serverSideEventSource("patient", parseInt(patientId)),
    [] // only connect once
  );

  const [patient, setPatient] = React.useState<PIAUtils.Patient>();
  Common.useEffectGetPatient(parseInt(patientId), setPatient);

  if (patient === undefined) {
    return <div></div>;
  }

  return (
    <PatientProvider value={patient}>
      <RouterDOM.BrowserRouter>
        <RouterDOM.Switch>
          <RouterDOM.Route
            path="/demo/patient/:patientId/:runId"
            render={(_props) => <ActivityPage />}
          />
          <RouterDOM.Route
            path="/demo/patient/:patientId"
            render={(_props) => <HomePage />}
          />
        </RouterDOM.Switch>
      </RouterDOM.BrowserRouter>
    </PatientProvider>
  );
};

// import * as React from "react";
// import * as Router from "react-router";
// import * as RouterDOM from "react-router-dom";

// import * as PIAUtils from "~/src/utils/pia";

// import * as Common from "~/src/components/demo/common";
// import { Activities} from "~/src/components/demo/patient/Activities";
// import { Activity } from "~/src/components/demo/patient/Activity";

// import "~/src/components/demo/common.css";

// export const Patient = () => {

//   const { patientId } = Router.useParams<{patientId: string}>();

// React.useEffect(
//   Common.serverSideEventSource("patient", parseInt(patientId)),
//   [] // only connect once
// );

//   const [patient, setPatient] = React.useState<PIAUtils.Patient>();
//   Common.useEffectGetPatient(parseInt(patientId), setPatient);

//   const renderHelper = () => {
//     if (undefined === patient) {
//       return (<div></div>);
//     }
//     else {
//       return (
//         <div>
//           Hello, {patient.name}!
//           <RouterDOM.BrowserRouter>
//             <RouterDOM.Switch>
//               <RouterDOM.Route path="/demo/patient/:patientId/:runId"
//                                render={(_props) => <Activity patient={patient} />} />
//               <RouterDOM.Route path="/demo/patient/:patientId"
//                                render={(_props) => <Activities patient={patient} />} />
//             </RouterDOM.Switch>
//           </RouterDOM.BrowserRouter>
//         </div>
//       );
//     }
//   };

//   return renderHelper();

// };
