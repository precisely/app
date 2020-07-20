import * as React from "react";

import "./Button.css";


interface Props {
  text: string,
  color: string,
  callback: () => void
}


export class Button extends React.Component<Props, {}> {

  public static defaultProps = {
    text: "Button",
    color: "ink",
    callback: () => {}
  };

  render(): JSX.Element {
    return (
      <button
        className={`btn btn-${this.props.color}`}
        onClick={this.props.callback}>
        {this.props.text}
      </button>
    );
  }

}
