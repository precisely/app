import * as React from "react";


export interface ChatMessageProps {
  type: "message",
  text: string
}


export const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div>
      {props.text}
    </div>
  );
}
