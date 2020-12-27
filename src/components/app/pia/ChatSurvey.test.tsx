import * as React from "react";
import {screen, render, createEvent, fireEvent} from  "@testing-library/react";

import { ChatSurvey } from "./ChatSurvey";

describe("ChatSurvey", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    const elements: any = {
      questions: [{
        type: "checkbox",
        name: "car",
        title: "What car are you driving?",
        isRequired: true,
        hasSelectAll: true,
        hasNone: true,
        noneText: "None of the above",
        colCount: 4,
        choicesOrder: "asc",
        choices: ["Ford", "Tesla","Volkswagen"]
      }]
    };
    render(<ChatSurvey
      type="survey" key="foo"
      permit="the-permit" elements={elements}
      continueCallback={mockCallback} />);
  });

  test("basic rendering", async () => {

    screen.getAllByText(/What car/).forEach((elt: any) =>
      expect(elt).toHaveTextContent("What car are you driving?")
    );
    expect(screen.getByText("Ford")).toBeDefined();
  });


  test("Can submit data", () => {
    const fordCheck = screen.getByText("Ford");

    const fordClick = createEvent.click(fordCheck);
    fireEvent(fordCheck, fordClick);

    const submitButton = screen.getByText("Complete");
    const submitClick = createEvent.click(submitButton);
    fireEvent(submitButton, submitClick);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toBeCalledWith({ "car": ["Ford"] });
  });
});
