import * as React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex bg-white">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};
