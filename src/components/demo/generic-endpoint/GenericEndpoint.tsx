import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";
import { useTitle } from "~/src/utils/react";
import { capitalize } from "lodash";
import { Order } from "~/src/components/demo/generic-endpoint/Order";
import { Orders } from "~/src/components/demo/generic-endpoint/Orders";

import "~/src/components/demo/common.css";
import { PageTitle } from "../clinic/ui/PageTitle";

export const GenericEndpoint = () => {
  const { endpointId, runId, endpointType } = Router.useParams<{
    endpointId: string;
    runId: string;
    endpointType: string;
  }>();
  const endpointIdInt = parseInt(endpointId);

  useTitle(`Precise.ly: ${capitalize(endpointType)} UI`);

  const renderEndpointName = (endpointType: string, endpointId: string) => {
    const definedEndpoints = () => {
      switch (endpointType) {
        case "pharmacy":
          return (
            {
              "1": "CVS Pharmacy",
              "2": "Walgreens Pharmacy",
            }[endpointId] || "Unknown Pharmacy"
          );
        case "lab":
          return (
            {
              "1": "Labcorp Lab",
              "2": "Akesogen Genetics",
            }[endpointId] || "Unknonw Lab"
          );
      }
      return null;
    };
    return (
      definedEndpoints() || `${endpointType.toUpperCase()} # ${endpointId}`
    );
  };

  const renderHelper = () => {
    if (undefined === endpointId) {
      return <div></div>;
    } else {
      return (
        <div className="flex flex-col min-h-screen bg-white">
          <PageTitle title={renderEndpointName(endpointType, endpointId)} />
          <RouterDOM.BrowserRouter>
            <RouterDOM.Switch>
              <RouterDOM.Route
                path={`/demo/${endpointType}/:endpointId/:runId`}
                render={(_props) => (
                  <Order
                    endpointId={endpointIdInt}
                    runId={runId}
                    endpointType={endpointType}
                  />
                )}
              />
              <RouterDOM.Route
                path={`/demo/${endpointType}/:endpointId`}
                render={(_props) => (
                  <Orders
                    endpointId={endpointIdInt}
                    endpointType={endpointType}
                  />
                )}
              />
            </RouterDOM.Switch>
          </RouterDOM.BrowserRouter>
        </div>
      );
    }
  };

  return <div>{renderHelper()}</div>;
};
