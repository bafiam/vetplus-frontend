import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import PageLayout from './components/layout';
import Auth from './components/auth/index';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/home" component={PageLayout} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/home/dash" />
    </Switch>
  </div>
);

export default hot(module)(App);
