import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import { Order } from '~/src/components/demo/generic-endpoint/Order';
import { Orders } from '~/src/components/demo/generic-endpoint/Orders';

import "~/src/components/demo/common.css";

export const GenericEndpoint = () => {
  const { endpointId, runId, endpointType } = Router.useParams<{ endpointId: string, runId: string, endpointType: string }>();
  const endpointIdInt = parseInt(endpointId);

  const renderHelper = () => {
    if (undefined === endpointId) {
      return (<div></div>);
    }
    else {
      return (
        <div>
          {endpointType.toUpperCase()} # {endpointId}
          <RouterDOM.BrowserRouter>
            <RouterDOM.Switch>
              <RouterDOM.Route path={`/demo/${endpointType}/:endpointId/:runId`}
                render={(_props) => <Order endpointId={endpointIdInt} runId={runId} endpointType={endpointType} />} />
              <RouterDOM.Route path={`/demo/${endpointType}/:endpointId`}
                render={(_props) => <Orders endpointId={endpointIdInt} endpointType={endpointType} />} />
            </RouterDOM.Switch>
          </RouterDOM.BrowserRouter>
        </div>
      );
    }

  };

  return (
    <div>
      {renderHelper()}
    </div>);
}