import * as History from "history";
import * as React from "react";
import * as Router from "react-router";
import * as RouterDOM from "react-router-dom";

export type RenderFn = (
  props: Router.RouteComponentProps<unknown>
) => JSX.Element;

export interface RoutedComponentArgs {
  route?: string;
  path?: string;
  history?: History.History;
}

// Instructions for use:
// - renderFn should be a function which takes props and returns a component
//   rendered using these props
// - argsRaw should be an object containing some combination of route, path,
//   and history keys. Most importantly: a _route_ is the expected address with
//   URL param names (e.g.: "/url/location/:param1/:param2"), and a _path_ is
//   the expected address with param values (e.g.: "/url/location/value1/value2").
//   path can be omitted if route contains no variables.
export function routedComponent(
  renderFn: RenderFn,
  argsRaw: RoutedComponentArgs = {}
) {
  const args: RoutedComponentArgs = {
    route: argsRaw.route || "/",
    path: argsRaw.path || argsRaw.route || "/",
    history:
      argsRaw.history ||
      History.createMemoryHistory({
        initialEntries: [argsRaw.path || argsRaw.route || "/"],
      }),
  };
  return (
    <RouterDOM.Router history={args.history}>
      <RouterDOM.Route path={args.route} render={renderFn} />
    </RouterDOM.Router>
  );
}

export function useTitle(title: string) {
  React.useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  });
}
