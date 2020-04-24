import * as React from "react";
import { Route, Redirect } from 'react-router-dom';

import * as Auth0Utils from "~/src/utils/auth0";


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


export const Auth0Route = (authProps: AuthProps) => {
  const { component, ...rest } = authProps;

  function wrapRender(routeProps: any) {
    return Auth0Utils.isAuthenticated() ? (
      renderMergedProps(authProps.component, routeProps, rest)
    ) : (
      <Redirect to={{ pathname: '/login-auth0', state: { from: routeProps.location.pathname } }} />
    );
  }

  return (
    <Route {...rest} render={wrapRender} />
  );

};
