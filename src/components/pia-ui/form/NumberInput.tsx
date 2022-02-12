import * as React from "react";
import { Input } from "~/src/components/demo/Input";

import "~/src/components/pia-ui/form/NumberInput.css";
import { FormUpdateFunction } from "./Main";

export interface Props {
  id: string;
  label: string;
  value: number;
  onChange: FormUpdateFunction;
}

export const NumberInput = ({ id, label, value, onChange }: Props) => {
  function onInputChange(event: React.FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
      ? parseInt(event.currentTarget.value)
      : null;
    onChange(event.currentTarget.name, value);
  }

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
      onChange={onInputChange}
      placeholder="Enter number here"
    />
  );
};
