import * as React from "react";

import { UIProps } from '~/src/components/pia-ui/types';


export interface TextProps extends UIProps {
  type: "text",
  text: string
}

export const Text = (props: TextProps) => {
  return (
    <div key={props.key}>
      {props.text}
    </div>
  );
}
