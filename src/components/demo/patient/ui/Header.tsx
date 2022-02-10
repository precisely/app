import * as React from "react";
import { Logo } from "~/src/components/demo/Logo";

interface Props {
  action?: React.ReactNode;
}

export const Header = ({ action }: Props) => {
  return (
    <div className="flex justify-between pt-20 px-5 mb-8">
      <Logo />
      {action}
    </div>
  );
};
