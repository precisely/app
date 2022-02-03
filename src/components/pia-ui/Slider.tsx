import * as React from "react";


export interface SliderProps {
  type: "slider",
  min: number,
  minTag: string,
  max: number,
  maxTag: string,
  text: string,
  increment: number
}

export const Slider = (props: SliderProps) => {
  return (
    <div>
      {props.text}
      {props.min}
      {props.minTag}
      {props.max}
      {props.maxTag}
      {props.increment}
    </div>
  );
}
