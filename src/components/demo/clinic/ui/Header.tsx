import * as React from "react";
import { AccountDropdown } from "./AccountDropdown";
import { Searchbar } from "./Searchbar";

export const Header = () => {
  return (
    <div className="flex justify-between p-4 border-b border-lightgrey items-center">
      <Searchbar />
      <div className="px-4">
        <AccountDropdown />
      </div>
    </div>
  );
};
