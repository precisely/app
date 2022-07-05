import * as React from "react";
import { Order } from "~/src/components/demo/generic-endpoint/Order";
import { Orders } from "~/src/components/demo/generic-endpoint/Orders";

import "~/src/components/demo/common.css";
import { PageTitle } from "../clinic/ui/PageTitle";
import { Helmet } from "react-helmet";
import { Outlet, Route, Routes, useParams } from "react-router-dom";

export const GenericEndpoint = () => {
  const { endpointId, runId, endpointType } = useParams();
  const endpointIdInt = parseInt(endpointId);

  const renderEndpointName = (endpointType: string, endpointId: string) => {
    const definedEndpoints = () => {
      switch (endpointType) {
        case "pharmacy":
          return (
            {
              "1": "True Pill Online Pharmacy",
              "2": "Walgreens Pharmacy",
            }[endpointId] || "Unknown Pharmacy"
          );
        case "lab":
          return (
            {
              "1": "Labcorp Lab",
              "2": "Akesogen Genetics",
            }[endpointId] || "Unknown Lab"
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
          <Outlet />
          <Routes>
            <Route
              path={`:runId`}
              element={
                <Order
                  endpointId={endpointIdInt}
                  runId={runId}
                  endpointType={endpointType}
                />
              }
            ></Route>

            <Route
              index
              element={
                <Orders
                  endpointId={endpointIdInt}
                  endpointType={endpointType}
                />
              }
            />
          </Routes>
        </div>
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          Precise.ly: {renderEndpointName(endpointType, endpointId)} Endpoint
        </title>
      </Helmet>
      {renderHelper()}
    </div>
  );
};
