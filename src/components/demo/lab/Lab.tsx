import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import { Order } from '~/src/components/demo/lab/Order';
import { Orders } from '~/src/components/demo/lab/Orders';

import * as Common from "~/src/components/demo/common";

import "./common.css";


export const Lab = () => {

  const { labIdParam, runId } = Router.useParams<{ labIdParam: string, runId: string }>();
  const labId = parseInt(labIdParam);

  const [_sse, _setSse] = Common.useStateConnectNotificationSSE("lab", labId);

  // const [patient, setPatient] = React.useState<PIAUtils.Patient>();
  // Common.useEffectGetPatient(parseInt(patientId), setPatient);


  const renderHelper = () => {
    if (undefined === labId) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          Lab # {labId}!
          <RouterDOM.BrowserRouter>
            <RouterDOM.Switch>
              <RouterDOM.Route path="/demo/lab/:labId/:runId"
                render={(_props) => <Order labId={labId} runId={runId} />} />
              <RouterDOM.Route path="/demo/lab/:labId"
                render={(_props) => <Orders labId={labId} />} />
            </RouterDOM.Switch>
          </RouterDOM.BrowserRouter>
        </div>
      );
    }

  };
  return <div>{ labId==1 ? "Labcorp" : {renderHelper()}</div>;
}
// export const Lab = () => {

//   const { patientId } = Router.useParams<{ patientId: string }>();

//   const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
//   Common.useEffectFindRuns("lab", setRuns, `index.patient-id=${patientId}&index.lab-id=${lab - id}`);

//   const renderHelper = () => {
//     if (undefined === runs || runs.length < 1) {
//       return (<div>no runs</div>);
//     }
//     else {
//       return (
//         <div>
//           {runs.map(run => {
//             return (
//               <div key={run.id}>
//                 <div>
//                   {run.index.title}
//                 </div>
//                 <RunUI run={run} />
//               </div>
//             );
//           })}
//         </div>
//       );
//     }
//   };

//   return (
//     <div>
//       lab UI
//       {renderHelper()}
//     </div>
//   );

// };
