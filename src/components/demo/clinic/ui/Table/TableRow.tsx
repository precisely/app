import * as React from "react";

import { TableCell } from "./TableCell";

interface Props {}

export const TableRow = ({}: Props) => {
  return (
    <tr>
      <TableCell>Theresa Webb</TableCell>
      <TableCell>32</TableCell>
      <TableCell>Initiation</TableCell>
      <TableCell>7.5mg</TableCell>
      <TableCell>1.5</TableCell>
      <TableCell>Problem finding maintainence dosse</TableCell>
    </tr>
  );
};
