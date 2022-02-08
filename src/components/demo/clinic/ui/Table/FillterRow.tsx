import * as React from "react";

interface Props {}

const FillerCell = () => {
  return <td className="box-border border-r border-lightgrey"></td>;
};

export const FillerRow = ({}: Props) => {
  return (
    <tr className="h-full">
      <FillerCell />
      <FillerCell />
      <FillerCell />
      <FillerCell />
      <FillerCell />
      <FillerCell />
    </tr>
  );
};
