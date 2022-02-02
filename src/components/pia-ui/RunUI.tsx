import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Run } from "~/src/utils/pia";
import { JSONData } from "~/src/utils/types";
import { ChatProps, ContinueCallback } from "~/src/components/pia-ui/types";
import { Button } from "~/src/components/Button";
import { Spinner } from "~/src/components/Spinner";

import { ChatMessage } from "~/src/components/pia-ui/ChatMessage";
import { ChatChoices } from "~/src/components/pia-ui/ChatChoices";


enum RunUIState {
//  NotStarted,
  Running,
  Loading
}

interface RunUIProps {
  //flowName: string
  run: Run
}

const ComponentMap: { [key: string]: ((props: any) => JSX.Element) } = {
  buttons: ChatChoices,
  message: ChatMessage
};

export const RunUI = (props: RunUIProps) => {
  // const [runUIState, setRunUIState] = React.useState(RunUIState.NotStarted);
  const [run, setRun] = React.useState(props.run);

  // const showStartButton = () => {
  //   const msg = `Start run ${props.flowName}`;
  //   return (
  //     <div id="run-start-button">
  //       <Button callback={() => startRun("welcome")}
  //         color="cardinal"
  //         classes="w-full py-2"
  //         text={msg} />
  //     </div>
  //   );
  // };
  // 
  // const spinner = () => {
  //   return (
  //     <div className="ctr">
  //       <Spinner />
  //     </div>
  //   );
  // };

  const renderHelper = () => {
    return runResponseToChatProps(run.output).map(componentFromElement);
  };

  // const startRun = async (flow: string) => {
  //   console.log("Hello from startRun in RunUI")
  //   await safelySetRun(PIAUtils.startRun(flow));
  // };

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

  const makeContinueCallback = (run: Run, permit: JSONData): ContinueCallback =>
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
        return { id, type: 'message', text: elt, continueCallback: null };

      case 'object':
        if ('type' in elt && typeof elt.type === 'string') {
          return {
            id,
            type: elt.type,
            ...elt,
            continueCallback: makeContinueCallback(run, elt.permit)
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
