import * as React from "react";
import { screen, render, createEvent, fireEvent } from "@testing-library/react";

import { ChatChoices } from "./ChatChoices";

describe("ChatChoices", () => {
  var mockCallback: jest.Mock;

  beforeEach(() => {
    mockCallback =  jest.fn();
    const choices: any = [
      { id: "yes", text: "Yes!" },
      { id: "no", text: "No!" }
    ];

    render(<ChatChoices
      type="choices" key="foo"
      text="Make a choice"
      permit="the-permit" choices={choices}
      continueCallback={mockCallback} />);
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
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toBeCalledWith("yes");
  });

  test("can click second (no) button", () => {
    const yesButton = screen.getByText("No!");
    const yesClick = createEvent.click(yesButton);
    fireEvent(yesButton, yesClick);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toBeCalledWith("no");
  });
});
