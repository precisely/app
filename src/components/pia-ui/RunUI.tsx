import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Run } from "~/src/utils/pia";
import { JSONData } from "~/src/utils/types";
import { ChatProps, ContinueFn } from "~/src/components/pia-ui/types";
import { Button } from "~/src/components/Button";
import { Spinner } from "~/src/components/Spinner";

import { ChatMessage } from "~/src/components/pia-ui/ChatMessage";
import { ChatChoices } from "~/src/components/pia-ui/ChatChoices";


interface Props {
  run: Run
}

const ComponentMap: { [key: string]: ((props: any) => JSX.Element) } = {
  buttons: ChatChoices,
  message: ChatMessage
};

export const RunUI = (props: Props) => {
  const [run, setRun] = React.useState(props.run);

  const renderHelper = () => {
    return runResponseToChatProps(run.output).map(componentFromElement);
  };

  const safelySetRun = async (runPromise: Promise<Run>) => {
    try {
      setRun(await runPromise);
    } catch {
      // TODO: Add proper error handling.
      toast.error("PIA request broke!");
    }
  }
  const runResponseToChatProps = (elements: JSONData[]): ChatProps[] => {
    return elements.map(chatPropFromRunResponseElement).filter(x => !!x);
  };

  const makeContinueFn = (run: Run, permit: JSONData): ContinueFn =>
    async (data: JSONData = null) =>
      await safelySetRun(PIAUtils.continueRun(run.id, data, permit));

  const componentFromElement = (element: ChatProps) => {
    let component = ComponentMap[element['type']];
    if (!component) {
      console.log("Unrecognized component ", element, " in RunUI");
      return null;
    }
    else {
      return component(element);
    }
  };

  const chatPropFromRunResponseElement = (elt: JSONData, idx: number): ChatProps | null => {
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
