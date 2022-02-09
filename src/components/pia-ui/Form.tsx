import * as React from "react";

import { JSONData } from "~/src/utils/types";

import { UIProps } from '~/src/components/pia-ui/types';


export interface FormProps extends UIProps {
  type: "form",
  // TODO: elements should have true types.
  elements: JSONData[],
  schema: JSONData
}

export const Form = (props: FormProps) => {

  const [formState, setFormState] = React.useState({});

  const makeInputNumber = (element: JSONData) => {
    return (
      <React.Fragment>
        <label htmlFor={element["id"]}>
          {element["label"]}
        </label>
        <input type="number"
               name={element["id"]}
               onChange={onFormChange} />
      </React.Fragment>
    );
  };

  const makeInputMultipleChoice = (element: JSONData) => {
    return (
      <fieldset>
        <legend>{element["id"]}</legend>
        {element["items"].map((item: JSONData, idx: number) => {
          return (
            <React.Fragment key={idx}>
              <input type="radio"
                     name={element["id"]}
                     onChange={onFormChange}
                     value={item["id"]} />
              <label htmlFor={element["id"]}>
                {item["label"]}
              </label>
            </React.Fragment>
          );
        })}
      </fieldset>
    );
  };

  const constructorMap = {
    number: makeInputNumber,
    "multiple-choice": makeInputMultipleChoice
  };

  const makeFormElement = (element: JSONData, idx: number) => {
    return (
      <div key={idx}>
        {constructorMap[element["type"]](element)}
      </div>
    );
  };

  const onFormChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const formStateCopy = {...formState};
    formStateCopy[event.currentTarget.name] = event.currentTarget.value;
    setFormState(formStateCopy);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
    props.continueFn(formState);
  };

  return (
    <div key={props.key}>
      <form onSubmit={onSubmit}>
        {props.elements.map(makeFormElement)}
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );

}
