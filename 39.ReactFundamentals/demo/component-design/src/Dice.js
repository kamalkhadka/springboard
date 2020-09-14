import React, { useState } from "react";
import Die from "./Die";
import "./Dice.css";

const Dice = ({ numDice = 6, title = "Main Game", maxVal = 20 }) => {
  const [numbers, setNumbers] = useState(Array.from({ length: numDice }));
  const rollDice = () => {
    setNumbers((numbers) =>
      numbers.map((n) => Math.floor(Math.random() * maxVal) + 1)
    );
  };
  return (
    <div className="Dice">
      <h2>{title}</h2>
      {numbers.map((num) => (
        <Die val={num} />
      ))}
      <button onClick={rollDice}>Roll</button>
    </div>
  );
};

export default Dice;
