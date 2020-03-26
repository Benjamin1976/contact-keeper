import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Balances from './components/pages/Balances';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import AlertState from './context/alert/AlertState';
import ContactState from './context/contact/ContactState';
import BalanceState from './context/balance/BalanceState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import './table.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BalanceState>
        <AlertState>
          <ContactState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/balances' component={Balances} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </ContactState>
        </AlertState>
      </BalanceState>
    </AuthState>
  );
};

export default App;
