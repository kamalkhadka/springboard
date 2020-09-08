import React, { useState } from "react";
import "./EightBall.css";

const BlackBall = ({ answers }) => {
  const [color, setColor] = useState("black");
  const [message, setMessage] = useState("Think of a Question");

  const getAnswer = () => {
    const randIdx = Math.floor(Math.random() * answers.length);
    const ans = answers[randIdx];
    setColor(ans.color);
    setMessage(ans.msg);
  };
  return (
    <div
      className="EightBall"
      style={{ backgroundColor: color }}
      onClick={getAnswer}
    >
      <h3 className="EightBall-question">{message}</h3>
    </div>
  );
};

export default BlackBall;
