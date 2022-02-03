import * as React from "react";

import { UIProps } from '~/src/components/pia-ui/types';


export interface MessageProps extends UIProps {
  type: "message",
  text: string
}

export const Message = (props: MessageProps) => {
  return (
    <div>
      {props.text}
    </div>
  );
}
