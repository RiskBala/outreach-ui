import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import Home from "./containers/Home";
import Event from "./containers/Event";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
      <AppliedRoute path="/logout" exact component={Logout} props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
     <AppliedRoute path="/event" exact component={Event} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
  