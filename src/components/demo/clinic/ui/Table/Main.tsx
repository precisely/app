import * as React from "react";
import { FillerRow } from "./FillterRow";

import "./Table.css";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export const Table = () => {
  return (
    <table className="table-auto w-full h-full border-collapse">
      <thead>
        <tr>
          <TableHeader text="Patient Name" sortable={true} />
          <TableHeader text="Age" sortable={true} />
          <TableHeader text="Phase" sortable={true} />
          <TableHeader text="Current Dose" sortable={true} />
          <TableHeader text="Last INR" sortable={true} />
          <TableHeader text="Alerts" />
        </tr>
      </thead>
      <tbody>
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
        <FillerRow />
      </tbody>
    </table>
  );
};
