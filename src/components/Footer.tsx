import * as React from "react";
import * as RouterDOM from "react-router-dom";


export const Footer = (): JSX.Element => {
  return (
    <div className="pt-6 grid grid-cols-8 text-sm text-center">
      <div className="col-start-2 col-span-6">
        <RouterDOM.Link to="/terms"
                        className="p-1 font-bold">
          Terms and Conditions
        </RouterDOM.Link>
        —
        <RouterDOM.Link to="/privacy"
                        className="p-1 font-bold">
          Privacy Policy
        </RouterDOM.Link>
      </div>
    </div>
  );

};
