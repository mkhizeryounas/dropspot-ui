import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../components/textValidator.jsx";
import { withAppContext } from "../../contexts/app.context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../services/axios";

class NewProject extends Component {
  state = {
    name: "",
    github_repo: "",
    trigger_branch: "",
    language: "nodejs",
    build: "",
    script: "",
    env: []
  };
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  componentDidMount = async () => {
    window.document.title = "New project";
  };
  handleChange = async e => {
    e.preventDefault();
    await this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async () => {
    try {
      let obj = {
        name: this.state.name,
        github_repo: this.state.github_repo,
        trigger_branch: this.state.trigger_branch,
        language: this.state.language,
        build: this.state.build,
        script: this.state.script,
        env: this.state.env
      };
      console.log("obj", obj);
      let project = await http.post("/projects", obj);
      console.log("Project", project.data);
      toast.success("New project created successful");
      this.props.history.push("/dashboard");
    } catch (err) {
      console.log("Err", err);
      toast.error(err.response.data.message);
    }
  };
  addEnv = () => {
    this.setState({ env: [...this.state.env, ""] });
  };
  delEnv = k => {
    let env = [...this.state.env];
    env.splice(k, 1);
    this.setState({ env });
  };
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <div className="card mt-4">
              <div className="card-header">New project</div>
              <ValidatorForm
                ref="form"
                onSubmit={() => this.handleSubmit()}
                className="card-body"
              >
                <div className="form-group">
                  <label htmlFor="username">Name</label>
                  <TextValidator
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">GitHub Repo</label>
                  <TextValidator
                    type="text"
                    className="form-control"
                    placeholder="https://github.com/user/project"
                    name="github_repo"
                    value={this.state.github_repo}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trigger_branch">Trigger Branch</label>
                  <TextValidator
                    type="text"
                    className="form-control"
                    placeholder="master"
                    name="trigger_branch"
                    value={this.state.trigger_branch}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="build">Build Command</label>
                  <TextValidator
                    type="text"
                    className="form-control"
                    placeholder="npm install"
                    name="build"
                    value={this.state.build}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="script">Run Command</label>
                  <TextValidator
                    type="text"
                    className="form-control"
                    placeholder="npm start"
                    name="script"
                    value={this.state.script}
                    onChange={e => this.handleChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="">
                      <strong>Environment Variables</strong>
                    </label>
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      onClick={() => this.addEnv()}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fa fa-plus" /> Add
                    </button>
                  </div>
                </div>
                {this.state.env &&
                  this.state.env.map((e, k) => (
                    <div className="row" key={k}>
                      <div className="col form-group">
                        <TextValidator
                          type="text"
                          className="form-control"
                          placeholder="secret=myBigSecret"
                          name={`env-${k}`}
                          value={this.state.env[k]}
                          onChange={e => {
                            let env = this.state.env;
                            env[k] = e.target.value;
                            this.setState({ env });
                          }}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                        />
                      </div>
                      <div className="col-auto form-group">
                        <button
                          type="button"
                          onClick={() => this.delEnv(k)}
                          className="btn btn-outline-danger"
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </div>
                    </div>
                  ))}

                <hr />
                <div className="row">
                  <div className="col">
                    <Link to="/dashboard">
                      <small>Cancel</small>
                    </Link>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-success">
                      <i className="fa fa-check" /> Create
                    </button>
                  </div>
                </div>
              </ValidatorForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAppContext(NewProject);
