import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap";

// APP CONTEXT
import AppProvider from "./contexts/app.context";
import { AppContext } from "./contexts/app.context";

// COMPONENTS
import Navbar from "./components/navbar.jsx";
import PrivateRoute from "./components/privateRoute.jsx";

// PAGES
import Index from "./pages/index.jsx";
import NotFound from "./pages/notFound.jsx";
import Login from "./pages/auth/login.jsx";
import Dashboard from "./pages/dashboard.jsx";

class App extends Component {
  render() {
    return (
      <Router>
        <AppProvider>
          <div>
            <Navbar />
            <div className="container mt-2 mb-4">
              <AppContext.Consumer>
                {context => (
                  <Switch>
                    <Route path="/" exact component={Index} />
                    {!context.state.isAuthenticated && (
                      <Route path="/login" exact component={Login} />
                    )}
                    <PrivateRoute
                      path="/dashboard"
                      exact
                      component={Dashboard}
                    />
                    {/* <Route path="/users/" component={Users} /> */}
                    <Route component={NotFound} />
                  </Switch>
                )}
              </AppContext.Consumer>
            </div>
          </div>
        </AppProvider>
      </Router>
    );
  }
}

export default App;
