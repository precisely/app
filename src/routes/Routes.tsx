import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { AuthRoute } from "~/src/routes/AuthRoute";

import { AboutUs } from "~/src/components/AboutUs";
import { Login } from "~/src/components/Login";
import { Main as LandingMain } from "~/src/components/landing/Main";
import { NotFound } from "~/src/components/errors/NotFound";
import { Private } from "~/src/components/Private";


export const Routes = () => {

  // TODO: rework this
  // it should be refactored into a Main component, and dispatch by "logged in" and "not logged in"

  return (
    <Switch>
      <Route path="/" exact={false}
             component={LandingMain} />
      <Route path="/login" exact={true}
             component={Login} />
      {/* <AuthRoute path="/private" exact={true}
          component={Private} /> */}
      <Route path="*"
             component={NotFound} />
    </Switch>
  );

};
