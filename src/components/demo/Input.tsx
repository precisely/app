import * as React from "react";

import "~/src/components/demo/Input.css";

interface Props {
  name?: string;
  value?: string | number | readonly string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  classes?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  leading?: React.ReactNode;
}

export const Input = ({
  name,
  value,
  onChange,
  classes = "",
  type = "text",
  leading,
  placeholder,
}: Props) => {
  return (
    <div
      className={"flex items-center rounded border border-lightgrey " + classes}
    >
      {leading}
      <input
        name={name}
        type={type}
        className="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
