import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import * as SessionUtils from "~/src/utils/session";
import { Button } from "~/src/components/Button";
import { Spinner } from "~/src/components/Spinner";

import "./common.css";


enum ConfirmState {
  Waiting,
  Working,
  Success,
  Failure
}


export const ResetConfirm = (props: Router.RouteComponentProps) => {

  const { token } = Router.useParams();

  const passwordFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [confirmState, setConfirmState] = React.useState(ConfirmState.Waiting);
  const [password, setPassword] = React.useState("");

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmState(ConfirmState.Working);
    const confirmState = await AuthUtils.resetConfirm(token, password);
    if (confirmState) {
      setConfirmState(ConfirmState.Success);
    }
    else {
      setConfirmState(ConfirmState.Failure);
    }
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  React.useEffect(() => {
    setValid(
      passwordFormRef.current && _.every(
        passwordFormRef.current.elements,
        (elt: HTMLFormElement) => {
          return elt.checkValidity();
        }
      )
    );
  });

  if (SessionUtils.isAuthenticated()) {
    return (
      <Router.Redirect to="/" />
    );
  }

  const renderHelper = () => {
    if (ConfirmState.Waiting === confirmState) {
      return (
        <form ref={passwordFormRef} onSubmit={resetPassword}>
          <div className="pt-5 grid grid-cols-4">
            <div className="col-start-2 col-span-2 pb-6">
              <label>
                New password
                <input className="input-text"
                       placeholder="Enter your password"
                       value={password}
                       onChange={onChangePassword}
                       type="password"
                       required
                       name="password" />
              </label>
            </div>
            <div className="col-start-2 col-span-2">
              <Button type="submit"
                      color={valid ? "cardinal" : "grey"}
                      classes="w-full py-2"
                      text="Reset" />
            </div>
          </div>
        </form>
      );
    }
    else if (ConfirmState.Working === confirmState) {
      return (
        <div className="ctr">
          <Spinner />
        </div>
      );
    }
    else if (ConfirmState.Success === confirmState) {
      return (
        <div className="ctr">
          Your password was successfully reset! —
          <RouterDOM.Link to="/landing/login"
                          className="pl-1 font-bold">
            Login
          </RouterDOM.Link>
        </div>
      );
    }
    else if (ConfirmState.Failure === confirmState) {
      return (
        <div className="ctr">
          Password reset failed. Please contact Precisely support.
        </div>
      );
    }
  };

  return (
    <div className="">
      <div className="h1">
        Reset Password
      </div>
      <div>
        {renderHelper()}
      </div>
    </div>
  );

};
