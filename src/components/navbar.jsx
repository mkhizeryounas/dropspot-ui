import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavElement from "./navElement";
import { Link } from "react-router-dom";
import { withAppContext } from "../contexts/app.context";
import AuthService from "../services/auth.service";

class Navbar extends Component {
  state = {};
  constructor(prop) {
    super(prop);
    this.authService = new AuthService();
  }
  handleLogout() {
    this.authService.signout();
    this.props.context.actions.changeAuthStatus(false);
    this.props.history.push("/");
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <tt>
            <i className="fa fa-cubes" /> <big>DROPSPOT</big>
          </tt>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <NavElement name="Home" link="/" />
            </li> */}
            {this.props.context.state.isAuthenticated && (
              <li className="nav-item">
                <NavElement name="Dashboard" link="/dashboard" />
              </li>
            )}

            {this.props.context.state.isAuthenticated && (
              <li
                style={{
                  borderLeft: "1px solid #ccc"
                  // border: "1px solid #ccc"
                  // borderRadius: "4px"
                }}
                className="nav-item dropdown "
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <strong>
                    {this.props.context.state.user.username.toUpperCase()}
                  </strong>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <a
                    className="dropdown-item  text-danger"
                    href="javascript:void(0)"
                    onClick={() => this.handleLogout()}
                  >
                    Sign out
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withAppContext(withRouter(Navbar));
