import * as React from "react";
// import * as ReactDOM from "react-dom";
import { RouteComponentProps} from "react-router";

import "./Login.css";


export class Login extends React.Component<RouteComponentProps<void>> {

  login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("clicky here");
  }

  render(): JSX.Element {
    return (
      <div className="">
        <form onSubmit={this.login}>
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
  }

}
