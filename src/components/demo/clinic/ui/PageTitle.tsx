import * as React from "react";

interface Props {
  title: string;
  actions?: React.ReactNode;
}

export const PageTitle = ({ title, actions }: Props) => {
  return (
    <div className="flex justify-between px-4 py-8 border-b border-lightgrey items-center">
      <h1 className="text-4xl">{title}</h1>
      <div className="px-4">{actions}</div>
    </div>
  );
};
