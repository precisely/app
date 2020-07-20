import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Routes } from "~/src/routes/Routes";

import "react-toastify/dist/ReactToastify.css";
import "~/src/components/common.css";


const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );

};


ReactDOM.render(<App />, document.getElementById("app"));
