import * as React from "react";

import { Button } from "~/src/components/Button";
import { UIProps } from "~/src/components/pia-ui/types";

export type ButtonItemProps = {
  id: string;
  text: string;
  level?: number;
  callback: () => Promise<void>;
};

export interface ButtonsProps extends UIProps {
  type: "buttons";
  buttons: ButtonItemProps[];
  text: string;
}

export const ButtonItem = ({
  id,
  text,
  level = 1,
  callback,
}: ButtonItemProps): JSX.Element => {
  const colorMap = {
    1: "cardinal",
    2: "cardinal-inv",
    3: "battleship-inv",
  };
  return (
    <Button
      key={id}
      callback={callback}
      text={text}
      color={level in colorMap ? colorMap[level] : "cardinal"}
    />
  );
};

export const Buttons = (props: ButtonsProps) => {
  return (
    <div
      key={props.id}
      className="flex flex-row justify-end space-x-2 space-y-2 max-w-[75%] flex-wrap ml-auto"
    >
      {props.buttons.map((c) =>
        ButtonItem({
          callback: () => props.continueFn(c.id),
          ...c,
        })
      )}
    </div>
  );
};
