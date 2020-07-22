import * as _ from "lodash";
import * as React from "react";
import * as Router from "react-router";

import * as AuthUtils from "~/src/utils/auth";
import * as LoginUtils from "~/src/utils/login";

import "./Login.css";


export const Login = (props: Router.RouteComponentProps) => {

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    await LoginUtils.login(email, password);
    const to = _.get(props, ["location", "state", "from"], "/");
    props.history.push(to);
  };


  if (AuthUtils.isAuthenticated()) {
    return (
      <Router.Redirect to="/" />
    );
  }

  return (
    <div className="">
      <form onSubmit={login}>
        <div>
          <label>Email</label>
          <input className="input-text"
                 type="email" name="email" />
        </div>
        <div className="">
          <label>Password</label>
          <input className="input-text"
                 type="password" name="password" />
        </div>
        <div>
          <button className="bg-blue-500 text-white"
                  type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );

};
