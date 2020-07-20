import * as React from "react";
import { Redirect } from "react-router";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Button } from "~/src/components/Button";


export class Logout extends React.Component<{}, {}> {

  logout = async () => {
    await LoginUtils.logout();
    <Redirect to="/" />
  };


  render(): JSX.Element {

    if (!AuthUtils.isAuthenticated()) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <Button text="Logout"
              color="cardinal-inv"
              callback={this.logout} />
    );
  }

}
