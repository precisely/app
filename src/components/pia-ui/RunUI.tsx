import * as React from "react";

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

export const RunUI = (props: Props) => {

  const [run, _setRun] = React.useState(props.run);
  const [postContinueRun, setPostContinueRun] = React.useState<PIAUtils.Run>();

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
    // XXX: This variable _must_ be capitalized because it _must_ be used in
    // JSX. If it is a lowercase variable and used as a component constructor
    // function call, React will throw its "Rendered fewer hooks than expected"
    // error.
    const Component = ComponentMap[element["type"]];
    if (!Component) {
      console.log("Unrecognized component ", element, " in RunUI");
      return null;
    } else {
      console.log("Creating component", element["type"]);
      return (
        <React.Fragment key={JSON.stringify(index)}>
          <Component {...element} />
        </React.Fragment>
      );
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
