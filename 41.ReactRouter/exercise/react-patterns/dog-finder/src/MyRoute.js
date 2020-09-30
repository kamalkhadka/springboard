import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DogDetails from "./DogDetails";
import DogList from "./DogList";

const MyRoute = ({names, dogs}) => {
  return (
    <>
      <Switch>
        <Route exact path="/dogs">
          <DogList names={names} />
        </Route>

        <Route exact path="/dogs/:name">
          <DogDetails dogs={dogs} />
        </Route>
        <Redirect to="/dogs" />
      </Switch>
    </>
  );
};

export default MyRoute;
