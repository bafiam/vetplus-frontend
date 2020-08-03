import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './vetPlus/App';
import * as serviceWorker from './serviceWorker';

const renderApp = () => {
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
};

renderApp();

// Hot module reloading
if (module.hot) {
  module.hot.accept('./vetPlus/App', renderApp);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
