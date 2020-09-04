import React, { useState } from "react";

const NumberGame = (props) => {
  const genRandom = () => Math.floor(Math.random() * 10) + 1;
  const [guess, setGuess] = useState(genRandom());
  const [target, setTarget] = useState(genRandom());
  const restart = () => {
    setTarget(genRandom());
    setGuess(0);
    setGuessCount(0);
  };
  const makeGuess = () => {
    setGuess(genRandom());
    setGuessCount(guessCount + 1);
  }
  const isWinner = target === guess;
  const [guessCount, setGuessCount] = useState(0);
  return (
    <div>
      <h1>Target Num : {target}</h1>
      <h1>You Guess: {guess}</h1>
      <h4>Guess #{guessCount}</h4>
      {!isWinner && (
        <button onClick={makeGuess}>Generate Num</button>
      )}
      <button onClick={restart}>New Game</button>
    </div>
  );
};

export default NumberGame;
