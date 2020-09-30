import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Color from "./Color";
import ColorList from "./ColorList";
import NewColor from "./NewColor";

function Routes() {
  const [colors, setColors] = useState({
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
  });
  const handleAdd = (color) => {
    setColors((colors) => ({ ...colors, ...color }));
  };
  return (
    <Switch>
      <Route exact path="/colors">
        <ColorList colors={colors} />
      </Route>
      <Route exact path="/colors/new">
        <NewColor addColor={handleAdd} />
      </Route>
      <Route exact path="/colors/:name">
        <Color colors={colors} />
      </Route>
      <Redirect to="/colors" />
    </Switch>
  );
}

export default Routes;
