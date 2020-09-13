import * as History from "history";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";


export type RenderFn = (props: Router.RouteComponentProps<any>) => JSX.Element;


export function routedComponent(renderFn: RenderFn, history?: History.History) {
  if (!history) {
    history = History.createMemoryHistory();
  }
  return (
    <RouterDOM.Router history={history}>
      <RouterDOM.Route render={renderFn} />
    </RouterDOM.Router>
  );
}
