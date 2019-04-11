import React from "react";
import { withRouter } from "react-router-dom";
import authService from "../../services/auth.service";

const AuthButton = withRouter(({ history, handleLogin }) =>
  authService.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          authService.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>
      You are not logged in.{" "}
      <button onClick={() => handleLogin()}>Sign in</button>
    </p>
  )
);

export default AuthButton;
