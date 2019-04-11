import React, { Component } from "react";

class NotFound extends Component {
  state = {};
  componentDidMount() {
    window.document.title = "Page not found";
  }
  render() {
    return (
      <div>
        <h3>404 - Page not found</h3>
      </div>
    );
  }
}

export default NotFound;
