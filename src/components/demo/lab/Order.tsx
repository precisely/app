import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";

import { Button } from "~/src/components/Button";

import { RunUI } from "~/src/components/pia-ui/RunUI";

import "~/src/components/demo/common.css";

interface Props {
  labId: number,
  runId: string
}

export const Order = (props: Props) => {

  const { labIdParam, runId } = Router.useParams<{labIdParam: string, runId: string}>();
  const labId = parseInt(labIdParam);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  React.useEffect(
    () => {
      const getRun = async (runId: string) => {
        try {
          const resp = await PIAUtils.getRun(runId);
          setCurrentRun(resp);
        }
        catch (error) {
          // TODO: Add proper error handling.
          toast.error("PIA request broke!");
        }
      };
      // if the run has been passed into this component through RouterDOM.Link
      // state, use it; otherwise use the run id to retrieve it
      if (location.state && location.state.run) {
        setCurrentRun(location.state.run);
      }
      else {
        getRun(runId);
      }
    },
    []
  );

  const renderHelper = () => {
    if (undefined === currentRun) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          <RouterDOM.Link to={`/demo/patient/${patientId}`}>
        &lt; Return to run list
          </RouterDOM.Link>
          <RunUI run={currentRun} />
        </div>
      );
    }
  };

  return renderHelper();

};
