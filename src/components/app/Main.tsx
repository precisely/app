import * as React from "react";
import * as RouterDOM from "react-router-dom";

import * as LoginUtils from "~/src/utils/login";

import escutcheon from "~/assets/images/escutcheon/red.svg";


export const Main = () => {

  const history = RouterDOM.useHistory();

  const logout = async () => {
    await LoginUtils.logout();
    history.push("/");
  };

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
          —
          <RouterDOM.Link to="" onClick={logout}
                          className="p-1 font-bold">
            Logout
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
