import * as React from "react";
import { FillerRow } from "./FillterRow";

import "./Table.css";

interface Props<T> {
  keyStr?: string;
  headers: React.ReactNode[];
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const Table = <T,>({ keyStr, headers, data, renderItem }: Props<T>) => {
  return (
    <table className="table">
      <thead key={`${keyStr}-head`}>
        <tr>{headers}</tr>
      </thead>
      <tbody key={`${keyStr}-body`}>
        {data.map(renderItem)}
        <FillerRow columns={headers.length} />
      </tbody>
    </table>
  );
};
