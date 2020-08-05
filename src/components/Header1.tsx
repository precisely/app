import * as React from "react";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Button } from "~/src/components/Button";

import logoFileLt from "~/assets/images/logo/full-red-black.svg";
import logoFileDk from "~/assets/images/logo/full-red-white.svg";


interface Props {
  location: string
}


export const Header1 = (props: Props): JSX.Element => {

  const urlLogin = "/landing/login";
  const urlReset = "/landing/reset";
  const urlSignup = "/landing/signup";

  const urlsNoLoginButton = [
    urlLogin,
    urlReset,
    urlSignup
  ];

  const history = RouterDOM.useHistory();

  const login = () => {
    history.push(urlLogin);
  };

  const logout = async () => {
    await LoginUtils.logout();
    history.push("/");
  };

  const button: JSX.Element = (() => {
    if (urlsNoLoginButton.includes(props.location)) {
      return null;
    }
    else if (AuthUtils.isAuthenticated()) {
      return (
        <Button text="Logout"
                color="cardinal-inv"
                classes="py-1 px-8"
                callback={logout} />
      );
    }
    else {
      return (
        <Button text="Login"
                color="cardinal-inv"
                classes="py-1 px-8"
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