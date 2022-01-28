import * as React from "react";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";


interface Props {
  showLogout?: boolean
}


export const Footer = (props: Props): JSX.Element => {

  const history = RouterDOM.useHistory();

  const logout = async () => {
    await AuthUtils.logout();
    history.push("/");
  };

  const renderHelper = () => {
    if (props.showLogout) {
      return (
        <span>
          —
          <RouterDOM.Link to="" onClick={logout}
                          className="p-1 font-bold">
            Logout
          </RouterDOM.Link>
        </span>
      );
    }
    else {
      return (<span></span>);
    }
  };

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
        {renderHelper()}
      </div>
    </div>
  );

};
