import * as React from "react";
import * as PIAUtils from "~/src/utils/pia";
import { alertColorFromLevel } from "../common";
import { Avatar } from "./ui/Avatar";
import { Table } from "./ui/Table/Main";
import { TableCell } from "./ui/Table/TableCell";
import { TableHeader } from "./ui/Table/TableHeader";

import "~/src/components/demo/textColor.css";
import { getAvatarSrc } from "../RandomAvatar";
import { RunUI } from "~/src/components/pia-ui/RunUI";

interface Props {
  data: PIAUtils.Run[];
}

const colorMap = {
  green: "parakeet",
  yellow: "butterscotch",
  red: "brick",
};

export const ClinicTable = ({ data }: Props) => {
  const [selectedRun, setSelectedRun] = React.useState<PIAUtils.Run>(null);

  const onClickRow = (run: PIAUtils.Run) => {
    setSelectedRun(selectedRun?.id === run.id ? null : run);
  };

  return (
    <div className="flex-1 flex relative overflow-x-hidden">
      <Table<PIAUtils.Run>
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
          <tr
            title={`patient ID: ${run.index.patient.id}`}
            key={run.id + "_row"}
            onClick={() => onClickRow(run)}
            className={`hover:bg-grey50 hover:cursor-pointer ${
              selectedRun?.id === run.id
                ? "!bg-blush/10"
                : index % 2 == 0
                ? "bg-platinum"
                : ""
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
        )}
      />
      <div
        className={`absolute p-5 bg-grey50 w-96 ${
          selectedRun ? "right-0" : "-right-96"
        } top-0 bottom-0 border-l border-lightgrey transition-all`}
      >
        {selectedRun && <RunUI run={selectedRun}></RunUI>}
      </div>
    </div>
  );
};
