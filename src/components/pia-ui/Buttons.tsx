import * as React from "react";

import { Button } from "~/src/components/Button";
import { UIProps } from "~/src/components/pia-ui/types";

export type ButtonItemProps = {
  id: string;
  label: string;
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
  label,
  level = 1,
  callback,
}: ButtonItemProps): JSX.Element => {
  const colorMap = {
    1: "cardinal",
    2: "cardinal-inv",
    3: "battleship-inv",
  };
  return (
    <div className="m-1">
      <Button
        key={id}
        callback={callback}
        text={label}
        color={level in colorMap ? colorMap[level] : "cardinal"}
      />
    </div>
  );
};

export const Buttons = (props: ButtonsProps) => {
  return (
    <div
      key={props.id}
      className="flex flex-row justify-end max-w-[75%] flex-wrap ml-auto -m-1"
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
