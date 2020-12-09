import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as SessionUtils from "~/src/utils/session";
import * as AuthUtils from "~/src/utils/auth";
import { Spinner } from "~/src/components/Spinner";

import "./common.css";


enum ConfirmState {
  Working,
  Success,
  Failure
}


export const SignupConfirm = (_props: Router.RouteComponentProps) => {

  const { token } = Router.useParams <{token: string}>();

  const [confirmState, setConfirmState] = React.useState(ConfirmState.Working);

  React.useEffect(() => {
    const go = async () => {
      const confirmResult = await AuthUtils.signupConfirm(token);
      if (confirmResult) {
        setConfirmState(ConfirmState.Success);
      }
      else {
        setConfirmState(ConfirmState.Failure);
      }
    };
    if (ConfirmState.Working === confirmState) {
      go();
    }
  });

  if (SessionUtils.isAuthenticated()) {
    return (
      <Router.Redirect to="/" />
    );
  }

  const renderHelper = () => {
    if (ConfirmState.Working === confirmState) {
      return (
        <div className="ctr">
          <Spinner />
        </div>
      );
    }
    else if (ConfirmState.Success === confirmState) {
      return (
        <div>
          Confirmation succeeded! Please
          <RouterDOM.Link to="/landing/login"
                          className="pl-1 font-bold">
            Login
          </RouterDOM.Link>!
        </div>
      );
    }
    else if (ConfirmState.Failure === confirmState) {
      return (
        <div>
          Confirmation failed. Please contact Precisely support.
        </div>
      );
    }
    else {
      // keep compiler happy @@
      return (<div>This should never render.</div>);
    }
  };

  return (
    <div className="">
      <div className="h1">
        Signup Confirmation
      </div>
      <div className="grid grid-cols-6 text-sm">
        <div className="col-start-2 col-span-4 text-center">
          {renderHelper()}
        </div>
      </div>
    </div>
  );

};
