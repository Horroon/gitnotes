import React from "react";
import MainScreen from "../pages/main";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainScreen />
        </Route>
      </Switch>
    </Router>
  );
};
