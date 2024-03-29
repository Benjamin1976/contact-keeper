import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";

import AlertState from "./context/alert/AlertState";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import "./table.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar title="Contact Keeper" />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AlertState>
    </AuthState>
  );
};

export default App;
