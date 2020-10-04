import * as React from "react";


export interface Props {
  color?: string,
  sizePx?: number
}


export const Spinner = (rawProps: Props) => {

  const defaultProps: Props = {
    color: "#e71f54", // TODO: Pull out of Tailwind configuration.
    sizePx: 100
  };

  const props = { ...defaultProps, ...rawProps };

  const color: string = props.color;
  const size = `${props.sizePx}px`;
  const viewBox = `0 0 ${props.sizePx} ${props.sizePx}`;

  return (
    <svg width={size} height={size} viewBox={viewBox} preserveAspectRatio="xMidYMid">
      <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill={color} stroke="none">
        <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
      </path>
    </svg>
  );

};
