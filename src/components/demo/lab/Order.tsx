import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as PIAUtils from "~/src/utils/pia";

import { RunUI } from "~/src/components/pia-ui/RunUI";
import * as Common from "~/src/components/demo/common";

import "~/src/components/demo/common.css";

interface Props {
  labId: number,
  runId: string
}

export const Order = (props: Props) => {

  const { labIdParam, runId } = Router.useParams<{labIdParam: string, runId: string}>();
  const labId = parseInt(labIdParam);
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  React.useEffect(Common.getRunEffect(() => runId, setCurrentRun));

  const renderHelper = () => {
    if (undefined === currentRun) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          <RouterDOM.Link to={`/demo/lab/${labId}`}>
        &lt; Return to orders
          </RouterDOM.Link>
          <RunUI run={currentRun} />
        </div>
      );
    }
  };

  return renderHelper();

};
