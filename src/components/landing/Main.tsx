import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import { Header1 } from "~/src/components/Header1";
import { Home } from "~/src/components/landing/Home";
import { Login } from "~/src/components/landing/Login";
import { Reset } from "~/src/components/landing/Reset";
import { Signup } from "~/src/components/landing/Signup";
import { NotFound as ErrorNotFound } from "~/src/components/errors/NotFound";


export const Main = (props: Router.RouteComponentProps) => {

  return (
    <div>
      <Header1 location={props.location.pathname} />
      <RouterDOM.Switch>
        <RouterDOM.Route exact path="/landing/" component={Home} />
        <RouterDOM.Route exact path="/landing/home" component={Home} />
        <RouterDOM.Route exact path="/landing/login" component={Login} />
        <RouterDOM.Route exact path="/landing/reset" component={Reset} />
        <RouterDOM.Route exact path="/landing/signup" component={Signup} />
        <RouterDOM.Route path="/landing/*" component={ErrorNotFound} />
      </RouterDOM.Switch>
    </div>
  );

};
