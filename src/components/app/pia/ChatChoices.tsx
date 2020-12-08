import * as React from "react";
import { ChatProps } from "~/src/components/app/pia/ChatProps";

/**
 *
 * Displays a set of choices as buttons (for now)
 * We may include styles of choice in the future.
 *
 */
export interface ChoiceItemProps {
  id: string,
  text: string
  runId: string
}

export interface ChatChoicesProps extends ChatProps {
  type: "choices",
  style: "buttons" | "list",
  choices: ChoiceItemProps[],
  text: string
}

function clickCallback(runId: string, choiceId: string) {
  return () => <div>Call pia-server/continue with for run {runId} and choice {choiceId}</div>;
}

export const ChoiceItem = (props: ChoiceItemProps): JSX.Element =>
  <button
    className="btn"
    onClick={clickCallback(props.runId, props.id)}>
    {props.text}
  </button>;


export const ChatChoices = (props: ChatChoicesProps) => {

  return (
    <div id={"choice_" + props.id}>
      <div>{props.text}</div>
      {... props.choices.map(c => ChoiceItem(c))}
    </div>
  );
}
