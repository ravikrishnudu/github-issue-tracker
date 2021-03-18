import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./components/App";
import User from "./components/User";
import Issues from "./components/Issues";
import Issue from "./components/Issue";
import NewIssue from "./components/NewIssue";

function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/issues/new">
          <NewIssue />
        </Route>
        <Route path="/issues/:id" component={Issue} />
        <Route path="/issues">
          <Issues />
        </Route>
        <Route path="/:username" component={User} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
