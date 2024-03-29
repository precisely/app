import * as React from "react";
import { NavigationItem } from "./NavigationItem";
import { Logo } from "~/src/components/demo/Logo";

export const Sidebar = () => {
  return (
    <div className="border-r border-lightgrey h-screen py-8">
      <div className="h-[30px] w-[148px] mx-8 mb-14">
        <Logo />
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
