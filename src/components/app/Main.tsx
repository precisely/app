import * as React from "react";
import * as RouterDOM from "react-router-dom";


export const Main = () => {

  return (
    <div>
      app main
      <RouterDOM.Switch>
        {/* <RouterDOM.Route exact path="/app" component={Main} />
            <RouterDOM.Route exact path="/home" component={Home} />
            <RouterDOM.Route exact path="/company" component={Company} /> */}
      </RouterDOM.Switch>
    </div>
  );

};
