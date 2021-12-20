import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as ApiUtils from "~/src/utils/api";
import * as PIAUtils from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { RunUI } from "~/src/components/app/pia/RunUI";

import imgEscutcheon from "~/assets/images/escutcheon/red.svg";


export const Main = () => {

  const history = RouterDOM.useHistory();

  const [stuff, setStuff] = React.useState([]);

  const helloWorldEndpoint = async () => {
    try {
      const resp: ApiUtils.Result<{message: string}> = await ApiUtils.api<{message: string}>({
        method: "GET",
        url: `${process.env.PIA_URL}/hello`
      });
      if (resp.ok) {
        toast.info("Succesfully made public request.");
        setStuff(stuff.concat(resp.data.message));
      }
      else {
        toast.warn("Request failed!");
      }
    }
    catch (error) {
      toast.error("Request broke!", error);
    }
  };

  const piaEndpoint = async () => {
    try {
      const resp = await PIAUtils.startRun("welcome");
      console.log(resp);
    }
    catch (error) {
      // TODO: Add proper error handling.
      toast.error("PIA request broke!");
    }
  };

  return (
    <div>
      <div className="pt-8">
        <div className="flex justify-center">
          <img className="w-20" src={imgEscutcheon} />
        </div>
        <p className="text-center">
          Welcome to Precisely Rapids.
        </p>
      </div>
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <RunUI flowName="welcome" />
        </div>
      </div>
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button callback={helloWorldEndpoint}
                  color="cardinal"
                  classes="w-full py-2"
                  text="Hello World Endpoint" />
        </div>
      </div>
      {/* <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button callback={piaEndpoint}
                  color="cardinal"
                  classes="w-full py-2"
                  text="PIA Endpoint" />
        </div>
      </div> */}
      <div>
        {stuff.map(item => <div>{item}</div>)}
      </div>
      <div className="pt-6 grid grid-cols-8 text-sm text-center">
        <div className="col-start-2 col-span-6">
          <RouterDOM.Link to="/terms"
                          className="p-1 font-bold">
            Terms and Conditions
          </RouterDOM.Link>
          —
          <RouterDOM.Link to="/privacy"
                          className="p-1 font-bold">
            Privacy Policy
          </RouterDOM.Link>
        </div>
      </div>
      <RouterDOM.Switch>
        {/* <RouterDOM.Route exact path="/app" component={Main} />
            <RouterDOM.Route exact path="/home" component={Home} />
            <RouterDOM.Route exact path="/company" component={Company} /> */}
      </RouterDOM.Switch>
    </div>
  );

};
