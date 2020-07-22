import * as React from "react";
import * as ReactDOM from "react-dom";
import * as RouterDOM from "react-router-dom";
import * as Toast from "react-toastify";

import * as AuthUtils from "~/src/utils/auth";
import { AuthRoute } from "~/src/AuthRoute";
import { Main as LandingMain } from "~/src/components/landing/Main";
import { Main as AppMain } from "~/src/components/app/Main";
import { NotFound as ErrorNotFound } from "~/src/components/errors/NotFound";

import "react-toastify/dist/ReactToastify.css";
import "~/src/components/common.css";


const Root = () => {

  const redirect = () => {
    if (AuthUtils.isAuthenticated()) {
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
          <AuthRoute path="/app" component={AppMain} />
          <RouterDOM.Route path="*" component={ErrorNotFound} />
        </RouterDOM.Switch>
      </RouterDOM.BrowserRouter>
      <Toast.ToastContainer />
    </div>
  );

};


ReactDOM.render(<Root />, document.getElementById("root"));
