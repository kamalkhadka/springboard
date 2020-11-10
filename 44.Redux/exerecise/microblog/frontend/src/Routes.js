import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import EditPost from "./EditPost";
import Home from "./Home";
import NewPost from "./NewPost";
import PostDetails from "./PostDetails";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/new" exact>
        <NewPost />
      </Route>
      <Route path="/post/:id" exact>
        <PostDetails />
      </Route>
      <Route path="/edit/:id" exact>
        <EditPost />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
