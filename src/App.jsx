import React, { Component } from "react";
import ReactDOM from "react-dom";

import { SampleJSButton } from "./components/SampleJSButton";


const App = () => {

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-5xl text-purple-500 font-sans">Greetings.</h1>
      </div>
      <div className="flex justify-center">
        <SampleJSButton />
      </div>
    </div>
  );

};


ReactDOM.render(<App />, document.getElementById("app"));
