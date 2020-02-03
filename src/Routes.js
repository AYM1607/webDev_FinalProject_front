import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import Payment from "./screens/Payment";
import ThankYou from "./screens/ThankYou";
import Login from "./screens/Login";

export default function Routes(props) {
  return (
    <Switch>
      <AppliedRoute appProps={props} component={Login} path="/login" exact />
      <AppliedRoute appProps={props} component={Home} path="/" exact />
      <AuthenticatedRoute
        appProps={props}
        component={Payment}
        path="/pagar"
        exact
      />
      <AppliedRoute
        appProps={props}
        component={ThankYou}
        path="/gracias"
        exact
      />
      <Route component={NotFound} />
    </Switch>
  );
}
