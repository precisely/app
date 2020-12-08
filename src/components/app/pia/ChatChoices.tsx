import * as React from "react";

export interface Choice {
  id: string,
  text: string
}

export interface ChatChoicesProps {
  type: "choices",
  choices: Choice[],
  text: string
}

export const ChatChoices = (props: ChatChoicesProps) => {
  return (
    <div>
      {props.text}
      {props.choices}
    </div>
  );
}
