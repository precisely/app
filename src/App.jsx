import React, { Component } from "react";
import ReactDOM from "react-dom";


const App = () => {

  return (
    <div>
      <div class="min-h-screen flex items-center justify-center">
        <h1 class="text-5xl text-purple-500 font-sans">Greetings.</h1>
      </div>
    </div>
  );

};


ReactDOM.render(<App />, document.getElementById("app"));
