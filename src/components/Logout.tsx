import * as React from "react";
import { Redirect, RouteComponentProps} from "react-router";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";


export class Logout extends React.Component<RouteComponentProps<void>> {

  logout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await LoginUtils.logout();
    this.props.history.push("/");
  };


  render(): JSX.Element {

    if (!AuthUtils.isAuthenticated()) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className="">
        <form onSubmit={this.logout}>
          <div>
            <button className="bg-blue-500 text-white"
                    type="submit">
              Logout
            </button>
          </div>
        </form>
      </div>
    );
  }

}
