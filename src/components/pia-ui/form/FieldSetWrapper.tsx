import * as React from "react";

export interface Props {
  label: string;
  children: React.ReactNode;
}

export const FieldSetWrapper = ({ label, children }: Props) => {
  return (
    <fieldset>
      <legend className="font-medium">{label}</legend>
      {children}
    </fieldset>
  );
};
