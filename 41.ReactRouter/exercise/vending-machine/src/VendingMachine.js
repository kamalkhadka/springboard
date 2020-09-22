import React from "react";
import Snack from "./Snack";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Sardine from "./Sardine";
import Soda from "./Soda";
import Chips from "./Chips";

const VendingMachine = () => {
  const snacks = ["sardines", "chips", "soda"];

  return (
    <div>
      <BrowserRouter>
        <Route exact path="/">
          <h1>Vendine Machine items</h1>
          {snacks.map((snack) => (
            <Snack name={snack} key={snack} />
          ))}
        </Route>
        <Route exact path="/sardines">
          <Sardine name="sardines" />
        </Route>
        <Route exact path="/soda">
          <Soda name="soda" />
        </Route>
        <Route exact path="/chips">
          <Chips name="chips" />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default VendingMachine;
