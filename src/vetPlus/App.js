import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import './App.css';
import PageLayout from './components/layout'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Route path ="/" component ={PageLayout}/>
       
      </div>
    );
  }
}

export default hot(module)(App);
