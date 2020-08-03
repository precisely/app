import * as React from "react";
import * as RouterDOM from "react-router-dom";

import escutcheon from "~/assets/images/escutcheon/red.svg";


export const Main = () => {

  return (
    <div>
      <div className="pt-8">
        <div className="flex justify-center">
          <img className="w-1/4" src={escutcheon} />
        </div>
        <p className="text-center">
          You are logged in.
        </p>
      </div>
      <div className="pt-6 grid grid-cols-6 text-sm text-center">
        <div className="col-start-2 col-span-4">
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
      <RouterDOM.Switch>
        {/* <RouterDOM.Route exact path="/app" component={Main} />
            <RouterDOM.Route exact path="/home" component={Home} />
            <RouterDOM.Route exact path="/company" component={Company} /> */}
      </RouterDOM.Switch>
    </div>
  );

};
