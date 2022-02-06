import * as React from "react";
import * as Router from "react-router";

import { Header1 } from "~/src/components/Header1";

import "./common.css";


export const Privacy = (props: Router.RouteComponentProps) => {

  return (
    <div>
      <Header1 location={props.location.pathname} />
      <div className="">
        <div className="h1">
          Privacy Policy
        </div>
        <div className="p-1">
          <p>
            Privacy text here
          </p>
          <p>
            More privacy policy here
          </p>
        </div>
      </div>
    </div>
  );

};
