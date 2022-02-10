import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return <div className="flex flex-col h-screen bg-grey50">{children}</div>;
};
