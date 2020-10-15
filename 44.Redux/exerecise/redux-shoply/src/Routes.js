import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Items from "./Items";
import Cart from "./Cart";
import ItemDetails from "./ItemDetails";
import CartDetails from "./CartDetails";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <h1>Product List</h1>
        <Items />
        <Cart />
      </Route>
      <Route exact path="/products/:id">
        <h1>Item Details</h1>
        <ItemDetails />
      </Route>
      <Route exact path="/cart">
        <h1>Cart</h1>
        <CartDetails />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
