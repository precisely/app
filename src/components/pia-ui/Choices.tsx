import * as React from "react";
import { UIProps } from "~/src/components/pia-ui/types";

/**
 *
 * Displays a set of choices as buttons (for now)
 * We may include styles of choice in the future.
 *
 */
export type ChoiceItemProps = {
  id: string,
  text: string,
  sendChoice: () => Promise<void>
}

export interface ChoicesProps extends UIProps {
  type: "choices",
  style?: "buttons" | "list",
  choices: ChoiceItemProps[],
  text: string
}

// for now, ignore the style option - only display as buttons
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
        ... c
      }))}
    </div>
  );
}
