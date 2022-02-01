import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as ApiUtils from "~/src/utils/api";
import * as AuthUtils from "~/src/utils/auth";
import * as PIAUtils from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { Footer } from "~/src/components/Footer";

import imgEscutcheon from "~/assets/images/escutcheon/red.svg";


export const Main = () => {

  const [stuff, setStuff] = React.useState([]);

  const privateEndpoint = async () => {
    try {
      const resp: ApiUtils.Result<{message: string}> = await ApiUtils.api<{message: string}>({
        method: "GET",
        url: `${process.env.BACKEND_URL}/endpoints/private`
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
      <Footer showLogout={true} />
    </div>
  );

};
