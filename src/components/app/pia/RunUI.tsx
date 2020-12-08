import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
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

type ResponseElement = {type: string, [key: string]: any}; //ChatMessageProps | ChatChoicesProps | ChatSliderProps;

const ResponseMap: {[key: string]: (props: ResponseElement) => JSX.Element } = {
  slider: ChatSlider,
  choices: ChatChoices,
  message: ChatMessage
};

function normalizeResponseElement(elt: JSON): ResponseElement {
  if (typeof elt === 'string') {
     return { type: 'message', text: elt};
  } else if ('type' in elt) {
     return elt;
  } else {
    throw "Invalid response element"; // TODO: handle more gracefully
  };
}

export const RunUI = (props: RunUIProps) => {

  const [runUIState, setRunUIState] = React.useState(RunUIState.NotStarted);
  const [elements, setElements] = React.useState([]);

  const startRun = async () => {
    const msg = `starting run ${props.flowName}`;
    setRunUIState(RunUIState.Running);
    toast.info(msg);
    try {
      const run = await PIAUtils.startRun("welcome");
      console.log(run);
      setRunUIState(RunUIState.Running);
      setElements(
        run.response.map((elt: JSON, idx: number) => {
          //this should all become its own function, params are elt and idx
          let responseElement = normalizeResponseElement(elt); //the idx needs to be added to the elt obj {id: "my-new-prop", ... existing-object}
          //display the idx in the rendered components
          let component = ResponseMap[responseElement.type];
          if (!component) {
            console.log("No component found for ", responseElement, " in RunUI");
            return null;
          }
          else {
            return component(responseElement);
          }
        }).filter( x => !!x)
      );
    }
    catch (error) {
      // TODO: Add proper error handling.
      toast.error("PIA request broke!");
    }
  };

  const continueRun = async () => {
    toast.info("continue run");
  };

  const renderHelper = () => {
    if (RunUIState.NotStarted === runUIState) {
      const msg = `Start run ${props.flowName}`;
      return (
        <div>
          <Button callback={startRun}
                  color="cardinal"
                  classes="w-full py-2"
                  text={msg} />
        </div>
      );
    }
    else if (RunUIState.Running === runUIState) {
      return (
        <div>
          {elements}
          <Button callback={continueRun}
                  color="cobalt"
                  classes="w-full py-2"
                  text="Send" />
        </div>
      );
    }
    else if (RunUIState.Loading === runUIState) {
      return (
        <div className="ctr">
          <Spinner />
        </div>
      );
    }
    else {
      // keep compiler happy @@
      return (<div>This should never render.</div>);
    }
  };

  return (
    <div>
      {renderHelper()}
    </div>
  );
  
};
