import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import NotFound from "./screens/NotFound";
import Home from "./screens/Home";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute appProps={appProps} component={Home} path="/" exact />
      <Route component={NotFound} />
    </Switch>
  );
}
