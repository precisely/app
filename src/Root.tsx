import * as React from "react";
import * as ReactDOM from "react-dom";
import * as RouterDOM from "react-router-dom";
import * as Toast from "react-toastify";

import * as SessionUtils from "~/src/utils/session";
import { AuthRoute } from "~/src/AuthRoute";
import { Main as LandingMain } from "~/src/components/landing/Main";
import { Main as AppMain } from "~/src/components/app/Main";
import { Main as DemoMain } from "~/src/components/demo/Main";
import { Patient as DemoPatient } from "~/src/components/demo/patient/Main";
import { Clinic as DemoClinic } from "~/src/components/demo/Clinic";
import { Lab as DemoLab } from "~/src/components/demo/Lab";
import { Pharmacy as DemoPharmacy } from "~/src/components/demo/Pharmacy";
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
        <RouterDOM.Redirect to="/demo" />
      );
    }
  };

  return (
    <div>
      <RouterDOM.BrowserRouter>
        <RouterDOM.Switch>
          <RouterDOM.Route exact path="/" render={redirect} />
          <RouterDOM.Route path="/landing" component={LandingMain} />
          <RouterDOM.Route exact path="/demo" component={DemoMain} />
          <RouterDOM.Route path="/demo/patient/:patientId" component={DemoPatient} />
          <RouterDOM.Route path="/demo/clinic" component={DemoClinic} />
          <RouterDOM.Route path="/demo/lab" component={DemoLab} />
          <RouterDOM.Route path="/demo/pharmacy" component={DemoPharmacy} />
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
