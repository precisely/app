import * as React from "react";
import { Run } from "~/src/utils/pia";
import { alertColorFromLevel } from "../common";
import { Avatar } from "./ui/Avatar";
import { Table } from "./ui/Table/Main";
import { TableCell } from "./ui/Table/TableCell";
import { TableHeader } from "./ui/Table/TableHeader";
import { RunUI } from '../../pia-ui/RunUI';
import { Button } from "~/src/components/Button";

interface Props {
  data: Run[];
  onRowClick: (run: Run) => void;
}

const colorMap = {
  green: "parakeet",
  yellow: "butterscotch",
  red: "brick",
};

const hackRun = (run: Run) => {
  if (run.output.length == 0) {
    run.output = [{
      "type": "buttons",
      "buttons": [
        { "id": "Interrupt therapy" },
        { "id": "Continue therapy" }
      ]
    }]
  }
  return run;
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
        <React.Fragment key={run.id}>
          <tr
            key={run.id + "_row"}
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
              {/* {run.index?.overview?.dose} */}
              7.5mg
            </TableCell>
            <TableCell key={run.id + "_p-last-inr"}>
              {/* {run.index?.overview ? run.index?.overview["last-inr"] : null} */}
              1.8
            </TableCell>
            <TableCell key={run.id + "_p-alert"}>
              {/* <span
                className={alertColorFromLevel(
                  run.index?.overview?.alert?.level
                )}
              >
                {run.index?.overview?.alert?.text}
              </span> */}
              <span
                className={`text-${colorMap[alertColorFromLevel("green")]}`}
              >
                Review Rx recommendation
              </span>
            </TableCell>
          </tr>
          {run.index.visible && (
            <tr
              key={run.id + "_detail"}
              className={index % 2 == 0 ? "bg-platinum" : ""}
            >
              <td colSpan={6}>
                <div className="grid gap-4 grid-cols-3 grid-rows-1">
                  <Button text="Stop Therapy"
                    color="cardinal"
                    classes="py-1 px-8"
                  />
                  <Button text="Schedule Visit"
                    color="cobalt"
                    classes="py-1 px-8"
                  />
                  <Button text="Change Dosage"
                    color="grey"
                    classes="py-1 px-8"
                  />
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      )}
    />
  );
};
