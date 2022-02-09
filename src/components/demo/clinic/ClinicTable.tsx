import * as React from "react";
import { Run } from "~/src/utils/pia";
import { alertColorFromLevel } from "../common";
import { TherapyDetail } from "../TherapyDetail";
import { Avatar } from "./ui/Avatar";
import { Table } from "./ui/Table/Main";
import { TableCell } from "./ui/Table/TableCell";
import { TableHeader } from "./ui/Table/TableHeader";

interface Props {
  data: Run[];
  onRowClick: (run: Run) => void;
}

export const ClinicTable = ({ data, onRowClick }: Props) => {
  return (
    <Table<Run>
      keyStr="clinic"
      headers={[
        <TableHeader
          key="therapeutic-patient"
          text="Patient Name"
          sortable={true}
        />,
        <TableHeader key="therapeutic-age" text="Age" sortable={true} />,
        <TableHeader key="therapeutic-phase" text="Phase" sortable={true} />,
        <TableHeader
          key="therapeutic-dose"
          text="Current Dose"
          sortable={true}
        />,
        <TableHeader
          key="therapeutic-last-inr"
          text="Last INR"
          sortable={true}
        />,
        <TableHeader key="therapeutic-alert" text="Alerts" />,
      ]}
      data={data}
      renderItem={(run, index) => (
        <>
          <tr
            key={run.id}
            onClick={() => onRowClick(run)}
            className={index % 2 == 0 ? "bg-platinum" : ""}
          >
            <TableCell key={run.id + "_p-name"}>
              <Avatar src={"https://i.pravatar.cc/32"} size={32} />
              <span>{run.index.patient.name}</span>
            </TableCell>
            <TableCell key={run.id + "_p-age"}>
              {run.index.patient.age}
            </TableCell>
            <TableCell key={run.id + "_p-phase"}>
              {run.index?.overview?.phase}
            </TableCell>
            <TableCell key={run.id + "_p-dose"}>
              {run.index?.overview?.dose}
            </TableCell>
            <TableCell key={run.id + "_p-last-inr"}>
              {run.index?.overview ? run.index?.overview["last-inr"] : null}
            </TableCell>
            <TableCell key={run.id + "_p-alert"}>
              <span
                className={alertColorFromLevel(
                  run.index?.overview?.alert?.level
                )}
              >
                {run.index?.overview?.alert?.text}
              </span>
            </TableCell>
          </tr>
          {run.index.visible && (
            <tr
              key={run.id + "_detail"}
              className={index % 2 == 0 ? "bg-platinum" : ""}
            >
              <td colSpan={6}>
                <TherapyDetail run={run}></TherapyDetail>
              </td>
            </tr>
          )}
        </>
      )}
    />
  );
};
