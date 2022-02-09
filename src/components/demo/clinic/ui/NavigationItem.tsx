import * as React from "react";

import { Icon } from "./Icon";

interface Props {
  icon: string;
  name: string;
  notificationCount?: number;
  active?: boolean;
}

export const NavigationItem = ({
  icon,
  name,
  notificationCount,
  active = false,
}: Props) => {
  return (
    <div className="flex items-center space-x-4 py-2 px-8">
      <div
        className={`flex-none p-2 m-r-1 rounded-full ${
          active ? "bg-brick/5" : ""
        }`}
      >
        <Icon name={icon} color={active ? "brick" : "grey"} size={16} />
      </div>

      <span className={`${active ? "font-medium text-ink" : "text-grey"}`}>
        {name}
      </span>
      {notificationCount && (
        <div
          className={`px-2 py-[1] rounded text-cloud select-none ${
            active ? "bg-brick" : "bg-grey"
          }`}
        >
          {notificationCount}
        </div>
      )}
    </div>
  );
};
