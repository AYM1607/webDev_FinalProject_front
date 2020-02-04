import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * Returns a `Route` component whose child has the `appProps` applied to it if the user is not
 * authenticated. If the user is aithenticated it is redirected to the home page.
 *
 * @returns {Route}
 */
export default function UnauthenticatedRoute({
  component: C,
  appProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
