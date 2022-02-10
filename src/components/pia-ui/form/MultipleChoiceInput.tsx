import * as React from "react";
import { FieldSetWrapper } from "./FieldSetWrapper";

interface MultipleChoiceItem {
  id: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  items: MultipleChoiceItem[];
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const MultipleChoiceInput = ({ id, label, items, onChange }: Props) => {
  return (
    <FieldSetWrapper label={label}>
      {items.map((item: MultipleChoiceItem, idx: number) => {
        return (
          <div key={idx}>
            <input
              type="radio"
              id={item.id}
              name={id}
              onChange={onChange}
              value={item.id}
            />
            <label className="ml-2" htmlFor={item.id}>
              {item.label}
            </label>
          </div>
        );
      })}
    </FieldSetWrapper>
  );
};
