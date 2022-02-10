import * as React from "react";
import { Icon } from "~/src/components/demo/Icon";
import { Input } from "./Input";

export const Searchbar = () => {
  const [query, setQuery] = React.useState("");

  const onSearchQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <Input
      value={query}
      setValue={onSearchQuery}
      placeholder="Search"
      leading={
        <div className="pl-4">
          <Icon name="search" size={16} color="silver" />
        </div>
      }
    />
  );
};
