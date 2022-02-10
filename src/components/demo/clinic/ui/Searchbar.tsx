import * as React from "react";
import { Icon } from "~/src/components/demo/Icon";
import { Input } from "~/src/components/demo/Input";

export const Searchbar = () => {
  const [query, setQuery] = React.useState("");

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <div className="w-96">
      <Input
        value={query}
        onChange={onSearchQuery}
        placeholder="Search"
        leading={
          <div className="pl-4">
            <Icon name="search" size={16} color="silver" />
          </div>
        }
      />
    </div>
  );
};
