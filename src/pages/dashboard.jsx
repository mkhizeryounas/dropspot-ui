import React, { Component } from "react";
import http from "../services/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  page = 1;
  state = {
    projects: [],
    pagination: {}
  };
  componentDidMount = async () => {
    window.document.title = "Dashboard";
    this.loadProject(this.page);
  };
  loadMore = () => {
    if (
      this.state.pagination.totalPages &&
      this.state.pagination.totalPages < this.page
    ) {
      toast.info("Loading more...");
      this.loadProject(++this.page);
    } else {
      toast.error("No more projects to show");
    }
  };
  loadProject = async p => {
    try {
      let projects = await http.get("/projects", {
        params: { page: p }
      });
      this.setState({
        projects: projects.data.data.body,
        pagination: projects.data.data.pagination
      });
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
    }
  };
  state = {};
  render() {
    return (
      <div className="row">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Projects</h3>
            </div>
            <div className="col-auto">
              <Link
                to="/projects/new"
                className="btn btn-sm btn-outline-primary"
              >
                <i className="fa fa-code-fork"> </i> New
              </Link>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <ul className="list-group">
            {this.state.projects &&
              this.state.projects.map(e => (
                <li className="list-group-item text-secondary" key={e._id}>
                  <Link
                    className="link-unstyled"
                    to={`/projects/${e._id}/view`}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <i
                            className={
                              e.status === "active"
                                ? `fa fa-circle text-success`
                                : `fa fa-circle-o text-danger`
                            }
                          />
                        </div>
                        <div className="col">
                          <strong>{e.name}</strong>
                        </div>
                        <div className="col">
                          <i className="fa fa-code-fork" /> {e.trigger_branch}
                        </div>
                        <div className="col">
                          <i className="fa fa-plug" /> {e.port}
                        </div>
                        <div className="col-auto">
                          <img
                            src={`/${e.language}.png`}
                            style={{ width: "25px" }}
                          />{" "}
                          <tt>{e.language}</tt>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="d-flex justify-content-center">
            {this.state.pagination && this.state.pagination.totalPages && (
              <button
                className="btn btn-outline-primary mt-4 "
                onClick={() => this.loadMore()}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
