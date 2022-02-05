import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as SessionUtils from "~/src/utils/session";
import * as AuthUtils from "~/src/utils/auth";
import { Button } from "~/src/components/Button";

import "./common.css";


enum SignupState {
  None,
  Success,
  Failure
}


export const Signup = (_props: Router.RouteComponentProps) => {

  const signupFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signupState, setSignupState] = React.useState(SignupState.None);

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signupResult = await AuthUtils.signup(email, password);
    if (signupResult) {
      setSignupState(SignupState.Success);
    }
    else {
      setSignupState(SignupState.Failure);
    }
  };

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  React.useEffect(() => {
    setValid(
      signupFormRef.current && _.every(
        signupFormRef.current.elements,
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
    if (SignupState.None === signupState) {
      return (
        <div>
          Thank you for your interest. Please fill out this form to sign up.
        </div>
      );
    }
    else if (SignupState.Success === signupState) {
      return (
        <div>
          Your signup application was received. Please check your email for a confirmation link.
        </div>
      );
    }
    else if (SignupState.Failure === signupState) {
      return (
        <div>
          Something went wrong with your signup process. Perhaps you have already registered for Precisely in the past?
        </div>
      );
    }
    else {
      // keep compiler happy @@
      return (<div>This should never render.</div>);
    }
  };

  const renderForm = () => {
    if (SignupState.None !== signupState) {
      return null;
    }
    return (
      <form ref={signupFormRef} onSubmit={signup}>
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
          <div className="pt-6 login-form-row">
            <label>
              Password
              <input placeholder="Enter your password"
                     value={password}
                     onChange={onChangePassword}
                     type="password"
                     required
                     name="password" />
            </label>
            <div className="text-xs">
              Minimum 8 characters and at least 1 digit or symbol
            </div>
          </div>
          <div className="pt-8 login-form-row-short">
            <Button type="submit"
                    color={valid ? "cardinal" : "grey"}
                    classes="w-full py-2"
                    text="Sign Up" />
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="">
      <div className="h1">
        Create an Account
      </div>
      <div className="grid grid-cols-6 text-sm">
        <div className="col-start-2 col-span-4 text-center">
          {renderHelper()}
        </div>
      </div>
      {renderForm()}
      <div className="pt-6 grid grid-cols-6 text-sm text-center">
        <div className="col-start-2 col-span-4">
          By signing up, you agree to the
          <RouterDOM.Link to="/terms"
                          className="p-1 font-bold">
            Terms and Conditions
          </RouterDOM.Link>
          and
          <RouterDOM.Link to="/privacy"
                          className="p-1 font-bold">
            Privacy Policy
          </RouterDOM.Link>
        </div>
      </div>
      <div className="ctr text-sm pt-6">
        <div>
          Already have an account?
        </div>
      </div>
      <RouterDOM.Link to="/landing/login"
                      className="ctr text-sm font-bold">
        Login
      </RouterDOM.Link>
    </div>
  );

};
