import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps} from "react-router";


export class Main extends React.Component<RouteComponentProps<void>, {}> {

  render(): JSX.Element {
    return (
      <div>
        app main
        {/* <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/company" component={Company} />
            </Switch> */}
      </div>
    );
  }

}
