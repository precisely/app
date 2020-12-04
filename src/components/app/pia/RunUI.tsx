import * as React from "react";
import { toast } from "react-toastify";

import * as PIAUtils from "~/src/utils/pia";
import { Button } from "~/src/components/Button";
import { ChatText } from "~/src/components/app/pia/ChatText";
import { Spinner } from "~/src/components/Spinner";


enum RunUIState {
  NotStarted,
  Running,
  Loading
}


interface RunUIProps {
  flowName: string
}

interface ChoicesProps {
  type: "choices",
  choices: string[],
  text: string
}

interface SliderProps {
  type: "slider"
  min: number,
  minTag: string,
  max: number,
  maxTag: string,
  text: string,
  increment: number
}

type ResponseElement = string | ChoicesProps | SliderProps;


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
        //fill out the type for elt any
        run.response.map((elt: ResponseElement, idx: number) => {
          if ("string" === typeof(elt)) {
            console.log("This is to make sure the function reloaded");
            return (
              <ChatText text={elt} key={idx} />
            );
          }
          else {
            return (
              <div>
                FIXME: This needs to dispatch on elt and create the correct component.
              </div>
            );
          }
        })
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
