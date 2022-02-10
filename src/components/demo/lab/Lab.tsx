import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import { Order } from '~/src/components/demo/lab/Order';
import { Orders } from '~/src/components/demo/lab/Orders';

import * as Common from "~/src/components/demo/common";
import * as PIAUtils from '~/src/utils/pia';
import "~/src/components/demo/common.css";

export const Lab = () => {
  const { labId, runId } = Router.useParams<{ labId: string, runId: string }>();
  const labIdInt = parseInt(labId);

  // const [_sse, _setSse] = Common.useStateConnectNotificationSSE("lab", labId);

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
                render={(_props) => <Order labId={labIdInt} runId={runId} />} />
              <RouterDOM.Route path="/demo/lab/:labId"
                render={(_props) => <Orders labId={labIdInt} />} />
            </RouterDOM.Switch>
          </RouterDOM.BrowserRouter>
        </div>
      );
    }

  };
  console.log("In Lab.tsx, labId=", labId)
  return (
    <div>
      <div>{labIdInt == 1 ? "Labcorp" : "Genetics Lab"}</div>
      {renderHelper()}
    </div>);
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
