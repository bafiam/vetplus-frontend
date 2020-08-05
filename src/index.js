import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import "./index.css";
import App from "./vetPlus/App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./vetPlus/modules/rootReducer";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
