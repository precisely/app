import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Button } from "~/src/components/Button";

import "./common.css";


export const Signup = (props: Router.RouteComponentProps) => {

  const signupFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //await LoginUtils.signup(email, password);
    // FIXME!!!
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

  return (
    <div className="">
      <div className="pt-5 pb-5 flex justify-center text-xl font-bold">
        Welcome to Precisely
      </div>
      <div className="grid grid-cols-6 text-xs">
        <div className="col-start-2 col-span-4 text-center">
          Thank you for your interest. Please fill out this form to sign up.
        </div>
      </div>
      <form ref={signupFormRef} onSubmit={login}>
        <div className="pt-5 grid grid-cols-4 text-sm">
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
            <div className="text-2xs">
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
      <div className="ctr text-xs pt-8">
        <div>
          Already have an account?
        </div>
      </div>
      <RouterDOM.Link to="/landing/login"
                      className="ctr text-xs font-bold">
        Login
      </RouterDOM.Link>
    </div>
  );

};
