import * as React from "react";
import { FieldSetWrapper } from "./FieldSetWrapper";
import { FormUpdateFunction } from "./Main";

interface MultipleChoiceItem {
  id: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  items: MultipleChoiceItem[];
  value: string;
  onChange: FormUpdateFunction;
}

export const MultipleChoiceInput = ({
  id,
  label,
  items,
  value,
  onChange,
}: Props) => {
  function onInputChange(event: React.FormEvent<HTMLInputElement>) {
    onChange(event.currentTarget.name, event.currentTarget.value);
  }
  return (
    <FieldSetWrapper label={label}>
      <div className="flex flex-wrap space-x-2 items-center">
        {items.map((item: MultipleChoiceItem) => {
          return (
            <div key={`${id}-option-${item.id}`}>
              <input
                className="inline-block"
                type="radio"
                id={item.id}
                name={id}
                onChange={onInputChange}
                value={item.id}
                checked={item.id === value}
              />
              <label className="ml-2" htmlFor={item.id}>
                {item.label}
              </label>
            </div>
          );
        })}
      </div>
    </FieldSetWrapper>
  );
};
