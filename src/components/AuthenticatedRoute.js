import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * Returns a `Route` component whose child has the `appProps` applied to it if the user is
 * authenticated. If the user has not logged in, the route will take it to the login page and
 * redirect to the original destination after loggin in.
 *
 * @returns {Route}
 */
export default function AuthenticatedRoute({
  component: C,
  appProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
