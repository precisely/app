import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { RouteComponentProps} from "react-router";

import * as AuthUtils from "~/src/utils/auth";
import { Button } from "~/src/components/Button";
import { Header } from "~/src/components/landing/Header";
import { Home } from "~/src/components/landing/Home";
import { Company } from "~/src/components/landing/Company";
import { Login } from "~/src/components/landing/Login";
import { Logout } from "~/src/components/Logout";
import { NotFound as ErrorNotFound } from "~/src/components/errors/NotFound";


export class Main extends React.Component<RouteComponentProps<void>, {}> {

  headerButton = () => {
    if (this.props.location.pathname === "/landing/login") {
      return null;
    }
    else if (AuthUtils.isAuthenticated()) {
      return (
        <Logout />
      );
    }
    else {
      return (
        <Button text="Login"
                color="cardinal-inv"
                callback={() => { return (<Redirect to="/landing/login" />); }} />
      );
    }
  };

  render(): JSX.Element {
    return (
      <div>
        <Header action={this.headerButton()} />
        <Switch>
          <Route exact path="/landing/" component={Home} />
          <Route exact path="/landing/home" component={Home} />
          <Route exact path="/landing/company" component={Company} />
          <Route exact path="/landing/login" component={Login} />
          <Route path="/landing/*" component={ErrorNotFound} />
        </Switch>
      </div>
    );
  }

}
