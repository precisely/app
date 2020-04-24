import * as React from "react";


export class Private extends React.Component {

  render(): JSX.Element {
    return (
      <div>
        <div>
          You can only see this if you authenticated!
        </div>
        <div>
          <img src="https://i1.kym-cdn.com/photos/images/original/000/124/444/secret_fluttershy_by_russelh-d3gmnxb.png" />
        </div>
      </div>
    );
  }

}
