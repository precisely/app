import * as React from "react";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import { Button } from "~/src/components/Button";
import { Logout } from "~/src/components/Logout";

import logoFileLt from "~/assets/images/logo/full-red-black.svg";
import logoFileDk from "~/assets/images/logo/full-red-white.svg";


interface Props {
  location: string
}


export const Header = (props: Props): JSX.Element => {

  const urlLogin = "/landing/login";

  const history = RouterDOM.useHistory();

  const login = () => {
    history.push(urlLogin);
  };

  const button: JSX.Element = (() => {
    if (props.location === urlLogin) {
      return null;
    }
    else if (AuthUtils.isAuthenticated()) {
      return (
        <Logout />
      );
    }
    else {
      return (
        <Button text="Login"
                color="cardinal-inv"
                callback={login} />
      );
    }
  })();

  return (
    <div className="p-4 grid grid-cols-2 gap-4" >
      <RouterDOM.Link to="/">
        <div className="col-span-1 mt-2">
          <img className="light:hidden h-8" src={logoFileDk} />
          <img className="dark:hidden h-8" src={logoFileLt} />
        </div>
      </RouterDOM.Link>
      <div className="col-span-1 rt">
        {button}
      </div>
    </div>
  );

};
