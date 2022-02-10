import * as React from "react";
import { Run } from "~/src/utils/pia";
import { alertColorFromLevel } from "../common";
import { TherapyDetail } from "../TherapyDetail";
import { Avatar } from "./ui/Avatar";
import { Table } from "./ui/Table/Main";
import { TableCell } from "./ui/Table/TableCell";
import { TableHeader } from "./ui/Table/TableHeader";

import "~/src/components/demo/textColor.css";
import { getAvatarSrc } from "../RandomAvatar";
import { RunUI } from "~/src/components/pia-ui/RunUI";

interface Props {
  data: Run[];
  onRowClick: (run: Run) => void;
}

const colorMap = {
  green: "parakeet",
  yellow: "butterscotch",
  red: "brick",
};

export const ClinicTable = ({ data, onRowClick }: Props) => {
  const renderRun = (run: Run) => {
    if (run.output.length > 0) {
      return <RunUI run={run}></RunUI>;
    } else {
      var fakeRun = Object.assign({}, run);
      fakeRun.output = [{ type: "text", text: "No action needed" }];
      return <RunUI run={fakeRun} />;
    }
  };
  return (
    <Table<Run>
      keyStr="clinic"
      headers={[
        <TableHeader key="therapeutic-id" text="Id" />,
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
            title={`patient ID: ${run.index.patient.id}`}
            key={run.id + "_row"}
            onClick={() => onRowClick(run)}
            className={`hover:bg-grey50 hover:cursor-pointer ${
              index % 2 == 0 ? "bg-platinum" : ""
            }`}
          >
            <TableCell key={run.id + "_p-id"}>
              <span>{run.index["patient-id"]}</span>
            </TableCell>
            <TableCell key={run.id + "_p-name"}>
              <Avatar src={getAvatarSrc(run.index["patient-id"])} size={32} />
              <span>{run.index.patient.name}</span>
            </TableCell>
            <TableCell key={run.id + "_p-age"}>
              {run.index.patient.age}
            </TableCell>
            <TableCell key={run.id + "_p-phase"}>
              {run.index?.overview?.phase}
            </TableCell>
            <TableCell key={run.id + "_p-dose"}>
              {run.index?.overview?.dose || "N/A"}
            </TableCell>
            <TableCell key={run.id + "_p-last-inr"}>
              {run.index?.overview
                ? run.index?.overview["last-inr"] || "N/A"
                : "N/A"}
            </TableCell>
            <TableCell key={run.id + "_p-alert"}>
              <span
                className={`span-${
                  colorMap[
                    alertColorFromLevel(run.index?.overview?.alert?.level)
                  ]
                }`}
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
              <td colSpan={6}>{renderRun(run)}</td>
            </tr>
          )}
        </React.Fragment>
      )}
    />
  );
};
