import * as React from "react";
import * as PIAUtils from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { ActivityListItem } from "./ActivityListItem";

interface Props {
  runs: PIAUtils.Run[];
}

export const ActivityList = ({ runs }: Props) => {
  return (
    <div className="flex flex-col flex-1 px-5">
      <h1 className="font-medium text-battleship mb-2">Activity List</h1>
      <div className="flex flex-col space-x-2">
        {runs.map((run) => (
          <ActivityListItem key={run.id} run={run} />
        ))}
      </div>
      <div className="inline-block mx-auto my-24">
        <Button color="grey200" size="slim">
          <span className="text-grey600 font-medium">
            Completed Activities (4)
          </span>
        </Button>
      </div>
    </div>
  );
};

// import * as React from "react";
// import * as RouterDOM from "react-router-dom";
// import { toast } from "react-toastify";

// import * as PIAUtils from "~/src/utils/pia";

// import "~/src/components/demo/common.css";

// interface Props {
//   patient: PIAUtils.Patient
// }

// export const Activities = (props: Props) => {

//   const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);

// React.useEffect(
//   () => {
//     const getActivities = async () => {
//       try {
//         const resp = await PIAUtils.findRuns(`state=running&index.patient-id=${props.patient.id}&index.roles$contains=patient`);
//         setRuns(resp);
//       }
//       catch (error) {
//         // TODO: Add proper error handling.
//         toast.error("PIA request broke!");
//       }
//     };
//     getActivities();
//   },
//   // TODO: Change the empty list dependencies argument (below) to useEffect so it
//   // forces a refresh when the server informs the client that an invalidation of
//   // the run list has occurred.
//   []
// );

//   return (
//     <div>
//       <div>
//         Activities:
//         <ul>
//           {runs.map(
//             run => (
//               <li key={run.id}
//                   className="underline" >
//                 <RouterDOM.Link
//                   to={{pathname: `/demo/patient/${props.patient.id}/${run.id}`,
//                        state: {run}}}>
//                   {run.index.title.toString() || run.state}
//                 </RouterDOM.Link>
//               </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );

// };
