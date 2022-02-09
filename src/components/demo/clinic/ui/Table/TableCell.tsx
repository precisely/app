import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export const TableCell = ({ children }: Props) => {
  return (
    <td className="box-border border-r border-lightgrey">
      <div className="flex items-center space-x-2 p-4">{children}</div>
    </td>
  );
};
