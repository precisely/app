import * as React from "react";
import { Header } from "~/src/components/demo/patient/ui/Header";
import { Layout } from "~/src/components/demo/patient/ui/Layout";
import { Icon } from "~/src/components/demo/Icon";

export const RunPage = () => {
  return (
    <Layout>
      <Header />
      <div className="flex flex-col flex-1 px-5">
        <div className="flex">
          <Icon name="chevronLeft" size={24} color="battleship" />
          <h1 className="font-medium text-battleship mb-2">Activity List</h1>
        </div>
      </div>
    </Layout>
  );
};

// import * as React from "react";
// import * as Router from "react-router";
// import * as RouterDOM from "react-router-dom";
// import { toast } from "react-toastify";

// import * as PIAUtils from "~/src/utils/pia";

// import { Button } from "~/src/components/Button";

// import { RunUI } from "~/src/components/pia-ui/RunUI";

// import "~/src/components/demo/common.css";

// interface Props {
//   patient: PIAUtils.Patient,
// }

// interface LocationState {
//   pathname: string;
//   state: {
//     run: PIAUtils.Run
//   }
// }

// export const Run = (props: Props) => {

//   const { patientId, runId } = Router.useParams<{patientId: string, runId: string}>();
//   const location = Router.useLocation<LocationState>();

//   const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

//   React.useEffect(
//     () => {
//       const getRun = async (runId: string) => {
//         try {
//           const resp = await PIAUtils.getRun(runId);
//           setCurrentRun(resp);
//         }
//         catch (error) {
//           // TODO: Add proper error handling.
//           toast.error("PIA request broke!");
//         }
//       };
//       // if the run has been passed into this component through RouterDOM.Link
//       // state, use it; otherwise use the run id to retrieve it
//       if (location.state && location.state.run) {
//         setCurrentRun(location.state.run);
//       }
//       else {
//         getRun(runId);
//       }
//     },
//     []
//   );

//   const renderHelper = () => {
//     if (undefined === currentRun) {
//       return (<div></div>);
//     }
//     else {
//       return (
//         <div>
//           <RouterDOM.Link to={`/demo/patient/${patientId}`}>
//         &lt; Return to run list
//           </RouterDOM.Link>
//           <RunUI run={currentRun} />
//         </div>
//       );
//     }
//   };

//   return renderHelper();

// };
