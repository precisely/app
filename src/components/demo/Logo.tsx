import * as React from "react";

import logo from "~/assets/images/logo/full-red-black.svg";

export const Logo = () => {
  return (
    <div className="h-[30px] w-[148px]">
      <img src={logo} alt="Precisely Logo" />
    </div>
  );
};
