import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withAppContext } from "../contexts/app.context";

class Index extends Component {
  state = {};
  componentDidMount() {
    window.document.title = "Home";
  }
  handleCounter() {
    this.props.context.actions.increment();
    console.log("this.props.context", this.props.context);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Index</h1>
        <button
          className="btn btn-primary"
          onClick={() => this.handleCounter()}
        >
          Handle Click
        </button>
      </React.Fragment>
    );
  }
}

export default withAppContext(withRouter(Index));
