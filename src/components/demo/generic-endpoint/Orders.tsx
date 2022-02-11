import * as React from "react";
import * as RouterDOM from "react-router-dom";

import * as PIAUtils from "~/src/utils/pia";
import * as Common from "~/src/components/demo/common";

import "~/src/components/demo/common.css";
import { PageTitle } from "../clinic/ui/PageTitle";
import { Table } from "../clinic/ui/Table/Main";
import { TableHeader } from "../clinic/ui/Table/TableHeader";
import { TableCell } from "../clinic/ui/Table/TableCell";

interface Props {
  endpointId: number;
  endpointType: string;
}

export const Orders = (props: Props) => {
  const [runs, setRuns] = React.useState<PIAUtils.Run[]>([]);
  const history = RouterDOM.useHistory();
  React.useEffect(
    Common.findRunsEffect(
      props.endpointType,
      setRuns,
      `index.${props.endpointType}-id=${props.endpointId}`
    ),
    // TODO: Change the empty list dependencies argument (below) to useEffect so it
    // forces a refresh when the server informs the client that an invalidation of
    // the run list has occurred.
    []
  );

  return (
    <div className="flex flex-col flex-1">
      <PageTitle title="Orders" />
      <div className="flex flex-1">
        <Table<PIAUtils.Run>
          headers={[
            <TableHeader key="patient-id" text="Id" />,
            <TableHeader
              key="patient-name"
              text="Patient Name"
              sortable={true}
            />,
            <TableHeader
              key="patient-description"
              text="Description"
              sortable={true}
            />,
            <TableHeader key="run-id" text="Tracking Id" sortable={true} />,
          ]}
          data={runs}
          renderItem={(run, index) => (
            <tr
              key={run.id}
              className={`hover:bg-grey50 hover:cursor-pointer ${
                index % 2 == 0 ? "bg-platinum" : ""
              }`}
              onClick={() => {
                history.push(
                  `/demo/${props.endpointType}/${props.endpointId}/${run.id}`,
                  { run }
                );
              }}
            >
              <TableCell>{run.index["patient-id"]}</TableCell>
              <TableCell>{run.index.patient.name}</TableCell>
              <TableCell>{run.index.title.toString() || run.state}</TableCell>
              <TableCell>{run.id}</TableCell>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

// return (
//   <div>
//     <div>
//       Orders:
//       <ul>
//         {runs.map((run) => (
//           <li key={run.id} className="underline">
//             <RouterDOM.Link
//               to={{
//                 pathname: `/demo/${props.endpointType}/${props.endpointId}/${run.id}`,
//                 state: { run },
//               }}
//             >
//               <span>{run.index["patient-id"]}</span>
//               <span>{run.index.patient.name}</span>
//               <span>{run.index.title.toString() || run.state}</span>
//               <span>{run.id}</span>
//             </RouterDOM.Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );
