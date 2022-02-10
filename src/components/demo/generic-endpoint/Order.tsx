import * as React from "react";
import * as Router from "react-router";

import * as PIAUtils from "~/src/utils/pia";

import { RunUI } from "~/src/components/pia-ui/RunUI";
import * as Common from "~/src/components/demo/common";
import { Breadcrumb } from "~/src/components/demo/patient/ui/Breadcrumb";

import "~/src/components/demo/common.css";

interface Props {
  endpointType: string;
  endpointId: number;
  runId: string;
}

export const Order = (props: Props) => {
  const { endpointId, runId } =
    Router.useParams<{ endpointId: string; runId: string }>();
  const [currentRun, setCurrentRun] = React.useState<PIAUtils.Run>();

  React.useEffect(
    Common.getRunEffect(
      () => runId,
      () => currentRun,
      setCurrentRun
    )
  );

  const renderHelper = () => {
    if (undefined === currentRun) {
      return <div></div>;
    } else {
      return (
        <div className="flex-1 bg-grey50 px-5 pt-4">
          <Breadcrumb
            to={`/demo/${props.endpointType}/${endpointId}`}
            text="Return to orders"
          />
          <RunUI run={currentRun} />
        </div>
      );
    }
  };

  return renderHelper();
};
