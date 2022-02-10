import * as React from "react";

import { TabbarItem } from "./TabbarItem";

export const Tabbar = () => {
  return (
    <div className="flex py-2 border-y border-silver py">
      <TabbarItem icon="home" name="Home" active={true} />
      <TabbarItem icon="data" name="My Data" />
      <TabbarItem icon="settings" name="Settings" />
    </div>
  );
};
