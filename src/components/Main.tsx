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
    return (
      <div className="p-4 grid grid-cols-2 gap-4" >
        <div className="col-span-1 mt-2 ctr">
          <img className="light:hidden h-8" src={logoFileDk} />
          <img className="dark:hidden h-8" src={logoFileLt} />
        </div>
        <div className="col-span-1 rt">
          <Button text="Login" color="cardinal-inv" />
        </div>
      </div>
    );
  }

}
