import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as SessionUtils from "~/src/utils/session";
import * as AuthUtils from "~/src/utils/auth";
import { Button } from "~/src/components/Button";

import "./common.css";


export const Reset = () => {

  const resetFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [resetRequestSent, setResetRequestSent] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const reset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await AuthUtils.reset(email);
    setResetRequestSent(true);
  };

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  React.useEffect(() => {
    setValid(
      resetFormRef.current && _.every(
        resetFormRef.current.elements,
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

  if (resetRequestSent) {
    return (
      <div className="pt-5 pb-1 grid grid-cols-6">
        <div className="col-start-2 col-span-4 text-center">
          Your password will be reset. Please check your email.
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="h1">
        Reset your password
      </div>
      <div className="grid grid-cols-6 text-sm">
        <div className="col-start-2 col-span-4 text-center">
          Please enter your email address to receive a link to reset your password
        </div>
      </div>
      <form ref={resetFormRef} onSubmit={reset}>
        <div className="pt-5 login-form-grid">
          <div className="login-form-row">
            <label>
              Email
              <input placeholder="Enter your email"
                     autoComplete="off"
                     autoCapitalize="off"
                     value={email}
                     required
                     pattern=".+@.+"
                     onChange={onChangeEmail}
                     name="email" />
            </label>
          </div>
          <div className="pt-8 login-form-row-short">
            <Button type="submit"
                    color={valid ? "cardinal" : "grey"}
                    classes="w-full py-2"
                    text="Reset" />
          </div>
        </div>
      </form>
      <RouterDOM.Link to="/landing/login"
                      className="ctr text-sm font-bold pt-6">
        Back to Login
      </RouterDOM.Link>
    </div>
  );

};
