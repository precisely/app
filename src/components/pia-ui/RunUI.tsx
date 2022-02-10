import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Run } from "~/src/utils/pia";
import { JSONData } from "~/src/utils/types";
import { UIProps, ContinueFn } from "~/src/components/pia-ui/types";

import { Text } from "~/src/components/pia-ui/Text";
import { Buttons } from "~/src/components/pia-ui/Buttons";
import { Form } from "~/src/components/pia-ui/form/Main";

interface Props {
  run: Run;
}

const ComponentMap: { [key: string]: (props: any) => JSX.Element } = {
  buttons: Buttons,
  text: Text,
  form: Form,
};

const sampleRun: PIAUtils.Run = {
  id: "b86cb46d-5a89-492c-b25b-aa9c07004f58",
  state: "running",
  output: [
    {
      type: "text",
      text: "Please go get your labwork done",
    },
    {
      buttons: [
        {
          id: "cancel",
          text: "Stop reminding me",
        },
      ],
      schema: {
        oneOf: [
          {
            allOf: [
              {
                type: "string",
              },
              {
                enum: ["cancel"],
              },
            ],
          },
          {
            type: "null",
          },
        ],
      },
      type: "buttons",
      permit: null,
    },
    {
      type: "form",
      elements: [
        {
          id: "0",
          label: "INR#",
          type: "number",
        },
        {
          id: "1",
          label: "mult",
          type: "multiple-choice",
          items: [
            { id: "11", label: "label11" },
            { id: "22", label: "label22" },
            { id: "33", label: "label33" },
          ],
        },
      ],
      schema: {},
    },
  ],
  index: {
    title: "Anticoagulation labwork",
    roles: ["patient"],
    "patient-id": 32,
  },
};

export const RunUI = (props: Props) => {
  const [run, setRun] = React.useState(sampleRun);
  const [postContinueRun, setPostContinueRun] = React.useState<PIAUtils.Run>();

  console.log(run, postContinueRun);

  const convertRunOutputToUIProps = (elements: JSONData[]): UIProps[] => {
    return elements.map(makeUIProps).filter((x) => !!x);
  };

  const makeContinueFn =
    (run: Run, permit: JSONData): ContinueFn =>
    async (data: JSONData = null) => {
      const newRun = await PIAUtils.continueRun(run.id, data, permit);
      setPostContinueRun(newRun);
    };

  const makeComponent = (element: UIProps, index: number) => {
    const component = ComponentMap[element["type"]];
    if (!component) {
      console.log("Unrecognized component ", element, " in RunUI");
      return null;
    } else {
      //TODO: remove
      console.log("Creating component", element["type"]);
      return component({ key: JSON.stringify(index), ...element });
    }
  };

  const makeUIProps = (elt: JSONData, idx: number): UIProps | null => {
    let id = `${idx}`;
    switch (typeof elt) {
      case "string":
        return { id, type: "message", text: elt, continueFn: null };

      case "object":
        if ("type" in elt && typeof elt.type === "string") {
          return {
            id,
            type: elt.type,
            ...elt,
            continueFn: makeContinueFn(run, elt.permit),
          };
        }
    }
    console.log("Unhandled Run response:" + JSON.stringify(elt));
    return null;
  };

  return (
    <div className="flex flex-col space-y-6 py-4">
      {postContinueRun === undefined ? (
        convertRunOutputToUIProps(run.output).map(makeComponent)
      ) : (
        <div>all done</div>
      )}
    </div>
  );
};
