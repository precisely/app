import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps} from "react-router";

import { Header } from "~/src/components/landing/Header";
import { Home } from "~/src/components/landing/Home";
import { Company } from "~/src/components/landing/Company";
import { Login } from "~/src/components/landing/Login";
import { NotFound as ErrorNotFound } from "~/src/components/errors/NotFound";


export const Main = (props: RouteComponentProps<void>) => {

  return (
    <div>
      <Header location={props.location.pathname} />
      <Switch>
        <Route exact path="/landing/" component={Home} />
        <Route exact path="/landing/home" component={Home} />
        <Route exact path="/landing/company" component={Company} />
        <Route exact path="/landing/login" component={Login} />
        <Route path="/landing/*" component={ErrorNotFound} />
      </Switch>
    </div>
  );

};
