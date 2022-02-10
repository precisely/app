import * as React from "react";
import { Input } from "~/src/components/demo/Input";

import "~/src/components/pia-ui/form/NumberInput.css";

export interface Props {
  id: string;
  label: string;
  value: number;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const NumberInput = ({ id, label, value, onChange }: Props) => {
  return (
    <Input
      name={id}
      classes="form-number-input"
      value={value}
      leading={
        <label className="ml-2" htmlFor={id}>
          {label}
        </label>
      }
      onChange={onChange}
      placeholder="Enter number here"
    />
  );
};
