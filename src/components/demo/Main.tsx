import * as React from "react";

import { Button } from "~/src/components/Button";
import { Footer } from "~/src/components/Footer";

import "./common.css";
import imgEscutcheon from "~/assets/images/escutcheon/red.svg";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export const Main = () => {
  const navigate = useNavigate();

  const [patientId, setPatientId] = React.useState(1);
  const [patientIdForLabUI, setPatientIdForLabUI] = React.useState(1);
  const [patientIdForPharmacyUI, setPatientIdForPharmacyUI] = React.useState(1);

  return (
    <div>
      <Helmet>
        <title>Precise.ly: Demo Driver</title>
      </Helmet>
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
      <div className="pt-6 grid grid-cols-3">
        <div className="col-start-2">
          <Button text="Clinic UI"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={() => navigate("/clinic")} />
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
          <Button text="Patient UI"
                  color="cardinal"
                  classes="w-full py-2 pr-2"
                  callback={() => navigate(`/patient/${patientId}`)} />
        </div>
      </div>
      <div className="pt-6 grid grid-cols-6">
        <div className="col-start-3 col-span-1 pr-2">
          <input className="w-full h-full"
                 type="number"
                 value={patientIdForLabUI}
                 onChange={(event) => setPatientIdForLabUI(parseInt(event.target.value))}
                 min="1" />
        </div>
        <div className="col-start-4">
          <Button text="Lab UI"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={() => navigate(`/lab/${patientIdForLabUI}`)} />
        </div>
      </div>

      <div className="pt-6 grid grid-cols-6">
        <div className="col-start-3 col-span-1 pr-2">
          <input className="w-full h-full"
                 type="number"
                 value={patientIdForPharmacyUI}
                 onChange={(event) => setPatientIdForPharmacyUI(parseInt(event.target.value))}
                 min="1" />
        </div>
        <div className="col-start-4">
          <Button text="Pharmacy UI"
                  color="cardinal"
                  classes="w-full py-2"
                  callback={() => navigate(`/pharmacy/${patientIdForPharmacyUI}`)} />
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
      <Footer />
    </div>
  );

};
