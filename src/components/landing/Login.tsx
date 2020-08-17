import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

import * as SessionUtils from "~/src/utils/session";
import * as AuthUtils from "~/src/utils/auth";
import { Button } from "~/src/components/Button";

import "./common.css";


export const Login = (props: Router.RouteComponentProps) => {

  const loginFormRef = React.useRef(null);
  const [valid, setValid] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resp = await AuthUtils.login(email, password);
    if (resp) {
      const to = _.get(props, ["location", "state", "from"], "/");
      props.history.push(to);
    }
    else {
      setEmail("");
      setPassword("");
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
      loginFormRef.current && _.every(
        loginFormRef.current.elements,
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

  return (
    <div className="">
      <div className="h1">
        Welcome Back to Precisely
      </div>
      <form ref={loginFormRef} onSubmit={login}>
        <div className="pt-5 login-form-grid">
          <div className="login-form-row">
            <label>
              Email
              <input className="input-text"
                     placeholder="Enter your email"
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
              <input className="input-text"
                     placeholder="Enter your password"
                     value={password}
                     onChange={onChangePassword}
                     type="password"
                     required
                     name="password" />
            </label>
          </div>
          <div className="pt-8 login-form-row-short">
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
