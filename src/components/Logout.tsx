import * as React from "react";
import * as Router from "react-router";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Button } from "~/src/components/Button";


export const Logout = () => {

  const logout = async () => {
    await LoginUtils.logout();
    <Router.Redirect to="/" />
  };


  if (!AuthUtils.isAuthenticated()) {
    return (
      <Router.Redirect to="/" />
    );
  }

  return (
    <Button text="Logout"
            color="cardinal-inv"
            callback={logout} />
  );

};
