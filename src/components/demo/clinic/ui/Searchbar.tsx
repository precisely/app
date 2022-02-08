import * as React from "react";
import { Icon } from "./Icon";

import "./Searchbar.css";

export const Searchbar = () => {
  const [query, setQuery] = React.useState("");

  const onSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex items-center pl-4 py-3 rounded border border-lightgrey">
      <Icon name="search" size={16} color="silver" />
      <input
        className="border-0 outline-none text-base px-2 w-96"
        value={query}
        onChange={onSearchQuery}
        placeholder="Search"
      />
    </div>
  );
};
