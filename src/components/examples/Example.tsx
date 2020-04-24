import * as React from "react";


import { ExampleJSButton } from "./ExampleJSButton";
import { ExampleTSButton } from "./ExampleTSButton";


export const Example = () => {

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
    </div>
  );

};
