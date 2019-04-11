import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavElement extends Component {
  state = {};
  render() {
    return (
      <Link
        className={
          `nav-link` +
          (this.props.location.pathname === this.props.link ? " active" : "")
        }
        to={this.props.link}
      >
        {this.props.name}
      </Link>
    );
  }
}

export default withRouter(NavElement);
