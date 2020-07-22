import * as React from "react";
import * as RouterDOM from "react-router-dom";


export const NotFound = () => {

  return (
    <div>
      <div>
        <h4>You have taken a wrong turn.</h4>
        <RouterDOM.Link to="/">Please start over.</RouterDOM.Link>
      </div>
    </div>
  );

};
