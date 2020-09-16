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
    const history = History.createMemoryHistory();
    TLR.render(ReactUtils.routedComponent((_props) => <Home />, history));
    const signupButton = TLR.screen.getByText("Get Started");
    TLR.fireEvent.click(signupButton);
    expect(history.location.pathname).toEqual("/landing/signup");
  });

});
