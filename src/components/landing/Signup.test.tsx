import * as React from "react";
import * as TLR from "@testing-library/react";

import * as ReactUtils from "~/src/utils/react";

import { Signup } from "./Signup";


describe("Signup", () => {

  test("basic rendering", async () => {
    TLR.render(ReactUtils.routedComponent((props) => <Signup {...props} />));
    expect(TLR.screen.getByText(/Create/)).toHaveTextContent("Create an Account");
  });

});
