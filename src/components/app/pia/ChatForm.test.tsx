import * as React from "react";
import * as TLR from "@testing-library/react";

import { ChatForm } from "./ChatForm";


describe("ChatForm", () => {

  test("basic rendering", async () => {
    const items: any = {
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
        choices: [
          "Ford",
          "Tesla",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen"
        ]
      }]
    };
    TLR.render(<ChatForm type="form" items={items} reactId="" continueCallback={async () => { }} />);
    TLR.screen.getAllByText(/What car/).forEach(elt =>
      expect(elt).toHaveTextContent("What car are you driving?")
    );
  });

  // test("home", async () => {
  //   const history = History.createMemoryHistory();
  //   TLR.render(ReactUtils.routedComponent((_props) => <Survey />, {history}));
  //   const signupButton = TLR.screen.getByText("Get Started");
  //   TLR.fireEvent.click(signupButton);
  //   expect(history.location.pathname).toEqual("/landing/signup");
  // });

});
