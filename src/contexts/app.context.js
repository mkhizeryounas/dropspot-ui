import React, { Component } from "react";
import { withContext } from "with-context";
import { withRouter } from "react-router-dom";

import { getUser } from "../services/auth.service";

export const AppContext = React.createContext();
export const withAppContext = withContext(AppContext);

class AppProvider extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isAuthenticated: false,
    user: {}
  };
  componentDidMount() {
    let user = getUser();
    if (user) this.setState({ user: user, isAuthenticated: true });
  }
  changeAuthStatus = (status, user = {}) => {
    this.setState({ isAuthenticated: status, user });
  };
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          actions: {
            changeAuthStatus: this.changeAuthStatus
          }
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withRouter(AppProvider);
