import React, { Component } from "react";
import AuthButton from "./auth/authButton.jsx";

class Dashboard extends Component {
  componentDidMount() {
    window.document.title = "Dashboard";
  }
  state = {};
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <AuthButton />
      </div>
    );
  }
}

export default Dashboard;
