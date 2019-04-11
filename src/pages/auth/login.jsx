import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../components/textValidator.jsx";
import { withAppContext } from "../../contexts/app.context";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  componentDidMount() {
    window.document.title = "Login";
  }
  handleLogin = async () => {};
  handleChange = async e => {
    e.preventDefault();
    await this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async () => {
    try {
      let user = await this.authService.authenticate({
        username: this.state.username,
        password: this.state.password
      });
      await this.props.context.actions.changeAuthStatus(true, user.data.data);
      this.props.history.push("/dashboard");
      // this.setState({ redirectToReferrer: true });
    } catch (err) {
      console.log("Err", err);
    } finally {
    }
  };
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <div className="card mt-4">
              <div className="card-header">Login</div>
              <ValidatorForm
                ref="form"
                onSubmit={() => this.handleSubmit()}
                className="card-body"
              >
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <TextValidator
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Password</label>
                  <TextValidator
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <a href="#">
                      <small>Sign up for new account</small>
                    </a>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-success">
                      <i className="fa fa-sign-in" /> Login
                    </button>
                  </div>
                </div>
              </ValidatorForm>
            </div>
          </div>
        </div>
        {/* <AuthButton handleLogin={() => this.handleLogin()} /> */}
      </div>
    );
  }
}

export default withAppContext(Login);
