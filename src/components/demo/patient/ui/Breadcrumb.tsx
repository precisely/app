import * as React from "react";
import { Icon } from "~/src/components/demo/Icon";
import * as RouterDOM from "react-router-dom";

import "~/src/components/demo/common.css";

interface Props {
  text: string;
  to: string;
}

export const Breadcrumb = ({ text, to }: Props) => {
  return (
    <RouterDOM.Link to={to}>
      <div className="flex items-center mb-2">
        <Icon name="chevronLeft" size={24} color="battleship" family="mobile" />
        <h1 className="font-medium text-battleship">{text}</h1>
      </div>
    </RouterDOM.Link>
  );
};
