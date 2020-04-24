import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Routes } from "~/src/routes/Routes";


const App = () => {

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );

};


ReactDOM.render(<App />, document.getElementById("app"));
