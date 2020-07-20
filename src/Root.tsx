import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import * as AuthUtils from "~/src/utils/auth";
import { AuthRoute } from "~/src/AuthRoute";
import { Main as LandingMain } from "~/src/components/landing/Main";
import { Main as AppMain } from "~/src/components/app/Main";
import { NotFound as ErrorNotFound } from "~/src/components/errors/NotFound";

import "react-toastify/dist/ReactToastify.css";
import "~/src/components/common.css";


class Root extends React.Component<{}, {}> {

  redirect = () => {
    if (AuthUtils.isAuthenticated()) {
      return (
        <Redirect to="/landing" />
      );
    }
    else {
      return (
        <Redirect to="/app" />
      );
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={this.redirect} />
            <Route path="/landing" component={LandingMain} />
            <AuthRoute path="/app" component={AppMain} />
            <Route path="*" component={ErrorNotFound} />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </div>
    );
  }

}


ReactDOM.render(<Root />, document.getElementById("root"));
