import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps} from "react-router";

import { Header } from "~/src/components/landing/Header";
import { Home } from "~/src/components/landing/Home";
import { Company } from "~/src/components/landing/Company";


export class Main extends React.Component<RouteComponentProps<void>, {}> {

  render(): JSX.Element {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/home" exact={true} component={Home} />
          <Route path="/company" exact={true} component={Company} />
        </Switch>
      </div>
    );
  }

}
