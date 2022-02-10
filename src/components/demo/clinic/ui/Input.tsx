import * as React from "react";

interface Props {
  value: string | number | readonly string[];
  setValue: (val: string | null) => void;

  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  leading?: React.ReactNode;
}

export const Input = ({
  value,
  setValue,
  type,
  leading,
  placeholder,
}: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex items-center rounded border border-lightgrey">
      {leading}
      <input
        type={type}
        className="border-0 outline-none text-base px-2 w-96 py-3"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
