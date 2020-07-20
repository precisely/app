import * as React from "react";

import { Button } from "~/src/components/Button";

import logoFileLt from "~/assets/images/logo/full-red-black.svg";
import logoFileDk from "~/assets/images/logo/full-red-white.svg";


export class Header extends React.Component {

  render(): JSX.Element {
    return (
      <div className="p-4 grid grid-cols-2 gap-4" >
        <div className="col-span-1 mt-2">
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
