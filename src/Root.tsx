import * as React from "react";
import * as ReactDOM from "react-dom";
import * as RouterDOM from "react-router-dom";
import * as Toast from "react-toastify";

import * as SessionUtils from "~/src/utils/session";
import { AuthRoute } from "~/src/AuthRoute";
import { Main as LandingMain } from "~/src/components/landing/Main";
import { Main as AppMain } from "~/src/components/app/Main";
import { Terms } from "~/src/components/Terms";
import { Privacy } from "~/src/components/Privacy";
import { NotFound as ErrorNotFound } from "~/src/components/errors/NotFound";

import "react-toastify/dist/ReactToastify.css";
import "~/src/toast.css";
import "~/src/components/common.css";


const Root = () => {

  const redirect = () => {
    if (SessionUtils.isAuthenticated()) {
      return (
        <RouterDOM.Redirect to="/app" />
      );
    }
    else {
      return (
        <RouterDOM.Redirect to="/landing" />
      );
    }
  };

  return (
    <div>
      <RouterDOM.BrowserRouter>
        <RouterDOM.Switch>
          <RouterDOM.Route exact path="/" render={redirect} />
          <RouterDOM.Route path="/landing" component={LandingMain} />
          <RouterDOM.Route exact path="/terms" component={Terms} />
          <RouterDOM.Route exact path="/privacy" component={Privacy} />
          <AuthRoute path="/app" component={AppMain} />
          <RouterDOM.Route path="*" component={ErrorNotFound} />
        </RouterDOM.Switch>
      </RouterDOM.BrowserRouter>
      <Toast.ToastContainer
        autoClose={3500}
        position="top-right"
        hideProgressBar={true} />
    </div>
  );

};


ReactDOM.render(<Root />, document.getElementById("root"));
