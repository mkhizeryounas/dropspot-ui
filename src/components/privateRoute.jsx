import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "../services/auth.service";

function PrivateRoute({ component: Component, ...rest }) {
  let authService = new AuthService();
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
