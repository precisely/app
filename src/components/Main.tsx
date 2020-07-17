import * as React from "react";
import { RouteComponentProps} from "react-router";

import * as AuthUtils from "~/src/utils/auth";
import { Logout } from "~/src/components/Logout";
import { Button } from "~/src/components/Button";

import "./common.css";

import logoFileLt from "~/assets/images/logo/full-red-black.svg";
import logoFileDk from "~/assets/images/logo/full-red-white.svg";


export class Main extends React.Component<RouteComponentProps<void>> {

  render(): JSX.Element {
    /* <div>
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
     */
    return (
      <div className="p-4 grid grid-cols-4 gap-4" >
        <div className="col-start-2 col-span-2 mt-2 ctr">
          <img className="light:hidden h-8" src={logoFileDk} />
          <img className="dark:hidden h-8" src={logoFileLt} />
        </div>
        <div className="col-span-1 ctr">
          <Button text="Login" color="cardinal" />
        </div>
      </div>
    );
  }

}
