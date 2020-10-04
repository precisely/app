/* eslint @typescript-eslint/no-explicit-any: "off" */

import * as React from "react";
import { Route, Redirect } from "react-router-dom";

import * as SessionUtils from "~/src/utils/session";


function renderMergedProps(component:  React.ComponentClass<any> | React.StatelessComponent<any>, ...rest: any[]) {
  const finalProps = Object.assign({}, ...rest);
  const MergedComponent = component;
  return <MergedComponent {...finalProps} />;
}


interface AuthProps {
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
  exact?: boolean;
  path: string;
}


export const AuthRoute = (authProps: AuthProps) => {

  const { component, ...rest } = authProps;

  function wrapRender(routeProps: any) {
    return SessionUtils.isAuthenticated() ? (
      renderMergedProps(authProps.component, routeProps, rest)
    ) : (
      <Redirect to={{ pathname: "/landing/login", state: { from: routeProps.location.pathname } }} />
    );
  }

  return (
    <Route {...rest} render={wrapRender} />
  );

};
