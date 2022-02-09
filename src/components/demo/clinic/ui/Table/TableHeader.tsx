import * as React from "react";
import { Icon } from "../Icon";

import "./Table.css";

interface Props {
  text: string;
  sortable?: boolean;
}

export const TableHeader = ({ text, sortable = false }: Props) => {
  return (
    <th className="border-r border-b border-lightgrey box-border">
      <div className="flex items-center space-x-2 p-4">
        <span className="font-medium">{text}</span>
        {sortable && <Icon name="upDownArrows" size={16} color="silver"></Icon>}
      </div>
    </th>
  );
};
