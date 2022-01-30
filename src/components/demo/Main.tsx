import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { toast } from "react-toastify";

import * as ApiUtils from "~/src/utils/api";
import * as PIAUtils from "~/src/utils/pia";

import { Button } from "~/src/components/Button";
import { Footer } from "~/src/components/Footer";

import { Patient } from "~/src/components/demo/Patient";
import { Clinic } from "~/src/components/demo/Clinic";

import imgEscutcheon from "~/assets/images/escutcheon/red.svg";


export const Main = () => {

  const history = RouterDOM.useHistory();

  const [sse, setSse] = React.useState<EventSource>(
    () => {
      const sse = new EventSource(`${process.env.PIA_URL}/async`);
      sse.onerror = () => {
        sse.close();
      };
      sse.onmessage = (event) => {
        toast.info(event.data);
      };
      return sse;
    }
  );

  const urlPatientUI = "/demo/patient";
  const urlClinicUI = "/demo/clinic";

  const gotoPatientUI = () => {
    history.push(urlPatientUI);
  };

  const gotoClinicUI = () => {
    history.push(urlClinicUI);
  };

  return (
    <div>
      <div className="pt-8">
        <div className="flex justify-center">
          <img className="w-20" src={imgEscutcheon} />
        </div>
      </div>
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button text="Patient UI"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={gotoPatientUI} />
        </div>
      </div>
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button text="Clinic UI"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={gotoClinicUI} />
        </div>
      </div>
      <RouterDOM.Switch>
        <RouterDOM.Route path={urlPatientUI} component={Patient} />
        <RouterDOM.Route path={urlClinicUI} component={Clinic} />
      </RouterDOM.Switch>
      <Footer showLogout={false} />
    </div>
  );

};
