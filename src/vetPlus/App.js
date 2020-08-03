import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      number : 0
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        Will the state be preserved? The value is {this.state.number}
        </p>
        <button onClick={()=>this.setState({number : this.state.number + 1})}>+</button>
      </div>
    );
  }
}

export default App;
