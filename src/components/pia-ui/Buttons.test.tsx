import * as React from "react";
import { screen, render, createEvent, fireEvent } from "@testing-library/react";

import { Buttons } from "~/src/components/pia-ui/Buttons";


describe("Buttons", () => {
  var mockContinueFn: jest.Mock;

  beforeEach(() => {
    mockContinueFn =  jest.fn();
    const buttons: any = [
      { id: "yes", text: "Yes!" },
      { id: "no", text: "No!" }
    ];

    render(<Buttons
      type="buttons"
      id="foo"
      text="Make a choice"
      permit="the-permit"
      buttons={buttons}
      continueFn={mockContinueFn} />);
  });

  test("basic rendering", async () => {
    screen.getAllByText(/Make a/).forEach((elt: any) =>
      expect(elt).toHaveTextContent("Make a choice")
    );
    expect(screen.getByText("Yes!")).toBeDefined();
    expect(screen.getByText("No!")).toBeDefined();
  });

  test("can click first (yes) button", () => {
    const yesButton = screen.getByText("Yes!");
    const yesClick = createEvent.click(yesButton);
    fireEvent(yesButton, yesClick);
    expect(mockContinueFn).toHaveBeenCalledTimes(1);
    expect(mockContinueFn).toBeCalledWith("yes");
  });

  test("can click second (no) button", () => {
    const yesButton = screen.getByText("No!");
    const yesClick = createEvent.click(yesButton);
    fireEvent(yesButton, yesClick);
    expect(mockContinueFn).toHaveBeenCalledTimes(1);
    expect(mockContinueFn).toBeCalledWith("no");
  });
});
