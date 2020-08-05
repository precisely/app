import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as ApiUtils from "~/src/utils/api";
import * as LoginUtils from "~/src/utils/login";

import { Button } from "~/src/components/Button";

import imgEscutcheon from "~/assets/images/escutcheon/red.svg";


export const Main = () => {

  const history = RouterDOM.useHistory();

  const [stuff, setStuff] = React.useState([]);

  const logout = async () => {
    await LoginUtils.logout();
    history.push("/");
  };

  const privateEndpoint = async () => {
    try {
      const resp: ApiUtils.Result<{message: string}> = await ApiUtils.api<{message: string}>({
        method: "GET",
        url: `${process.env.URL_BACKEND}/endpoints/private`
      });
      if (resp.ok) {
        toast.info("Succesfully made private request.");
        setStuff(stuff.concat(resp.data.message));
      }
      else {
        toast.warn("Private request failed!");
      }
    }
    catch (error) {
      toast.error("Private request broke!", error);
    }
  };

  return (
    <div>
      <div className="pt-8">
        <div className="flex justify-center">
          <img className="w-1/4 h-full" src={imgEscutcheon} />
        </div>
        <p className="text-center">
          You are logged in.
        </p>
      </div>
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button callback={privateEndpoint}
                  color="cardinal"
                  classes="w-full py-2"
                  text="Private Endpoint" />
        </div>
      </div>
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
          —
          <RouterDOM.Link to="" onClick={logout}
                          className="p-1 font-bold">
            Logout
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
