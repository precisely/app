import React, { Component } from "react";
import ReactDOM from "react-dom";

import { ExampleJSButton } from "./components/examples/ExampleJSButton";
import { ExampleTSButton } from "./components/examples/ExampleTSButton";
import { Login } from "./components/Login";


const App = () => {

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-5xl text-purple-500 font-sans">Greetings.</h1>
      </div>
      <div className="flex justify-center">
        <ExampleJSButton />
      </div>
      <div className="h-2" />
      <div className="flex justify-center">
        <ExampleTSButton />
      </div>
      <div className="" >
        <Login />
      </div>
    </div>
  );

};


ReactDOM.render(<App />, document.getElementById("app"));
