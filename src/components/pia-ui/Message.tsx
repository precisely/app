import * as React from "react";
import Escutcheon from "~/assets/images/escutcheon/red.svg";

export interface Props {
  children: React.ReactNode;
}

export const Message = ({ children }: Props) => {
  return (
    <div className="flex space-x-3">
      <div className="flex-none flex items-center justify-center rounded-full bg-white w-8 h-8 shadow-lg shadow-ink/5">
        <img
          className="h-4 w-4 object-contain"
          src={Escutcheon}
          alt="Precisely Logo"
        />
      </div>
      <div className="flex-auto">{children}</div>
    </div>
  );
};
