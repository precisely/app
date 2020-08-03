import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";
import { Button } from "~/src/components/Button";

import "./common.css";


export const Login = (props: Router.RouteComponentProps) => {

  const loginFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await LoginUtils.login(email, password);
    const to = _.get(props, ["location", "state", "from"], "/");
    props.history.push(to);
  };

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  React.useEffect(() => {
    setValid(
      loginFormRef.current && _.every(
        loginFormRef.current.elements,
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
      <div className="h1">
        Welcome Back to Precisely
      </div>
      <form ref={loginFormRef} onSubmit={login}>
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
          </div>
          <div className="col-start-2 col-span-2">
            <Button type="submit"
                    color={valid ? "cardinal" : "grey"}
                    classes="w-full py-2"
                    text="Login" />
          </div>
        </div>
      </form>
      <RouterDOM.Link to="/landing/reset"
                      className="ctr text-sm font-bold pt-6">
        Forgot password?
      </RouterDOM.Link>
      <div className="ctr text-sm pt-6">
        <div>
          Don't have an account yet?
        </div>
      </div>
      <RouterDOM.Link to="/landing/signup"
                      className="ctr text-sm font-bold">
        Sign up
      </RouterDOM.Link>
    </div>
  );

};
