import * as React from "react";

interface Props {
  columns: number;
}

const FillerCell = () => {
  return <td className="box-border border-r border-lightgrey"></td>;
};

export const FillerRow = ({ columns }: Props) => {
  return (
    <tr key="filler-row" className="h-full">
      {Array.from(Array(columns)).map((i) => (
        <FillerCell key={i} />
      ))}
    </tr>
  );
};
