import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Auth0Route } from "~/src/routes/Auth0Route";

import { AboutUs } from "~/src/components/AboutUs";
import { LoginAuth0 } from "~/src/components/LoginAuth0";
import { Main } from "~/src/components/Main";
import { NotFound } from "~/src/components/errors/NotFound";
import { Private } from "~/src/components/Private";


export const Routes = () => {

  return (
    <Switch>
      <Route path="/" exact={true}
             component={Main} />
      <Route path="/login-auth0" exact={true}
             component={LoginAuth0} />
      <Route path="/about-us" exact={true}
             component={AboutUs} />
      <Auth0Route path="/private" exact={true}
                  component={Private} />
      <Route path="*"
             component={NotFound} />
    </Switch>
  );

};
