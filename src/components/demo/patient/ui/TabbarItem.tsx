import * as React from "react";

import { Icon } from "~/src/components/demo/Icon";

interface Props {
  icon: string;
  name: string;
  active?: boolean;
}

export const TabbarItem = ({ icon, name, active = false }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <Icon
        name={icon}
        size={24}
        color={active ? "brick" : "ink"}
        family="mobile"
      />
      <span className={`text-sm span-${active ? "brick" : "ink"}`}>{name}</span>
    </div>
  );
};
