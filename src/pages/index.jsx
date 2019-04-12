import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withAppContext } from "../contexts/app.context";
import { Link } from "react-router-dom";

class Index extends Component {
  state = {};
  componentDidMount() {
    window.document.title = "Home";
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-6 mt-5">
            <h1>The shortest distance from idea to execution.</h1>
            <p>
              Automate your development process quickly, safely, and at scale.
            </p>
            <p>
              <tt>
                Automate API deployment, Just connect github project, Select a
                branch and <b>boom...</b> 💣.
              </tt>
            </p>
            <div className="row">
              <div className="col-auto">
                <Link to="/signup" className="btn btn-primary">
                  Sign up
                </Link>
              </div>
              <div className="col-auto">
                <Link to="/login" className="btn btn-outline-success">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <img src="/CD.png" alt="" className="img-fluid" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withAppContext(withRouter(Index));
