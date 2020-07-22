import * as React from "react";
import * as RouterDOM from "react-router-dom";
import { RouteComponentProps } from "react-router";


export const Home = (props: RouteComponentProps<void>) => {

  return (
    <div>
      <ul>
        <li><RouterDOM.Link to="/landing/login">login</RouterDOM.Link></li>
        <li><RouterDOM.Link to="/landing/company">RouterDOM.Link company</RouterDOM.Link></li>
        <li><a href="/landing/company">anchor company</a></li>
      </ul>
    </div>
  );

};
