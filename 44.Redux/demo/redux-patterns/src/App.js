import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Math from "./Math";
import NumberInputs from "./NumberInputs";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Math />
        <NumberInputs />
      </header>
    </div>
  );
}

export default App;
