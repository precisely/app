import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Button } from "~/src/components/Button";

import "./common.css";


enum SignupState {
  None,
  Success,
  Failure
}


export const Signup = (props: Router.RouteComponentProps) => {

  const signupFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signupState, setSignupState] = React.useState(SignupState.None);

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signupResult = await LoginUtils.signup(email, password);
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

  if (AuthUtils.isAuthenticated()) {
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
  };

  const renderForm = () => {
    if (SignupState.None !== signupState) {
      return null;
    }
    return (
      <form ref={signupFormRef} onSubmit={signup}>
        <div className="pt-5 grid grid-cols-4">
          <div className="col-start-2 col-span-2 pb-6">
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
          <div className="col-start-2 col-span-2 pb-8">
            <label>
              Password
              <input className="input-text"
                     placeholder="Enter your password"
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
          <div className="col-start-2 col-span-2">
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
        Welcome to Precisely
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
