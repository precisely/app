import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Run } from "~/src/utils/pia";
import { JSONData } from "~/src/utils/types";
import { UIProps, ContinueFn } from "~/src/components/pia-ui/types";

import { Text } from "~/src/components/pia-ui/Text";
import { Buttons } from "~/src/components/pia-ui/Buttons";
import { Form } from "~/src/components/pia-ui/Form";


interface Props {
  run: Run
}

const ComponentMap: { [key: string]: ((props: any) => JSX.Element) } = {
  buttons: Buttons,
  text: Text,
  form: Form
};

export const RunUI = (props: Props) => {

  const [run, setRun] = React.useState(props.run);
  const [postContinueRun, setPostContinueRun] = React.useState<PIAUtils.Run>();

  const renderHelper = () => {
    const stage1 = (undefined === postContinueRun ? "" : "hidden");
    const stage2 = (undefined !== postContinueRun ? "" : "hidden");
    return (
      <React.Fragment>
        <div className={stage1}>
          {convertRunOutputToUIProps(run.output).map(makeComponent)}
        </div>
        <div className={stage2}>
          all done
        </div>
      </React.Fragment>
    );
  };

  const convertRunOutputToUIProps = (elements: JSONData[]): UIProps[] => {
    return elements.map(makeUIProps).filter(x => !!x);
  };

  const makeContinueFn = (run: Run, permit: JSONData): ContinueFn =>
    async (data: JSONData = null) => {
      const newRun = await PIAUtils.continueRun(run.id, data, permit);
      setPostContinueRun(newRun);
    };

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
