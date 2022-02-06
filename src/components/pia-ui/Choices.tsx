import * as React from "react";

import { UIProps } from "~/src/components/pia-ui/types";


export type ChoiceItemProps = {
  id: string,
  text: string,
  sendChoice: () => Promise<void>
}

export interface ChoicesProps extends UIProps {
  type: "choices",
  buttons: ChoiceItemProps[],
  text: string
}

export const ChoiceItem = (props: ChoiceItemProps): JSX.Element =>
  <button
    key={props.id}
    className="btn"
    onClick={props.sendChoice}>
    {props.text}
  </button>;

export const Choices = (props: ChoicesProps) => {
  return (
    <div key={props.id}>
      <div>{props.text}</div>
      {...props.buttons.map(c => ChoiceItem({
        sendChoice: () => props.continueFn(c.id),
        ...c
      }))}
    </div>
  );
}
