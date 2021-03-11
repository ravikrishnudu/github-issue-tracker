import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./components/App";
import User from "./components/User";
import Issue from "./components/Issue";
import Issues from "./components/Issues";

// import './index.css';
// import reportWebVitals from './reportWebVitals';

function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/issues/:id" component={Issue} />
        <Route path="/issues">
          <Issues />
        </Route>
        <Route path="/usecr">
          <User />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
