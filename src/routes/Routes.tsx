import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { AuthRoute } from "~/src/routes/AuthRoute";

import { AboutUs } from "~/src/components/AboutUs";
import { Login } from "~/src/components/Login";
import { Main } from "~/src/components/Main";
import { NotFound } from "~/src/components/errors/NotFound";
import { Private } from "~/src/components/Private";


export const Routes = () => {

  return (
    <Switch>
      <Route path="/" exact={true}
             component={Main} />
      <Route path="/login" exact={true}
             component={Login} />
      <Route path="/about-us" exact={true}
             component={AboutUs} />
      <AuthRoute path="/private" exact={true}
                 component={Private} />
      <Route path="*"
             component={NotFound} />
    </Switch>
  );

};
