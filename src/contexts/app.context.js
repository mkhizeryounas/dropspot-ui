import React, { Component } from "react";
import { withContext } from "with-context";
import { withRouter } from "react-router-dom";
export const AppContext = React.createContext();
export const withAppContext = withContext(AppContext);

class AppProvider extends Component {
  state = {
    isLoggedIn: "false",
    counter: 0
  };
  componentDidMount() {
    console.log(this.props);
  }
  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  render() {
    return (
      <AppContext.Provider
        value={{ state: this.state, actions: { increment: this.increment } }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default withRouter(AppProvider);
