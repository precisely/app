import * as React from "react";
// import ReactDOM from "react-dom";

import "./button.css"; // or use classes defined below


export class ExampleJSButton extends React.Component {

  render() {
    return (
      <div className="btn btn-blue"> {/* or: classNames={classes} */}
        JS Button
      </div>
    );
  }

}


const classes = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer";
