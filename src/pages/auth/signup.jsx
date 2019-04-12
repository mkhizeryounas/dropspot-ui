import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../components/textValidator.jsx";
import { withAppContext } from "../../contexts/app.context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    username: "",
    password: "",
    github_personal_token: ""
  };
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  componentDidMount() {
    window.document.title = "Signup";
  }
  handleLogin = async () => {};
  handleChange = async e => {
    e.preventDefault();
    await this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async () => {
    try {
      let github_check = await this.authService.github_token_check(
        this.state.github_personal_token
      );
      console.log("github_check", github_check);
      let user = await this.authService.signup({
        username: this.state.username,
        password: this.state.password,
        github_personal_token: this.state.github_personal_token
      });
      // await this.props.context.actions.changeAuthStatus(true, user.data.data);
      toast.success("Account Signup Successful");
      this.props.history.push("/login");
      // this.setState({ redirectToReferrer: true });
    } catch (err) {
      console.log("Err", err.response);
      if (err.response.status === 409) {
        return toast.error("An account already exists with this username");
      } else if (err.response.status === 401) {
        return toast.error("Invalid GitHub personal token");
      }
      return toast.error(err.response.data.message);
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
              <div className="card-header">Signup</div>
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
                <div className="form-group">
                  <label htmlFor="username">GitHub Personal Token</label>
                  <TextValidator
                    type="password"
                    className="form-control"
                    placeholder="Github personal token"
                    name="github_personal_token"
                    value={this.state.github_personal_token}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <Link to="/login">
                      <small>Already have an account?</small>
                    </Link>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-success">
                      <i className="fa fa-sign-in" /> Signup
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
