import * as React from "react";
import * as Router from "react-router";

import { Header1 } from "~/src/components/Header1";

import "./common.css";


export const Terms = (props: Router.RouteComponentProps) => {

  return (
    <div>
      <Header1 location={props.location.pathname} />
      <div className="">
        <div className="h1">
          Terms and Conditions
        </div>
        <div className="p-1">
          <p>
            Terms here
          </p>
          <p>
            more terms here
          </p>
        </div>
      </div>
    </div>
  );

};
