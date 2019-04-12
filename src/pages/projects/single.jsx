import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "../../components/textValidator.jsx";
import { withAppContext } from "../../contexts/app.context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../services/axios";

class SingleProject extends Component {
  state = {
    project: {}
  };
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  componentDidMount = async () => {
    window.document.title = "Project detail";
    console.log(this.props);
    this.getInfo(this.props.match.params.id);
  };
  getInfo = async id => {
    try {
      let project = await http.get(`/projects/${id}`);
      console.log("project", project.data);
      this.setState({ project: project.data.data });
    } catch (err) {
      console.log("Err", err);
      toast.error(err.response.data.message);
      this.props.history.push("/dashboard");
    }
  };
  deleteProject = async id => {
    try {
      if (!window.confirm("Do you want to continue?")) return;
      let project = await http.delete(`/projects/${id}`);
      console.log("project", project.data);
      toast.success(project.data.message);
      this.props.history.push("/dashboard");
    } catch (err) {
      console.log("Err", err);
      toast.error(err.response.data.message);
    }
  };
  newTriggerBuild = async () => {
    try {
      let project = await http.post(
        `/projects/${this.state.project._id}/webhook/${
          this.state.project.token
        }`,
        {
          ref: this.state.project.trigger_branch
        }
      );
      console.log("project", project.data);
      toast.success(project.data.message);
      // this.props.history.push("/dashboard");
    } catch (err) {
      console.log("Err", err);
      toast.error(err.response.data.message);
    }
    //
  };
  handleChange = async e => {
    e.preventDefault();
    await this.setState({ [e.target.name]: e.target.value });
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
              <div className="card-header">Project Details</div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <b>Name</b>
                      </td>
                      <td>{this.state.project.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>GitHub Repo</b>
                      </td>
                      <td>{this.state.project.github_repo}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Trigger Branch</b>
                      </td>
                      <td>{this.state.project.trigger_branch}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Build Command</b>
                      </td>
                      <td>{this.state.project.build}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Run Command</b>
                      </td>
                      <td>{this.state.project.script}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Port</b>
                      </td>
                      <td>{this.state.project.port}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Language</b>
                      </td>
                      <td>{this.state.project.language}</td>
                    </tr>
                  </tbody>
                </table>

                <hr />
                <strong>Environment Variables</strong>
                <ul>
                  {this.state.project.env &&
                    this.state.project.env.map((e, k) => <li key={k}>{e}</li>)}
                </ul>
                <hr />
                <div className="col-auto">
                  {this.state.project._id && (
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            this.deleteProject(this.state.project._id)
                          }
                        >
                          <i className="fa fa-trash" /> Delete Project
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => this.newTriggerBuild()}
                        >
                          <i className="fa fa-refresh" /> Trigger Build
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAppContext(SingleProject);
