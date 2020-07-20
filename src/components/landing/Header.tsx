import * as React from "react";

import logoFileLt from "~/assets/images/logo/full-red-black.svg";
import logoFileDk from "~/assets/images/logo/full-red-white.svg";


interface Props {
  action?: JSX.Element
}


export class Header extends React.Component<Props> {

  action = () => {
    return (
      <div className="col-span-1 rt">
        {this.props.action}
      </div>
    );
  };

  render(): JSX.Element {
    return (
      <div className="p-4 grid grid-cols-2 gap-4" >
        <div className="col-span-1 mt-2">
          <img className="light:hidden h-8" src={logoFileDk} />
          <img className="dark:hidden h-8" src={logoFileLt} />
        </div>
        {this.action()}
      </div>
    );
  }

}
