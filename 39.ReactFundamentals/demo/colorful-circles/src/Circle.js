import React from "react";
import "./Circle.css";

function Circle(props) {
  return (
    <div className="Circle" style={{ backgroundColor: props.color }}>
      {props.idx + 1}
    </div>
  );
}

export default Circle;
