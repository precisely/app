import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Run } from "~/src/utils/pia";
import { JSONData, ChatProps, ContinueCallback } from "~/src/components/app/types";
import { Button } from "~/src/components/Button";
import { Spinner } from "~/src/components/Spinner";

import { ChatMessage } from "~/src/components/app/pia/ChatMessage";
import { ChatChoices } from "~/src/components/app/pia/ChatChoices";

enum RunUIState {
  NotStarted,
  Running,
  Loading
}

interface RunUIProps {
  flowName: string
}

const ResponseMap: { [key: string]: ((props: any) => JSX.Element) } = {
  choices: ChatChoices,
  message: ChatMessage
};

export const RunUI = (props: RunUIProps) => {
  const [runUIState, setRunUIState] = React.useState(RunUIState.NotStarted);
  const [run, setRun] = React.useState(null);

  const startRun = async (flow: string) => {
    await safelySetRun(PIAUtils.startRun(flow));
  };

  const makeContinueCallback = (run: Run): ContinueCallback =>
    async (data: JSONData = null, permit: JSONData = null) =>
      await safelySetRun(PIAUtils.continueRun(run.nextId, data, permit));

  const safelySetRun = async (runPromise: Promise<Run>) => {
    try {
      setRun(await runPromise);
      setRunUIState(RunUIState.Running);
    } catch {
      // TODO: Add proper error handling.
      toast.error("PIA request broke!");
    }
  }

  const chatPropFromResponseElt = (continueCallback: ContinueCallback) =>
    (elt: JSONData, idx: number): ChatProps => {
      if (typeof elt === 'string') {
        return { type: 'message', text: elt, continueCallback: null };
      } else if (elt instanceof Object &&
        typeof elt === 'object' &&
        //elt!["type"] &&
        'type' in elt &&
        //elt.hasOwnProperty("type") &&
        typeof elt.type === 'string') {
        // am: The type: elt["type"] is a kludge to get around the type checker.
        //     For whatever reason, the above expression (or using "type" in elt)
        //     does not recognize that elt contains a key "type". It must be
        //     something to do with the JSONData definition {[key: string]: JSONData}
        //     Also perhaps related to this Typescript issue:
        //     https://github.com/microsoft/TypeScript/issues/21732
        //
        //     There may be a problem with our Typescript installation. We're on latest
        //     stable as of time of writing, but still getting an issue.
        //     See the commented code in app/types.ts - it works in a online playground,
        //     but is producing an error for us. Why?
        return {
          id: `${idx}`,
          type: elt.type,
          ...elt,
          continueCallback: continueCallback,
          foo: "bar"
        };
      } else {
        throw "Invalid response element"; // TODO: handle more gracefully
      }
    };

  const normalizeElements = (elements: JSONData[]): ChatProps[] => {
    const chatPropMaker = chatPropFromResponseElt(makeContinueCallback(run));
    return elements.map(chatPropMaker).filter(x => !!x);
  };

  const componentFromElement = (element: ChatProps) => {
    let component = ResponseMap[element['type']];
    if (!component) {
      console.log("Unrecognized component ", element, " in RunUI");
      return null;
    }
    else {
      return component(element);
    }
  };

  const showStartButton = () => {
    const msg = `Start run ${props.flowName}`;
    return (
      <div id="run-start-button">
        <Button callback={() => startRun("welcome")}
          color="cardinal"
          classes="w-full py-2"
          text={msg} />
      </div>
    );
  };

  const spinner = () => {
    return (
      <div className="ctr">
        <Spinner />
      </div>
    );
  };

  const renderHelper = () => {
    switch (runUIState) {
      case RunUIState.NotStarted:
        return showStartButton();

      case RunUIState.Running:
        return normalizeElements(run.response).map(componentFromElement);

      case RunUIState.Loading:
        return spinner();

      default:
        return (<div>This should never render.</div>);
    }
  };

  return (
    <div>
      {renderHelper()}
    </div>
  );

};
