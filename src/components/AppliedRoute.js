import React from "react";
import { Route } from "react-router-dom";

/**
 * Returns a `Route` component whose child has the passed `appProps` applied.
 *
 * @returns {Route}
 */
export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return <Route {...rest} render={props => <C {...props} {...appProps} />} />;
}
