import * as React from "react";

import { Button } from "~/src/components/Button";

import "./Home.css";

import imgPhone from "~/assets/images/phone.svg";
import imgDna from "~/assets/images/dna.svg";
import imgRiskDial from "~/assets/images/risk-dial.svg";
import imgTransparentDoctor from "~/assets/images/transparent-doctor.svg";
import imgTestTube from "~/assets/images/test-tube.svg";
import imgHome from "~/assets/images/home.svg";


export const Home = () => {

  return (
    <div className="">
      <div className="pt-2 ctr font-bold">
        Protects you and your family
      </div>
      <div className="ctr text-sm">
        Advanced science health check and monitoring service
      </div>
      <div className="pt-3 grid grid-cols-3 text-center text-sm font-bold">
        <div className="stuffs">
          <img src={imgPhone} />
          <div>Convenient</div>
        </div>
        <div className="stuffs">
          <img src={imgDna} />
          <div>Genetics</div>
        </div>
        <div className="stuffs">
          <img src={imgRiskDial} />
          <div>Personalized Health Scores</div>
        </div>
        <div className="stuffs">
          <img src={imgTransparentDoctor} />
          <div>Trusted Doctors</div>
        </div>
        <div className="stuffs">
          <img src={imgTestTube} />
          <div>Blood Tests</div>
        </div>
        <div className="stuffs">
          <img src={imgHome} />
          <div>At Home Service</div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4">
        <div className="col-start-2 col-span-2">
          <Button color="cobalt"
                  classes="w-full py-2"
                  text="Get Started" />
        </div>
      </div>
      <div className="mt-8 text-center font-bold">
        In partnership with
        <div>
          
        </div>
      </div>
    </div>
  );

};
