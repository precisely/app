import * as React from "react";


interface ChatTextProps {
  text: string
}


export const ChatText = (props: ChatTextProps) => {
  return (
    <div>
      {props.text}
    </div>
  );
}
