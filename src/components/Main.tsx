import * as React from "react";
import { RouteComponentProps} from "react-router";

import * as AuthUtils from "~/src/utils/auth";
import { Example } from "./examples/Example";
import { Logout } from "~/src/components/Logout";


export class Main extends React.Component<RouteComponentProps<void>> {

  render(): JSX.Element {
    return (
      <div>
        { AuthUtils.isAuthenticated() ? `hello ${AuthUtils.username()}` : "" }
        <ul>
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/private">Private</a>
          </li>
          <li>
            <Logout {...this.props} />
          </li>
        </ul>
        <hr />
        <Example />
        <hr />
      </div>
    );
  }

}
