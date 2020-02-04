import React from "react";
import { Route } from "react-router-dom";

import NotFound from "../screens/NotFound";

/**
 * Returns a `Route` component whose child has the `appProps` applied to it if the user is
 * an admin. If the user is not an admin show the not found screen.
 *
 * @returns {Route}
 */
export default function AdminRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAdmin ? <C {...props} {...appProps} /> : <NotFound />
      }
    />
  );
}
