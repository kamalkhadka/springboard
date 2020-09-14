import React from "react";
import "./App.css";
import Dice from "./Dice";

function App() {
  return (
    <div className="App">
      <Dice numDice={9} maxVal={6}/>
      <Dice />
    </div>
  );
}

export default App;
