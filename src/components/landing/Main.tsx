import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import { Company } from "~/src/components/landing/Company";
import { Header } from "~/src/components/landing/Header";
import { Home } from "~/src/components/landing/Home";
import { Login } from "~/src/components/landing/Login";
import { Reset } from "~/src/components/landing/Reset";
import { Signup } from "~/src/components/landing/Signup";
import { NotFound as ErrorNotFound } from "~/src/components/errors/NotFound";


export const Main = (props: Router.RouteComponentProps<void>) => {

  return (
    <div>
      <Header location={props.location.pathname} />
      <RouterDOM.Switch>
        <RouterDOM.Route exact path="/landing/" component={Home} />
        <RouterDOM.Route exact path="/landing/home" component={Home} />
        <RouterDOM.Route exact path="/landing/company" component={Company} />
        <RouterDOM.Route exact path="/landing/login" component={Login} />
        <RouterDOM.Route exact path="/landing/reset" component={Reset} />
        <RouterDOM.Route exact path="/landing/signup" component={Signup} />
        <RouterDOM.Route path="/landing/*" component={ErrorNotFound} />
      </RouterDOM.Switch>
    </div>
  );

};
