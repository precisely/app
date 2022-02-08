import * as React from "react";
import * as RouterDOM from "react-router-dom";

import { Button } from "~/src/components/Button";
import { Footer } from "~/src/components/Footer";

import "./common.css";
import imgEscutcheon from "~/assets/images/escutcheon/red.svg";


export const Main = () => {

  const history = RouterDOM.useHistory();

  const [patientId, setPatientId] = React.useState(1);

  return (
    <div>
      <div className="pt-8">
        <div className="flex justify-center">
          <img className="w-20" src={imgEscutcheon} />
        </div>
      </div>
      <div className="pt-8 text-lg">
        <div className="flex justify-center">
          Demo Driver
        </div>
      </div>
      <div className="pt-6 grid grid-cols-6">
        <div className="col-start-3 col-span-1 pr-2">
          <input className="w-full h-full"
                 type="number"
                 value={patientId}
                 onChange={(event) => setPatientId(parseInt(event.target.value))}
                 min="1" />
        </div>
        <div className="col-start-4">
          <Button text="Patient"
                  color="cardinal"
                  classes="w-full py-2 pr-2"
                  callback={() => history.push(`/demo/patient/${patientId}`)} />
        </div>
      </div>
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button text="Clinic"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={() => history.push("/demo/clinic")} />
        </div>
      </div>
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button text="Lab"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={() => history.push("/demo/lab")} />
        </div>
      </div>

      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button text="Pharmacy"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={() => history.push("/demo/pharmacy")} />
        </div>
      </div>

      <div className="pt-8 text-base">
        <div className="flex justify-center">
          Theme
        </div>
      </div>
      <div className="pt-2 grid grid-cols-9">
        <div className="col-start-4 col-span-1 pr-2">
          <Button text="Light Mode"
                  color="coconut"
                  classes="w-full h-full"
                  callback={() => { localStorage.theme = "light"; window.location.reload(); }} />
        </div>
        <div className="col-start-5 col-span-1 pr-2">
          <Button text="Dark Mode"
                  color="ink"
                  classes="w-full h-full"
                  callback={() => { localStorage.theme = "dark"; window.location.reload(); }} />
        </div>
        <div className="col-start-6 col-span-1 pr-2">
          <Button text="OS Mode"
                  color="cobalt"
                  classes="w-full h-full"
                  callback={() => { localStorage.removeItem("theme"); window.location.reload(); }} />
        </div>
      </div>
      <RouterDOM.Switch>
      </RouterDOM.Switch>
      <Footer showLogout={false} />
    </div>
  );

};
