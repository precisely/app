import * as React from "react";


export class NotFound extends React.Component {

  render(): JSX.Element {
    return (
      <div>
        <div>
          <h4>You have taken a wrong turn.</h4>
          <a href="/">Please start over.</a>
        </div>
      </div>
    );
  }

}
