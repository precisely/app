import * as React from "react";

import "./Button.css";


interface Props {
  color?: string,
  classes?: string,
  disabled?: boolean,
  text?: string,
  type?: string,
  callback?: () => void
}


export const Button = (propsRaw: Props) => {

  const propsDefault = {
    color: "ink",
    classes: "",
    disabled: false,
    text: "Button",
    type: "button",
    callback: () => {}
  };

  const props = { ...propsDefault, ...propsRaw };

  return (
    <button
      className={`btn btn-${props.color} ${props.classes}`}
      disabled={props.disabled}
      onClick={props.callback}>
      {props.text}
    </button>
  );

};
