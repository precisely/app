import * as React from "react";

import { JSONData } from "~/src/utils/types";

import { UIProps } from "~/src/components/pia-ui/types";
import { Message } from "~/src/components/pia-ui/Message";
import { Button } from "~/src/components/Button";
import { MultipleChoiceInput } from "./MultipleChoiceInput";
import { NumberInput } from "./NumberInput";

export interface FormProps extends UIProps {
  type: "form";
  // TODO: elements should have true types.
  elements: JSONData[];
  schema: JSONData;
}

export const Form = (props: FormProps) => {
  const [formState, setFormState] = React.useState({});

  const makeFormElement = (element: JSONData, idx: number) => {
    switch (element["type"]) {
      case "number":
        return (
          <NumberInput
            key={idx}
            id={element["id"]}
            label={element["label"]}
            onChange={onFormChange}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceInput
            key={idx}
            id={element["id"]}
            label={element["label"]}
            items={element["items"]}
            onChange={onFormChange}
          />
        );
    }

    return null;
  };

  const onFormChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const formStateCopy = { ...formState };
    formStateCopy[event.currentTarget.name] = event.currentTarget.value;
    setFormState(formStateCopy);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
    props.continueFn(formState);
  };

  return (
    <form key={props.key} onSubmit={onSubmit}>
      <Message>
        <div className="w-full bg-white rounded p-4 shadow-lg shadow-ink/5">
          <div className="flex flex-col space-y-4">
            {props.elements.map(makeFormElement)}
          </div>
        </div>
      </Message>
      <div className="flex justify-end mt-6">
        <Button type="submit" color="cardinal">
          Submit
        </Button>
      </div>
    </form>
  );
};

// import * as React from "react";

// import { JSONData } from "~/src/utils/types";

// import { UIProps } from '~/src/components/pia-ui/types';

// export interface FormProps extends UIProps {
//   type: "form",
//   // TODO: elements should have true types.
//   elements: JSONData[],
//   schema: JSONData
// }

// export const Form = (props: FormProps) => {

//   const [formState, setFormState] = React.useState({});

//   const makeInputNumber = (element: JSONData) => {
//     return (
//       <React.Fragment>
//         <label htmlFor={element["id"]}>
//           {element["label"]}
//         </label>
//         <input type="number"
//                name={element["id"]}
//                onChange={onFormChange} />
//       </React.Fragment>
//     );
//   };

//   const makeInputMultipleChoice = (element: JSONData) => {
//     return (
//       <fieldset>
//         <legend>{element["id"]}</legend>
//         {element["items"].map((item: JSONData, idx: number) => {
//           return (
//             <React.Fragment key={idx}>
//               <input type="radio"
//                      name={element["id"]}
//                      onChange={onFormChange}
//                      value={item["id"]} />
//               <label htmlFor={element["id"]}>
//                 {item["label"]}
//               </label>
//             </React.Fragment>
//           );
//         })}
//       </fieldset>
//     );
//   };

//   const constructorMap = {
//     number: makeInputNumber,
//     "multiple-choice": makeInputMultipleChoice
//   };

//   const makeFormElement = (element: JSONData, idx: number) => {
//     return (
//       <div key={idx}>
//         {constructorMap[element["type"]](element)}
//       </div>
//     );
//   };

//   const onFormChange = (event: React.FormEvent<HTMLInputElement>) => {
//     event.preventDefault();
//     const formStateCopy = {...formState};
//     formStateCopy[event.currentTarget.name] = event.currentTarget.value;
//     setFormState(formStateCopy);
//   };

//   const onSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     console.log(formState);
//     props.continueFn(formState);
//   };

//   return (
//     <div key={props.key}>
//       <form onSubmit={onSubmit}>
//         {props.elements.map(makeFormElement)}
//         <button type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );

// }
