import * as React from "react";

import "./Button.css";

interface Props {
  key?: string;
  color?: string;
  classes?: string;
  disabled?: boolean;
  text?: string;
  type?: string;
  children?: React.ReactNode;
  callback?: () => void;
}

export const Button = (propsRaw: Props) => {
  const propsDefault = {
    color: "ink",
    classes: "",
    disabled: false,
    text: "Button",
    type: "button",
    callback: () => {},
  };

  const props = { ...propsDefault, ...propsRaw };

  return (
    <button
      key={props.key}
      className={`btn btn-${props.color} ${props.classes}`}
      disabled={props.disabled}
      onClick={props.callback}
    >
      {props.children ? props.children : props.text}
    </button>
  );
};
