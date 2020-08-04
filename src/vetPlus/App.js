import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import PageLayout from './components/layout'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <PageLayout></PageLayout>
       
      </div>
    );
  }
}

export default hot(module)(App);
