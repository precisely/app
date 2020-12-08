import * as React from "react";
import { ChatProps } from './ChatProps';


export interface ChatMessageProps extends ChatProps {
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
