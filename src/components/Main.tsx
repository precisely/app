import * as React from "react";
import { RouteComponentProps} from "react-router";

import { Example } from "./examples/Example";


export class Main extends React.Component<RouteComponentProps<void>> {

  render(): JSX.Element {
    return (
      <div>
        <ul>
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/private">Private</a>
          </li>
        </ul>
        <hr />
        <Example />
        <hr />
      </div>
    );
  }

}
