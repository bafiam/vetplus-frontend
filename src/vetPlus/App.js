import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PageLayout from './components/layout'
import Auth from './components/auth/index'
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path ="/home" component ={PageLayout}/>
        <Route path ="/auth" component ={Auth}/>
       </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
