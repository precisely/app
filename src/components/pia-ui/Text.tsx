import * as React from "react";

import { UIProps } from "~/src/components/pia-ui/types";
import { Message } from "./Message";

export interface TextProps extends UIProps {
  type: "text";
  text: string;
}

export const Text = (props: TextProps) => {
  return (
    <Message key={props.key}>
      <div className="w-fit bg-white rounded p-4 shadow-lg shadow-ink/5">
        <span>{props.text}</span>
      </div>
    </Message>
  );
};
