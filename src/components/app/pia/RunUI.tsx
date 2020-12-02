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


export const RunUI = (props: RunUIProps) => {

  const [runUIState, setRunUIState] = React.useState(RunUIState.NotStarted);
  const [elements, setElements] = React.useState([]);

  const startRun = async () => {
    const msg = `starting run ${props.flowName}`;
    setRunUIState(RunUIState.Running);
    toast.info(msg);
    try {
      const resp = await PIAUtils.startRun("welcome");
      console.log(resp);
      setRunUIState(RunUIState.Running);
      setElements(
        resp.response.map((elt: any, idx: number) => {
          if ("string" === typeof(elt)) {
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
