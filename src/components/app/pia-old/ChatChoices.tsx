import * as React from "react";
import { ChatProps } from "~/src/components/app/pia-old/types";

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

export interface ChatChoicesProps extends ChatProps {
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

export const ChatChoices = (props: ChatChoicesProps) => {
  return (
    <div key={props.id}>
      <div>{props.text}</div>
      {...props.choices.map(c => ChoiceItem({
        sendChoice: () => props.continueCallback(c.id),
        ... c
      }))}
    </div>
  );
}
