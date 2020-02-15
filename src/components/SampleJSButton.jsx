import React, { Component } from "react";

import "./SampleJSButton.css"; // or use classes defined below


export class SampleJSButton extends Component {

  render() {
    return (
      <div className="btn btn-blue"> {/* or: classNames={classes} */}
        JS Button
      </div>
    );
  }

}


const classes = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
