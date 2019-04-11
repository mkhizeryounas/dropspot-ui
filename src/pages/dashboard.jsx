import React, { Component } from "react";

class Dashboard extends Component {
  componentDidMount() {
    window.document.title = "Dashboard";
  }
  state = {};
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
