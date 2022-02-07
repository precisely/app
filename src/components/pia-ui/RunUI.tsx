import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Run } from "~/src/utils/pia";
import { JSONData } from "~/src/utils/types";
import { UIProps, ContinueFn } from "~/src/components/pia-ui/types";

import { Text } from "~/src/components/pia-ui/Text";
import { Buttons } from "~/src/components/pia-ui/Buttons";


interface Props {
  run: Run
}

const ComponentMap: { [key: string]: ((props: any) => JSX.Element) } = {
  buttons: Buttons,
  text: Text
};

export const RunUI = (props: Props) => {
  const [run, setRun] = React.useState(props.run);

  const renderHelper = () => {
    return convertRunOutputToUIProps(run.output).map(makeComponent);
  };

  const safelySetRun = async (runPromise: Promise<Run>) => {
    try {
      setRun(await runPromise);
    } catch {
      // TODO: Add proper error handling.
      toast.error("PIA request broke!");
    }
  }

  const convertRunOutputToUIProps = (elements: JSONData[]): UIProps[] => {
    return elements.map(makeUIProps).filter(x => !!x);
  };

  const makeContinueFn = (run: Run, permit: JSONData): ContinueFn =>
    async (data: JSONData = null) =>
      await safelySetRun(PIAUtils.continueRun(run.id, data, permit));

  const makeComponent = (element: UIProps, index: number) => {
    let component = ComponentMap[element['type']];
    if (!component) {
      console.log("Unrecognized component ", element, " in RunUI");
      return null;
    }
    else {
      return component({ key: JSON.stringify(index), ...element });
    }
  };

  const makeUIProps = (elt: JSONData, idx: number): UIProps | null => {
    let id = `${idx}`;
    switch (typeof elt) {
      case 'string':
        return { id, type: 'message', text: elt, continueFn: null };

      case 'object':
        if ('type' in elt && typeof elt.type === 'string') {
          return {
            id,
            type: elt.type,
            ...elt,
            continueFn: makeContinueFn(run, elt.permit)
          };
        }
    }
    console.log("Unhandled Run response:" + JSON.stringify(elt));
    return null;
  };

  return (
    <div>
      {renderHelper()}
    </div>
  );

};
