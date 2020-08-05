import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Spinner } from "~/src/components/Spinner";

import "./common.css";


enum ConfirmState {
  Working,
  Success,
  Failure
}


export const Confirm = (props: Router.RouteComponentProps) => {

  const { token } = Router.useParams();

  const [confirmState, setConfirmState] = React.useState(ConfirmState.Working);

  React.useEffect(() => {
    const go = async () => {
      const confirmResult = await LoginUtils.confirm(token);
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

  if (AuthUtils.isAuthenticated()) {
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
          Confirmation succeeded! Please login.
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