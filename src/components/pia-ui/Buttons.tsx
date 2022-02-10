import * as React from "react";

import { Button } from "~/src/components/Button";
import { UIProps } from "~/src/components/pia-ui/types";

export type ButtonItemProps = {
  id: string;
  text: string;
  callback: () => Promise<void>;
};

export interface ButtonsProps extends UIProps {
  type: "buttons";
  buttons: ButtonItemProps[];
  text: string;
}

export const ButtonItem = (props: ButtonItemProps): JSX.Element => {
  return <Button key={props.id} callback={props.callback} text={props.text} />;
};

export const Buttons = (props: ButtonsProps) => {
  return (
    <div key={props.id} className="ml-auto">
      {props.buttons.map((c) =>
        ButtonItem({
          callback: () => props.continueFn(c.id),
          ...c,
        })
      )}
    </div>
  );
};
