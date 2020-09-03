import React from "react";
// import logo from "./logo.svg";
// import { add, multiply } from "./helpers";
// import cats, {meow} from "./cats";
import Alert from "./Alert";
import Greeting from "./Greeting";
import "./App.css";
import ShoppingCart from "./ShoppingCart";
import items from "./items";
import fakeLogo from "./logo-16.svg";

function App() {
  return (
    <div>
      <Alert variant="success">
        <h1>Welcome Back!</h1>
        <Greeting />
      </Alert>
      <Alert variant="danger">
        <h1>OH NO!</h1>
      </Alert>
      <img src={fakeLogo} />
      <ShoppingCart items={items} />
    </div>
  );
}

export default App;
