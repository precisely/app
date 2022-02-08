import * as React from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";

export const AccountDropdown = () => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar src={"https://i.pravatar.cc/32"} size={32} />
      <span className="font-medium">Dr. Thompson</span>
      <Icon name="chevronDown" size={16} color="silver" />
    </div>
  );
};
