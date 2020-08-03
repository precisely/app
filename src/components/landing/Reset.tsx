import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Button } from "~/src/components/Button";

import "./common.css";


export const Reset = () => {

  const resetFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [resetRequestSent, setResetRequestSent] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const reset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // FIXME!!!
    //await LoginUtils.reset(email);
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

  if (AuthUtils.isAuthenticated()) {
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
      <div className="grid grid-cols-6 text-xs">
        <div className="col-start-2 col-span-4 text-center">
          Please enter your email address to receive a link to reset your password
        </div>
      </div>
      <form ref={resetFormRef} onSubmit={reset}>
        <div className="pt-5 grid grid-cols-4 text-sm">
          <div className="col-start-2 col-span-2 pb-8">
            <label>
              Email
              <input className="input-text"
                     placeholder="Enter your email"
                     value={email}
                     required
                     pattern=".+@.+"
                     onChange={onChangeEmail}
                     name="email" />
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
      <RouterDOM.Link to="/landing/login"
                      className="ctr text-xs font-bold pt-6">
        Back to Login
      </RouterDOM.Link>
    </div>
  );

};
