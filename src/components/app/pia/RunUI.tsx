import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Run } from "~/src/utils/pia";
import { ChatProps } from "~/src/components/app/pia/ChatProps";
import { Button } from "~/src/components/Button";
import { Spinner } from "~/src/components/Spinner";

import { ChatMessage, ChatMessageProps } from "~/src/components/app/pia/ChatMessage";
import { ChatChoices, ChatChoicesProps } from "~/src/components/app/pia/ChatChoices";
import { ChatSlider, ChatSliderProps } from "~/src/components/app/pia/ChatSlider";

enum RunUIState {
  NotStarted,
  Running,
  Loading
}

interface RunUIProps {
  flowName: string
}

interface ResponseElement {
  type: string,
  callback: (data: JSON, permit: JSON) => void;
  [key: string]: any
};

const ResponseMap: { [key: string]: (props: ResponseElement) => JSX.Element } = {
  choices: ChatChoices,
  message: ChatMessage
};

export const RunUI = (props: RunUIProps) => {
  const [runUIState, setRunUIState] = React.useState(RunUIState.NotStarted);
  const [run, setRun] = React.useState(null);
  let nextId = null;

  const startRun = async (flow: string) => {
    setRunUIState(RunUIState.Running);
    setRun(await PIAUtils.startRun(flow));
  };

  const makeContinueCallback = () =>
    async (data: JSON = null, permit: JSON = null) =>
      setRun(await PIAUtils.continueRun(run.nextId, data, permit));

  // const setRunElements = (run: Run) => {
  //   try {
  //     console.log(run);
  //     setElements(normalizeElements(run.response));
  //   }
  //   catch (error) {
  //     // TODO: Add proper error handling.
  //     toast.error("PIA request broke!");
  //   }
  // };

  const normalizeResponseElement = (elt: JSON, idx: number): ResponseElement => {
    if (typeof elt === 'string') {
      return { type: 'message', text: elt, callback: null };
    } else if (elt instanceof Object && 'type' in elt) {
      return { callback: makeContinueCallback(), ... elt };
    } else {
      throw "Invalid response element"; // TODO: handle more gracefully
    };
  };

  const normalizeElements = (elements: JSON[]) => {
    return elements.map(normalizeResponseElement).filter(x => !!x);
  };

  const componentFromElement = (element: ResponseElement) => {
    let component = ResponseMap[element.type];
    if (!component) {
      console.log("No component found for ", element, " in RunUI");
      return null;
    }
    else {
      return component(element);
    }
  };

  const showStartButton = () => {
    const msg = `Start run ${props.flowName}`;
    return (
      <div>
        <Button callback={() => startRun("welcome")}
          color="cardinal"
          classes="w-full py-2"
          text={msg} />
      </div>
    );
  }

  const spinner = () => {
    return (
      <div className="ctr">
        <Spinner />
      </div>
    );
  }

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

  }


  return (
    <div>
      {renderHelper()}
    </div>
  );

};
