import * as React from "react";

import "./Button.css";


interface Props {
  text: string,
  color: string,
  callback: () => void
}


export const Button = (propsRaw: Props) => {

  const propsDefault = {
    text: "Button",
    color: "ink",
    callback: () => {}
  };

  const props = { ...propsDefault, ...propsRaw };

  return (
    <button
      className={`btn btn-${props.color}`}
      onClick={props.callback}>
      {props.text}
    </button>
  );

};
