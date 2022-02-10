import * as React from "react";
import { Layout } from "./Layout";
import { Tabbar } from "./Tabbar";

interface Props {
  children: React.ReactNode;
}

export const TabbarLayout = ({ children }: Props) => {
  return (
    <Layout>
      <div className="flex flex-col flex-1">{children}</div>
      <div className="flex-none">
        <Tabbar />
      </div>
    </Layout>
  );
};
