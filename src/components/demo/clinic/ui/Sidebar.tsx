import * as React from "react";

import "./Sidebar.css";
import logo from "~/assets/images/logo/full-red-black.svg";
import { NavigationItem } from "./NavigationItem";

export const Sidebar = () => {
  return (
    <div className="border-x-2 border-lightgrey h-screen">
      <div className="h-[30px] w-[148px] m-8 mb-14">
        <img src={logo} alt="Precisely Logo" />
      </div>

      <div className="flex flex-col space-y-2">
        <NavigationItem icon="user" name="Patients" active={true} />
        <NavigationItem icon="bell" name="Activity" notificationCount={2} />
        <NavigationItem icon="settings" name="Settings" />
        <NavigationItem icon="integrations" name="Integrations" />
      </div>
    </div>
  );
};
