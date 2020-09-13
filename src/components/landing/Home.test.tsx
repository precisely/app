import * as History from "history";
import * as React from "react";
import * as TLR from "@testing-library/react";

import * as ReactUtils from "~/src/utils/react";

import { Home } from "./Home";


describe("Home", () => {

  test("basic rendering", async () => {
    TLR.render(<Home />);
    expect(TLR.screen.getByText(/Protects/)).toHaveTextContent("Protects you and your family");
  });

  test("home", async () => {
    const h = History.createMemoryHistory();
    TLR.render(ReactUtils.routedComponent((_props) => <Home />, h));
    const signupButton = TLR.screen.getByText("Get Started");
    TLR.fireEvent.click(signupButton);
    expect(h.location.pathname).toEqual("/landing/signup");
  });

});
